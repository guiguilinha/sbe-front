import React from "react";
import QuizContainer from "@/components/quiz/QuizContainer";
import { useQuizData } from "@/hooks/useQuizData";
import { Loader2 } from "lucide-react";

interface QuizPageProps {
  previewToken?: string;
}

const QuizPage: React.FC<QuizPageProps> = ({ previewToken }) => {
  const { data, loading, error } = useQuizData(previewToken);

  if (loading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
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
    );
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Nenhuma pergunta disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 md:h-[calc(100vh-258px)] sm:h-full">
      <div className="container mx-auto px-4 max-w-4xl h-full">
        <QuizContainer 
          data={data}
        />
      </div>
    </div>
  );
};

export default QuizPage; 
