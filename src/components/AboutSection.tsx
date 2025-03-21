
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const AboutSection = () => {
  return (
    <section className="py-16 bg-milk-texture">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">grow transport.</h2>
              <div className="w-16 h-1 bg-kargon-red mb-6"></div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-kargon-red shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-lg">We're trusted! How has our company grown so fast?</h3>
                    <p className="text-gray-600">We've built trust through consistent delivery, reliability, and exceptional customer service.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-kargon-red shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-lg">We deliver on time, with safety as a central focus</h3>
                    <p className="text-gray-600">Our rigorous safety protocols ensure your cargo arrives on time without compromising security.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white rounded-md">
                  ABOUT COMPANY
                </Button>
                <Button variant="outline" className="border-kargon-red text-kargon-red hover:bg-kargon-red/10">
                  EXPLORE SERVICES
                </Button>
              </div>
            </ScrollAnimation>
          </div>
          <div className="order-1 lg:order-2">
            <ScrollAnimation delay={200} className="relative">
              <img
                src="/lovable-uploads/1e21aeaa-540f-4dde-8a28-4ab829e83c16.png"
                alt="Container Port"
                className="rounded-lg shadow-lg w-full object-cover"
                style={{ height: '400px' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-kargon-red">426</div>
                <div className="font-medium">Successful Transports</div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
