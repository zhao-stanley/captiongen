export default function randomBlurb() {
  const lines = [
    "Here are your captions!",
    "Captions, fresh out of the oven!",
    "Get your captions!",
    "Hmm, what's this?",
    "Please laugh :(",
    "Enjoy your captions!",
    "Vercel ❤️",
    "Have a good day!",
    "Give this a star on GitHub!",
  ];

  return lines[Math.floor(Math.random() * lines.length)];
}
