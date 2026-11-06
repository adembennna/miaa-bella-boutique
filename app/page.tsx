import Image from "next/image";
import { ArrowUpRight, ShoppingBag, Search, Menu, Instagram, Heart, ChevronRight, Sparkles } from "lucide-react";
const products=[
 {id:1,name:"The Sofia Heel",category:"Shoes",price:8900,tag:"NEW",img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85"},
 {id:2,name:"Bella Mini Bag",category:"Bags",price:12500,tag:"BESTSELLER",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"},
 {id:3,name:"Golden Hour Sandal",category:"Shoes",price:7600,tag:"",img:"https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=85"},
 {id:4,name:"The Luna Bag",category:"Bags",price:14900,tag:"NEW",img:"https://images.unsplash.com/photo-1590870488-7b9b4b1b4c9d?auto=format&fit=crop&w=900&q=85"}
];
export default function Home(){
 return <main>
  <div className="bg-black text-[#d8bd88] text-[10px] tracking-[.24em] text-center py-3 uppercase">Complimentary delivery on orders over 20,000 DZD</div>
  <header className="sticky top-0 z-30 bg-[#090909]/95 text-white backdrop-blur border-b border-white/10">
   <div className="max-w-7xl mx-auto px-5 h-[82px] flex items-center justify-between">
    <nav className="hidden md:flex gap-8 text-[11px] tracking-[.18em] uppercase text-white/75"><a href="#shop">Shoes</a><a href="#shop">Bags</a><a href="#story">Our story</a></nav>
    <a href="#" className="flex flex-col items-center leading-none"><span className="font-serif text-2xl tracking-[.12em]">MIA BELLA</span><span className="text-[8px] tracking-[.5em] text-gold mt-2">BOUTIQUE</span></a>
    <div className="flex items-center gap-5"><button aria-label="Search"><Search size={17}/></button><button aria-label="Cart" className="relative"><ShoppingBag size={18}/><span className="absolute -top-2 -right-2 text-[9px] bg-gold text-black rounded-full w-4 h-4 grid place-items-center">0</span></button><button className="md:hidden"><Menu size={19}/></button></div>
   </div>
  </header>
  <section className="relative min-h-[610px] md:min-h-[710px] bg-black overflow-hidden">
   <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1539100941402-4d6f2f2c8f3f?auto=format&fit=crop&w=2000&q=90" className="w-full h-full object-cover opacity-65" alt="Elegant fashion campaign"/></div>
   <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent"/>
   <div className="relative max-w-7xl mx-auto px-6 min-h-[610px] md:min-h-[710px] flex items-center">
    <div className="max-w-xl text-white pt-10">
     <p className="text-gold uppercase tracking-[.35em] text-[10px] md:text-xs mb-7">The art of getting dressed</p>
     <h1 className="font-serif text-6xl md:text-8xl leading-[.95] tracking-[-.04em]">Walk<br/><i className="font-normal text-[#d9bd87]">your story.</i></h1>
     <p className="text-white/70 mt-7 max-w-sm text-sm leading-7">A little luxury, a lot of you. Discover shoes and bags made for every chapter.</p>
     <a href="/shop" className="inline-flex items-center gap-4 mt-9 border border-gold px-7 py-4 text-[10px] tracking-[.22em] uppercase hover:bg-gold hover:text-black">Explore collection <ArrowUpRight size={15}/></a>
    </div>
   </div>
   <div className="absolute bottom-7 right-8 text-[9px] tracking-[.25em] text-white/60 uppercase hidden md:block">Mia Bella — Women Collection</div>
  </section>
  <section className="bg-[#f8f5ef] py-20 md:py-28" id="shop">
   <div className="max-w-7xl mx-auto px-5">
    <div className="flex items-end justify-between mb-10"><div><p className="text-gold text-[10px] tracking-[.3em] uppercase mb-3">Curated for you</p><h2 className="font-serif text-4xl md:text-5xl">The latest edit</h2></div><a href="#products" className="hidden md:flex items-center gap-2 text-xs border-b border-black pb-2">View all <ChevronRight size={14}/></a></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6" id="products">{products.map(p=><article key={p.id} className="group">
      <div className="relative aspect-[.78] overflow-hidden bg-[#e8e1d6]"><img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"/>{p.tag&&<span className="absolute top-3 left-3 bg-[#f8f5ef] px-2.5 py-1 text-[8px] tracking-[.16em]">{p.tag}</span>}<button className="absolute bottom-3 right-3 bg-white/90 p-2.5 rounded-full hover:bg-gold" aria-label="Add to wishlist"><Heart size={15}/></button></div>
      <div className="pt-4"><p className="text-[9px] uppercase tracking-[.2em] text-black/45">{p.category}</p><h3 className="font-serif text-lg md:text-xl mt-1">{p.name}</h3><p className="text-xs mt-2 tracking-wide">{p.price.toLocaleString("en-US")} DZD</p></div>
    </article>)}</div>
   </div>
  </section>
  <section id="story" className="bg-black text-white py-20 md:py-28">
   <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
    <div className="relative"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85" alt="Fashion editorial" className="w-full aspect-[.9] object-cover"/><div className="absolute -bottom-5 -right-5 bg-gold text-black w-24 h-24 rounded-full grid place-items-center text-center text-[9px] tracking-widest uppercase rotate-12"><Sparkles size={18}/><span>Made for<br/>your story</span></div></div>
    <div className="md:pl-12"><p className="text-gold text-[10px] tracking-[.3em] uppercase mb-5">More than an accessory</p><h2 className="font-serif text-5xl md:text-7xl leading-tight">Your style.<br/><i className="text-[#d9bd87]">Your chapter.</i></h2><p className="text-white/60 leading-7 text-sm max-w-md mt-7">At Mia Bella, every detail is an invitation to express yourself. Find the pieces that feel like you — and make every step unforgettable.</p><a href="/shop" className="inline-flex items-center gap-3 mt-8 text-[10px] tracking-[.22em] uppercase border-b border-gold pb-3">Discover Mia Bella <ArrowUpRight size={14}/></a></div>
   </div>
  </section>
  <section className="py-16 bg-[#eae2d5] text-center"><p className="font-serif text-3xl md:text-4xl">A signature for every moment.</p><p className="mt-4 text-[10px] uppercase tracking-[.3em] text-black/55">Shoes • Bags • Confidence</p></section>
  <footer className="bg-[#090909] text-white pt-14 pb-8"><div className="max-w-7xl mx-auto px-5"><div className="grid md:grid-cols-3 gap-10 pb-12"><div><p className="font-serif text-2xl tracking-widest">MIA BELLA</p><p className="text-gold text-[9px] tracking-[.5em] mt-2">BOUTIQUE</p><p className="text-white/45 text-xs mt-5">WALK YOUR STORY</p></div><div><p className="text-[10px] tracking-[.25em] uppercase mb-5">Explore</p><div className="flex flex-col gap-3 text-sm text-white/55"><a href="#shop">Shoes</a><a href="#shop">Bags</a><a href="#story">Our story</a></div></div><div><p className="text-[10px] tracking-[.25em] uppercase mb-5">Stay in the loop</p><p className="text-sm text-white/50 mb-4">New arrivals, thoughtful edits and a little inspiration.</p><div className="flex border-b border-white/30 pb-3"><input placeholder="Your email address" className="bg-transparent outline-none text-sm flex-1"/><button className="text-gold text-xs uppercase tracking-widest">Join</button></div></div></div><div className="gold-line"/><div className="flex justify-between pt-6 text-[9px] tracking-[.15em] text-white/35 uppercase"><span>© 2026 Mia Bella Boutique</span><span className="flex gap-2 items-center"><Instagram size={13}/> Follow our story</span></div></div></footer>
 </main>
}