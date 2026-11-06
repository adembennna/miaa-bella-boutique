"use client";
import Link from "next/link";import {useEffect,useState} from "react";import {supabase} from "@/lib/supabase";import {useRouter} from "next/navigation";
const labels:any={new:"جديد",confirmed:"مؤكد",preparing:"قيد التحضير",shipped:"قيد التوصيل",delivered:"تم التسليم",cancelled:"ملغى"};
const states=["new","confirmed","preparing","shipped","delivered","cancelled"];
export default function Orders(){
 const [orders,setOrders]=useState<any[]>([]),[loading,setLoading]=useState(true),[msg,setMsg]=useState("");const router=useRouter();
 async function getToken(){const {data}=await supabase!.auth.getSession();return data.session?.access_token||""}
 async function load(){if(!supabase){router.replace("/admin/login");return}const t=await getToken();const r=await fetch("/api/admin/orders",{headers:{Authorization:"Bearer "+t}});if(r.status===401){router.replace("/admin/login");return}const j=await r.json();setOrders(j.orders||[]);setLoading(false)}
 useEffect(()=>{load()},[]);
 async function update(id:string,status:string){const t=await getToken();const r=await fetch("/api/admin/orders",{method:"PATCH",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"},body:JSON.stringify({id,status})});if(r.ok){setMsg("تم تحديث حالة الطلب");load()}else setMsg("فشل تحديث الطلب")}
 return <main className="min-h-screen bg-[#f8f5ef]"><header className="bg-black text-white p-5"><Link href="/admin">← لوحة الإدارة</Link></header><div className="max-w-6xl mx-auto p-6 py-12"><h1 className="font-serif text-4xl">Orders</h1><p className="text-sm text-black/50 mt-2">طلبات العملاء من قاعدة البيانات.</p>{msg&&<p className="mt-3 text-sm">{msg}</p>}
 {loading?<p className="mt-8">Loading orders…</p>:orders.length===0?<p className="mt-8 bg-white p-8">لا توجد طلبات حالياً.</p>:<div className="space-y-4 mt-8">{orders.map(o=><article key={o.id} className="bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><b>#{String(o.id).slice(0,8)}</b><p className="text-sm text-black/50">{new Date(o.created_at).toLocaleString("ar-DZ")}</p></div><b>{Number(o.total||0).toLocaleString("ar-DZ")} دج</b></div>
 <div className="grid md:grid-cols-2 gap-2 mt-4 text-sm"><p>الزبون: {o.customer_name||o.name||"—"}</p><p>الهاتف: {o.phone||"—"}</p><p>العنوان: {o.address||"—"}</p><p>الولاية: {o.wilaya||"—"}</p></div>
 <div className="mt-4 text-sm"><b>المنتجات:</b><pre className="whitespace-pre-wrap font-sans text-xs mt-1">{JSON.stringify(o.items||o.order_items||[],null,2)}</pre></div>
 <div className="mt-4 flex flex-wrap items-center gap-3"><label className="text-xs">حالة الطلب</label><select value={o.status||"new"} onChange={e=>update(o.id,e.target.value)} className="border p-2 text-sm">{states.map(s=><option key={s} value={s}>{labels[s]}</option>)}</select><span className="text-xs text-black/50">{labels[o.status||"new"]}</span></div>
 </article>)}</div>}</div></main>
}
