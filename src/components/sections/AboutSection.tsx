import { motion } from "framer-motion";
import { useAboutContent } from "@/hooks/useSiteContent";

const AboutSection = () => {
  const { data: aboutContent } = useAboutContent();

  // Fallback content
  const content = aboutContent || {
    heading_line1: "Transforming",
    heading_highlight: "Education",
    heading_line2: "One Student at a Time",
    paragraph1:
      "TESTvaliant is more than just an education platform – we're a movement dedicated to revolutionizing how students prepare for competitive exams.",
    paragraph2: "Our unique methodology combines traditional teaching wisdom with modern technology.",
    paragraph3:
      "With a team of experienced educators and industry experts, we provide comprehensive coaching that goes beyond textbooks.",
    paragraph4: "",
    paragraph5: "",
    youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  };

  return (
    <section id="about" className="py-16 bg-section-secondary relative">
      {/* Decorative glow effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/12 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left content - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
              ABOUT THE INITIATIVE
            </span>
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {content.heading_line1}
              <br />
              <span className="text-gradient">{content.heading_highlight}</span>
              {content.heading_line2}
            </h4>
            <p className="text-muted-foreground text-base mb-3 leading-relaxed">{content.paragraph1}</p>
            <p className="text-muted-foreground text-base mb-3 leading-relaxed">{content.paragraph2}</p>
            <p className="text-muted-foreground text-base mb-3 leading-relaxed">{content.paragraph3}</p>
            {content.paragraph4 && (
              <p className="text-muted-foreground text-base mb-3 leading-relaxed">{content.paragraph4}</p>
            )}
            {content.paragraph5 && (
              <p className="text-muted-foreground text-base leading-relaxed">{content.paragraph5}</p>
            )}
          </motion.div>

          {/* Right content - YouTube Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
              <iframe
                src={content.youtube_url}
                title="About TESTvaliant"
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
      </div>
    </section>
  );
};

export default AboutSection;
