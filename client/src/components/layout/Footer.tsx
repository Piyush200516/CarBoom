// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useToast } from "../ui/Toast";
import { useAuth } from "../../store/AuthContext";

const Footer = () => {
    const { toast } = useToast();
    const { isAuthenticated } = useAuth();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        toast("Subscription Successful", {
            description: "Thank you for subscribing to the CarBoom newsletter!",
            type: "success"
        });
    };

    return (
        <footer id="footer" className="bg-[#0b0f19] border-t border-white/5 text-gray-400 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col gap-4 text-left">
                        <Link to="/" className="flex flex-col select-none group w-fit">
                            <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                                Car<span className="text-yellow-400 group-hover:text-yellow-300 transition">Boom</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mt-[-3px]">
                                Rent. Ride. Earn.
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 pr-4 mt-2">
                            CarBoom is your trusted platform to rent vehicles or list your vehicle and earn easily. We are powering mobility across Tier-2 and Tier-3 cities in India.
                        </p>
                        
                        {/* Social Media Links */}
                        <div className="flex items-center gap-3 mt-4">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black flex items-center justify-center text-white transition duration-300 cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black flex items-center justify-center text-white transition duration-300 cursor-pointer"
                            >
                                <svg className="w-4 h-4" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black flex items-center justify-center text-white transition duration-300 cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="w-9 h-9 rounded-full bg-white/5 hover:bg-yellow-400 hover:text-black flex items-center justify-center text-white transition duration-300 cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1: Company */}
                    <div className="lg:col-span-2 flex flex-col gap-4 text-left">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            <li><Link to="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-yellow-400 transition">How It Works</Link></li>
                            <li><Link to="/become-owner" className="hover:text-yellow-400 transition">Become an Owner</Link></li>
                            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2: Support */}
                    <div className="lg:col-span-2 flex flex-col gap-4 text-left">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support</h4>
                        <ul className="flex flex-col gap-2.5 text-sm text-left">
                            <li><Link to="/help" className="hover:text-yellow-400 transition">Help Center</Link></li>
                            <li><Link to="/safety" className="hover:text-yellow-400 transition">Safety</Link></li>
                            <li><Link to="/cancel" className="hover:text-yellow-400 transition">Cancellation Policy</Link></li>
                            <li><Link to="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-yellow-400 transition">Terms &amp; Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3: Quick Links — auth-aware */}
                    <div className="lg:col-span-2 flex flex-col gap-4 text-left">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            <li><Link to="/browse" className="hover:text-yellow-400 transition">Browse Vehicles</Link></li>
                            {isAuthenticated ? (
                                <>
                                    <li><Link to="/my-bookings" className="hover:text-yellow-400 transition">My Bookings</Link></li>
                                    <li><Link to="/wishlist" className="hover:text-yellow-400 transition">Wishlist</Link></li>
                                    <li><Link to="/become-owner" className="hover:text-yellow-400 transition">Become Owner</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/signup" className="hover:text-yellow-400 transition">Sign Up</Link></li>
                                    <li><Link to="/login" className="hover:text-yellow-400 transition">Log In</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Newsletter Column — shown only when NOT logged in */}
                    {!isAuthenticated && (
                        <div className="lg:col-span-2 flex flex-col gap-4 text-left">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Subscribe</h4>
                            <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                                Get the latest updates and offers straight to your inbox.
                            </p>
                            <form onSubmit={handleSubscribe} className="relative mt-2">
                                <input 
                                    type="email" 
                                    required
                                    placeholder="Enter your email" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-xs text-white focus:outline-none focus:border-yellow-400 transition"
                                />
                                <button 
                                    type="submit" 
                                    className="absolute right-1 top-1 bg-yellow-400 hover:bg-yellow-300 text-black w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer"
                                >
                                    <ArrowRight size={14} />
                                </button>
                            </form>
                        </div>
                    )}

                </div>

                <hr className="border-white/5 my-8" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} CarBoom. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="hover:text-gray-300 transition">Privacy</Link>
                        <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
