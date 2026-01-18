import { Mail, Phone, Instagram, Linkedin, Facebook, MapPin } from "lucide-react";
import { useFooterContent, useSocialLinks } from "@/hooks/useSiteContent";
import testvaliantLogo from "@/assets/testvaliant-logo-footer.png";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
};

const Footer = () => {
  const { data: footerContentData } = useFooterContent();
  const { data: socialLinksData } = useSocialLinks();

  const footerContent = footerContentData || {
    tagline: "Access to opportunity begins with legible systems.",
    email: "test.ieltschandigarh@gmail.com",
    phone: "+91 9815488394",
    address: "Chandigarh, India",
    copyright_text: "© 2025 TESTvaliant. All rights reserved.",
  };

  const allowedPlatforms = ["instagram", "linkedin", "facebook"];
  const socialLinks = (socialLinksData || [
    { platform: "instagram", url: "https://www.instagram.com/testinstitute/" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/105349343/admin/dashboard/" },
    { platform: "facebook", url: "#" },
  ]).filter((social: any) => allowedPlatforms.includes(social.platform));

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-secondary/5 to-transparent rounded-full" />
      </div>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-3 md:py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Brand Section */}
            <div className="space-y-3">
              <a href="#" className="inline-flex items-center group">
                <img 
                  src={testvaliantLogo} 
                  alt="TESTvaliant Logo" 
                  className="h-12 w-auto object-contain bg-white rounded-lg p-1.5 group-hover:scale-105 transition-transform duration-300"
                />
              </a>
              <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm font-medium italic">
                "{footerContent.tagline}"
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-2 pt-1">
                {socialLinks.map((social: any) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.platform}`}
                      className="w-8 h-8 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:scale-110 transition-all duration-300 group"
                    >
                      <Icon className="w-3.5 h-3.5 group-hover:text-secondary-foreground transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-base text-primary-foreground flex items-center gap-2">
                <span className="w-5 h-0.5 bg-secondary rounded-full" />
                Get in Touch
              </h4>
              <div className="space-y-2">
                <a 
                  href={`mailto:${footerContent.email}`} 
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-all duration-300 flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <span className="text-xs">{footerContent.email}</span>
                </a>
                <a 
                  href={`tel:${footerContent.phone}`} 
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-all duration-300 flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <span className="text-xs">{footerContent.phone}</span>
                </a>
                <div className="flex items-center gap-2 text-primary-foreground/70">
                  <div className="w-7 h-7 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <span className="text-xs">{footerContent.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10">
          <div className="py-3 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-primary-foreground/50 text-sm">
              {footerContent.copyright_text}
            </p>
            <p className="text-primary-foreground/50 text-sm">
              Empowering learners worldwide 🌍
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
