import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import CourseCard from '../layout/CourseCard';

interface ResultsCoursesProps {
  contentSection: {
    "content-title": string;
    "content-text": string;
    "content-general-level": string;
    "content-courses": Array<{
      "content-course-title": string;
      "content-course-description": string;
      "content-course-image": string;
      "content-course-image_alt": string;
      "content-course-link": string;
      "content-course-levels": (string | number)[];
      "content-course-categories": (string | number)[];
    }>;
  };
}

const ResultsCourses: React.FC<ResultsCoursesProps> = ({ contentSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const courses = contentSection["content-courses"] || [];
  const hasMoreCourses = courses.length > 2;
  const initialCourses = courses.slice(0, 2);
  const additionalCourses = courses.slice(2);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <div className="text-start mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          {contentSection["content-title"]}
        </h2>
        <p className="text-gray-600 mb-4">
          {contentSection["content-text"]} <span className='font-bold text-blue-600 text-lg'>{contentSection["content-general-level"]}</span>
        </p>
      </div>

      {courses.length > 0 && (
        <>
          {/* Grid principal - sempre mostra apenas os 2 primeiros cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initialCourses.map((course, index) => (
              <CourseCard
                key={index}
                title={course["content-course-title"]}
                description={course["content-course-description"]}
                image={course["content-course-image"]}
                imageAlt={course["content-course-image_alt"]}
                link={course["content-course-link"]}
                levels={course["content-course-levels"]}
                categories={course["content-course-categories"]}
                category={course["content-course-categories"]?.[0] as string}
              />
            ))}
          </div>

          {/* Cursos adicionais com animação - apenas quando expandido */}
          {hasMoreCourses && (
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {additionalCourses.map((course, index) => (
                      <motion.div
                        key={index + 2}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <CourseCard
                          title={course["content-course-title"]}
                          description={course["content-course-description"]}
                          image={course["content-course-image"]}
                          imageAlt={course["content-course-image_alt"]}
                          link={course["content-course-link"]}
                          levels={course["content-course-levels"]}
                          categories={course["content-course-categories"]}
                          category={course["content-course-categories"]?.[0] as string}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Botão de expandir/recolher - sempre no final */}
          {hasMoreCourses && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-8"
            >
              <button
                onClick={handleToggleExpansion}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
              >
                <span>
                  {isExpanded 
                    ? `Ver menos cursos` 
                    : `Veja todos os ${courses.length} conteúdos`
                  }
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  ) : (
                    <ChevronDown className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </motion.div>
              </button>
            </motion.div>
          )}
        </>
      )}

      {courses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-500">
            Nenhum curso disponível no momento.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ResultsCourses; 