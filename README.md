# CarBoom

**CarBoom** is a modern peer-to-peer vehicle rental marketplace that enables users to rent and list **Cars, Bikes, Scooters etc** for durations ranging from **1 hour to 1 month**. Designed specifically for **Tier-2 and Tier-3 cities in India**, CarBoom aims to make vehicle rentals simple, affordable, and accessible.
---
## 🚀 CarBoom's Unique Selling Proposition (USP)

CarBoom is a next-generation peer-to-peer vehicle rental marketplace that enables users to book vehicles in two flexible ways:

- 🚗 **Self Drive** – Rent and drive the vehicle yourself.
- 👨‍✈️ **With Driver** – Book the same vehicle with a verified driver.

Unlike traditional ride-hailing platforms, CarBoom allows vehicle owners to list their cars, bikes, scooters, and EVs, manage bookings, set rental prices, and earn passive income through a secure rental ecosystem.

### ✨ Key Highlights

- 🚗 Self Drive & With Driver Booking
- 👥 Peer-to-Peer Vehicle Rental Marketplace
- 🤖 AI-Powered Vehicle Recommendations
- 📍 Ola Maps Integration for Pickup & Drop Locations
- 🔐 JWT Authentication & Role-Based Access Control
- 💳 Secure Online Payments
- ⭐ Ratings & Reviews
- ❤️ Wishlist & Favorites
- 📅 Real-Time Booking & Availability
- 📊 Owner Dashboard with Revenue Analytics
- 🎟️ Coupons & Discount System
- 🔔 Real-Time Notifications
- 📱 Fully Responsive & Modern UI

### Why CarBoom?

- 🚗 Self Drive & With Driver Booking
- 👥 Peer-to-Peer Vehicle Rental Marketplace
- 🚙 Cars, Bikes, Scooters & EV Rentals
- 🤖 AI-Based Vehicle Recommendations
- 📍 Ola Maps Integration for Pickup & Drop Locations
- 📅 Real-Time Availability & Booking
- 💳 Secure Online Payments
- 🔐 JWT Authentication & Role-Based Access Control
- ❤️ Wishlist & Favorites
- ⭐ Ratings & Reviews
- 📊 Owner Dashboard & Revenue Analytics
- 🎟️ Coupons & Offers
- 🔔 Real-Time Notifications
- 📱 Responsive & Modern UI
- 🌍 Scalable Microservice-Ready Architecture

### 🎯 Vision

To build India's most trusted and intelligent vehicle rental platform where users can easily rent vehicles with or without a driver, while vehicle owners earn by sharing their vehicles securely.

---

## ✨ Features

### 🧑‍🤝‍🧑 Renter
- Search vehicles by location
- Filter by vehicle type, price, fuel, and transmission
- Book vehicles from 1 hour to 1 week
- View vehicle details
- Wishlist vehicles
- Secure online payments
- Booking history
- User profile management

### 🚗 Owner
- List vehicles for rent
- Manage vehicle availability
- Accept or reject booking requests
- Track earnings
- Booking management
- Vehicle management dashboard

### 🛠️ Admin
- Dashboard
- User Management
- Owner Verification
- Vehicle Approval
- Booking Management
- Reports & Analytics

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Hook Form
- Zod
- Lucide React
- Shadcn UI

### Backend *(Coming Soon)*
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary
- Razorpay
- Socket.io

---

## 📁 Project Structure

```text
CarBoom/
├─ client/
│   ├─ src/
│   ├─ public/
│   └─ package.json
├─ server/
│   ├─ src/
│   ├─ prisma/
│   └─ package.json
└─ README.md
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CarBoom.git
cd CarBoom
```

---

## 🌐 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🖥️ Backend Setup *(Coming Soon)*

