import { createClient } from '@/lib/supabase/server';
import React from 'react'

const WelcomeMessage = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase.from("profiles").select("username").eq("id", user?.id).single();
  console.log(data)

  return (
    <p className="text-[#6B7280] text-lg">Welcome Back, {data?.username}!</p>
  )
}

export default WelcomeMessage

