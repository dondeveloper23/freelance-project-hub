"use client";

import { useClients } from "@/hooks/useClients";


const ClientsList = () => {
  const { clients, handleDelete } = useClients();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => (
        <div
          className="bg-[#1A1B20] border border-[#2A2B30] rounded-2xl p-4 flex flex-col gap-2"
          key={client.id}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold text-lg">{client.name}</h3>
            <button
              onClick={() => handleDelete(client.id)}
              className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer text-xl"
            >
              &times;
            </button>
          </div>
          <p className="text-[#6B7280] text-sm">
            Added: {client.created_at.slice(0, 10)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ClientsList;
