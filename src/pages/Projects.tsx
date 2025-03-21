
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Define project categories and data
const categories = ["All", "Ground Transport", "Sea Freight", "Air Freight", "Warehousing"];

const projects = [
  {
    id: 1,
    title: "Global E-commerce Distribution Network",
    category: "Warehousing",
    description: "Developed an integrated warehousing and distribution system for a multinational e-commerce retailer, enabling same-day delivery in 12 major markets.",
    image: "/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png",
  },
  {
    id: 2,
    title: "Automotive Parts Supply Chain",
    category: "Ground Transport",
    description: "Streamlined the supply chain for an automotive manufacturer, reducing delivery times by 35% and transportation costs by 22%.",
    image: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png",
  },
  {
    id: 3,
    title: "Pharmaceutical Cold Chain Solution",
    category: "Air Freight",
    description: "Implemented a temperature-controlled logistics solution for a pharmaceutical company, ensuring 100% compliance with regulatory requirements.",
    image: "/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png",
  },
  {
    id: 4,
    title: "Cross-Continental Consumer Electronics Shipping",
    category: "Sea Freight",
    description: "Managed the international shipping of consumer electronics for a tech giant, handling over 500,000 units monthly across three continents.",
    image: "/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png",
  },
  {
    id: 5,
    title: "Fashion Retail Just-in-Time Delivery",
    category: "Ground Transport",
    description: "Developed a just-in-time delivery system for a fashion retailer, reducing inventory costs by 18% while increasing product availability.",
    image: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png",
  },
  {
    id: 6,
    title: "Agricultural Exports Program",
    category: "Sea Freight",
    description: "Created an efficient export solution for agricultural products, connecting farmers with international markets and increasing export volume by 40%.",
    image: "/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png",
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-kargon-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png" 
            alt="Cargo Ship" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-kargon-dark/80 to-kargon-dark/60"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Projects</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Explore our portfolio of successful logistics and transportation projects delivered for clients worldwide.
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Filter and Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center scroll-animate">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category
                    ? "bg-kargon-red text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all scroll-animate">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-kargon-red mb-2 inline-block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-kargon-dark mb-3">{project.title}</h3>
                  <p className="text-gray-700 mb-6">{project.description}</p>
                  <Button variant="outline" className="border-kargon-red text-kargon-red hover:bg-kargon-red hover:text-white flex items-center gap-2">
                    View Details
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Study Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 scroll-animate">
              <span className="text-kargon-red font-medium mb-2 inline-block">Featured Case Study</span>
              <h2 className="text-3xl font-bold text-kargon-dark mb-6">Global Supply Chain Transformation</h2>
              <p className="text-gray-700 mb-6">
                When a leading electronics manufacturer faced challenges with their international supply chain, they turned to Kargon for a comprehensive solution. Our team implemented a multi-modal transportation strategy that reduced lead times by 40% and lowered logistics costs by 25%.
              </p>
              <p className="text-gray-700 mb-8">
                The new system integrated sea, air, and ground transportation with real-time tracking capabilities, providing complete visibility across the entire supply chain. This transformation helped our client increase market share by 15% within the first year of implementation.
              </p>
              <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white flex items-center gap-2">
                Read Full Case Study
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl scroll-animate">
              <img 
                src="/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png" 
                alt="Supply Chain Transformation" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Client Partnerships */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-3xl font-bold text-kargon-dark mb-4">Our Trusted Partners</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're proud to work with leading companies across diverse industries worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-70">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center justify-center p-6 scroll-animate">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-500">LOGO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Projects;
