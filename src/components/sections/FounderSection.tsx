import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useFounderContent } from "@/hooks/useSiteContent";

const FounderSection = () => {
  const { data: founderContent } = useFounderContent();

  // Fallback content
  const content = founderContent || {
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop",
    quote: "Education is not just about passing exams – it's about building confident, capable individuals who can take on any challenge life throws at them.",
    name: "Dr. Rajesh Kumar",
    title: "Founder & Chief Mentor",
    bio_paragraph1: "With over 15 years of experience in competitive exam preparation, Dr. Kumar has mentored more than 25,000 students to success.",
    bio_paragraph2: "A gold medalist from IIT Delhi, Dr. Kumar left a lucrative corporate career to pursue his passion for teaching.",
  };

  return (
    <section id="founder" className="py-24 bg-section-secondary relative">
      {/* Decorative glow effects */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <img
                src={content.image_url}
                alt={content.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-primary/10 rounded-3xl" />
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Meet the Founder
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              The Vision Behind{" "}
              <span className="text-gradient">TESTvaliant</span>
            </h2>

            <div className="relative mb-8">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-secondary/20" />
              <blockquote className="text-xl text-foreground/90 italic pl-8 border-l-4 border-secondary">
                "{content.quote}"
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">{content.name}</h3>
            <p className="text-secondary font-medium mb-4">{content.title}</p>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              {content.bio_paragraph1}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {content.bio_paragraph2}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
