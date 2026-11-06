import { NextRequest,NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";
export async function POST(req:NextRequest){
 const user=await requireAdmin(req);if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 if(!supabaseAdmin)return NextResponse.json({error:"Supabase not configured"},{status:500});
 const form=await req.formData();const file=form.get("file");
 if(!(file instanceof File))return NextResponse.json({error:"Choose an image"},{status:400});
 if(!file.type.startsWith("image/")||file.size>5*1024*1024)return NextResponse.json({error:"Image only, maximum 5 MB"},{status:400});
 const ext=file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g,"")||"jpg";
 const path=`${Date.now()}-${crypto.randomUUID()}.${ext}`;
 const {error}=await supabaseAdmin.storage.from("product-images").upload(path,await file.arrayBuffer(),{contentType:file.type,upsert:false});
 if(error)return NextResponse.json({error:error.message},{status:500});
 const {data}=supabaseAdmin.storage.from("product-images").getPublicUrl(path);
 return NextResponse.json({url:data.publicUrl});
}
