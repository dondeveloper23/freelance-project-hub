import { useTasksStore } from "@/store/tasksStore";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export const useTasks = (projectId: number) => {
  const { tasks, setTasks, updateTask } = useTasksStore();

  useEffect(() => {
    const fetchTasks = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", projectId)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, [setTasks, projectId]);

  const handleToggleTask = async (taskId: number, completed: boolean) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", taskId)
      .eq("project_id", projectId)
      .select()
      .single();
    if (error) {
      console.error("Error updating task:", error);
    } else {
      updateTask(data);
    }
  };


  return { tasks, handleToggleTask };
};
