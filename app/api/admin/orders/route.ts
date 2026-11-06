import {NextRequest,NextResponse} from "next/server";
import {supabaseAdmin} from "@/lib/supabaseAdmin";
import {requireAdmin} from "@/lib/adminAuth";
const statuses=["new","confirmed","preparing","shipped","delivered","cancelled"];
export async function GET(req:NextRequest){
 const user=await requireAdmin(req);if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const {data,error}=await supabaseAdmin.from("orders").select("*").order("created_at",{ascending:false});
 if(error)return NextResponse.json({error:error.message},{status:500});
 return NextResponse.json({orders:data});
}
export async function PATCH(req:NextRequest){
 const user=await requireAdmin(req);if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const {id,status}=await req.json();if(!id||!statuses.includes(status))return NextResponse.json({error:"Invalid id/status"},{status:400});
 const {data,error}=await supabaseAdmin.from("orders").update({status,updated_at:new Date().toISOString()}).eq("id",id).select().single();
 if(error)return NextResponse.json({error:error.message},{status:500});return NextResponse.json({order:data});
}
