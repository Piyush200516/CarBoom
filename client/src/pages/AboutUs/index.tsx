// src/pages/AboutUs/index.tsx
import * as React from "react";
import { Compass, Target, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { mockTeam } from "../../data/mockData";

export const AboutUs = () => {
  const stats = [
    { label: "Happy Customers", value: "25,000+" },
    { label: "Vehicles Listed", value: "1,200+" },
    { label: "Verified Owners", value: "850+" },
    { label: "Cities Covered", value: "18+" },
  ];

  const values = [
    {
      title: "Trust & Transparency",
      description: "No hidden charges, honest user reviews, and 100% verified documentation.",
      icon: Target,
    },
    {
      title: "Safety First",
      description: "Integrated vehicle tracking, strict speed limits, and 24/7 roadside assistance support.",
      icon: Heart,
    },
    {
      title: "Accessibility & Innovation",
      description: "Enabling luxury and utility vehicles to reach users in Tier-2 and Tier-3 cities in India.",
      icon: Compass,
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "CarBoom is Born",
      description: "Started with a small fleet of 20 cars in Jaipur, pioneering P2P sharing in Rajasthan.",
    },
    {
      year: "2025",
      title: "Expansion to 10 Cities",
      description: "Reached 500+ listed vehicles including bikes and scooters. Launched our digital document check.",
    },
    {
      year: "2026",
      title: "Over 25,000 Customers",
      description: "Fully live across 18+ cities in India. Introduced luxury categories and instant payout accounts.",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-full">
              Our Journey &amp; Mission
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Revolutionizing Mobility in <span className="text-yellow-500">Tier-2 &amp; Tier-3</span> India
            </h1>
            <p className="text-gray-600 font-semibold text-base leading-relaxed">
              CarBoom is a peer-to-peer vehicle rental marketplace built to bring affordable, flexible, and premium mobility to India's upcoming towns and cities.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-600 font-bold text-sm">
                  <Target size={18} /> Our Mission
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  To empower vehicle owners with passive income and provide renters with instant access to clean, reliable vehicles.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-yellow-600 font-bold text-sm">
                  <Eye size={18} /> Our Vision
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">
                  To become India's largest and most trusted peer-to-peer transport network, connecting communities and sharing assets.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[28px] overflow-hidden shadow-2xl h-96">
            <img
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800"
              alt="CarBoom Team Office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white text-xs font-bold uppercase tracking-wider">
              CarBoom Team HQ • Bangalore, India
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-gray-900 text-white py-16 border-y border-white/5 relative overflow-hidden mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-black text-yellow-400">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
            What Drives Us
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <Card key={idx} className="bg-gray-50 border-gray-100 p-8 rounded-[24px] text-left">
                <div className="w-10 h-10 rounded-[14px] bg-yellow-400/15 flex items-center justify-center text-yellow-600 mb-6">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                  {v.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="bg-gray-50 py-20 border-y border-gray-100 mb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
              The Adventure
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Our Journey</h2>
          </div>

          <div className="relative border-l border-gray-200 ml-4 md:ml-32 pl-8 space-y-12 text-left">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative">
                {/* Year tag for larger screens */}
                <div className="hidden md:block absolute -left-40 top-0 text-right w-28">
                  <span className="text-lg font-black text-yellow-600">{m.year}</span>
                </div>
                {/* Dot */}
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-yellow-400 border-4 border-white shadow-sm" />
                
                <div>
                  <span className="inline-block md:hidden text-xs font-black text-yellow-600 uppercase tracking-widest mb-1">
                    {m.year}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{m.title}</h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-500">
            Meet the Founders
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTeam.map((t, idx) => (
            <Card key={idx} className="bg-white border border-gray-100 rounded-[24px] p-6 text-center hover:border-yellow-400/50 transition-all flex flex-col items-center">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400/10 mb-4"
              />
              <h3 className="font-bold text-gray-900 text-base">{t.name}</h3>
              <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider mt-0.5">{t.role}</div>
              <p className="text-gray-500 text-xs font-semibold leading-relaxed mt-4">
                {t.bio}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA bottom banner */}
      <section className="max-w-5xl mx-auto px-6">
        <Card className="bg-yellow-400 p-8 md:p-12 rounded-[32px] text-center shadow-lg">
          <h2 className="text-3xl font-black text-black tracking-tight mb-4">
            Be a Part of Our Growing Community
          </h2>
          <p className="text-black/85 max-w-xl mx-auto text-sm font-semibold mb-8">
            Whether you want to earn money from your vehicle or rent one to cruise around, we have plans for everyone. Registration takes less than two minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/browse">
              <Button variant="dark" className="font-extrabold uppercase tracking-wider text-xs">
                Browse Vehicles
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="font-extrabold uppercase tracking-wider text-xs border-black/20 text-black hover:bg-black/5 hover:text-black">
                Join CarBoom
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default AboutUs;
