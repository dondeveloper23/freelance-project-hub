import {create } from "zustand";
interface Project {
  id: number;
  title: string;
  client_id: number;
  created_at: string;
}

interface ProjectsStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
}

export const useProjectsStore = create<ProjectsStore>()((set) => ({
  projects: [],
  setProjects: (projects) => set({projects}),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] }))
}))
