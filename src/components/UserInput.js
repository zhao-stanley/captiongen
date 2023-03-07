export default function UserInput({ text, setText }) {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Trip to the Bahamas, swam with some dolphins and drank from a coconut!"
      className="transition ease-linear w-full h-full min-h-[20vh] text-xs placeholder:text-xs border-2 border-gray-200 focus-within:border-gray-900 outline-none rounded-lg p-2"
    />
  );
}
