"use client";
import { useClients } from "@/hooks/useClients";
import { useProjects } from "@/hooks/useProjects";
import Link from "next/link";

const ProjectsList = () => {
  const { projects, handleDelete } = useProjects();
  const { clients } = useClients();

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.id}
            className="p-6 bg-[#1A1B20] border border-gray-800 rounded-2xl flex flex-col gap-2"
          >
            {/* GORNJI RED: title + X */}
            <div className="flex items-start justify-between">
              <p className="text-white font-semibold text-lg">
                {project.title}
              </p>

              <button
                onClick={(e) => {
                  e.preventDefault(); // da ne triggeruje Link
                  handleDelete(project.id);
                }}
                className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer text-xl"
              >
                &times;
              </button>
            </div>

            {/* DONJI RED: client name */}
            <p className="text-gray-500 text-sm">
              {
                clients.find(
                  (client) => Number(client.id) === project.client_id,
                )?.name
              }
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;
