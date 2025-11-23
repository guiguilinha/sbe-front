import React from "react";
import QuizContainer from "@/components/quiz/QuizContainer";
import { useQuizData } from "@/hooks/useQuizData";
import { Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface QuizPageProps {
  previewToken?: string;
}

const QuizPage: React.FC<QuizPageProps> = ({ previewToken }) => {
  const { data, loading, error } = useQuizData(previewToken);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Carregando quiz...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar quiz: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Nenhuma pergunta disponível</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 overflow-y-auto flex flex-col">
        <div className="container mx-auto px-4 max-w-4xl py-8 flex-1 flex flex-col">
          <QuizContainer 
            data={data}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage; 
