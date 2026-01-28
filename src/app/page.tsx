import { Generator } from "@/components/feature/generator";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#05050A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#05050A] to-[#05050A] text-white overflow-x-hidden selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
      <Generator />
    </main>
  );
}
