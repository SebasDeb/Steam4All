import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Landing } from './views/Landing';
import { CoursePlayer } from './views/CoursePlayer';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 font-sans transition-colors duration-300">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main>
        {currentView === ViewState.LANDING && (
          <Landing onStartCourse={() => setCurrentView(ViewState.COURSE_PLAYER)} />
        )}
        
        {currentView === ViewState.COURSE_PLAYER && (
          <CoursePlayer onNavigate={setCurrentView} />
        )}
      </main>
    </div>
  );
}

export default App;