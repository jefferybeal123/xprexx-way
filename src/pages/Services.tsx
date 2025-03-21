
import { Truck, Package, Globe, Warehouse, Clock, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-kargon-blue">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png" 
            alt="Logistics Network" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-kargon-blue/70"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Comprehensive logistics solutions tailored to your business needs, ensuring efficiency across your supply chain.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck size={32} />,
                title: "Ground Transportation",
                description: "Reliable road freight services across domestic and international routes with real-time tracking capabilities."
              },
              {
                icon: <Globe size={32} />,
                title: "International Shipping",
                description: "Comprehensive sea and air freight solutions connecting your business to markets worldwide."
              },
              {
                icon: <Package size={32} />,
                title: "Packaging & Storage",
                description: "Secure warehousing and specialized packaging services to keep your goods safe throughout transit."
              },
              {
                icon: <Warehouse size={32} />,
                title: "Warehousing Solutions",
                description: "Strategic storage facilities with inventory management systems in key locations globally."
              },
              {
                icon: <Clock size={32} />,
                title: "Express Delivery",
                description: "Time-critical shipping options designed to meet the most demanding deadlines with precision."
              },
              {
                icon: <BarChart size={32} />,
                title: "Supply Chain Consulting",
                description: "Expert analysis and optimization strategies to improve the efficiency of your logistics operations."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100 transition-all hover:shadow-lg hover:border-kargon-red/20 scroll-animate">
                <div className="w-16 h-16 bg-kargon-red/10 rounded-full flex items-center justify-center mb-6 text-kargon-red">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-kargon-dark mb-3">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.description}</p>
                <Button variant="outline" className="border-kargon-red text-kargon-red hover:bg-kargon-red hover:text-white">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Service */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden scroll-animate">
              <img 
                src="/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png" 
                alt="Global Shipping Network" 
                className="w-full h-auto"
              />
            </div>
            <div className="scroll-animate">
              <h2 className="text-3xl font-bold text-kargon-dark mb-6">Global Logistics Network</h2>
              <p className="text-gray-700 mb-6">
                Our extensive global network connects your business to markets worldwide through a seamless, integrated logistics solution. With strategic partnerships in over 150 countries, we offer unparalleled reach and efficiency.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Access to 200+ ports and 150+ countries worldwide",
                  "Dedicated customs clearance specialists in each region",
                  "24/7 tracking and monitoring of your shipments",
                  "Multi-modal transport options for optimal efficiency",
                  "Specialized handling for hazardous and sensitive cargo"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-kargon-red mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Industries We Serve */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-3xl font-bold text-kargon-dark mb-4">Industries We Serve</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We provide specialized logistics solutions for a wide range of sectors, each with unique requirements and challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "Retail & E-commerce",
              "Manufacturing",
              "Automotive",
              "Pharmaceuticals",
              "Electronics",
              "Food & Beverage",
              "Fashion & Apparel",
              "Construction",
              "Chemicals",
              "Energy & Utilities",
              "Agriculture",
              "Consumer Goods"
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:border-kargon-red/20 hover:shadow-md transition-all scroll-animate">
                <p className="font-medium text-kargon-dark">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-kargon-blue relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png" 
            alt="Logistics Network" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to optimize your logistics?</h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss how our services can be tailored to meet your specific business needs.
            </p>
            <Button className="bg-white text-kargon-blue hover:bg-white/90 text-lg px-8">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
