import { useProjectsStore } from "@/store/projectStore";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export type Project = {
  id: string;
  title: string;
  client_id: string;
  created_at: string;
};

export const useProjects = () => {
  const { projects, setProjects } = useProjectsStore();
  const supabase = createClient();
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, [setProjects]);

  const handleDelete = async (projectId: number) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      console.error("Error deleting project:", error);
    } else {
      setProjects(projects.filter((project) => project.id !== projectId));
    }
  };

  return { projects, handleDelete };
};
