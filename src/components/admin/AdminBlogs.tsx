import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { Save, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useBlogs, useUpdateBlog, useAddBlog, useDeleteBlog } from "@/hooks/useSiteContent";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const AdminBlogs = () => {
  const { data: blogs, isLoading } = useBlogs();
  const updateBlog = useUpdateBlog();
  const addBlog = useAddBlog();
  const deleteBlog = useDeleteBlog();

  const [items, setItems] = useState<any[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [newItem, setNewItem] = useState({ 
    title: "", 
    excerpt: "", 
    image_url: "", 
    author: "", 
    date: "", 
    read_time: "", 
    category: "",
    slug: "",
    content: ""
  });

  useEffect(() => {
    if (blogs) {
      setItems(blogs);
    }
  }, [blogs]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleUpdate = async (item: any) => {
    try {
      // Auto-generate slug if empty
      const updatedItem = {
        ...item,
        slug: item.slug || generateSlug(item.title)
      };
      await updateBlog.mutateAsync(updatedItem);
      toast.success("Blog updated!");
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  const handleAdd = async () => {
    if (!newItem.title || !newItem.excerpt) {
      toast.error("Please fill in required fields");
      return;
    }
    try {
      const blogToAdd = {
        ...newItem,
        slug: newItem.slug || generateSlug(newItem.title),
        sort_order: items.length
      };
      await addBlog.mutateAsync(blogToAdd);
      setNewItem({ 
        title: "", 
        excerpt: "", 
        image_url: "", 
        author: "", 
        date: "", 
        read_time: "", 
        category: "",
        slug: "",
        content: ""
      });
      toast.success("Blog added!");
    } catch (error) {
      toast.error("Failed to add blog");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog.mutateAsync(id);
      toast.success("Blog deleted!");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <Collapsible
            key={item.id}
            open={expandedItems.has(item.id)}
            onOpenChange={() => toggleExpanded(item.id)}
          >
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.title || "Untitled Blog"}</h4>
                  <p className="text-sm text-muted-foreground truncate">{item.category} • {item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.slug && (
                    <a 
                      href={`/blog/${item.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary/80"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Button size="sm" variant="outline" onClick={() => handleUpdate(items[index])}>
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <CollapsibleTrigger asChild>
                    <Button size="sm" variant="ghost">
                      {expandedItems.has(item.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>

              <CollapsibleContent className="space-y-4 pt-4 border-t">
                <div className="grid md:grid-cols-[200px_1fr] gap-4">
                  <ImageUpload
                    value={item.image_url}
                    onChange={(url) => {
                      const updated = [...items];
                      updated[index] = { ...item, image_url: url };
                      setItems(updated);
                    }}
                    folder="blogs"
                    label="Cover Image"
                  />
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Title *</label>
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[index] = { ...item, title: e.target.value };
                            setItems(updated);
                          }}
                          placeholder="Blog title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">URL Slug</label>
                        <Input
                          value={item.slug || ""}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[index] = { ...item, slug: e.target.value };
                            setItems(updated);
                          }}
                          placeholder="url-friendly-slug (auto-generated if empty)"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Author</label>
                        <Input
                          value={item.author}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[index] = { ...item, author: e.target.value };
                            setItems(updated);
                          }}
                          placeholder="Author name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Date</label>
                        <Input
                          value={item.date}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[index] = { ...item, date: e.target.value };
                            setItems(updated);
                          }}
                          placeholder="Jan 1, 2025"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Read Time</label>
                        <Input
                          value={item.read_time}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[index] = { ...item, read_time: e.target.value };
                            setItems(updated);
                          }}
                          placeholder="5 min read"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Category *</label>
                        <Input
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[index] = { ...item, category: e.target.value };
                            setItems(updated);
                          }}
                          placeholder="UPSC, CAT, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Excerpt (Short Description)</label>
                      <Textarea
                        value={item.excerpt}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index] = { ...item, excerpt: e.target.value };
                          setItems(updated);
                        }}
                        placeholder="A brief summary shown in blog cards..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <RichTextEditor
                  value={item.content || ""}
                  onChange={(content) => {
                    const updated = [...items];
                    updated[index] = { ...item, content };
                    setItems(updated);
                  }}
                  placeholder="Write the full blog content here..."
                />
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}

        <div className="border-t pt-4 space-y-4">
          <h4 className="font-medium text-lg">Add New Blog</h4>
          
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Title *</label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Blog title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">URL Slug</label>
              <Input
                value={newItem.slug}
                onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })}
                placeholder="url-friendly-slug (auto-generated if empty)"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Author</label>
              <Input
                value={newItem.author}
                onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                placeholder="Jan 1, 2025"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Read Time</label>
              <Input
                value={newItem.read_time}
                onChange={(e) => setNewItem({ ...newItem, read_time: e.target.value })}
                placeholder="5 min read"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category *</label>
              <Input
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                placeholder="UPSC, CAT, etc."
              />
            </div>
          </div>

          <ImageUpload
            value={newItem.image_url}
            onChange={(url) => setNewItem({ ...newItem, image_url: url })}
            folder="blogs"
            label="Cover Image"
          />

          <div>
            <label className="text-sm font-medium mb-1 block">Excerpt (Short Description) *</label>
            <Textarea
              value={newItem.excerpt}
              onChange={(e) => setNewItem({ ...newItem, excerpt: e.target.value })}
              placeholder="A brief summary shown in blog cards..."
              rows={2}
            />
          </div>

          <RichTextEditor
            value={newItem.content}
            onChange={(content) => setNewItem({ ...newItem, content })}
            placeholder="Write the full blog content here..."
          />

          <Button onClick={handleAdd} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBlogs;
