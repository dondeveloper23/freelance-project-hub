"use client"

import { useUIStore } from "@/store/uiStore";

const AddClientButton = () => {
  const { toggleClientFormUI } = useUIStore();

  return (
    <button className="bg-violet-500 text-white px-4 py-2 rounded shadow-[0_0_15px_rgba(139,92,246,0.5)] cursor-pointer hover:bg-[#7C3AED] transition-all font-bold" onClick={toggleClientFormUI}>
      + Add Client
    </button>
  );
};

export default AddClientButton;
