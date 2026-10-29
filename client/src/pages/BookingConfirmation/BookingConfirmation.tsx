import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

const MESSAGES = [
  "Your Booking has been confirmed. Thanks for choosing CarBoom!",
  "Have a Safe, Great Ride! 🚗",
];

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    document.title = "Booking Confirmed | CarBoom";

    // Alternate message every 2.5 seconds (matches original JS)
    const textTimer = setInterval(() => {
      setMsgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 2500);

    // Navigate back to home after ~5 seconds
    const navTimer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(textTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        {/* Animated confetti dots */}
        <div className="confetti-container" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="confetti-dot" style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>

        <div className="confirmation-check">✓</div>

        <h1 className={`confirmation-msg ${msgIndex === 1 ? "alt" : ""}`}>
          {MESSAGES[msgIndex]}
        </h1>

        <img
          src="https://cdn.dribbble.com/users/2374064/screenshots/4732016/car-jump.gif"
          alt="Celebrating car"
          className="confirmation-gif"
        />

        <p className="redirect-hint">Redirecting you to the home page in a few seconds…</p>

        <button className="confirmation-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
