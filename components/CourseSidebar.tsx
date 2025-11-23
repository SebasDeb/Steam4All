import React from 'react';
import { X } from 'lucide-react';
import { LessonStep } from '../types';

interface CourseSidebarProps {
  lessons: LessonStep[];
  currentStepIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (index: number) => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  lessons,
  currentStepIndex,
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  return (
    <div 
      className={`
        absolute lg:relative z-20 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        transition-all duration-300 ease-in-out overflow-hidden flex flex-col
        ${isOpen ? 'w-full lg:w-72 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full lg:translate-x-0 lg:w-0'}
      `}
    >
      <div className="p-4 overflow-y-auto flex-1 w-full lg:w-72">
        <div className="mb-6 lg:hidden flex justify-between items-center">
          <h3 className="font-bold text-lg text-primary dark:text-white">Curriculum</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400"><X size={20} /></button>
        </div>
        <div className="space-y-1 min-w-[16rem]">
          {lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => {
                onSelectLesson(idx);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`
                w-full text-left px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-start group
                ${idx === currentStepIndex 
                  ? 'bg-accent text-white shadow-md shadow-accent/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 shrink-0 transition-colors mt-0.5
                ${idx === currentStepIndex 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}
              `}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-semibold">{lesson.title}</div>
                {idx === currentStepIndex && lesson.description && (
                  <div className="text-xs text-white/90 mt-1 whitespace-normal leading-relaxed font-normal">
                    {lesson.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};