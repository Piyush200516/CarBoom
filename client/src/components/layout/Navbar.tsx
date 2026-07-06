// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [language, setLanguage] = useState("EN");
    
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Browse Vehicles", path: "/browse" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Become an Owner", path: "/become-owner" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const languages = [
        { code: "EN", name: "English" },
        { code: "HI", name: "Hindi" },
        { code: "TE", name: "Telugu" },
        { code: "TA", name: "Tamil" }
    ];

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? "backdrop-blur-md bg-[#111827]/85 border-b border-white/10 py-3 shadow-lg" 
                    : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                
                {/* Logo & Tagline */}
                <Link to="/" className="flex flex-col select-none group">
                    <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                        Car<span className="text-yellow-400 group-hover:text-yellow-300 transition">Boom</span>
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mt-[-3px]">
                        Rent. Ride. Earn.
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-semibold transition duration-200 ${
                                location.pathname === link.path
                                    ? "text-yellow-400 text-glow"
                                    : "text-gray-300 hover:text-yellow-400"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Language Switcher */}
                    <div className="relative">
                        <button 
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1.5 text-gray-300 hover:text-yellow-400 text-sm font-semibold transition cursor-pointer"
                        >
                            <Globe size={16} />
                            <span>{language}</span>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                            {langOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-36 rounded-xl bg-[#1f2937] border border-white/10 p-1.5 shadow-xl z-20"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setLangOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                                                    language === lang.code 
                                                        ? "bg-yellow-400 text-black font-semibold" 
                                                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                                                }`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Action buttons */}
                    <Link to="/login" className="text-white hover:text-yellow-400 text-sm font-semibold transition cursor-pointer border border-white/10 px-5 py-2.5 rounded-full hover:border-yellow-400 bg-white/5 backdrop-blur-sm">
                        Login
                    </Link>
                    <Link to="/signup" className="bg-yellow-400 text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-yellow-300 transition duration-200 shadow-yellow-glow-hover cursor-pointer">
                        Sign Up
                    </Link>
                </div>

                {/* Mobile Menu Toggle & Language */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button 
                        onClick={() => setLangOpen(!langOpen)}
                        className="flex items-center gap-1 text-gray-300 text-sm font-medium"
                    >
                        <Globe size={16} />
                        <span>{language}</span>
                    </button>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-yellow-400 transition"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden w-full bg-[#111827] border-b border-white/10 overflow-hidden shadow-2xl"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-left text-base font-semibold py-2 transition ${
                                        location.pathname === link.path
                                            ? "text-yellow-400"
                                            : "text-gray-300 hover:text-yellow-400"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/10 my-2" />
                            <div className="flex flex-col gap-3">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center border border-white/20 px-5 py-2.5 rounded-xl text-white font-semibold hover:border-yellow-400 hover:text-yellow-400 transition">
                                    Login
                                </Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bold hover:bg-yellow-300 shadow-yellow-glow transition">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;