import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Menu, X, Bell, MessageSquare, ChevronDown, 
    MapPin, Search, Navigation, User
} from "lucide-react";
import { useAuth } from "../../store/AuthContext";

const locations = [
    "Indore", "Bhopal", "Delhi", "Mumbai", 
    "Pune", "Bangalore", "Hyderabad", "Ahmedabad"
];

const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [locOpen, setLocOpen] = useState(false);
    const [selectedLoc, setSelectedLoc] = useState("Indore");
    const [searchLoc, setSearchLoc] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Browse Vehicles", path: "/browse" },
        { name: "My Bookings", path: "/dashboard/bookings" },
        { name: "Become Owner", path: "/become-owner" },
        { name: "Wishlist", path: "/dashboard/wishlist" },
    ];

    const filteredLocations = locations.filter(loc => 
        loc.toLowerCase().includes(searchLoc.toLowerCase())
    );

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? "backdrop-blur-xl bg-[#0b0f19]/90 border-b border-white/5 py-3 shadow-2xl" 
                    : "bg-[#0b0f19]/50 backdrop-blur-sm border-b border-white/5 py-4"
            }`}
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6">
                
                {/* Logo */}
                <Link to="/dashboard" className="flex flex-col select-none group mr-8">
                    <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                        Car<span className="text-yellow-400 group-hover:text-yellow-300 transition">Boom</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden xl:flex items-center gap-6 flex-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition duration-200 ${
                                location.pathname === link.path
                                    ? "text-yellow-400 font-semibold text-glow"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-5">
                    
                    {/* Location Selector */}
                    <div className="relative">
                        <button 
                            onClick={() => setLocOpen(!locOpen)}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition duration-300"
                        >
                            <MapPin size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium text-white">{selectedLoc}</span>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${locOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                            {locOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setLocOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl z-20 overflow-hidden"
                                    >
                                        <div className="p-3 border-b border-white/5">
                                            <div className="relative">
                                                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input 
                                                    type="text"
                                                    placeholder="Search City..."
                                                    className="w-full bg-[#1F2937] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-1 focus:ring-yellow-400 border border-transparent transition"
                                                    value={searchLoc}
                                                    onChange={(e) => setSearchLoc(e.target.value)}
                                                />
                                            </div>
                                            <button className="w-full mt-3 flex items-center justify-center gap-2 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-sm font-medium py-2 rounded-lg transition">
                                                <Navigation size={14} />
                                                Detect Current Location
                                            </button>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-700">
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-1">Popular Cities</div>
                                            {filteredLocations.map((loc) => (
                                                <button
                                                    key={loc}
                                                    onClick={() => {
                                                        setSelectedLoc(loc);
                                                        setLocOpen(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                                                        selectedLoc === loc 
                                                            ? "bg-yellow-400/10 text-yellow-400" 
                                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                                    }`}
                                                >
                                                    <MapPin size={14} className={selectedLoc === loc ? "text-yellow-400" : "text-gray-500"} />
                                                    {loc}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-2 border-l border-white/10 pl-5">
                        <Link to="/dashboard/messages" className="relative p-2 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-full transition">
                            <MessageSquare size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full border border-[#0b0f19]"></span>
                        </Link>
                        <button className="relative p-2 text-gray-300 hover:text-yellow-400 hover:bg-white/5 rounded-full transition">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0b0f19]"></span>
                        </button>
                    </div>

                    {/* Profile Menu */}
                    <div className="relative border-l border-white/10 pl-5">
                        <button 
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition duration-300">
                                {(user as any)?.avatar ? (
                                    <img src={(user as any).avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-[#1F2937] flex items-center justify-center text-gray-400">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                        </button>

                        <AnimatePresence>
                            {profileOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl z-20 overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-white/5">
                                            <p className="text-white font-semibold">{user?.name || 'User'}</p>
                                            <p className="text-gray-400 text-xs truncate">{user?.email || 'user@example.com'}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/profile" className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition">My Profile</Link>
                                            <Link to="/help" className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition">Help Center</Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full text-left px-3 py-2 mt-1 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 lg:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-300 hover:text-yellow-400 transition"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer (Simplified for brevity, similar structure) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden w-full bg-[#111827] border-b border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-left text-base font-medium py-2 transition ${
                                        location.pathname === link.path
                                            ? "text-yellow-400"
                                            : "text-gray-300 hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/5 my-2" />
                            <button 
                                onClick={handleLogout}
                                className="text-left text-red-400 font-medium py-2"
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default DashboardNavbar;
