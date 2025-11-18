import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MaturityLevels } from "@/components/landing/MaturityLevels";
import { FAQ } from "@/components/landing/FAQ";
import { SvgShapes } from "@/components/landing/SvgShapes";
import { useHomeData } from "@/hooks/useHomeData";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import { AuthDebugLogs } from "@/components/debug/AuthDebugLogs";

const SectionSkeleton = ({ height = 300 }: { height?: number }) => (
  <section className="w-full px-4 pb-16 z-10">
    <div className="container mx-auto">
      <Skeleton className={`w-full rounded-xl`} style={{ height }} />
    </div>
  </section>
);

interface HomePageProps {
  previewToken?: string;
}

const HomePage: React.FC<HomePageProps> = ({ previewToken }) => {
  const { data, loading, error } = useHomeData(previewToken);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background hero-cut-section">
          <SvgShapes />
          <section className="mx-auto px-4 pb-16">
            <div className='hero-cut-section absolute left-0 w-full lg:h-3/4 md:h-full z-0'></div>
            <section className="container mx-auto z-10 relative ">
              <SectionSkeleton height={400} />
            </section>
          </section>
          <SectionSkeleton height={320} />
          <SectionSkeleton height={320} />
          <SectionSkeleton height={320} />
          <SectionSkeleton height={320} />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <span className="text-lg text-red-600">Erro ao carregar dados: {error}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <SvgShapes />
        <section className="mx-auto px-4 xl:pb-16 lg:pb-6">
          <div className='bg-primary absolute left-0 w-full hero-cut-section z-0'></div>
          <section className="container mx-auto z-10 relative" id="hero">
            <Hero 
              data={data?.hero}
              loading={loading}
              error={error}
            />
          </section>
        </section>
        <section className="w-full px-4 xl:pb-16 lg:pb-6 z-10 hero-background-shapes" id="beneficios">
          <Benefits 
            data={data?.benefits}
            loading={loading}
            error={error}
          />
        </section>
        <section className="w-full px-4 xl:pb-16 lg:pb-6 z-10" id="como-funciona">
          <HowItWorks 
            data={data?.howItWorks}
            loading={loading}
            error={error}
          />
        </section>
        <section className="w-full px-4 xl:pb-16 lg:pb-6 z-10" id="niveis-maturidade">
          <MaturityLevels
            data={data?.maturityLevels}
            heroData={data?.hero}
            loading={loading}
            error={error}
          />
        </section>
        <section className="w-full px-4 xl:pb-16 lg:pb-6 z-10" id="faq">
          <FAQ 
            data={data?.faq}
            loading={loading}
            error={error}
          />
        </section>
        
        {/* Debug Logs - apenas em desenvolvimento */}
        {import.meta.env.DEV && <AuthDebugLogs />}
      </div>
    </Layout>
  );
};

export default HomePage; 