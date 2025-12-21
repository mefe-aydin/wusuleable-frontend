import { SiteLayout } from "@/layouts/SiteLayout";

export default function DashboardPage() {
  return (
    <SiteLayout>
      <section className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">
          Bu sayfa demo amaçlı. Sonraki adımda login/abonelik ve site ayarları
          ekranlarını buraya bağlayacağız.
        </p>
      </section>
    </SiteLayout>
  );
}


