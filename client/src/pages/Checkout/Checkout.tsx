import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useAuth } from "../../store/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingIntent {
  vehicleId: string;
  vehicleName: string;
  image?: string;
  seats?: number;
  pickupDate: string;
  returnDate: string;
  pickupLoc: string;
  baseTotal: number;
  cgst: number;
  sgst: number;
  refundDeposit: number;
  grandTotal: number;
  durationLabel: string;
}

function formatAmount(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const PROMO_CODES: Record<string, number> = {
  MASAI25: 25,
  FTWEB10: 60,
  CARBOOM10: 10,
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const [intent, setIntent] = useState<BookingIntent | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [discountAmt, setDiscountAmt] = useState(0);

  // ── Auth guard ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { state: { returnTo: "/checkout" } });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // ── Load booking intent from localStorage ────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem("bookingIntent");
    if (!raw) {
      navigate("/browse");
      return;
    }
    try {
      const parsed: BookingIntent = JSON.parse(raw);
      setIntent(parsed);
    } catch {
      navigate("/browse");
    }
  }, [navigate]);

  const totalPayable = intent ? intent.grandTotal - discountAmt : 0;

  // Apply promo code
  const applyPromo = useCallback(() => {
    const code = promoCode.trim().toUpperCase();
    if (!intent) return;

    if (code in PROMO_CODES) {
      const pct = PROMO_CODES[code];
      const discount = Math.ceil((intent.baseTotal * pct) / 100);
      setDiscountAmt(discount);
      setDiscountMsg(`✅ Promo Applied: ₹${formatAmount(discount)} off`);
    } else {
      setDiscountAmt(0);
      setDiscountMsg("❌ Invalid promo code");
    }
    setPromoCode("");
  }, [promoCode, intent]);

  const handlePromoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") applyPromo();
  };

  // Format date/time for display
  const formatDate = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || !intent) {
    return (
      <div className="checkout-loading">
        <div className="spinner" />
        <p>Loading checkout…</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Progress stepper */}
      <div className="checkout-stepper">
        <div className="step done">
          <div className="step-circle green">1</div>
          <div className="step-label">Login/Signup</div>
        </div>
        <div className="step-line green-line" />
        <div className="step done">
          <div className="step-circle green">2</div>
          <div className="step-label">Checkout</div>
        </div>
        <div className="step-line" />
        <div className="step">
          <div className="step-circle">3</div>
          <div className="step-label">Payment</div>
        </div>
        <div className="step-line" />
        <div className="step">
          <div className="step-circle">4</div>
          <div className="step-label">Confirmed</div>
        </div>
      </div>

      <div className="checkout-content">
        {/* Left panel – cost breakdown */}
        <div className="checkout-panel">
          <h1 className="checkout-title">CHECKOUT</h1>
          <hr />

          {/* Base rental fee */}
          <div className="fee-row">
            <div>
              <h3>Base Rental ({intent.durationLabel})</h3>
              <p className="fee-sub">{intent.pickupLoc}</p>
            </div>
            <div className="fee-amount">
              <span>₹</span>
              <span>{formatAmount(intent.baseTotal)}</span>
            </div>
          </div>
          <hr />

          <div className="fee-row">
            <div><h3>CGST (9%)</h3></div>
            <div className="fee-amount">
              <span>₹</span>
              <span>{formatAmount(intent.cgst)}</span>
            </div>
          </div>

          <div className="fee-row">
            <div><h3>SGST (9%)</h3></div>
            <div className="fee-amount">
              <span>₹</span>
              <span>{formatAmount(intent.sgst)}</span>
            </div>
          </div>
          <hr />

          {/* Promo code */}
          <div className="promo-section">
            <input
              type="text"
              id="promocode"
              className="promo-input"
              placeholder="Have a Coupon Code?"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyPress={handlePromoKeyPress}
            />
            <button className="promo-btn" onClick={applyPromo}>
              Apply
            </button>
            {discountMsg && (
              <p className={`discount-msg ${discountAmt > 0 ? "success" : "error"}`}>
                {discountMsg}
              </p>
            )}
          </div>
          <hr />

          {discountAmt > 0 && (
            <>
              <div className="fee-row">
                <div><h3>Promo Discount</h3></div>
                <div className="fee-amount promo-discount">
                  <span>− ₹</span>
                  <span>{formatAmount(discountAmt)}</span>
                </div>
              </div>
              <hr />
            </>
          )}

          {/* Refundable deposit */}
          <div className="fee-row">
            <div>
              <h3>Refundable Deposit</h3>
              <p className="fee-sub">Fully refunded after vehicle return</p>
            </div>
            <div className="fee-amount">
              <span>₹</span>
              <span>{formatAmount(intent.refundDeposit)}</span>
            </div>
          </div>
          <hr />

          {/* Grand total */}
          <div className="total-row">
            <p>Total Payable Amount</p>
            <div className="total-amount">
              <span>₹</span>
              <span>{formatAmount(totalPayable)}</span>
            </div>
          </div>

          {/* → Payment page */}
          <div className="checkout-btn-wrap">
            <button
              className="checkout-btn"
              onClick={() => {
                localStorage.setItem("CheckoutPaymentTotal", String(totalPayable));
                navigate("/payment");
              }}
            >
              PROCEED TO PAYMENT →
            </button>
          </div>
        </div>

        {/* Right panel – booking summary */}
        <div className="summary-panel">
          <p className="summary-heading">BOOKING SUMMARY</p>

          {intent.image && (
            <img
              src={intent.image}
              alt={intent.vehicleName}
              className="summary-car-img"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}

          <p className="summary-car-name">{intent.vehicleName}</p>
          {intent.seats && (
            <p className="summary-car-seat">( {intent.seats} Seater )</p>
          )}
          <hr />

          <div className="summary-times">
            <div className="time-col">
              <h2 className="time-val">PICKUP</h2>
              <hr className="time-hr" />
              <p className="time-date">{formatDate(intent.pickupDate)}</p>
            </div>
            <div className="time-to">TO</div>
            <div className="time-col">
              <h2 className="time-val">RETURN</h2>
              <hr className="time-hr" />
              <p className="time-date">{formatDate(intent.returnDate)}</p>
            </div>
          </div>

          <div className="summary-loc">
            <span>📍</span>
            <span>{intent.pickupLoc}</span>
          </div>
          <hr />

          <div className="fare-inclusions">
            <p>✅ Fuel included &nbsp; ✅ Insurance included &nbsp; ✅ 24/7 Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
