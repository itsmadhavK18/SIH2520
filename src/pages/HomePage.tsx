import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ActivitiesGrid } from "@/components/ActivitiesGrid";
import { StickyNotes } from "@/components/StickyNotes";
import { MilestonesTimeline } from "@/components/MilestonesTimeline";
import { VisionSection } from "@/components/VisionSection";
import { WhoWeAre } from "@/components/WhoWeAre";
import { LoginModal } from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  return (
    loading ? <div className="min-h-screen flex items-center justify-center">Loading...</div> :
      <div className="min-h-screen flex flex-col">
        <Header
          onLoginClick={() => setLoginModalOpen(true)}
          currentUser={user}
          onLogout={logout}
        />

        <main className="flex-1">
          {/* Hero Carousel */}
          <HeroCarousel />

          {/* Activities Grid */}
          <ActivitiesGrid />

          {/* Sticky Notes Section */}
          <StickyNotes />

          {/* Milestones Timeline */}
          <MilestonesTimeline />

          {/* Vision Section */}
          <VisionSection />

          {/* Who We Are */}
          <WhoWeAre />
        </main>

        <Footer />

        <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      </div>
  );
};

export default HomePage;
