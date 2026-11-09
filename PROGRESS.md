# 🚗 CarBoom - Project Implementation Progress & Roadmap

Based on `REQUIREMENTS.md` (Functional & Non-Functional Requirements).

---

## 🧭 Master Phase Plan

| Phase | Module | Status | Summary |
|---|---|:---:|---|
| **Phase 1** | **Foundational Fixes, Test Harness, User Management & Notifications Setup** | **COMPLETED** ✅ | Express 5 TS fixes, test runner, Phone OTP, Social OAuth, Driving License (KYC) upload, Nodemailer & SMS mock service. |
| **Phase 2** | **Car Search & Listing (Real Backend Connection)** | **IN PROGRESS / NEXT** ⏳ | Connect `BrowseVehicles` and `VehicleDetails` to real backend API (search, filters, sorting, availability calendar). |
| **Phase 3** | **Booking System Module** | **PENDING** ⏳ | Pickup/drop locations, Extend & Modify booking APIs, connect `MyBookings` to real API, double-booking validation. |
| **Phase 4** | **Payment, Invoices & Promo Codes** | **PENDING** ⏳ | Dynamic coupon validation API, security deposit release workflow, PDF/HTML invoice generation. |
| **Phase 5** | **Trip Management Module** | **PENDING** ⏳ | Pre-trip/post-trip checklist (odometer, condition photos), km tracking, late return penalties, live tracker. |
| **Phase 6** | **Host Module (Owner)** | **PENDING** ⏳ | Frontend Car Listing Form (RC/PUC upload), Host Availability Calendar, Host Dashboard with Accept/Reject requests. |
| **Phase 7** | **Admin Panel** | **PENDING** ⏳ | Admin dashboard (`/admin`), vehicle approval/rejection, user & host KYC verification, refund management, platform analytics. |
| **Phase 8** | **Reviews, Notifications & Support** | **PENDING** ⏳ | Interactive post-trip reviews, real reviews on detail page, contact API submission, damage/accident claims. |
| **Phase 9** | **Non-Functional Hardening & Verification** | **PENDING** ⏳ | Security audit, RBAC enforcement, Vite code-splitting, error handling, full automated regression tests. |

---

## 📋 Detailed Functional Requirements Checklist

### 1. User Management
- [x] Email & Password User Registration (`/api/v1/auth/register`)
- [x] User Login with JWT Access + Refresh Token rotation (`/api/v1/auth/login`)
- [x] User Logout & Token Invalidation (`/api/v1/auth/logout`)
- [x] User Profile View (`/api/v1/users/profile`)
- [x] User Profile Edit & Avatar Upload (`/api/v1/users/profile`, `/api/v1/users/profile/photo`)
- [x] Phone OTP Login & Verification (`/api/v1/auth/phone-otp/send`, `/api/v1/auth/phone-otp/verify`)
- [x] Google & GitHub OAuth backend callback & token exchange (`/api/v1/auth/oauth`, `/auth/google`, `/auth/github`)
- [x] Customer Driving License / KYC Document Upload & Status (`/api/v1/users/kyc`, `ProfilePage.tsx` DL upload section)
- [x] Frontend Login page with interactive Email / Phone OTP tabs & Social buttons
- [x] Basic RBAC enum (`RENTER`, `OWNER`, `ADMIN`)

### 2. Car Search & Listing
- [x] Vehicle browsing endpoint with filters (`GET /api/v1/vehicles`)
- [x] Vehicle details endpoint with specs and images (`GET /api/v1/vehicles/:id`)
- [ ] Connect `BrowseVehicles` frontend page to real backend API (replace mock data)
- [ ] Connect `VehicleDetails` frontend page to real backend API (replace mock data)
- [ ] Real-time date/time availability overlap checking
- [ ] Dynamic vehicle availability calendar on detail page
- [ ] Brand filtering & Distance-based proximity sorting

### 3. Booking System
- [x] Hourly, daily, and weekly duration pricing calculation (`/api/v1/bookings/calculate`)
- [x] Double booking prevention (overlapping dates check)
- [x] Create booking endpoint with coupon discount and security deposit (`POST /api/v1/bookings`)
- [x] User bookings listing (`GET /api/v1/bookings/my`)
- [x] Owner bookings listing (`GET /api/v1/bookings/owner`)
- [x] Booking cancellation with tiered refund calculation (`POST /api/v1/bookings/:id/cancel`)
- [ ] Pickup / Drop location selection & delivery option stored with booking
- [ ] Booking extension endpoint & UI (`POST /api/v1/bookings/:id/extend`)
- [ ] Booking modification endpoint & UI (`PATCH /api/v1/bookings/:id/modify`)
- [ ] Connect frontend `MyBookings` to real API (replace `mockBookings`)
- [ ] Full lifecycle transition: Pending → Confirmed → Ongoing (Trip Started) → Completed → Cancelled

