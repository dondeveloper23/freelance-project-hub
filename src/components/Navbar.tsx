"use client";
import {
  LayoutDashboard,
  FolderKanban,
  StickyNote,
  Menu,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return null;
  }

  const  handleLogout = async() => {
    const supabase = createClient();

    await supabase.auth.signOut();
    router.push("/login");

  }

  return (
    <>
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[#1A1B20] p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 h-screen overflow-hidden bg-[#0D0E12] border-r border-gray-800 shrink-0 p-8 transition-transform md:sticky md:top-0 md:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <h1 className="text-xl font-bold text-violet-500 tracking-tight">
            FreeLance Hub
          </h1>

          <nav className="mt-8 space-y-2">
            <div className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold px-4 py-2">
              Menu
            </div>

            <Link href="/" className="group block">
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive("/")
                    ? "text-white bg-violet-500/50 shadow-lg shadow-violet-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="font-medium text-sm">Dashboard</span>
              </div>
            </Link>

            <Link href="/projects" className="group block">
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive("/projects")
                    ? "text-white bg-violet-500/50 shadow-lg shadow-violet-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <FolderKanban
                  size={18}
                  className="group-hover:text-[#8B5CF6]"
                />
                <span className="font-medium text-sm">Projects</span>
              </div>
            </Link>

            <Link href="/notes" className="group block">
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                  isActive("/notes")
                    ? "text-white bg-violet-500/50 shadow-lg shadow-violet-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <StickyNote size={18} className="group-hover:text-[#8B5CF6]" />
                <span className="font-medium text-sm">Notes</span>
              </div>
            </Link>
          </nav>
        </div>

        <button className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all cursor-pointer" onClick={handleLogout}>

          <LogOut size={18} className="group-hover:text-[#8B5CF6]" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Navbar;
