import Logo from "./Logo";

export default function Nav() {
  return (
    <div className="w-full flex justify-center items-center">
      <nav className="w-full max-w-7xl flex p-4 sm:px-12 sm:py-6 h-fit">
        <Logo />
      </nav>
    </div>
  );
}
