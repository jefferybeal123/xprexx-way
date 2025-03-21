
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-kargon-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className={`ml-2 font-display font-bold text-xl ${isScrolled ? 'text-kargon-dark' : 'text-white'}`}>
                KARGON
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className={`nav-link font-medium ${isScrolled ? 'text-kargon-dark' : 'text-white'} hover:text-kargon-red`}>
              HOME
            </a>
            <a href="/about" className={`nav-link font-medium ${isScrolled ? 'text-kargon-dark' : 'text-white'} hover:text-kargon-red`}>
              ABOUT
            </a>
            <a href="/services" className={`nav-link font-medium ${isScrolled ? 'text-kargon-dark' : 'text-white'} hover:text-kargon-red`}>
              SERVICES
            </a>
            <a href="/projects" className={`nav-link font-medium ${isScrolled ? 'text-kargon-dark' : 'text-white'} hover:text-kargon-red`}>
              PROJECTS
            </a>
            <a href="/blog" className={`nav-link font-medium ${isScrolled ? 'text-kargon-dark' : 'text-white'} hover:text-kargon-red`}>
              BLOG
            </a>
            <a href="/contact" className={`nav-link font-medium ${isScrolled ? 'text-kargon-dark' : 'text-white'} hover:text-kargon-red`}>
              CONTACT
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white rounded-md">
              GET QUOTE
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-kargon-dark' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-kargon-dark' : 'text-white'} size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="font-medium text-kargon-dark hover:text-kargon-red py-2">
                HOME
              </a>
              <a href="/about" className="font-medium text-kargon-dark hover:text-kargon-red py-2">
                ABOUT
              </a>
              <a href="/services" className="font-medium text-kargon-dark hover:text-kargon-red py-2">
                SERVICES
              </a>
              <a href="/projects" className="font-medium text-kargon-dark hover:text-kargon-red py-2">
                PROJECTS
              </a>
              <a href="/blog" className="font-medium text-kargon-dark hover:text-kargon-red py-2">
                BLOG
              </a>
              <a href="/contact" className="font-medium text-kargon-dark hover:text-kargon-red py-2">
                CONTACT
              </a>
              <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white w-full rounded-md mt-4">
                GET QUOTE
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
