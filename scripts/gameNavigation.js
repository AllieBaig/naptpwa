const modeMap = {
  regular: './scripts/modes/regular.js',
  wordRelic: './scripts/modes/wordRelic.js',
  safari: './scripts/modes/safari.js',
  dice: './scripts/modes/dice.js',
  atlas: './scripts/modes/atlas.js',
};

export function showMenu() {
  document.getElementById('menu').classList.add('active');
  document.getElementById('game').classList.remove('active');
  document.getElementById('game').innerHTML = '';
}

export async function navigateToMode(mode) {
  if (!modeMap[mode]) return console.error(`Mode ${mode} not found`);
  const module = await import(modeMap[mode]);
  module.init({ showMenu });
}
