import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTestimonials, useTestimonialsSettings } from "@/hooks/useSiteContent";
import { getSafeYoutubeEmbedUrl } from "@/lib/validation";

const TestimonialsSection = () => {
  const { data: testimonialsData } = useTestimonials();
  const { data: settings } = useTestimonialsSettings();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback content
  const testimonials = testimonialsData || [
    {
      name: "Priya Sharma",
      role: "UPSC CSE 2023 - AIR 45",
      image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      story: "TESTvaliant's structured approach and dedicated mentors transformed my preparation completely.",
    },
  ];

  // Validate YouTube URL before rendering
  const youtubeUrl = getSafeYoutubeEmbedUrl(settings?.youtube_url || "");

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-section-cool overflow-hidden relative">
      {/* Subtle dots pattern overlay */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />
      {/* Blue glow background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our <span className="text-gradient">Achievers</span> Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real students who transformed their dreams into reality with TESTvaliant.
          </p>
        </motion.div>

        {/* Full width testimonials section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg min-h-[400px] relative overflow-hidden shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"
              >
                {/* Left - Name and Story */}
                <div className="flex-1 text-center md:text-left order-2 md:order-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-secondary font-medium mb-6">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed italic text-lg">
                    "{testimonials[currentIndex].story}"
                  </p>
                </div>
                
                {/* Right - Image */}
                <div className="w-48 h-56 md:w-56 md:h-64 rounded-2xl overflow-hidden ring-4 ring-secondary/20 flex-shrink-0 order-1 md:order-2">
                  <img
                    src={testimonials[currentIndex].image_url}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background shadow-md flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </>
            )}
          </div>

          {/* Dots indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* YouTube video section - reduced height */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Watch Our <span className="text-gradient">Success Stories</span>
          </h3>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl shadow-[0_0_40px_-15px_hsl(var(--primary)/0.3)]">
            <iframe
              src={youtubeUrl}
              title="Success Stories Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -z-10" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
