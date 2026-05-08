import { useClientsStore } from "./../store/clientsStore";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client"

export type Client = {
  id: string;
  name: string;
  created_at: string;
};

export const useClients = () => {
  const { clients, setClients } = useClientsStore();
  const supabase = createClient()
  useEffect(() => {
    async function fetchClients() {
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (clientError) {
        console.error("Error fetching clients:", clientError);
      } else {
        setClients(clientData as Client[]);
      }
    }

    fetchClients();
  }, [setClients]);

  const handleDelete = async (clientId: string) => {
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .delete()
      .eq("id", clientId);

    if (clientError) {
      console.error("Error deleting client:", clientError);
    } else {
      setClients(clients.filter((client) => client.id !== clientId));
    }
  };

  return { clients, handleDelete };
};
