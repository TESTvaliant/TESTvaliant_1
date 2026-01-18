import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { useDifferentiators, useUpdateDifferentiator, useAddDifferentiator, useDeleteDifferentiator } from "@/hooks/useSiteContent";

const AdminDifferentiators = () => {
  const { data: differentiators, isLoading } = useDifferentiators();
  const updateDiff = useUpdateDifferentiator();
  const addDiff = useAddDifferentiator();
  const deleteDiff = useDeleteDifferentiator();

  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  useEffect(() => {
    if (differentiators) {
      setItems(differentiators);
    }
  }, [differentiators]);

  const handleUpdate = async (item: any) => {
    try {
      await updateDiff.mutateAsync(item);
      toast.success("Differentiator updated!");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleAdd = async () => {
    if (!newItem.title || !newItem.description) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await addDiff.mutateAsync({ ...newItem, sort_order: items.length });
      setNewItem({ title: "", description: "" });
      toast.success("Differentiator added!");
    } catch (error) {
      toast.error("Failed to add");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDiff.mutateAsync(id);
      toast.success("Differentiator deleted!");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Why Choose Us (Differentiators)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4 items-start p-4 bg-muted rounded-lg">
            <div className="flex-1 space-y-2">
              <Input
                value={item.title}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...item, title: e.target.value };
                  setItems(updated);
                }}
                placeholder="Title"
              />
              <Textarea
                value={item.description}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...item, description: e.target.value };
                  setItems(updated);
                }}
                placeholder="Description"
                rows={2}
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
          <h4 className="font-medium">Add New Differentiator</h4>
          <Input
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="Title"
          />
          <Textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description"
            rows={2}
          />
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDifferentiators;
