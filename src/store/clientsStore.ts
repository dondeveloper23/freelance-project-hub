import { create} from "zustand";

type Client = {
  id: number;
  name: string;
  created_at: string;
};

interface ClientsStore {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
}

export const useClientsStore = create<ClientsStore>()((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] }))

}))
