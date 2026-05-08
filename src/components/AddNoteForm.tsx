"use client"
import { useClients } from "@/hooks/useClients";

import { useProjects } from "@/hooks/useProjects";
import { createClient } from "@/lib/supabase/client";
import { useNotesStore } from "@/store/notesStore";
import { useState } from "react";


const AddNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [projectId, setProjectId] = useState("");
  const [clientId, setClientId] = useState("");
  const {projects} = useProjects();
  const {clients} = useClients();
  const { addNote } = useNotesStore();
  const supabase = createClient()

  const handleClientChange =(e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientId(e.target.value);
    setProjectId("");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !clientId) {
      alert("Please fill in all required fields (title, content, client)");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const {data, error} = await supabase.from("notes").insert({
    title,
    content,
    project_id: projectId ? Number(projectId) : null,
    client_id: Number(clientId),
    user_id: user?.id
  })
    .select()
    .single()

    if(error) {
      console.error("Error inserting note:", error);
    } else {
      console.log("Note inserted successfully:", data);
      setTitle("");
      setContent("");
      setProjectId("");
      setClientId("");
      addNote(data)
    }


  }

  return (
<div>
  <form className="flex flex-col gap-4 w-full md:w-1/3 mt-4" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Note title"
      value={title}
      onChange={e => setTitle(e.target.value)}
      className="bg-[#1A1B20] border border-violet-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 p-2 rounded w-full"
    />
    <textarea
      placeholder="Note description"
      value={content}
      onChange={e => setContent(e.target.value)}
      className="bg-[#1A1B20] border border-violet-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 p-2 rounded w-full resize-none h-32"
    />
    <select
      onChange={handleClientChange}
      value={clientId}
      className="w-full bg-[#0D0E12] border border-[#2A2B30] text-white rounded-lg p-2 focus:outline-none focus:border-[#8B5CF6]"
    >
      <option value="">Select Client</option>
      {clients.map(client => (
        <option key={client.id} value={client.id}>{client.name}</option>
      ))}
    </select>
    <select
      onChange={e => setProjectId(e.target.value)}
      value={projectId}
      className="w-full bg-[#0D0E12] border border-[#2A2B30] text-white rounded-lg p-2 focus:outline-none focus:border-[#8B5CF6]"
    >
      <option value="">Select Project</option>
      {projects.filter(project => project.client_id === Number(clientId)).map(project => (
        <option key={project.id} value={project.id}>{project.title}</option>
      ))}
    </select>
    <button className="bg-violet-500 text-white px-4 py-2 rounded shadow-[0_0_15px_rgba(139,92,246,0.5)] cursor-pointer hover:bg-[#7C3AED] transition-all font-bold">
      Submit
    </button>
  </form>
</div>
  )
}

export default AddNoteForm
