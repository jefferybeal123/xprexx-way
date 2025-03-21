
import { Truck, Clock, Gift, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "./ScrollAnimation";

const features = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Our dedicated fleet ensures your cargo reaches its destination on time, every time.",
    icon: Truck,
    delay: 0
  },
  {
    id: 2,
    title: "24/7 Service",
    description: "Our support team is available around the clock to assist with any logistics needs.",
    icon: Clock,
    delay: 200
  },
  {
    id: 3,
    title: "Special Care",
    description: "We handle your valuable and fragile items with extra attention and specialized packaging.",
    icon: Gift,
    delay: 400
  },
  {
    id: 4,
    title: "Quality Assurance",
    description: "Our quality management system ensures the highest standards in all our logistics services.",
    icon: Award,
    delay: 600
  }
];

const UpdatesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Why Choose Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to excellence in every aspect of logistics, offering solutions that meet your unique requirements.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {features.map((feature) => (
            <ScrollAnimation key={feature.id} delay={feature.delay} className="feature-card">
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                <div className="bg-kargon-red/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <feature.icon className="text-kargon-red" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
                <Button variant="ghost" className="text-kargon-red hover:text-kargon-red/90 hover:bg-kargon-red/10 mt-auto p-0 flex items-center gap-1 w-fit">
                  LEARN MORE
                </Button>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white px-6">
            EXPLORE ALL SERVICES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
