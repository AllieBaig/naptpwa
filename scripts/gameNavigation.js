/*
MIT License

Copyright (c) 2025 AllieBaig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const modeMap = {
  regular: './modes/regular.js',
  wordRelic: './modes/wordRelic.js',
  safari: './modes/safari.js',
  dice: './modes/dice.js',
  atlas: './modes/atlas.js',
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
