import { supabaseAdmin } from "@/lib/supabaseAdmin";
export async function getPublishedProducts(){
 if(!supabaseAdmin)return null;
 const {data,error}=await supabaseAdmin.from("products").select("*").eq("is_published",true).order("created_at",{ascending:false});
 if(error)return null;
 return data||[];
}
