"use client";
import { useParams } from "next/navigation";
import { useProjects } from "@/hooks/useProjects";
import { useClients } from "@/hooks/useClients";
import { useTasks } from "@/hooks/useTasks";
import Image from "next/image";

const ProjectPage = () => {
  const { projects } = useProjects();
  const { clients } = useClients();
  const params = useParams();
  const project = projects.find((p) => p.id === parseInt(params.id as string));
  const { tasks, handleToggleTask } = useTasks(project?.id || 0);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    tasks.length === 0 ? 0 : (100 / tasks.length) * completedTasks;

  const currentTask = tasks.find((t) => !t.completed);
  const tasksReversed = [...tasks].reverse();
  const previosTasks = tasksReversed.find((t) => t.completed);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="mt-10">
      <h1 className="text-white text-3xl font-bold mb-4">{project.title}</h1>
      {project.image_url && (
        <div className="relative w-full max-w-md h-64 mt-4">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="rounded-xl object-cover"
          />
        </div>
      )}
      <p className="text-gray-500 text-sm mt-2">
        {clients.find((c) => c.id === project.client_id)?.name}
      </p>
      <div className="w-full bg-[#2A2B30] rounded-full h-2 mt-4">
        <div
          className="bg-[#8B5CF6] h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-[#6B7280] text-sm mt-2">
        Project progress: {Math.round(progressPercentage)}%
      </p>
      {currentTask ? (
        <div className="mt-8">
          <p className="text-[#8B5CF6] text-lg font-semibold uppercase tracking-widest mb-2">
            Phase:{" "}
            {currentTask.phase.charAt(0).toUpperCase() +
              currentTask.phase.slice(1)}
          </p>
          <h2 className="text-white text-4xl font-bold mb-6">
            Current task: {currentTask.title}
          </h2>
          {previosTasks && (
            <button
              className="mt-4 bg-[#8B5CF6] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#7C3AED] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2 mr-4"
              onClick={() =>
                handleToggleTask(previosTasks.id, previosTasks.completed)
              }
            >
              Undo task
            </button>
          )}

          <button
            className="mt-4 bg-[#8B5CF6] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#7C3AED] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2"
            onClick={() =>
              handleToggleTask(currentTask.id, currentTask.completed)
            }
          >
            Finish task
          </button>
        </div>
      ) : (
        <p className="text-[#6B7280] text-sm mt-4">All tasks completed! 🎉</p>
      )}
    </div>
  );
};

export default ProjectPage;
