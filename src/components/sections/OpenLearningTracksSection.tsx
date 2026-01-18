import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useOpenLearningTracks } from "@/hooks/useSiteContent";
import { ExternalLink, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OpenLearningTracksSection = () => {
  const { data: tracks, isLoading } = useOpenLearningTracks();

  if (isLoading) {
    return (
      <section id="tracks" className="py-24 bg-section-warm relative">
        <div className="container relative z-10">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3 mx-auto" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const displayTracks = tracks || [];

  return (
    <section id="tracks" className="py-24 bg-section-warm relative">
      {/* Decorative glow effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      {/* Subtle dots pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-30 pointer-events-none" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
              Free Resources
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Open Learning <span className="text-gradient">Tracks</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/tracks">
              View All Tracks
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTracks.slice(0, 3).map((track: any, index: number) => (
            <motion.article
              key={track.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                {track.image_url ? (
                  <img
                    src={track.image_url}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Youtube className="w-16 h-16 text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-foreground text-xl mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                  {track.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{track.intro_text}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Subscribe/Channel Button */}
                  {track.channel_url && (
                    <a
                      href={track.channel_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                      Subscribe
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  
                  {/* Read More Button */}
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/track/${track.slug || track.id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenLearningTracksSection;
