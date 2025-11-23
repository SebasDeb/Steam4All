import React from 'react';
import { Button } from '../components/Button';
import { FEATURES, PYTHON_COURSE } from '../constants';
import { ArrowRight, Globe, CheckCircle } from 'lucide-react';
import { HeroIllustration, StudentIllustration, IconGift, IconBot, IconCommunity } from '../components/Illustrations';


interface LandingProps {
  onStartCourse: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStartCourse }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cream dark:bg-gray-900 py-16 sm:py-24 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-light/30 dark:bg-accent-light/10 text-accent font-medium text-sm">
                <Globe size={16} className="mr-2" />
                Sustainable Development Goal 5: Gender Equality
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-primary dark:text-white transition-colors duration-200">
                Coding for a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Balanced Future.</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg transition-colors duration-200">
                Steam4All bridges the gender gap in technology through free, accessible education. 
                Learn Python with our interactive AI tutor and join a diverse community of creators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={onStartCourse} variant="secondary" size="lg">
                  Start Learning Python <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Read Our Mission
                </Button>
              </div>
            
            </div>
            
            <div className="order-1 lg:order-2 relative flex justify-center">
              {/* Illustration */}
              <HeroIllustration className="w-full max-w-lg h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary dark:text-white mb-4 transition-colors duration-200">Why Steam4All?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">We are committed to creating an inclusive environment where everyone has the opportunity to thrive in STEAM fields.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-cream dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-32 h-32 mb-6 flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                   {feature.icon === 'Gift' && <IconGift className="w-full h-full" />}
                   {feature.icon === 'Bot' && <IconBot className="w-full h-full" />}
                   {feature.icon === 'Users' && <IconCommunity className="w-full h-full" />}
                </div>
                <h3 className="text-xl font-bold text-primary dark:text-white mb-3 transition-colors duration-200">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="py-24 bg-primary dark:bg-gray-950 text-white overflow-hidden relative transition-colors duration-200">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div>
                <span className="text-accent font-bold tracking-wider text-sm uppercase">Interactive Learning</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 mb-6">{PYTHON_COURSE.title}</h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {PYTHON_COURSE.description} Designed for absolute beginners, this course breaks down complex concepts into bite-sized, interactive lessons.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    <span>Integrated Code Editor - Type & Run instantly</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    <span>Real-time feedback on your logic</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-accent mr-3" size={20} />
                    <span>Designed for inclusivity and accessibility</span>
                  </div>
                </div>
                <Button variant="secondary" onClick={onStartCourse}>
                  Start Free Course Now
                </Button>
             </div>
             <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent to-blue-600 rounded-full opacity-20 filter blur-3xl transform scale-90"></div>
                <StudentIllustration className="relative z-10 w-full max-w-md hover:-translate-y-2 transition-transform duration-300" />
             </div>
           </div>
         </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-cream dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary dark:text-white font-serif font-bold text-2xl mb-4 transition-colors duration-200">Steam4All.</p>
          <div className="flex justify-center space-x-6 mb-8 text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-accent">About</a>
            <a href="#" className="hover:text-accent">Curriculum</a>
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Contact</a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 Steam4All Initiative. Contributing to United Nations SDG 5.</p>
        </div>
      </footer>
    </div>
  );
};