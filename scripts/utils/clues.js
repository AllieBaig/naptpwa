// scripts/utils/clues.js

// Example: relicClues data (ensure your actual data is here)
export const relicClues = [
  { clues: ['sun', 'moon', 'stars', 'planets'], answer: 'space' },
  { clues: ['red', 'blue', 'yellow', 'green'], answer: 'colors' },
  // ... add all your Word Relic clues here
];

// Example: safariPrompts data (ensure your actual data is here)
export const safariPrompts = {
  animals: ['lion', 'tiger', 'bear'],
  objects: ['table', 'chair', 'lamp'],
  // ... add all your Word Safari prompts here
};

// This is the missing export:
// You need to implement the logic for 'getEasyHintOptions' based on how you want hints to work.
// It should return an array of options suitable for an "easy hint".
export function getEasyHintOptions(correctAnswer, allPossibleAnswers = []) {
  console.warn("`getEasyHintOptions` in clues.js is a placeholder. Please implement its logic.");
  
  // Example placeholder logic:
  // For a multiple-choice hint, you might combine the correct answer with a few incorrect ones.
  // For a letter-based hint, you might return letters from the correct answer.
  
  const options = [correctAnswer]; // Always include the correct answer
  
  // Add some dummy incorrect options for demonstration
  // In a real scenario, you'd generate these smartly.
  if (allPossibleAnswers.length > 0) {
      const incorrects = allPossibleAnswers.filter(ans => ans !== correctAnswer);
      // Take a few random incorrects if available
      for(let i = 0; i < 3 && incorrects.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * incorrects.length);
          options.push(incorrects.splice(randomIndex, 1)[0]);
      }
  } else {
      // Fallback if no allPossibleAnswers are provided
      options.push('Incorrect Option 1', 'Incorrect Option 2');
  }

  // Shuffle the options to make the correct answer's position random
  return options.sort(() => Math.random() - 0.5);
}

// If you also have 'getMediumHintOptions' or 'getHardHintOptions' for different difficulties,
// you'll need to export those from this file too.

