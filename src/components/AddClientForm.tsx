"use client";
import { useUIStore } from "@/store/uiStore";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useClientsStore } from "@/store/clientsStore";

const AddClientForm = () => {
  const { isClientFormUIOpen } = useUIStore();
  const [clientName, setClientName] = useState("");
  const { addClient } = useClientsStore();
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
    .from("clients")
    .insert({ name: clientName.trim(), user_id: user?.id })
    .select()
    .single();

    if (error) {
    console.error("Supabase error:", error.message);
    return;
  }
    addClient(data);
    setClientName("");
  };

  return (
    <>
      {isClientFormUIOpen && (
        <div>
          <form
            className="flex flex-col gap-4 w-full items-left md:w-1/3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Client Name"
              className="bg-[#1A1B20] border border-violet-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 p-2 rounded mb-4 w-full"
              onChange={(e) => setClientName(e.target.value)}
              value={clientName}
            />
            <button className="bg-violet-500 text-white px-4 py-2 rounded shadow-[0_0_15px_rgba(139,92,246,0.5)] cursor-pointer hover:bg-[#7C3AED] transition-all font-bold">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddClientForm;
