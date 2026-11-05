import { BasketProvider } from "@/lib/basket";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BakeSchedule } from "@/components/BakeSchedule";
import { Menu } from "@/components/Menu";
import { CakeDesigner } from "@/components/CakeDesigner";
import { Visit } from "@/components/Visit";
import { BasketDrawer } from "@/components/BasketDrawer";
import { Toast } from "@/components/Toast";

export default function Home() {
  return (
    <BasketProvider>
      <Header />
      <main>
        <Hero />
        <BakeSchedule />
        <Menu />
        <CakeDesigner />
        <Visit />
      </main>
      <footer className="border-t-3 border-cocoa bg-sand">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6 text-sm sm:px-6">
          <span className="font-display text-2xl">ifu</span>
          <p>Ifu Bakehouse is a concept project. The bakery, prices and number are made up.</p>
          <p className="sm:ml-auto">Designed and built by Chris Hirwa</p>
        </div>
      </footer>
      <BasketDrawer />
      <Toast />
    </BasketProvider>
  );
}
