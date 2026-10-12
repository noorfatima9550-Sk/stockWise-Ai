import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import Hero from "../components/landing/Hero.jsx";
import FeaturesGrid from "../components/landing/FeaturesGrid.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import CTABanner from "../components/landing/CTABanner.jsx";
import backgroundImage from "../images/bg.png";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
