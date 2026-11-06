 "use client";
import {useState} from "react";import {useCart} from "./CartProvider";
export default function AddToCart({product}:{product:{id:string,name:string,price:number,image:string}}){
 const [size,setSize]=useState("38"),[color,setColor]=useState("Black"),[qty,setQty]=useState(1),[ok,setOk]=useState(false);const {add}=useCart();
 return <div className="space-y-5">
 <div><label className="text-xs uppercase tracking-widest">Size</label><div className="flex gap-2 mt-2">{["36","37","38","39","40","41"].map(s=><button key={s} onClick={()=>setSize(s)} className={`border px-3 py-2 text-sm ${size===s?"bg-black text-white":"bg-white"}`}>{s}</button>)}</div></div>
 <div><label className="text-xs uppercase tracking-widest">Color</label><div className="flex gap-2 mt-2">{["Black","Beige","Gold"].map(c=><button key={c} onClick={()=>setColor(c)} className={`border px-3 py-2 text-sm ${color===c?"bg-black text-white":"bg-white"}`}>{c}</button>)}</div></div>
 <div className="flex items-center gap-4"><span className="text-xs uppercase tracking-widest">Qty</span><button onClick={()=>setQty(Math.max(1,qty-1))} className="border px-3 py-1">−</button>{qty}<button onClick={()=>setQty(qty+1)} className="border px-3 py-1">+</button></div>
 <button onClick={()=>{add({...product,size,color,qty});setOk(true)}} className="w-full bg-black text-white py-4 text-xs tracking-[.2em] uppercase hover:bg-gold hover:text-black">Add to bag</button>{ok&&<p className="text-green-700 text-sm">Added to your bag ✓</p>}
 </div>
}
