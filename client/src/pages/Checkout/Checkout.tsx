import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const API_BASE = "http://localhost:4321";

interface CarDetails {
  image: string;
  name: string;
  seater: string;
  bookingFee: string;
  freeDistance: string | number;
  excessKM: string;
}

interface BookingDetails {
  starttime: string;
  startdate: string;
  startmonth: string;
  endtime: string;
  enddate: string;
  endmonth: string;
  location?: string;
}

// Utility – add thousands separator
function formatAmount(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Strip commas and parse back to number
function parseAmount(str: string): number {
  return Number(String(str).replace(/,/g, ""));
}

const REFUNDABLE_DEPOSIT = 1499;
const PROMO_CODES: Record<string, number> = {
  MASAI25: 25,
  FTWEB10: 60,
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [discountAmt, setDiscountAmt] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch car & booking details from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carRes, bookingRes] = await Promise.all([
          fetch(`${API_BASE}/checkout/`),
          fetch(`${API_BASE}/details/`),
        ]);
        const carData: CarDetails[] = await carRes.json();
        const bookingData: BookingDetails[] = await bookingRes.json();
        setCarDetails(carData[0]);
        setBookingDetails(bookingData[0]);
      } catch (err) {
        console.error("Failed to load checkout details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const bookingFeeNum = carDetails ? parseAmount(carDetails.bookingFee) : 0;
  const totalPayable = bookingFeeNum + REFUNDABLE_DEPOSIT - discountAmt;

  // Apply promo code
  const applyPromo = useCallback(() => {
    const code = promoCode.trim().toUpperCase();
    if (!carDetails) return;

    if (code in PROMO_CODES) {
      const pct = PROMO_CODES[code];
      const discount = Math.ceil((bookingFeeNum * pct) / 100);
      setDiscountAmt(discount);
      setDiscountMsg(`✅ Discount Applied: ₹${formatAmount(discount)}`);
    } else {
      setDiscountAmt(0);
      setDiscountMsg("❌ Invalid promo code");
    }
    setPromoCode("");
  }, [promoCode, carDetails, bookingFeeNum]);

  const handlePromoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") applyPromo();
  };

  // Strip excessKM prefix text (e.g. "Excess Rs.12/ km" → "12/ km")
  const excessKmDisplay = carDetails
    ? carDetails.excessKM.replace(/^Excess\s*/i, "")
    : "";

  if (loading) {
    return (
      <div className="checkout-loading">
        <div className="spinner" />
        <p>Loading checkout…</p>
      </div>
    );
  }

  if (!carDetails || !bookingDetails) {
    return (
      <div className="checkout-error">
        <p>Unable to load booking details. Please go back and try again.</p>
        <button onClick={() => navigate("/browse")}>Back to Browse</button>
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
          <div className="step-label">Profile</div>
        </div>
      </div>

      <div className="checkout-content">
        {/* Left panel – cost breakdown */}
        <div className="checkout-panel">
          <h1 className="checkout-title">CHECKOUT</h1>
          <hr />

          {/* Booking fee */}
          <div className="fee-row">
            <div>
              <h3>Booking Fee</h3>
              <p className="fee-sub">Booking fee excludes fuel cost</p>
            </div>
            <div className="fee-amount">
              <span>₹</span>
              <span>{formatAmount(bookingFeeNum)}</span>
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

          <div className="view-offers">
            <a href="#offers">View More Offers</a>
          </div>
          <hr />

          {/* Refundable deposit */}
          <div className="fee-row">
            <div>
              <h3>Refundable Deposit</h3>
              <label className="deposit-checkbox">
                <input type="checkbox" /> Pay Now
              </label>
            </div>
            <div className="fee-amount">
              <span>₹</span>
              <span>{formatAmount(REFUNDABLE_DEPOSIT)}</span>
            </div>
          </div>
          <hr />

          {/* Total payable */}
          <div className="total-row">
            <p>Total Payable Amount</p>
            <div className="total-amount">
              <span>₹</span>
              <span>{formatAmount(totalPayable)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <div className="checkout-btn-wrap">
            <button
              className="checkout-btn"
              onClick={() => {
                localStorage.setItem("CheckoutPaymentTotal", String(totalPayable));
                navigate("/payment");
              }}
            >
              CHECKOUT
            </button>
          </div>
        </div>

        {/* Right panel – booking summary */}
        <div className="summary-panel">
          <p className="summary-heading">SUMMARY</p>
          <img
            src={carDetails.image}
            alt={carDetails.name}
            className="summary-car-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <p className="summary-car-name">{carDetails.name}</p>
          <p className="summary-car-seat">( {carDetails.seater} )</p>
          <hr />

          {/* Pickup / Drop times */}
          <div className="summary-times">
            <div className="time-col">
              <h2 className="time-val">{bookingDetails.starttime}</h2>
              <hr className="time-hr" />
              <p className="time-date">
                {bookingDetails.startdate} {bookingDetails.startmonth}
              </p>
            </div>
            <div className="time-to">TO</div>
            <div className="time-col">
              <h2 className="time-val">{bookingDetails.endtime}</h2>
              <hr className="time-hr" />
              <p className="time-date">
                {bookingDetails.enddate} {bookingDetails.endmonth}
              </p>
            </div>
          </div>

          {/* Free / Excess KMs */}
          <div className="km-info">
            <div className="km-labels">
              <p>Free Km</p>
              <p>Excess Km</p>
            </div>
            <div className="km-values">
              <p>{carDetails.freeDistance} kms</p>
              <p>{excessKmDisplay}</p>
            </div>
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
