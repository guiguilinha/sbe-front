import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { fixDirectusImageUrl } from '../../utils';

interface CourseCardProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  levels?: (string | number)[];
  categories?: (string | number)[];
  category?: string;
  onClick?: () => void;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  imageAlt,
  link,
  levels = [],
  category,
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const getLevelTagColor = (level: string) => {
    const levelColors: { [key: string]: string } = {
      'Iniciante': 'bg-green-100 text-green-800',
      'Aprendiz': 'bg-yellow-100 text-yellow-800',
      'Empreendedor': 'bg-blue-100 text-blue-800',
      'Inovador': 'bg-purple-100 text-purple-800',
    };
    return levelColors[level] || 'bg-gray-100 text-gray-800';
  };

  const getFirstWord = (text: string): string => {
    return text.split(' ')[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group ${className}`}
      onClick={handleClick}
    >
      <div className="flex h-56">
        {/* Seção Visual (1/3) */}
        <div className="w-1/3 relative overflow-hidden">
          {image ? (
            <div className="relative w-full h-full">
              <img
                src={fixDirectusImageUrl(image)}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('❌ Erro ao carregar imagem do curso:', image);
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
          )}
        </div>

        {/* Seção de Conteúdo (2/3) */}
        <div className="w-2/3 py-2 px-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Categoria */}
            {category && (
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {category}
              </div>
            )}

            {/* Título */}
            <h3 className="text mt-0 font-semibold text-gray-700 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>

            {/* Tags de Níveis */}
            {levels && levels.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {levels.slice(0, 4).map((level, levelIndex) => (
                  <span
                    key={levelIndex}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelTagColor(getFirstWord(String(level)))}`}
                  >
                    {getFirstWord(String(level))}
                  </span>
                ))}
              </div>
            )}

            {/* Descrição */}
            <p className="text-xs text-gray-600 line-clamp-2">
              {description}
            </p>
          </div>

          {/* Link de acesso */}
          {(link || onClick) && (
            <div className="flex items-center text-blue-600 group-hover:text-blue-800 font-regular text-sm transition-colors mt-3">
              Veja mais
              <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard; 