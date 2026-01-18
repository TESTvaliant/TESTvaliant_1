import { motion } from "framer-motion";
import { useLearnerTracks } from "@/hooks/useSiteContent";
import { isValidYoutubeId } from "@/lib/validation";

const FALLBACK_YOUTUBE_ID = "dQw4w9WgXcQ";

const LearnersTrackSection = () => {
  const { data: tracks } = useLearnerTracks();

  // Fallback content - all 8 courses
  const videos = tracks || [
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "Banking Exam Preparation" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "SSC CGL Strategy" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "Quantitative Aptitude" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "Reasoning Techniques" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "English Grammar Basics" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "Current Affairs Tips" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "Interview Preparation" },
    { youtube_id: FALLBACK_YOUTUBE_ID, title: "Success Stories" },
  ];

  // Validate YouTube ID before rendering
  const getSafeYoutubeId = (id: string): string => {
    return isValidYoutubeId(id) ? id : FALLBACK_YOUTUBE_ID;
  };

  return (
    <section id="tracks" className="py-24 bg-section-cool relative">
      {/* Decorative glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Featured <span className="text-gradient">Courses</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video: any, index: number) => (
            <motion.div
              key={video.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]"
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${getSafeYoutubeId(video.youtube_id)}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnersTrackSection;
