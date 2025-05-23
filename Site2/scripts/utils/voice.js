// scripts/utils/voice.js

// MIT License
// Copyright (c) 2025 AllieBaig
// https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

/**
 * Speaks the given text using the Web Speech API.
 * Only speaks if 'Voice Instructions' is enabled in settings.
 * @param {string} text - The text to speak.
 */
export function speak(text) {
  // Check if voice instructions are enabled via localStorage setting
  const voiceEnabled = localStorage.getItem('napt-voiceHelp') === 'true';

  if (!voiceEnabled) {
    // console.log("Voice instructions are disabled."); // For debugging
    return;
  }

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    // You can customize properties like voice, pitch, rate if needed
    // utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
    // utterance.pitch = 1;
    // utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech synthesis not supported in this browser.");
  }
}

// Example usage (optional, for testing in console, but not for direct execution on module load)
// If you had a button to test it:
// document.getElementById('testVoiceBtn')?.addEventListener('click', () => {
//   speak("Hello, this is a test of voice instructions.");
// });
