import AddClientButton from "@/components/AddClientButton";
import AddClientForm from "@/components/AddClientForm";
import AddProjectButton from "@/components/AddProjectButton";
import AddProjectForm from "@/components/AddProjectForm";
import ClientsList from "@/components/ClientsList";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0E12] p-6 space-y-10">
      <WelcomeMessage />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">My Clients</h2>
          <AddClientButton />
        </div>
        <ClientsList />
      </section>
      <AddClientForm />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">
            Starting a new project?
          </h2>
          <AddProjectButton />
        </div>
      </section>

      <AddProjectForm />
    </div>
  );
}
