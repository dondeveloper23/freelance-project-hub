"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
type FormData = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      setIsLoading(false);
      return;
    }
    if (!authData.user) return;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: authData.user.id, username: data.username });

    if (profileError) console.error(profileError.message)

    router.push("/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0E12]">
      <div className="bg-[#1A1B20] border border-[#2A2B30] rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-[#6B7280] text-sm mb-1 block">
              Username
            </label>
            <input
              className="w-full bg-[#0D0E12] border border-[#2A2B30] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
              placeholder="freelancer23"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-[#6B7280] text-sm mb-1 block">E-mail</label>
            <input
              className="w-full bg-[#0D0E12] border border-[#2A2B30] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-[#6B7280] text-sm mb-1 block">
              Password
            </label>
            <input
              className="w-full bg-[#0D0E12] border border-[#2A2B30] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
              placeholder="********"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                  message:
                    "Password must contain at least one letter and one number",
                },
                minLength: {
                  value: 7,
                  message: "Password must be at least 7 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-[#6B7280] text-sm mb-1 block">
              Confirm Password
            </label>
            <input
              className="w-full bg-[#0D0E12] border border-[#2A2B30] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8B5CF6]"
              placeholder="********"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
