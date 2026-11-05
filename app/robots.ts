import { business } from "@/lib/config";
export default function robots(){ const base = business.siteUrl || "http://localhost:3000"; return { rules:{ userAgent:"*", allow:"/", disallow:["/admin","/api/"]}, sitemap:`${base}/sitemap.xml` } }
