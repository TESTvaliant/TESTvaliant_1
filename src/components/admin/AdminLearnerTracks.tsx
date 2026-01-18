import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Plus, Trash2 } from "lucide-react";
import { useLearnerTracks, useUpdateLearnerTrack, useAddLearnerTrack, useDeleteLearnerTrack } from "@/hooks/useSiteContent";

const AdminLearnerTracks = () => {
  const { data: tracks, isLoading } = useLearnerTracks();
  const updateTrack = useUpdateLearnerTrack();
  const addTrack = useAddLearnerTrack();
  const deleteTrack = useDeleteLearnerTrack();

  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ youtube_id: "", title: "" });

  useEffect(() => {
    if (tracks) {
      setItems(tracks);
    }
  }, [tracks]);

  const handleUpdate = async (item: any) => {
    try {
      await updateTrack.mutateAsync(item);
      toast.success("Track updated!");
    } catch (error) {
      toast.error("Failed to update track");
    }
  };

  const handleAdd = async () => {
    if (!newItem.youtube_id || !newItem.title) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await addTrack.mutateAsync({ ...newItem, sort_order: items.length });
      setNewItem({ youtube_id: "", title: "" });
      toast.success("Track added!");
    } catch (error) {
      toast.error("Failed to add track");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTrack.mutateAsync(id);
      toast.success("Track deleted!");
    } catch (error) {
      toast.error("Failed to delete track");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Featured Courses (Learner Tracks)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4 items-end p-4 bg-muted rounded-lg">
            <div className="flex-1">
              <label className="text-sm font-medium">YouTube Video ID</label>
              <Input
                value={item.youtube_id}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...item, youtube_id: e.target.value };
                  setItems(updated);
                }}
                placeholder="dQw4w9WgXcQ"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={item.title}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...item, title: e.target.value };
                  setItems(updated);
                }}
              />
            </div>
            <Button size="sm" variant="outline" onClick={() => handleUpdate(items[index])}>
              <Save className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-medium">Add New Track</h4>
          <div className="flex gap-4">
            <Input
              value={newItem.youtube_id}
              onChange={(e) => setNewItem({ ...newItem, youtube_id: e.target.value })}
              placeholder="YouTube Video ID"
              className="flex-1"
            />
            <Input
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="Title"
              className="flex-1"
            />
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminLearnerTracks;
