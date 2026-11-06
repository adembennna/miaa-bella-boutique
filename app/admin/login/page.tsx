"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
export default function AdminLogin(){
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 const router=useRouter();
 async function submit(e:any){e.preventDefault();setError("");setBusy(true);
  if(!supabase){setError("أضف إعدادات Supabase في .env.local أولاً.");setBusy(false);return;}
  const {error}=await supabase.auth.signInWithPassword({email,password});
  if(error){setError("البريد أو كلمة المرور غير صحيحة.");setBusy(false);return;}
  router.push("/admin");router.refresh();
 }
 return <main className="min-h-screen bg-[#f8f5ef] flex items-center justify-center p-5"><form onSubmit={submit} className="bg-white w-full max-w-md p-8 shadow-sm">
 <Link href="/" className="text-xs text-black/50">← العودة للمتجر</Link><p className="text-[#b69a63] uppercase tracking-[.3em] text-xs mt-8">Mia Bella Boutique</p><h1 className="font-serif text-3xl mt-2">Admin login</h1>
 <label className="block text-xs mt-7 mb-2">Email</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="border p-3 w-full"/>
 <label className="block text-xs mt-4 mb-2">Password</label><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="border p-3 w-full"/>
 {error&&<p className="text-red-600 text-sm mt-3">{error}</p>}<button disabled={busy} className="bg-black text-white w-full py-4 mt-6 text-xs tracking-widest uppercase">{busy?"Please wait…":"Sign in"}</button>
 <p className="text-xs text-black/45 mt-4">حساب الإدارة يتم إنشاؤه من Supabase Authentication.</p></form></main>
}
