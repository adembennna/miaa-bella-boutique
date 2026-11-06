import type { Config } from "tailwindcss";
const config: Config = { content:["./app/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"], theme:{extend:{colors:{gold:"#c9a15b",ink:"#090909",cream:"#f6f0e7"},fontFamily:{serif:["Georgia","Times New Roman","serif"]}}},plugins:[]};
export default config;