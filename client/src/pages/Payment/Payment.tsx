import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

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
}

type PaymentTab = "card" | "cod" | "netbanking";

const Payment: React.FC = () => {
  const navigate = useNavigate();

  const [carDetails, setCarDetails] = useState<CarDetails | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PaymentTab>("card");

  // Card form state
  const [cardNum, setCardNum] = useState("");
  const [mm, setMm] = useState("");
  const [exYear, setExYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardErrors, setCardErrors] = useState<string[]>([]);
  const [paying, setPaying] = useState(false);
  // Generate a stable booking ID once on mount (not on every render)
  const [bookingId] = useState(() =>
    Math.random().toString(36).substr(2, 9).toUpperCase()
  );

  // Retrieve total from localStorage (set by Checkout page)
  const totalPayable = Number(localStorage.getItem("CheckoutPaymentTotal") ?? 0);

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
        console.error("Failed to load payment details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Validate card fields
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

  const handlePayment = async () => {
    if (activeTab === "card" && !validateCard()) return;
    if (activeTab === "cod") {
      // COD — just navigate to confirmation
      navigate("/booking-confirmation");
      return;
    }

    setPaying(true);
    // Simulate a payment network call (replace with real gateway integration)
    await new Promise((res) => setTimeout(res, 1500));
    setPaying(false);
    navigate("/booking-confirmation");
  };

  const excessKmDisplay = carDetails
    ? carDetails.excessKM.replace(/^Excess\s*/i, "")
    : "";

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
        {["Login/Signup", "Checkout", "Payment", "Profile"].map((label, i) => (
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
                <span id="bk_id">
                  {bookingId}
                </span>
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

        {/* Right – Summary */}
        {carDetails && bookingDetails && (
          <div className="pay-summary-panel">
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
        )}
      </div>
    </div>
  );
};

export default Payment;
