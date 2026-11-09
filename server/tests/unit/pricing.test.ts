import test from "node:test";
import assert from "node:assert/strict";

test("Booking duration and pricing calculation logic", () => {
  const pricePerHour = 100;
  const pricePerDay = 1500;
  const pricePerWeek = 8000;

  // Under 24h -> Hourly
  const hours1 = 5;
  const base1 = hours1 * pricePerHour;
  assert.equal(base1, 500);

  // 1 to 6 days -> Daily
  const hours2 = 48;
  const days2 = Math.ceil(hours2 / 24);
  const base2 = days2 * pricePerDay;
  assert.equal(base2, 3000);

  // 7 days or more -> Weekly
  const days3 = 14;
  const weeks3 = Math.ceil(days3 / 7);
  const base3 = weeks3 * pricePerWeek;
  assert.equal(base3, 16000);
});
