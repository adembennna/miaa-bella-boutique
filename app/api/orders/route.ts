import { NextResponse } from "next/server";
import {supabaseAdmin} from "@/lib/supabaseAdmin";
import { google } from "googleapis";

export async function POST(req:Request){
 try{
  const body=await req.json();
  if(!body?.customer?.name||!body?.customer?.phone||!Array.isArray(body.items)||!body.items.length)
   return NextResponse.json({error:"Missing customer or items"}, {status:400});
  const orderId="MB-"+Date.now().toString().slice(-8);
  const order={id:orderId,customer:body.customer,items:body.items,total:Number(body.total)||0,status:"New",created_at:new Date().toISOString()};
  if(!supabaseAdmin)return NextResponse.json({error:"Supabase server is not configured. Add environment variables."},{status:503});
  const {error}=await supabaseAdmin.from("orders").insert({order_number:orderId,customer_name:body.customer.name,phone:body.customer.phone,wilaya:body.customer.wilaya,commune:body.customer.commune,address:body.customer.address,notes:body.customer.notes,items:body.items,total:order.total,status:"new",google_sync_status:"pending"});
  if(error)return NextResponse.json({error:error.message},{status:500});
  // Optional Google Sheets sync: never block the persisted order if Sheets is unavailable.
  let sheetsSync="not_configured";
  if(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL&&process.env.GOOGLE_PRIVATE_KEY&&process.env.GOOGLE_SHEET_ID){
   try{
    const auth=new google.auth.JWT({email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n"),scopes:["https://www.googleapis.com/auth/spreadsheets"]});
    const sheets=google.sheets({version:"v4",auth});
    await sheets.spreadsheets.values.append({spreadsheetId:process.env.GOOGLE_SHEET_ID,range:"Orders!A:O",valueInputOption:"USER_ENTERED",requestBody:{values:[[orderId,order.created_at,body.customer.name,body.customer.phone,body.customer.wilaya,body.customer.commune,body.customer.address,body.items.map((x:any)=>`${x.name} (${x.size}/${x.color}) x${x.qty}`).join(" | "),order.total,"COD","New",body.customer.notes||""]] }});
    sheetsSync="synced";
    await supabaseAdmin.from("orders").update({google_sync_status:"synced"}).eq("order_number",orderId);
   }catch(e){console.error("Google Sheets sync failed",e);}
  }
  return NextResponse.json({ok:true,orderId,sheetsSync});
 }catch{return NextResponse.json({error:"Invalid request"},{status:400})}
}