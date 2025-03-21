
import ScrollAnimation from "./ScrollAnimation";

const ServiceCard = ({ 
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

const ServicesCards = () => {
  return (
    <section className="relative z-20 mb-20 -mt-16 pt-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              number="01"
              title="Packaging & Storage"
              description="We understand the importance of timely delivery."
              delay={100}
            />
            <ServiceCard
              number="02"
              title="Logistics Solutions"
              description="Time-sensitive solutions designed to meet your deadlines."
              delay={200}
            />
            <ServiceCard
              number="03"
              title="Cargo Transportation"
              description="Our expertise ensures your cargo is delivered safely."
              delay={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
