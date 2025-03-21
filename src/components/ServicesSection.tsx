
import { Truck, Plane, Ship, Box } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const services = [
  {
    id: 1,
    title: "Warehousing",
    icon: Box,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    delay: 0
  },
  {
    id: 2,
    title: "Air Freight",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    delay: 100
  },
  {
    id: 3,
    title: "Ocean Freight",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    delay: 200
  },
  {
    id: 4,
    title: "Road Freight",
    icon: Truck,
    image: "/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png",
    delay: 300
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive logistics solutions tailored to meet your specific needs.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ScrollAnimation key={service.id} delay={service.delay}>
              <div className="service-card group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="service-card-overlay">
                  <div className="service-card-icon">
                    <service.icon className="text-kargon-red" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                  <a href="#" className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More →
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
