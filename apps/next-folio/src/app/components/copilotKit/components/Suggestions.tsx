'use client';
import { useCopilotContext } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { INSTRUCTIONS } from '../useReadable';

interface Suggestion {
  title: string;
  action: () => void;
}

const sig = `[ Suggestions ] ::: `;

export const Suggestions = () => {
  const [mounted, setMounted] = useState(false);
  const copilotContext = useCopilotContext();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    console.log(sig, '🔄 Component mounted');
    setMounted(true);
  }, []);

  const result = useCopilotChatSuggestions({
    instructions: INSTRUCTIONS.chatSuggestions,
    minSuggestions: 2,
    maxSuggestions: 18,
    available: "enabled"
  });
  useEffect(() => {
    const fetchSuggestions = () => {
      try {
        console.log(sig, '📝 Raw result:', result);
        if (result && typeof result === 'object' && 'suggestions' in result) {
          setSuggestions((result as { suggestions: Suggestion[] }).suggestions);
        }
      } catch (error) {
        console.error(sig, '❌ Error fetching suggestions:', error);
      }
    };

    if (mounted) {
      fetchSuggestions();
    }
  }, [mounted]);

  useEffect(() => {
    console.log(sig, '📝 Suggestions:', suggestions);
  }, [suggestions]);

  // Group suggestions into rows
  const suggestionRows = [
    suggestions.slice(0, 3),  // Row 1
    suggestions.slice(3, 6),  // Row 2
    suggestions.slice(6, 9),  // Row 3
    suggestions.slice(9, 12), // Row 4
    suggestions.slice(12, 15), // Row 5
    suggestions.slice(15, 18), // Row 6
  ];

  if (!mounted) {
    console.log(sig, '⏳ Component not yet mounted');
    return null;
  }

  console.log(sig, '🎨 Rendering with rows:', suggestionRows);

  return (
    <div className="grid grid-rows-6 h-full gap-4 p-4">
      {suggestionRows.map((rowSuggestions, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="flex gap-4 items-center"
          initial={{ 
            x: rowIndex % 2 === 0 ? -100 : 100,
            opacity: 0 
          }}
          animate={{ 
            x: 0,
            opacity: 1 
          }}
          transition={{ 
            delay: rowIndex * 0.1,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {rowSuggestions.map((suggestion: Suggestion, index: number) => (
            <motion.button
              key={index}
              className="flex-1 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 
                         text-blue-200 rounded-lg text-sm font-medium 
                         transition-colors duration-200 truncate"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => suggestion.action()}
            >
              {suggestion.title}
            </motion.button>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
