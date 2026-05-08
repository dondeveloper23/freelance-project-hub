import { create } from "zustand";

interface Task {
  id: number;
  project_id: number;
  user_id: string;
  phase: string;
  title: string;
  completed: boolean;
  created_at: string;
}

interface TasksStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
}

export const useTasksStore = create<TasksStore>()((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),
}));
