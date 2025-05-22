

// MIT License – AllieBaig – https://github.com/AllieBaig/naptpwa/blob/main/LICENSE

export const emojiRelics = [
  { name: "Feather of Flight", emoji: "🪶" },
  { name: "Ancient Compass", emoji: "🧭" },
  { name: "Scroll of Secrets", emoji: "📜" },
  { name: "Crystal of Time", emoji: "🔮" },
  { name: "Lucky Fang", emoji: "🦷" },
  { name: "Leaf Crown", emoji: "🍃" },
  { name: "Star Map", emoji: "🗺️" },
  { name: "Runestone", emoji: "🪨" },
  { name: "Sun Talisman", emoji: "☀️" },
  { name: "Wind Charm", emoji: "🌀" }
];

export function getRandomRelic() {
  return emojiRelics[Math.floor(Math.random() * emojiRelics.length)];
}

