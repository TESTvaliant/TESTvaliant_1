import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, Loader2, ShieldAlert, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import AdminHeroSection from "@/components/admin/AdminHeroSection";
import AdminAboutSection from "@/components/admin/AdminAboutSection";
import AdminFounderSection from "@/components/admin/AdminFounderSection";
import AdminOpenLearningTracks from "@/components/admin/AdminOpenLearningTracks";
import AdminYoutubeChannels from "@/components/admin/AdminYoutubeChannels";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminDifferentiators from "@/components/admin/AdminDifferentiators";
import AdminBlogs from "@/components/admin/AdminBlogs";
import AdminFaqs from "@/components/admin/AdminFaqs";
import AdminCTA from "@/components/admin/AdminCTA";
import AdminFooter from "@/components/admin/AdminFooter";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isAdmin, signOut, user, refreshAdminStatus } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    await refreshAdminStatus();
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-card rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have admin privileges. Please contact an administrator to request access.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Signed in as: {user?.email}
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button variant="default" onClick={handleRefreshStatus} disabled={isRefreshing}>
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh Status
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Go Home</Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="font-bold text-foreground">TESTvaliant Admin</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="founder">Founder</TabsTrigger>
            <TabsTrigger value="tracks">Learning Tracks</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="differentiators">Why Us</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <AdminHeroSection />
          </TabsContent>
          <TabsContent value="about">
            <AdminAboutSection />
          </TabsContent>
          <TabsContent value="founder">
            <AdminFounderSection />
          </TabsContent>
          <TabsContent value="tracks">
            <AdminOpenLearningTracks />
          </TabsContent>
          <TabsContent value="youtube">
            <AdminYoutubeChannels />
          </TabsContent>
          <TabsContent value="testimonials">
            <AdminTestimonials />
          </TabsContent>
          <TabsContent value="differentiators">
            <AdminDifferentiators />
          </TabsContent>
          <TabsContent value="blogs">
            <AdminBlogs />
          </TabsContent>
          <TabsContent value="faqs">
            <AdminFaqs />
          </TabsContent>
          <TabsContent value="cta">
            <AdminCTA />
          </TabsContent>
          <TabsContent value="footer">
            <AdminFooter />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
