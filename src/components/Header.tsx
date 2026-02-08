import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div>
        <h1 className="text-primary font-bold text-2xl">
          evella<span className="text-secondary">creates</span>
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
          Professional Human Writing
        </p>
      </div>

      <nav className="hidden md:flex space-x-6 text-primary font-medium">
        <Link href="#services">Services</Link>
        <Link href="#testimonials">Testimonials</Link>
        <Link
          href="#contact"
          className="bg-primary text-cream px-5 py-2 rounded-md hover:bg-secondary transition"
        >
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
