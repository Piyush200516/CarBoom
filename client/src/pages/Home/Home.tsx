import HeroSection from "../../components/home/HeroSection";
import CategoriesSection from "../../components/home/CategoriesSection";
import FeaturedSection from "../../components/home/FeaturedSection";
import HowItWorksSection from "../../components/home/HowItWorksSection";
import OwnerBanner from "../../components/home/OwnerBanner";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import FaqSection from "../../components/home/FaqSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        // Handle scroll request redirected from layout navigation
        if (location.state && (location.state as any).scrollTo) {
            const id = (location.state as any).scrollTo;
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }, 100);
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-white">
            <HeroSection />
            <CategoriesSection />
            <FeaturedSection />
            <HowItWorksSection />
            <OwnerBanner />
            <TestimonialsSection />
            <FaqSection />
        </div>
    );
};

export default Home;