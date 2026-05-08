import { createClient } from "@/lib/supabase/client"
import { useNotesStore } from "@/store/notesStore";
import  { useEffect } from 'react'


type Note = {
  id: number,
  created_at: string,
  title: string,
  content: string,
  project_id: number,
  client_id: number
}



const useNotes = () => {
  const { notes, setNotes } = useNotesStore();
  const supabase = createClient()
  useEffect(() => {

    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notes:", error);
      } else {
        setNotes(data as Note[]);
      }
    }

    fetchNotes();

  }, [setNotes])

   const handleDelete = async(id: number) => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting note:", error);
    } else {
      setNotes(notes.filter(note => note.id !== Number(id)));
    }
  }

  return { notes, handleDelete  }
}

export default useNotes
