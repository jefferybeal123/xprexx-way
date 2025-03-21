
import ScrollAnimation from "./ScrollAnimation";
import { Clock, ChevronRight } from "lucide-react";

const NumberedServiceCard = ({ 
  number, 
  title, 
  description,
  delay 
}: { 
  number: string;
  title: string; 
  description: string;
  delay: number;
}) => {
  return (
    <ScrollAnimation delay={delay} className="flex flex-col items-center text-center">
      <div className="rounded-full border-2 border-gray-200 bg-white w-24 h-24 flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-kargon-dark">{number}</span>
      </div>
      <h3 className="text-2xl font-bold text-kargon-dark mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </ScrollAnimation>
  );
};

const DetailedServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  delay 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  delay: number;
}) => {
  return (
    <ScrollAnimation delay={delay} className="bg-white shadow-md rounded-lg p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center">
        <div className="rounded-full p-3 bg-kargon-red/10 text-kargon-red mr-3">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <a href="#" className="text-kargon-red font-medium flex items-center hover:underline mt-2">
        SEE MORE
        <ChevronRight size={16} className="ml-1" />
      </a>
    </ScrollAnimation>
  );
};

const ServicesCards = () => {
  return (
    <section className="relative z-20 mb-20 -mt-16 pt-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailedServiceCard
              title="We provide the quickest logistics delivery"
              description="Time-sensitive solutions designed to meet your deadlines every time."
              icon={Clock}
              delay={100}
            />
            <NumberedServiceCard
              number="03"
              title="Cargo Transportation"
              description="Our expertise ensures your cargo is delivered safely."
              delay={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
