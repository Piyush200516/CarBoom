import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Payment.css";
import paymentService from "../../services/paymentService";
import { useSocket } from "../../store/SocketContext";
import { toast } from "../../components/ui/Toast";

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

type PaymentTab = "card" | "cod" | "netbanking";

// ─── Component ────────────────────────────────────────────────────────────────

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Load booking intent
  const [intent, setIntent] = useState<BookingIntent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PaymentTab>("card");

  // Card form state
  const [cardNum, setCardNum] = useState("");
  const [mm, setMm] = useState("");
  const [exYear, setExYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardErrors, setCardErrors] = useState<string[]>([]);
  const [paying, setPaying] = useState(false);

  // Stable display booking ID
  const [bookingId] = useState(() =>
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  // Total from localStorage (set by Checkout)
  const totalPayable = Number(localStorage.getItem("CheckoutPaymentTotal") ?? 0);

  // Real booking ID from URL params or localStorage
  const realBookingId = searchParams.get("bookingId") ?? localStorage.getItem("currentBookingId");

  // ── Load intent ─────────────────────────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem("bookingIntent");
    if (raw) {
      try {
        setIntent(JSON.parse(raw) as BookingIntent);
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  // ── 🔌 Real-time payment confirmation ────────────────────────────────────
  const { onPaymentConfirmed } = useSocket();
  useEffect(() => {
    const unsub = onPaymentConfirmed((payload) => {
      toast.success(
        "💳 Payment Confirmed!",
        `₹${payload.amount.toLocaleString("en-IN")} paid for ${payload.vehicleName}`
      );
      setTimeout(() => navigate("/booking-confirmation"), 1200);
    });
    return unsub;
  }, [onPaymentConfirmed, navigate]);

  // ── Card validation ──────────────────────────────────────────────────────
  const validateCard = useCallback((): boolean => {
    const errors: string[] = [];
    if (cardNum.replace(/\s/g, "").length !== 16)
      errors.push("Card number must be 16 digits.");
    if (!/^(0[1-9]|1[0-2])$/.test(mm)) errors.push("Month must be 01–12.");
    if (!/^\d{4}$/.test(exYear) || Number(exYear) < new Date().getFullYear())
      errors.push("Enter a valid 4-digit expiry year.");
    if (!/^\d{3}$/.test(cvv)) errors.push("CVV must be 3 digits.");
    setCardErrors(errors);
    return errors.length === 0;
  }, [cardNum, mm, exYear, cvv]);

  // ── Payment handler ──────────────────────────────────────────────────────
  const handlePayment = async () => {
    if (activeTab === "card" && !validateCard()) return;
    if (activeTab === "cod") {
      navigate("/booking-confirmation");
      return;
    }

    setPaying(true);
    try {
      if (realBookingId) {
        const order = await paymentService.createOrder({
          bookingId: realBookingId,
          amount: totalPayable,
          method: "RAZORPAY",
        });
        await paymentService.verifyPayment({
          bookingId: realBookingId,
          razorpayOrderId: order.orderId,
          razorpayPaymentId: `pay_mock_${Date.now()}`,
          razorpaySignature: "mock_signature",
        });
        toast.success("Payment successful! Redirecting...");
        setTimeout(() => navigate("/booking-confirmation"), 1500);
      } else {
        // Demo/fallback: simulate
        await new Promise((res) => setTimeout(res, 1500));
        navigate("/booking-confirmation");
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Payment failed. Please try again.";
      toast.error("Payment Error", msg);
    } finally {
      setPaying(false);
    }
  };

  const formatDate = (iso: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="payment-loading">
        <div className="pay-spinner" />
        <p>Loading payment details…</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      {/* Progress stepper */}
      <div className="pay-stepper">
        {["Login/Signup", "Checkout", "Payment", "Confirmed"].map((label, i) => (
          <React.Fragment key={label}>
            <div className="pay-step">
              <div className={`pay-circle ${i < 3 ? "done" : ""}`}>{i + 1}</div>
              <div className="pay-label">{label}</div>
            </div>
            {i < 3 && <div className={`pay-line ${i < 2 ? "done-line" : ""}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="payment-content">
        {/* Left – Payment form */}
        <div className="payment-panel">
          {/* Total payable banner */}
          <div className="payable-banner">
            <h2>Total Payable Amount</h2>
            <div className="payable-amount">
              <span>₹ </span>
              <span>{totalPayable.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Booking ID */}
          <div className="payment-methods-box">
            <div className="pm-header">
              <h2>Payment Methods</h2>
              <div className="booking-id">
                Booking ID:{" "}
                <span id="bk_id">{bookingId}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="pm-tabs">
              {(["card", "cod", "netbanking"] as PaymentTab[]).map((tab) => (
                <button
                  key={tab}
                  className={`pm-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "card"
                    ? "Card Payment"
                    : tab === "cod"
                    ? "Cash On Delivery"
                    : "Netbanking"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="pm-tab-content">
              {activeTab === "card" && (
                <div className="card-form">
                  <input
                    id="cardNum"
                    className="card-input"
                    type="text"
                    maxLength={16}
                    placeholder="ENTER CARD NUMBER"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value.replace(/\D/g, ""))}
                  />
                  <div className="card-row">
                    <input
                      id="m_m"
                      className="card-input-sm"
                      maxLength={2}
                      placeholder="MM"
                      value={mm}
                      onChange={(e) => setMm(e.target.value.replace(/\D/g, ""))}
                    />
                    <input
                      id="exyear"
                      className="card-input-lg"
                      maxLength={4}
                      placeholder="YYYY"
                      value={exYear}
                      onChange={(e) => setExYear(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  <div className="card-row">
                    <input
                      id="cvV"
                      className="card-input-sm"
                      maxLength={3}
                      placeholder="CVV"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                  {cardErrors.length > 0 && (
                    <ul className="card-errors">
                      {cardErrors.map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeTab === "cod" && (
                <div className="cod-info">
                  <p>💵 Pay cash to the driver at the time of pick-up.</p>
                </div>
              )}

              {activeTab === "netbanking" && (
                <div className="netbanking-info">
                  <p>🏦 Netbanking integration coming soon. Please use Card or COD.</p>
                </div>
              )}

              <button
                id="pay_btn_main"
                className="pay-now-btn"
                onClick={handlePayment}
                disabled={paying}
              >
                {paying ? "Processing…" : `Pay ₹ ${totalPayable.toLocaleString("en-IN")}`}
              </button>
            </div>
          </div>
        </div>

        {/* Right – Booking Summary */}
        {intent && (
          <div className="pay-summary-panel">
            <p className="summary-heading">SUMMARY</p>
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
            <div className="pay-summary-loc">
              <span>📍</span>
              <span>{intent.pickupLoc}</span>
            </div>
            <hr />
            <div className="fare-inclusions">
              <p>✅ Fuel included &nbsp; ✅ Insurance included &nbsp; ✅ 24/7 Support</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
