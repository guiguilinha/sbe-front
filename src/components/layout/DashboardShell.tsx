import type { PropsWithChildren } from 'react';
import Footer from './Footer';
import { DashboardHeader } from './DashboardHeader';

export default function DashboardShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header compartilhado */}
      <DashboardHeader />

      {/* Conteúdo Principal */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
