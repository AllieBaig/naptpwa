// MIT License © AllieBaig
// Word Atlas Mode – Location-aware prompts + global answers

// Import helper functions
import { getUserLocation } from '../utils/location.js';
import { saveDailyAnswer } from '../utils/storage.js';

// <----------------- before this line - Initialize mode entry point
export default async function init() {
  // <----------------- before this line - Inject base UI
  const container = document.getElementById('mode-container');
  container.innerHTML = `<h2>🌍 Word Atlas</h2>`;

  const todayLetter = new Date().toDateString()[0].toUpperCase();

  try {
    // <----------------- before this line - Try to get user's geolocation
    const coords = await getUserLocation();

    // <----------------- before this line - Generate prompt using location and letter
    const prompt = `Place near you starting with “${todayLetter}”`;
    container.innerHTML += `<p>${prompt}</p>`;

    // <----------------- before this line - Inject input and buttons
    container.innerHTML += `
      <input type="text" id="atlasAnswer" placeholder="Your answer..." />
      <button id="submitAnswer">Submit</button>
      <button id="showAnswers">Show World Answers</button>
      <div id="globalAnswers"></div>
    `;

    // <----------------- before this line - Submit button handler
    document.getElementById('submitAnswer').onclick = () => {
      const answer = document.getElementById('atlasAnswer').value.trim();
      if (answer) {
        saveDailyAnswer('atlas', answer);
        container.innerHTML += `<p>Saved: ${answer}</p>`;
      }
    };

    // <----------------- before this line - Show World Answers button handler
    document.getElementById('showAnswers').onclick = () => {
      const answers = ['Madrid', 'Moscow', 'Manila'];
      const html = answers.map(a =>
        `<li><span class="word" data-word="${a}">${a}</span> 
         <img src="https://flagcdn.com/w40/es.png" alt="Flag" /></li>`
      ).join('');
      document.getElementById('globalAnswers').innerHTML = `<ul>${html}</ul>`;
    };

  } catch (err) {
    // <----------------- before this line - Fallback if geolocation fails
    const fallbackPrompts = [
      'Place starting with A',
      'Country ending in N',
      'City with 5 letters'
    ];
    const fallback = fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)];
    container.innerHTML += `<p>${fallback} (offline)</p>`;
  }
}

