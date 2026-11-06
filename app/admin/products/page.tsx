"use client";
import Link from "next/link";import {useEffect,useState} from "react";import {supabase} from "@/lib/supabase";
type Product={id:string;name:string;price:number;category:string;image_url?:string;is_published:boolean;is_featured:boolean;description?:string;slug?:string};
export default function Products(){
 const [items,setItems]=useState<Product[]>([]),[name,setName]=useState(""),[price,setPrice]=useState(""),[category,setCategory]=useState("Shoes"),[description,setDescription]=useState(""),[image,setImage]=useState(""),[published,setPublished]=useState(true),[featured,setFeatured]=useState(false),[file,setFile]=useState<File|null>(null),[busy,setBusy]=useState(false),[msg,setMsg]=useState("");
 async function token(){const {data}=await supabase!.auth.getSession();return data.session?.access_token||""}
 async function load(){if(!supabase)return;const t=await token();const r=await fetch("/api/admin/products",{headers:{Authorization:"Bearer "+t}});if(r.ok){const j=await r.json();setItems(j.products||[])}}
 useEffect(()=>{load()},[]);
 async function save(e:any){e.preventDefault();setBusy(true);setMsg("");try{
 if(!supabase)throw new Error("Supabase not configured");const t=await token();let image_url=image;
 if(file){const fd=new FormData();fd.append("file",file);const up=await fetch("/api/admin/upload",{method:"POST",headers:{Authorization:"Bearer "+t},body:fd});const uj=await up.json();if(!up.ok)throw new Error(uj.error);image_url=uj.url;}
 const r=await fetch("/api/admin/products",{method:"POST",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"},body:JSON.stringify({name,price:Number(price),category,description,image_url,is_published:published,is_featured:featured})});const j=await r.json();if(!r.ok)throw new Error(j.error);
 setMsg("تمت إضافة المنتج بنجاح");setName("");setPrice("");setDescription("");setImage("");setFile(null);await load();
 }catch(err:any){setMsg(err.message||"حدث خطأ")}finally{setBusy(false)}}
 async function del(id:string){if(!confirm("حذف هذا المنتج؟"))return;const t=await token();const r=await fetch("/api/admin/products?id="+id,{method:"DELETE",headers:{Authorization:"Bearer "+t}});if(r.ok)load();else setMsg("تعذر حذف المنتج")}
 async function toggle(p:Product){const t=await token();const r=await fetch("/api/admin/products",{method:"PATCH",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"},body:JSON.stringify({id:p.id,is_published:!p.is_published})});if(r.ok)load()}
 return <main className="min-h-screen bg-[#f8f5ef]"><header className="bg-black text-white p-5"><Link href="/admin">← Admin dashboard</Link></header><div className="max-w-5xl mx-auto p-6 py-12"><h1 className="font-serif text-4xl">Products</h1><p className="text-sm text-black/50 mt-2">إضافة وإدارة المنتجات مباشرة في Supabase.</p>
 <form onSubmit={save} className="bg-white p-6 mt-8 grid md:grid-cols-2 gap-4"><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Product name" className="border p-3"/><input required type="number" min="1" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price (DZD)" className="border p-3"/>
 <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-3"><option>Shoes</option><option>Bags</option></select><input value={image} onChange={e=>setImage(e.target.value)} placeholder="Image URL (optional)" className="border p-3"/>
 <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="border p-3"/><textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="border p-3"/>
 <label className="flex gap-2 items-center"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)}/> Published</label><label className="flex gap-2 items-center"><input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)}/> Featured</label>
 <button disabled={busy} className="bg-black text-white p-4 md:col-span-2">{busy?"Saving…":"Add product"}</button>{msg&&<p className="md:col-span-2 text-sm">{msg}</p>}</form>
 <div className="mt-8 space-y-3">{items.map(p=><article key={p.id} className="bg-white p-4 flex flex-wrap items-center justify-between gap-3"><div><b>{p.name}</b><p className="text-xs text-black/50">{p.price.toLocaleString()} DZD · {p.category} · {p.is_published?"Published":"Hidden"}</p></div><div className="flex gap-2"><button onClick={()=>toggle(p)} className="border px-3 py-2 text-xs">{p.is_published?"Hide":"Publish"}</button><button onClick={()=>del(p.id)} className="bg-red-700 text-white px-3 py-2 text-xs">Delete</button></div></article>)}</div></div></main>
}
