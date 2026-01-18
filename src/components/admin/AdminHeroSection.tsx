import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2, Image } from "lucide-react";
import { useHeroContent, useUpdateHeroContent, useHeroImages, useUpdateHeroImage, useAddHeroImage, useDeleteHeroImage } from "@/hooks/useSiteContent";
import ImageUpload from "./ImageUpload";

const AdminHeroSection = () => {
  const { data: heroContent, isLoading: contentLoading } = useHeroContent();
  const { data: heroImages, isLoading: imagesLoading } = useHeroImages();
  const updateContent = useUpdateHeroContent();
  const updateImage = useUpdateHeroImage();
  const addImage = useAddHeroImage();
  const deleteImage = useDeleteHeroImage();

  const [content, setContent] = useState({
    id: "",
    badge_text: "",
    heading_line1: "",
    heading_highlight: "",
    heading_line2: "",
    description: "",
  });

  const [images, setImages] = useState<any[]>([]);
  const [newImage, setNewImage] = useState({ src: "", alt: "" });

  useEffect(() => {
    if (heroContent) {
      setContent({
        id: heroContent.id,
        badge_text: heroContent.badge_text,
        heading_line1: heroContent.heading_line1,
        heading_highlight: heroContent.heading_highlight,
        heading_line2: heroContent.heading_line2,
        description: heroContent.description,
      });
    }
  }, [heroContent]);

  useEffect(() => {
    if (heroImages) {
      setImages(heroImages);
    }
  }, [heroImages]);

  const handleSaveContent = async () => {
    try {
      await updateContent.mutateAsync(content);
      toast.success("Hero content saved!");
    } catch (error) {
      toast.error("Failed to save hero content");
    }
  };

  const handleUpdateImage = async (image: any) => {
    try {
      await updateImage.mutateAsync(image);
      toast.success("Image updated!");
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  const handleAddImage = async () => {
    if (!newImage.src || !newImage.alt) {
      toast.error("Please fill in image URL and alt text");
      return;
    }
    try {
      await addImage.mutateAsync({ ...newImage, sort_order: images.length });
      setNewImage({ src: "", alt: "" });
      toast.success("Image added!");
    } catch (error) {
      toast.error("Failed to add image");
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      await deleteImage.mutateAsync(id);
      toast.success("Image deleted!");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  if (contentLoading || imagesLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Badge Text</label>
            <Input
              value={content.badge_text}
              onChange={(e) => setContent({ ...content, badge_text: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Heading Line 1</label>
              <Input
                value={content.heading_line1}
                onChange={(e) => setContent({ ...content, heading_line1: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Heading Highlight (colored)</label>
              <Input
                value={content.heading_highlight}
                onChange={(e) => setContent({ ...content, heading_highlight: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Heading Line 2</label>
            <Input
              value={content.heading_line2}
              onChange={(e) => setContent({ ...content, heading_line2: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>
          <Button onClick={handleSaveContent} disabled={updateContent.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {updateContent.isPending ? "Saving..." : "Save Content"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Background Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {images.map((img, index) => (
            <div key={img.id} className="flex gap-4 items-start p-4 bg-muted rounded-lg">
              <img src={img.src} alt={img.alt} className="w-24 h-16 object-cover rounded" />
              <div className="flex-1 space-y-2">
                <ImageUpload
                  value={img.src}
                  onChange={(url) => {
                    const updated = [...images];
                    updated[index] = { ...img, src: url };
                    setImages(updated);
                  }}
                  folder="hero"
                  label="Image URL"
                />
                <Input
                  value={img.alt}
                  onChange={(e) => {
                    const updated = [...images];
                    updated[index] = { ...img, alt: e.target.value };
                    setImages(updated);
                  }}
                  placeholder="Alt text"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleUpdateImage(images[index])}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(img.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <h4 className="font-medium">Add New Image</h4>
            <ImageUpload
              value={newImage.src}
              onChange={(url) => setNewImage({ ...newImage, src: url })}
              folder="hero"
              label="Image URL"
            />
            <Input
              value={newImage.alt}
              onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
              placeholder="Alt text"
            />
            <Button onClick={handleAddImage}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHeroSection;
