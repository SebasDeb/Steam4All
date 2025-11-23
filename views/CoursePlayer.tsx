import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { PYTHON_COURSE } from '../constants';
import { runPythonCode, getAIHelp } from '../services/geminiService';
import { ChevronRight, Check, ChevronLeft, List, Award, Home, RotateCcw, X } from 'lucide-react';
import { ChatMessage, ViewState } from '../types';
import { StudentIllustration } from '../components/Illustrations';
import { CourseSidebar } from '../components/CourseSidebar';
import { CodeEditor } from '../components/CodeEditor';
import { ChatInterface } from '../components/ChatInterface';

// Declare Prism on window for TypeScript
declare global {
  interface Window {
    Prism: any;
  }
}

interface CoursePlayerProps {
  onNavigate: (view: ViewState) => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ onNavigate }) => {
  // Initialize from localStorage with bounds checking
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const saved = localStorage.getItem('steam4all_course_progress');
    const parsed = saved ? parseInt(saved, 10) : 0;
    return isNaN(parsed) ? 0 : Math.min(Math.max(0, parsed), PYTHON_COURSE.lessons.length - 1);
  });

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isOutputError, setIsOutputError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const currentLesson = PYTHON_COURSE.lessons[currentStepIndex];

  // Validation Logic
  const isTaskSuccess = Boolean(
    !isOutputError && 
    currentLesson.expectedOutputKeyword && 
    output.includes(currentLesson.expectedOutputKeyword)
  );

  const canProceed = !currentLesson.expectedOutputKeyword || isTaskSuccess;

  // Progress Calculation
  const totalLessons = PYTHON_COURSE.lessons.length;
  const progressPercentage = Math.min(100, ((currentStepIndex + (isTaskSuccess ? 1 : 0)) / totalLessons) * 100);

  // Persist progress
  useEffect(() => {
    localStorage.setItem('steam4all_course_progress', currentStepIndex.toString());
  }, [currentStepIndex]);

  // Reset state on lesson change
  useEffect(() => {
    if (!isCourseCompleted) {
      setCode(currentLesson.initialCode);
      setOutput('');
      setIsOutputError(false);
      setChatMessages([{ role: 'model', text: `Hi! I'm your AI tutor. Ask me anything about this lesson on "${currentLesson.title}".` }]);
    }
  }, [currentStepIndex, currentLesson, isCourseCompleted]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    const result = await runPythonCode(code);
    setOutput(result.output);
    setIsOutputError(result.isError);
    setIsRunning(false);
  };

  const handleSendMessage = async (text: string) => {
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setIsChatLoading(true);
    const helpText = await getAIHelp(code, text);
    setChatMessages(prev => [...prev, { role: 'model', text: helpText }]);
    setIsChatLoading(false);
  };

  const nextLesson = () => {
    if (!canProceed) return;
    if (currentStepIndex < PYTHON_COURSE.lessons.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCourseCompleted(true);
    }
  };

  const prevLesson = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  // Render Completion View
  if (isCourseCompleted) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center bg-cream dark:bg-gray-900 p-4 text-center animate-fade-in transition-colors duration-200">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
          <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={48} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-primary dark:text-white mb-4">
            Congratulations!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            You've successfully completed <strong>{PYTHON_COURSE.title}</strong>. 
            You've taken the first step towards mastering Python and contributing to a more equal future in tech.
          </p>
          
          <div className="relative mb-12">
             <StudentIllustration className="w-48 h-48 mx-auto" />
             <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
             <div className="absolute top-4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
             <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate(ViewState.LANDING)} variant="secondary" size="lg">
              <Home size={20} className="mr-2" /> Back to Home
            </Button>
            <Button onClick={() => { setIsCourseCompleted(false); setCurrentStepIndex(0); }} variant="outline" size="lg">
              <RotateCcw size={20} className="mr-2" /> Restart Course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-200">
      {/* Course Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center shrink-0 transition-colors duration-200 z-30 relative">
        <div className="flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X size={20} /> : <List size={20} />}
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <span className="text-accent mr-2 hidden sm:inline">{PYTHON_COURSE.title}</span> 
              <span className="text-gray-300 mx-2 hidden sm:inline">/</span>
              {currentLesson.title}
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            Step {currentStepIndex + 1} of {PYTHON_COURSE.lessons.length}
          </div>
          <div className="flex space-x-2">
             <button 
                onClick={prevLesson}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
             >
               <ChevronLeft size={20} />
             </button>
             <button 
                onClick={nextLesson}
                disabled={!canProceed}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title={!canProceed ? "Complete the task to proceed" : (currentStepIndex === PYTHON_COURSE.lessons.length - 1 ? "Finish Course" : "Next Lesson")}
             >
               {currentStepIndex === PYTHON_COURSE.lessons.length - 1 ? <Check size={20} /> : <ChevronRight size={20} />}
             </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
          <div 
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Sidebar Component */}
        <CourseSidebar 
          lessons={PYTHON_COURSE.lessons}
          currentStepIndex={currentStepIndex}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectLesson={setCurrentStepIndex}
        />

        {/* Left Panel: Instructions */}
        <div className="w-full lg:w-1/3 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 transition-colors duration-200">
           <div className="prose prose-slate dark:prose-invert prose-headings:font-serif prose-a:text-accent max-w-none">
             {currentLesson.instruction.split('\n').map((line, i) => {
               if (line.startsWith('###')) return <h3 key={i} className="text-2xl font-bold mb-4">{line.replace('###', '')}</h3>;
               if (line.startsWith('**Task')) return <strong key={i} className="block mt-6 mb-2 text-primary dark:text-white">{line.replace(/\*\*/g, '')}</strong>;
               if (line.trim().startsWith('1.') || line.trim().startsWith('2.') || line.trim().startsWith('3.') || line.trim().startsWith('4.')) {
                 return <div key={i} className="flex gap-2 ml-4 mb-2"><span className="font-bold text-accent">•</span><span>{line.replace(/^\d\.\s/, '').replace(/`/g, '"')}</span></div>;
               }
               return <p key={i} className="mb-4 text-gray-600 dark:text-gray-300">{line.replace(/`/g, '')}</p>;
             })}
           </div>

           {isTaskSuccess && (
             <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-fade-in">
               <div className="flex items-start">
                 <Check className="text-green-600 dark:text-green-400 mt-1 mr-3" size={20} />
                 <div>
                   <h4 className="font-bold text-green-800 dark:text-green-300">Great job!</h4>
                   <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                     {currentStepIndex === PYTHON_COURSE.lessons.length - 1 
                       ? "You've finished the last lesson! Click 'Finish' to wrap up." 
                       : "You've mastered this step. Ready to move on?"}
                   </p>
                   <Button 
                    size="sm" 
                    className="mt-3 bg-green-600 hover:bg-green-700 text-white"
                    onClick={nextLesson}
                   >
                     {currentStepIndex === PYTHON_COURSE.lessons.length - 1 ? "Finish Course" : "Next Lesson"}
                   </Button>
                 </div>
               </div>
             </div>
           )}
        </div>

        {/* Right Panel: Editor & Chat */}
        <div className="flex-1 flex flex-col relative h-full overflow-hidden">
          <CodeEditor 
            code={code}
            setCode={setCode}
            output={output}
            isOutputError={isOutputError}
            isRunning={isRunning}
            onRun={handleRunCode}
            onReset={() => setCode(currentLesson.initialCode)}
            onToggleChat={() => setShowChat(!showChat)}
            isChatOpen={showChat}
          />

          {showChat && (
            <ChatInterface 
              messages={chatMessages}
              isLoading={isChatLoading}
              onSendMessage={handleSendMessage}
              onClose={() => setShowChat(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};