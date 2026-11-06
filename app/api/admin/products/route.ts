import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";
export async function GET(req:NextRequest){
 const user=await requireAdmin(req); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const {data,error}=await supabaseAdmin.from("products").select("*").order("created_at",{ascending:false});
 if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({products:data});
}
export async function POST(req:NextRequest){
 const user=await requireAdmin(req); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const p=await req.json();
 if(!p.name||!p.price||!["Shoes","Bags"].includes(p.category))return NextResponse.json({error:"Name, price and category are required"},{status:400});
 const slug=String(p.slug||p.name).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
 const {data,error}=await supabaseAdmin.from("products").insert({name:p.name,slug,description:p.description||"",category:p.category,price:Number(p.price),sale_price:p.sale_price?Number(p.sale_price):null,image_url:p.image_url||null,images:p.images||[],variants:p.variants||[],is_featured:!!p.is_featured,is_published:!!p.is_published}).select().single();
 if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({product:data});
}
export async function PATCH(req:NextRequest){
 const user=await requireAdmin(req); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const p=await req.json();if(!p.id)return NextResponse.json({error:"Missing product id"},{status:400});
 const {id,...values}=p;const {data,error}=await supabaseAdmin.from("products").update({...values,updated_at:new Date().toISOString()}).eq("id",id).select().single();
 if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({product:data});
}
export async function DELETE(req:NextRequest){
 const user=await requireAdmin(req);if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const id=req.nextUrl.searchParams.get("id");if(!id)return NextResponse.json({error:"Missing id"},{status:400});
 const {error}=await supabaseAdmin.from("products").delete().eq("id",id);if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({ok:true});
}
