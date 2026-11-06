 "use client";
import React,{createContext,useContext,useEffect,useMemo,useState} from "react";
export type CartItem={id:string;name:string;price:number;image:string;size:string;color:string;qty:number};
type Ctx={items:CartItem[];add:(x:CartItem)=>void;remove:(id:string,size:string,color:string)=>void;update:(id:string,size:string,color:string,qty:number)=>void;clear:()=>void;count:number;total:number};
const CartContext=createContext<Ctx|null>(null);
export function CartProvider({children}:{children:React.ReactNode}){
 const [items,setItems]=useState<CartItem[]>([]);
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem("mia-cart")||"[]"))}catch{}},[]);
 useEffect(()=>{localStorage.setItem("mia-cart",JSON.stringify(items))},[items]);
 const add=(x:CartItem)=>setItems(prev=>{const f=prev.find(i=>i.id===x.id&&i.size===x.size&&i.color===x.color);return f?prev.map(i=>i===f?{...i,qty:i.qty+x.qty}:i):[...prev,x]});
 const remove=(id:string,size:string,color:string)=>setItems(p=>p.filter(i=>!(i.id===id&&i.size===size&&i.color===color)));
 const update=(id:string,size:string,color:string,qty:number)=>setItems(p=>p.map(i=>i.id===id&&i.size===size&&i.color===color?{...i,qty:Math.max(1,qty)}:i));
 const value=useMemo(()=>({items,add,remove,update,clear:()=>setItems([]),count:items.reduce((a,i)=>a+i.qty,0),total:items.reduce((a,i)=>a+i.price*i.qty,0)}),[items]);
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error("CartProvider missing");return c}