### 4. Payment & Invoices
- [x] Mock Razorpay order creation (`POST /api/v1/payments/create-order`)
- [x] Payment verification with HMAC-SHA256 signature check (`POST /api/v1/payments/verify`)
- [x] Real-time Socket.IO notification on payment confirmation
- [x] Refund processing API (`POST /api/v1/payments/refund`)
- [x] Price breakdown: Base fare, CGST (9%), SGST (9%), Refundable security deposit
- [ ] Automated security deposit refund/release upon successful trip completion
- [ ] Km limit display & extra km charge calculation
- [ ] Printable / Downloadable Invoice generation (PDF / HTML invoice modal)
- [ ] Dynamic backend coupon validation API & frontend Checkout hookup

### 5. Trip Management
- [ ] Pre-trip inspection checklist (odometer reading, fuel gauge, photo uploads of vehicle condition)
- [ ] Post-trip return inspection checklist (end odometer, scratches/damage check)
- [ ] Automatic calculation of extra km fee & late return penalties
- [ ] Live trip tracking view (route map simulation & trip countdown)

### 6. Host Module (Owner)
- [x] Backend vehicle creation & management (`POST`, `PUT`, `DELETE /api/v1/vehicles`)
- [x] Vehicle images and documents (RC, Insurance, PUC) upload endpoints
- [x] Host earnings analytics backend (`GET /api/v1/bookings/owner/analytics`)
- [x] Host accept / reject booking endpoint (`PATCH /api/v1/bookings/:id/status`)
- [ ] Frontend Car Listing Form for Hosts (Specs, Pricing, Photo & Document upload)
- [ ] Host Availability Calendar Management (block/unblock dates)
- [ ] Host Dashboard UI (Active listings, Incoming booking requests with Accept/Reject, Earnings chart)
- [ ] Host Payout request flow

### 7. Reviews and Ratings
- [x] Vehicle review creation (`POST /api/v1/reviews`)
- [x] Fetch reviews for a vehicle (`GET /api/v1/reviews/vehicle/:vehicleId`)
- [x] Delete review (`DELETE /api/v1/reviews/:id`)
- [ ] Frontend "Leave Review" modal in `MyBookings` after trip completion
- [ ] Show real reviews dynamically on `VehicleDetails`
- [ ] Host rating & review system (renter rates host, host rates renter)

### 8. Notifications
- [x] Socket.IO server & client real-time notification engine
- [x] In-app notification bell with unread badge and dropdown list
- [x] Mark notification as read / mark all as read
- [x] Transactional Email service (Nodemailer template generator in `email.service.ts`)
- [x] SMS / OTP notification engine (`sms.service.ts` with mock provider & `.env` configuration)
- [ ] Real-time trip reminders & return alerts

### 9. Admin Panel
- [ ] Admin authentication guard & layout (`/admin`)
- [ ] Admin Vehicle Approval / Rejection dashboard (view pending vehicles, RC, Insurance, PUC)
- [ ] Admin Host / User KYC verification management
- [ ] Admin Bookings & Payment/Refund management
- [ ] Admin Platform Analytics & Reports (Revenue, active trips, user growth)
- [ ] Admin Coupon management (create, expire, view usage)
- [ ] Admin Dispute / Contact message review

### 10. Support
- [ ] Support contact form submission connected to backend (`POST /api/v1/support/contact`)
- [ ] Help Center ticket/query tracking
- [ ] Damage / Accident claim reporting form with photo upload

---

## 🔒 Non-Functional Requirements Checklist

- [x] JWT Authentication with HttpOnly Cookies & Bearer tokens
- [x] Password hashing with bcrypt
- [x] Security headers with Helmet & CORS
- [x] Rate limiting (`express-rate-limit`) on auth & API endpoints
- [x] Express 5 TypeScript compile errors fixed across all controllers
- [x] Server automated test suite configured (`npm test`) with 5/5 passing tests
- [ ] Frontend performance: Vite code-splitting and dynamic chunking
- [ ] Mobile-first responsive UI validation across all new and updated pages
- [ ] Audit logging for administrative actions and financial transactions
- [ ] Graceful error handling & standard API error responses across all routes
