"use client"

import { createClient } from "@/lib/supabase/client";
import { NextRequest } from "next/server";
import { useState } from "react"
import { useRouter } from "next/navigation";



const Login = () => {
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const supabase = createClient();

  const {data, error} = await supabase.auth.signInWithPassword({email, password})

  if (error) {
    console.error("Error signing in:", error.message);
    setIsLoading(false);
    return
  }

  router.push("/")

}
return (
  <div className="min-h-screen bg-[#0D0E12] flex items-center justify-center">
    <div className="bg-[#1A1B20] border border-[#2A2B30] rounded-2xl p-8 w-full max-w-md">
      <h1 className="text-white text-2xl font-bold mb-2">Welcome!</h1>
      <p className="text-[#6B7280] text-sm mb-8">Log in to your account</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-[#6B7280] text-sm">Email</label>
          <input
            type="email"
            placeholder="name@name.com"
            className="bg-[#0D0E12] border border-[#2A2B30] rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#8B5CF6]"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[#6B7280] text-sm">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="bg-[#0D0E12] border border-[#2A2B30] rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#8B5CF6]"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold rounded-lg px-4 py-3 mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="text-[#6B7280] text-sm text-center mt-6">
        Dont have an account?{" "}
        <a href="/register" className="text-[#8B5CF6] hover:underline">
          Register
        </a>
      </p>
    </div>
  </div>
)
}

export default Login
