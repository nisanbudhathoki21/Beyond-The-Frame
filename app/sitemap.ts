import { business } from "@/lib/config";
export default function sitemap(){ const base = business.siteUrl || "http://localhost:3000"; const routes = ["","/portfolio","/about","/services","/contact","/admin"]; return routes.map(r=>({ url:`${base}${r}`, lastModified: new Date()}));}