```bash
cd server
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

## 📸 Screenshots

> Screenshots will be added after the UI is completed.

---

## 📅 Roadmap

- [x] Project Setup
- [x] Frontend Structure
- [ ] Home Page
- [ ] Browse Vehicles
- [ ] Vehicle Details
- [ ] Authentication
- [ ] Owner Dashboard
- [ ] Renter Dashboard
- [ ] Admin Panel
- [ ] Booking System
- [ ] Payment Integration
- [ ] Google Maps Integration
- [ ] Notifications
- [ ] Chat System
- [ ] Deployment
- [ ] Mobile Application

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push the branch

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Piyush Mishra**

- GitHub: https://github.com/YOUR_USERNAME
- LinkedIn: https://linkedin.com/in/YOUR_PROFILE

---

## 🙌 Support

If you like this project, don't forget to **Star ⭐ the repository**.

---

## 🔮 Future Scope

- AI-based Vehicle Recommendation
- Dynamic Pricing
- Live Vehicle Tracking
- Insurance Integration
- EV Charging Station Finder
- Voice Search
- Multi-language Support
- Android & iOS Applications
- Referral & Rewards Program

---

## 🎯 Vision

Our vision is to become India's most trusted vehicle rental marketplace for Tier-2 and Tier-3 cities by empowering local vehicle owners and providing affordable mobility solutions.

---

## 🏗️ Jenkins CI Setup

**Purpose**: Validate every push to `main` by running a full CI pipeline without deploying the application.

### Required Jenkins Plugins
- **Pipeline**
- **Git**
- **Credentials Binding**
- **NodeJS** (optional, for automatic Node installation)
- **Docker** (optional, if you run builds inside Docker agents)

### Credentials to Create (Jenkins → Credentials → System → Global)
| ID | Type | Description |
|----|------|-------------|
| `neon-db-url` | Secret text | Neon PostgreSQL connection string (e.g., `postgresql://username:password@host:5432/dbname`)
| `jwt-secret`   | Secret text | JWT signing secret used by the backend
| *(Add any other secrets needed for your project)* |

### GitHub Webhook Configuration
1. In your GitHub repository go to **Settings → Webhooks → Add webhook**.
2. **Payload URL**: `http://<JENKINS_HOST>/github-webhook/`
3. **Content type**: `application/json`
4. **Secret**: *(optional, set a secret and add the same value to Jenkins under *GitHub Plugin* → *Advanced* → *Secret*).
5. **Which events would you like to trigger this webhook?** – Choose **Just the push event**.
6. Save webhook.

### Jenkins Job Setup
1. Create a **New Item** → **Pipeline** → name it `CarBoom CI`.
2. In **Pipeline** section set **Definition** to **Pipeline script from SCM**.
   - **SCM**: Git
   - **Repository URL**: `https://github.com/Piyush200516/CarBoom.git`
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile`
3. Under **Build Triggers** enable **GitHub hook trigger for GITScm polling**.
4. (Optional) Set **Agent** label if you have specific build agents, e.g., `nodejs`.
5. Save.

### Pipeline Stages Overview (defined in `Jenkinsfile`)
1. **Clone Repository** – Checks out the `main` branch.
2. **Install Dependencies** – Runs `npm ci` for both frontend (`client`) and backend (`server`).
3. **Prisma Generate** – Executes `npx prisma generate` to generate the Prisma client.
4. **Lint** – Runs linting for both parts.
5. **Test** – Executes tests if a `test` script exists; otherwise skips.
6. **Build Frontend** – Produces a production build using Vite (`npm run build`).
7. **Build Backend** – Compiles TypeScript to JavaScript (`npm run build`).
8. **Verify Build Success** – Simple sanity checks for generated `dist` directories.

Artifacts from the builds are archived for later reference.

### Running the Pipeline
- Push a commit to `main` → Jenkins automatically triggers the pipeline.
- You can also **Build Now** from the Jenkins UI to run it manually.

### Next Steps
- Extend the pipeline to deploy to a staging environment.
- Add security scanning or code coverage steps as needed.

---

*Feel free to modify the Jenkinsfile or credentials IDs to match your environment.*