import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b py-3 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="evellacreates logo"
          width={250}
          height={40}
          priority
        />
      </div>

      <nav className="hidden md:flex items-center space-x-8 text-primary font-semibold">
        <Link href="#services" className="hover:text-secondary">
          Services
        </Link>
        <Link href="#about" className="hover:text-secondary">
          Why Human?
        </Link>
        <Link
          href="#contact"
          className="bg-primary text-cream px-6 py-2 rounded-full hover:bg-secondary transition-all"
        >
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
