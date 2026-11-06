import "./globals.css";
import {CartProvider} from "@/components/CartProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
export const metadata={title:"MIA BELLA BOUTIQUE | Walk Your Story",description:"Luxury women's shoes and handbags. Walk your story."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider>{children}<WhatsAppButton/></CartProvider></body></html>}