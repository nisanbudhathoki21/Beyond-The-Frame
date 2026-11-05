"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { business } from "@/lib/config";
import { services as svcData } from "@/lib/assets";

export default function AdminPage(){
  const [me,setMe]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  const [loginForm,setLoginForm]=useState({ email:"admin@nepallens.local", password:"admin123"});
  const [err,setErr]=useState("");
  const [bookings,setBookings]=useState<any[]>([]);
  const [tab,setTab]=useState<"bookings"|"portfolio"|"services">("bookings");

  async function checkMe(){
    const r=await fetch("/api/auth/me"); const d=await r.json();
    setMe(d.authenticated? d: null); setLoading(false);
    if(d.authenticated) fetchBookings();
  }
  async function fetchBookings(){
    const r=await fetch("/api/bookings"); if(r.ok){ const d=await r.json(); setBookings(d.bookings||[]) }
  }
  useEffect(()=>{ checkMe()},[]);

  async function login(e:React.FormEvent){
    e.preventDefault(); setErr("");
    const r=await fetch("/api/auth/login", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(loginForm)});
    const d=await r.json();
    if(!r.ok) setErr(d.error||"Login failed"); else checkMe();
  }
  async function logout(){ await fetch("/api/auth/logout",{method:"POST"}); setMe(null) }

  if(loading) return <div className="pt-28 text-center text-ink/60">Checking session…</div>;
  if(!me) return (
    <div className="pt-24 pb-16 min-h-screen bg-cream flex items-center justify-center p-4">
      <form onSubmit={login} className="w-full max-w-md bg-white border border-ink/10 rounded-2xl p-8 space-y-4">
        <h1 className="font-display font-bold text-2xl text-ink">Admin Login</h1>
        <p className="text-sm text-ink/60">Secure • httpOnly • bcrypt • rate-limited. Default: admin@nepallens.local / admin123 — change via env.</p>
        {err && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">{err}</div>}
        <label className="block space-y-1"><span className="text-xs uppercase tracking-widest text-ink/70">Email</span><input value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})} className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm"/></label>
        <label className="block space-y-1"><span className="text-xs uppercase tracking-widest text-ink/70">Password</span><input type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm"/></label>
        <button className="w-full bg-ink text-cream py-3 rounded-full font-bold uppercase tracking-widest text-xs">Sign In</button>
      </form>
    </div>
  );

  return (
    <div className="pt-20 pb-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-start border-b border-ink/10 pb-4">
          <div><h1 className="font-display font-bold text-2xl text-ink">Admin — Nisan Budhathoki</h1><p className="text-sm text-ink/60">{me.email} • {me.role} • {business.phones.join(" • ")}</p></div>
          <button onClick={logout} className="border border-ink/10 bg-white px-4 py-2 rounded-full text-xs font-bold uppercase">Logout</button>
        </div>
        <div className="flex gap-2">
          {["bookings","portfolio","services"].map(k=>(
            <button key={k} onClick={()=>setTab(k as any)} className={`px-4 py-2 rounded-full text-xs font-bold uppercase border ${tab===k ? "bg-ink text-cream border-ink" : "bg-white text-ink/60 border-ink/10"}`}>{k} {k==="bookings" ? `(${bookings.length})` : ""}</button>
          ))}
        </div>
        {tab==="bookings" && (
          <div className="space-y-3">
            {bookings.length===0 ? <p className="bg-white border border-ink/10 rounded-xl p-8 text-center text-sm text-ink/60">No bookings yet — test via <Link href="/contact" className="text-ink underline">Contact</Link></p> :
              bookings.map((b:any)=>(
                <div key={b.id} className="bg-white border border-ink/10 rounded-xl p-4">
                  <p className="font-semibold text-ink">{b.name} — {b.eventType} <span className="text-xs bg-ink text-cream px-2 py-0.5 rounded-full">{b.status}</span></p>
                  <p className="text-sm text-ink/60">{b.phone} • {b.email} • {b.location} • {b.eventDate} {b.budgetNPR ? `• NPR ${b.budgetNPR}`:""}</p>
                  <p className="text-xs text-ink/40 mt-1">{b.id.slice(0,8)}… • {new Date(b.createdAt).toLocaleString()}</p>
                </div>
              ))
            }
          </div>
        )}
        {tab==="services" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {svcData.map(s=> <div key={s.id} className="bg-white border border-ink/10 rounded-xl p-4"><p className="text-xs tracking-widest uppercase font-bold text-gold-dark">{s.title}</p><p className="font-bold text-ink mt-1">NPR {s.priceNPR.toLocaleString("en-NP")} from</p><p className="text-xs text-ink/60 mt-1">{s.priceNote}</p></div>)}
          </div>
        )}
        {tab==="portfolio" && (
          <div className="bg-white border border-ink/10 rounded-2xl p-6">
            <h3 className="font-bold text-ink">Portfolio Management</h3>
            <p className="text-sm text-ink/60 mt-1">Manage images via <code className="bg-cream px-1 py-0.5 rounded">lib/assets.ts</code> or Admin upload API — validated, hashed names, alt text required. Categories: Street, Dogs, Culture, Nature, Weddings, Events, Travel, Product, Portraits.</p>
            <p className="text-xs text-ink/50 mt-3">Contact editable: {business.phones.join(", ")} • {business.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
