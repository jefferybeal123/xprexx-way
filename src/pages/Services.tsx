
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Truck, Plane, Ship, Box, ShieldCheck, BarChart } from "lucide-react";

const ServiceCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="rounded-full p-4 bg-kargon-red/10 text-kargon-red w-16 h-16 flex items-center justify-center mb-6">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-kargon-dark mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <div className="bg-white">
      <Navigation />
      
      <section className="pt-28 pb-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-kargon-dark mb-6">Our Services</h1>
            <p className="text-lg text-gray-600">
              Comprehensive logistics solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Road Freight"
              description="Reliable road transportation services for local and long-distance deliveries, with real-time tracking and flexible scheduling options."
              icon={Truck}
            />
            <ServiceCard
              title="Air Freight"
              description="Fast and efficient air cargo services to destinations worldwide, ideal for time-sensitive shipments and high-value goods."
              icon={Plane}
            />
            <ServiceCard
              title="Ocean Freight"
              description="Cost-effective sea freight solutions for bulk cargo, with options for full container load (FCL) and less than container load (LCL) shipments."
              icon={Ship}
            />
            <ServiceCard
              title="Warehousing"
              description="Secure storage facilities with inventory management systems, order fulfillment services, and distribution solutions."
              icon={Box}
            />
            <ServiceCard
              title="Cargo Insurance"
              description="Comprehensive coverage options to protect your shipments against loss, damage, or theft during transportation."
              icon={ShieldCheck}
            />
            <ServiceCard
              title="Supply Chain Solutions"
              description="End-to-end supply chain management services, including demand forecasting, inventory optimization, and logistics consulting."
              icon={BarChart}
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-kargon-dark mb-6">Why Choose Our Services?</h2>
            <p className="text-gray-600">
              At KARGON, we are committed to providing high-quality logistics services that meet your unique requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Global Network</h3>
              <p className="text-gray-600">
                Our extensive global network allows us to offer seamless transportation services across continents, ensuring your cargo reaches its destination efficiently.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Advanced Technology</h3>
              <p className="text-gray-600">
                We leverage cutting-edge technology to optimize routes, track shipments in real-time, and provide you with transparent information about your cargo.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our team of logistics professionals has years of experience in the industry, ensuring that your cargo is handled with expertise and care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Customized Solutions</h3>
              <p className="text-gray-600">
                We understand that every business has unique logistics needs. That's why we offer tailored solutions designed specifically for your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
