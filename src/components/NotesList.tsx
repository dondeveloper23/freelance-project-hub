"use client"
import { useClients } from '@/hooks/useClients';
import useNotes from '@/hooks/useNotes';
import { useProjects } from '@/hooks/useProjects';
import React from 'react'

const NotesList = () => {
  const { clients} = useClients();
  const {projects} = useProjects();
  const { notes, handleDelete } = useNotes();


  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-24">
  {notes.map(note => (
    <div
      className="bg-[#1A1B20] border border-[#2A2B30] rounded-2xl p-4 flex flex-col gap-2"
      key={note.id}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold text-lg">{note.title}</h3>
        <button className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer text-xl" onClick={() => handleDelete(note.id)}>
          &times;
        </button>
      </div>
      <p className="text-[#6B7280] text-sm">Client: {clients.find(client => Number(client.id) === note.client_id)?.name}</p>
      <p className="text-[#6B7280] text-sm">Project: {projects.find(project => Number(project.id) === note.project_id)?.title || "Not Selected"} </p>
      <p className="text-[#6B7280] text-sm">{note.content}</p>
      <p className="text-[#6B7280] text-sm">Added: {note.created_at.slice(0, 10)}</p>

    </div>
  ))}
</div>
  )
}

export default NotesList
