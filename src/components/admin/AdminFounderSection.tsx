import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useFounderContent, useUpdateFounderContent } from "@/hooks/useSiteContent";
import ImageUpload from "./ImageUpload";

const AdminFounderSection = () => {
  const { data: founderContent, isLoading } = useFounderContent();
  const updateContent = useUpdateFounderContent();

  const [content, setContent] = useState({
    id: "",
    image_url: "",
    quote: "",
    name: "",
    title: "",
    bio_paragraph1: "",
    bio_paragraph2: "",
  });

  useEffect(() => {
    if (founderContent) {
      setContent({
        id: founderContent.id,
        image_url: founderContent.image_url,
        quote: founderContent.quote,
        name: founderContent.name,
        title: founderContent.title,
        bio_paragraph1: founderContent.bio_paragraph1,
        bio_paragraph2: founderContent.bio_paragraph2,
      });
    }
  }, [founderContent]);

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync(content);
      toast.success("Founder content saved!");
    } catch (error) {
      toast.error("Failed to save founder content");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Founder Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <ImageUpload
            value={content.image_url}
            onChange={(url) => setContent({ ...content, image_url: url })}
            folder="founder"
            label="Founder Image"
          />
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={content.name}
                onChange={(e) => setContent({ ...content, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Quote</label>
          <Textarea
            value={content.quote}
            onChange={(e) => setContent({ ...content, quote: e.target.value })}
            rows={2}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio Paragraph 1</label>
          <Textarea
            value={content.bio_paragraph1}
            onChange={(e) => setContent({ ...content, bio_paragraph1: e.target.value })}
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Bio Paragraph 2</label>
          <Textarea
            value={content.bio_paragraph2}
            onChange={(e) => setContent({ ...content, bio_paragraph2: e.target.value })}
            rows={3}
          />
        </div>
        <Button onClick={handleSave} disabled={updateContent.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {updateContent.isPending ? "Saving..." : "Save"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminFounderSection;
