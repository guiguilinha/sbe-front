import type { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDashboard } from '@/hooks/useDashboard';
import { useHomeData } from '@/hooks/useHomeData';
import { fixDirectusImageUrl } from '@/utils/imageUtils';
import Footer from './Footer';

export default function DashboardShell({ children }: PropsWithChildren) {
  const location = useLocation();
  const { data: dashboardData } = useDashboard();
  const { data: homeData } = useHomeData();
  
  // Dados do usuário
  const userName = dashboardData?.user?.name || 'Usuário';
  const userLevel = dashboardData?.overallLevel?.label || 'Iniciante digital';
  
  // Obter imagem do nível a partir dos dados da homepage
  const getLevelImage = (levelLabel: string) => {
    if (!homeData?.maturityLevels?.cards) return '/broto_iniciante.png';
    
    const levelCard = homeData.maturityLevels.cards.find(card => 
      card.title?.toLowerCase().includes(levelLabel.toLowerCase().split(' ')[0])
    );
    
    return levelCard?.image ? fixDirectusImageUrl(levelCard.image) : '/broto_iniciante.png';
  };
  
  const levelImage = getLevelImage(userLevel);
  
  // Links de navegação
  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Refazer diagnóstico', path: '/quiz' },
    { label: 'Histórico', path: '/historico' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-10">
              {/* Logo Sebrae */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <img 
                    src="/logo-sebrae-mg.svg" 
                    alt="Sebrae MG" 
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              {/* Links de Navegação */}
              <nav className="hidden md:flex justify-start space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      location.pathname === link.path 
                        ? 'text-blue-600' 
                        : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Informações do Usuário */}
            <div className="flex items-center space-x-3">
              <div className="text-right flex items-end">
                <div className="text-sm text-gray-600">
                  Olá, {userName}<br/>
                  <span className="text-sm font-medium text-gray-800">{userLevel}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <img 
                    src={levelImage} 
                    alt={userLevel}
                    className="ml-2 h-10 w-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
