"use client";
import { useUIStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useClientsStore } from "@/store/clientsStore";
import { useProjectsStore } from "@/store/projectStore";
import { tasks } from "@/lib/defaultTasks";

const AddProjectForm = () => {
  const { isProjectFormUIOpen, toggleProjectFormUI } = useUIStore();
  const [projectName, setProjectName] = useState("");
  const [clientId, setClientId] = useState("");
  const router = useRouter();
  const { clients } = useClientsStore();
  const { addProject } = useProjectsStore();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim() === "" || clientId.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("projects")
      .insert({
        title: projectName.trim(),
        client_id: clientId.trim(),
        user_id: user?.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error.message);
      return;
    }

    addProject(data);

    const projectTasks = tasks.map((task) => ({
      ...task,
      project_id: data.id,
      user_id: user?.id,
    }));

    const { error: tasksError } = await supabase
      .from("tasks")
      .insert(projectTasks);

    if (tasksError) {
      console.error("Tasks error:", tasksError.message);
      return;
    }

    setProjectName("");
    setClientId("");
    toggleProjectFormUI();
    router.push("/projects");
  };

  return (
    <>
      {isProjectFormUIOpen && (
        <div>
          <form
            className="flex flex-col gap-4 w-full items-left md:w-1/3"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Project Name"
              className="bg-[#1A1B20] border border-violet-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 p-2 rounded mb-4 w-full mt-4"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            />
            <select
              onChange={(e) => setClientId(e.target.value)}
              className="w-full bg-[#0D0E12] border border-[#2A2B30] text-white rounded-lg p-2 focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="" className="text-[#6B7280]">
                Select a client
              </option>
              {clients.map((client) => (
                <option
                  key={client.id}
                  value={client.id}
                  className="text-white"
                >
                  {client.name}
                </option>
              ))}
            </select>
            <button className="bg-violet-500 text-white px-4 py-2 rounded shadow-[0_0_15px_rgba(139,92,246,0.5)] cursor-pointer hover:bg-[#7C3AED] transition-all font-bold">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddProjectForm;
