import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { useFaqs, useUpdateFaq, useAddFaq, useDeleteFaq } from "@/hooks/useSiteContent";

const AdminFaqs = () => {
  const { data: faqs, isLoading } = useFaqs();
  const updateFaq = useUpdateFaq();
  const addFaq = useAddFaq();
  const deleteFaq = useDeleteFaq();

  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ question: "", answer: "" });

  useEffect(() => {
    if (faqs) {
      setItems(faqs);
    }
  }, [faqs]);

  const handleUpdate = async (item: any) => {
    try {
      await updateFaq.mutateAsync(item);
      toast.success("FAQ updated!");
    } catch (error) {
      toast.error("Failed to update FAQ");
    }
  };

  const handleAdd = async () => {
    if (!newItem.question || !newItem.answer) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await addFaq.mutateAsync({ ...newItem, sort_order: items.length });
      setNewItem({ question: "", answer: "" });
      toast.success("FAQ added!");
    } catch (error) {
      toast.error("Failed to add FAQ");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaq.mutateAsync(id);
      toast.success("FAQ deleted!");
    } catch (error) {
      toast.error("Failed to delete FAQ");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4 items-start p-4 bg-muted rounded-lg">
            <div className="flex-1 space-y-2">
              <Input
                value={item.question}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...item, question: e.target.value };
                  setItems(updated);
                }}
                placeholder="Question"
              />
              <Textarea
                value={item.answer}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...item, answer: e.target.value };
                  setItems(updated);
                }}
                placeholder="Answer"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleUpdate(items[index])}>
                <Save className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 space-y-3">
          <h4 className="font-medium">Add New FAQ</h4>
          <Input
            value={newItem.question}
            onChange={(e) => setNewItem({ ...newItem, question: e.target.value })}
            placeholder="Question"
          />
          <Textarea
            value={newItem.answer}
            onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })}
            placeholder="Answer"
            rows={3}
          />
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFaqs;
