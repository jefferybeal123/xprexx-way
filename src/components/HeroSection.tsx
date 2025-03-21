
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-kargon-blue flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/adca88c5-d496-48f1-ad5b-d09424c574af.png" 
          alt="Cargo Ship" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kargon-dark/70 to-kargon-blue/30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transport your<br />cargo everywhere
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-lg">
            Reliable and efficient logistics solutions tailored to your business needs.
          </p>
          <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white rounded-md px-6 py-6 text-lg flex items-center gap-2">
            GET STARTED
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
