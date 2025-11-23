import React, { useRef } from 'react';
import { Play, RotateCcw, MessageCircle, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  output: string;
  isOutputError: boolean;
  isRunning: boolean;
  onRun: () => void;
  onReset: () => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  output,
  isOutputError,
  isRunning,
  onRun,
  onReset,
  onToggleChat,
  isChatOpen,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Sync scroll between textarea and pre block
  const handleEditorScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Handle Tab key in textarea to insert 4 spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const spaces = "    ";
      const value = code.substring(0, start) + spaces + code.substring(end);
      
      setCode(value);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const getHighlightedCode = () => {
    if (typeof window !== 'undefined' && window.Prism) {
      try {
        return window.Prism.highlight(code, window.Prism.languages.python, 'python');
      } catch (e) {
        // Fallback
      }
    }
    return escapeHtml(code);
  };

  const editorFont = {
    fontFamily: '"Fira Code", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
    lineHeight: '1.625',
    fontSize: '14px',
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] relative h-full">
      {/* Editor Toolbar */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center text-gray-300 text-xs shrink-0 z-20 relative">
         <div className="flex items-center space-x-2">
           <div className="w-3 h-3 rounded-full bg-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500"></div>
           <span className="ml-2 font-mono opacity-50">main.py</span>
         </div>
         <div className="flex items-center space-x-3">
            <button 
              onClick={onToggleChat}
              className={`flex items-center px-3 py-1 rounded transition-colors ${isChatOpen ? 'bg-accent text-white' : 'hover:bg-[#3d3d3d]'}`}
            >
              <MessageCircle size={14} className="mr-1" />
              AI Tutor
            </button>
            <button 
              onClick={onReset}
              className="flex items-center hover:text-white transition-colors"
              title="Reset Code"
            >
              <RotateCcw size={14} className="mr-1" />
              Reset
            </button>
         </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 relative group bg-[#1e1e1e] overflow-hidden">
        <pre
          ref={preRef}
          className="absolute inset-0 w-full h-full p-4 m-0 overflow-hidden pointer-events-none custom-scrollbar bg-[#1e1e1e] text-white"
          aria-hidden="true"
          style={{ ...editorFont, whiteSpace: 'pre' }}
        >
          <code
            className="language-python"
            dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
          />
        </pre>

        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleEditorScroll}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white focus:outline-none custom-scrollbar z-10 overflow-auto resize-none"
          style={{ ...editorFont, whiteSpace: 'pre', color: 'transparent' }}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>

      {/* Action Bar */}
      <div className="h-16 bg-[#252526] border-t border-[#3e3e42] flex items-center px-4 justify-between shrink-0 z-20 relative">
         <div className="text-gray-400 text-xs">
           Python 3.10 (Simulated)
         </div>
         <Button 
           onClick={onRun} 
           isLoading={isRunning} 
           variant="secondary"
           className="!py-2 !px-6"
         >
           <Play size={16} className="mr-2 fill-current" /> Run Code
         </Button>
      </div>

      {/* Console Output */}
      <div className="h-48 bg-[#1e1e1e] border-t border-[#3e3e42] p-4 overflow-y-auto font-mono text-sm shrink-0 z-20 relative">
        <div className="text-gray-500 text-xs mb-2 uppercase tracking-wider font-bold">Terminal Output</div>
        {output ? (
          <pre className={`whitespace-pre-wrap ${isOutputError ? 'text-red-400' : 'text-green-400'}`}>
            {isOutputError && <AlertTriangle size={14} className="inline mr-2 mb-1" />}
            {output}
          </pre>
        ) : (
          <div className="text-gray-600 italic">Click "Run Code" to see the output here...</div>
        )}
      </div>
    </div>
  );
};