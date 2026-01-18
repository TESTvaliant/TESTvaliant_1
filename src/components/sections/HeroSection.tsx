import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useHeroImages } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const { data: heroImages } = useHeroImages();
  const [currentImage, setCurrentImage] = useState(0);

  const images = heroImages || [];

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const fallbackImages = [
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop",
      alt: "Students studying",
    },
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Left side gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60 lg:to-transparent z-10" />

      {/* Background images - cycling through */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={displayImages[currentImage]?.src}
              alt={displayImages[currentImage]?.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />

      <div className="container relative z-20 pt-28 pb-24 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          {/* Badge - "English. Exams. Information." */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-full px-5 py-2.5"
          >
            <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse" />
            <span className="text-primary-foreground font-semibold tracking-wide">English. Exams. Information.</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight"
          >
            Helping students navigate and access{" "}
            <span className="text-gradient">education and career opportunities</span> - in India and globally.
          </motion.h2>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed"
          >
            Free learning and insights on English, exams such as IELTS and TOEFL, and education pathways — built from
            4.5+ years of teaching experience.
          </motion.p>

          {/* Micro-text pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {["Public learning initiative", "Built from real classroom experience", "No paid services"].map(
              (item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-full px-4 py-1.5"
                >
                  <span className="w-1.5 h-1.5 bg-secondary/80 rounded-full" />
                  {item}
                </span>
              ),
            )}
          </motion.div>

          {/* Explainer line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4 border-t border-primary-foreground/20 mt-6"
          >
            <p className="text-base text-primary-foreground/70 max-w-2xl leading-relaxed italic">
              "Many capable students struggle not because of ability, but because language barriers, exam systems, and
              missing information block their progress. This initiative exists to help make those systems clearer."
            </p>
          </motion.div>

          {/* Image indicators */}
          {displayImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-2 pt-4"
            >
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? "w-10 bg-secondary"
                      : "w-6 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-1 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 180L48 165C96 150 192 120 288 105C384 90 480 90 576 97.5C672 105 768 120 864 127.5C960 135 1056 135 1152 120C1248 105 1344 75 1392 60L1440 45V180H1392C1344 180 1248 180 1152 180C1056 180 960 180 864 180C768 180 672 180 576 180C480 180 384 180 288 180C192 180 96 180 48 180H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
