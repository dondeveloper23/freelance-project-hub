import {create} from 'zustand'

type Note = {
  id: number,
  created_at: string,
  title: string,
  content: string,
  project_id: number,
  client_id: number
}

interface NotesStore {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
}

export const useNotesStore = create<NotesStore>()((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] }))
}))
