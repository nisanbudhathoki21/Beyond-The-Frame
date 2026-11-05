import { allPortfolio } from "@/lib/assets";
import PortfolioClient from "./PortfolioClient";
export const metadata = { title: "Portfolio — Street, Dogs, Nature, Weddings | Nisan Budhathoki" };
export const dynamic = 'force-static';
export default function PortfolioPage(){
  return (
    <div className="pt-24 pb-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Portfolio</p>
          <h1 className="font-display font-bold text-4xl leading-none tracking-tight mt-1 text-ink">Photography first.</h1>
          <p className="text-ink/60 mt-2">9 categories • masonry + lightbox • captions with honest locations • empty-state until you upload your Canon T7 shots via Admin</p>
        </div>
        <PortfolioClient initialCat="all" items={allPortfolio as any} />
      </div>
    </div>
  );
}