import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { useTestimonials, useUpdateTestimonial, useAddTestimonial, useDeleteTestimonial, useTestimonialsSettings, useUpdateTestimonialsSettings } from "@/hooks/useSiteContent";
import ImageUpload from "./ImageUpload";

const AdminTestimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const { data: settings, isLoading: settingsLoading } = useTestimonialsSettings();
  const updateTestimonial = useUpdateTestimonial();
  const addTestimonial = useAddTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const updateSettings = useUpdateTestimonialsSettings();

  const [items, setItems] = useState<any[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [settingsId, setSettingsId] = useState("");
  const [newItem, setNewItem] = useState({ name: "", role: "", image_url: "", story: "" });

  useEffect(() => {
    if (testimonials) {
      setItems(testimonials);
    }
  }, [testimonials]);

  useEffect(() => {
    if (settings) {
      setYoutubeUrl(settings.youtube_url);
      setSettingsId(settings.id);
    }
  }, [settings]);

  const handleUpdate = async (item: any) => {
    try {
      await updateTestimonial.mutateAsync(item);
      toast.success("Testimonial updated!");
    } catch (error) {
      toast.error("Failed to update testimonial");
    }
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.story) {
      toast.error("Please fill in required fields");
      return;
    }
    try {
      await addTestimonial.mutateAsync({ ...newItem, sort_order: items.length });
      setNewItem({ name: "", role: "", image_url: "", story: "" });
      toast.success("Testimonial added!");
    } catch (error) {
      toast.error("Failed to add testimonial");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial.mutateAsync(id);
      toast.success("Testimonial deleted!");
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings.mutateAsync({ id: settingsId, youtube_url: youtubeUrl });
      toast.success("Settings saved!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  if (isLoading || settingsLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testimonials Section Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">YouTube Video URL (embed format)</label>
            <Input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
            />
          </div>
          <Button onClick={handleSaveSettings} disabled={updateSettings.isPending}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-muted rounded-lg space-y-3">
              <div className="grid md:grid-cols-[1fr_2fr_auto] gap-4">
                <ImageUpload
                  value={item.image_url}
                  onChange={(url) => {
                    const updated = [...items];
                    updated[index] = { ...item, image_url: url };
                    setItems(updated);
                  }}
                  folder="testimonials"
                  label="Photo"
                />
                <div className="space-y-2">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index] = { ...item, name: e.target.value };
                        setItems(updated);
                      }}
                      placeholder="Name"
                    />
                    <Input
                      value={item.role}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index] = { ...item, role: e.target.value };
                        setItems(updated);
                      }}
                      placeholder="Role (e.g., UPSC 2023 - AIR 45)"
                    />
                  </div>
                  <Textarea
                    value={item.story}
                    onChange={(e) => {
                      const updated = [...items];
                      updated[index] = { ...item, story: e.target.value };
                      setItems(updated);
                    }}
                    placeholder="Success Story"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleUpdate(items[index])}>
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 space-y-3">
            <h4 className="font-medium">Add New Testimonial</h4>
            <div className="grid md:grid-cols-2 gap-3">
              <Input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Name"
              />
              <Input
                value={newItem.role}
                onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                placeholder="Role"
              />
              <div className="md:col-span-2">
                <ImageUpload
                  value={newItem.image_url}
                  onChange={(url) => setNewItem({ ...newItem, image_url: url })}
                  folder="testimonials"
                  label="Photo"
                />
              </div>
              <Textarea
                value={newItem.story}
                onChange={(e) => setNewItem({ ...newItem, story: e.target.value })}
                placeholder="Success Story"
                rows={3}
                className="md:col-span-2"
              />
            </div>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestimonials;
