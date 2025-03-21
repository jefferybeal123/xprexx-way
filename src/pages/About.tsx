
import { Truck, Users, Award, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
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
          <div className="absolute inset-0 bg-kargon-dark/60"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Kargon</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              We are a global logistics company committed to excellence in cargo transportation and supply chain solutions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate">
              <h2 className="text-3xl font-bold text-kargon-dark mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Founded in 2010, Kargon started with a simple mission: to make global logistics accessible, efficient, and reliable for businesses of all sizes. What began as a small operation with just three employees has now grown into a global network spanning 45 countries.
              </p>
              <p className="text-gray-700 mb-6">
                Our founder, Alex Mitchell, recognized the challenges faced by businesses navigating the complex world of international shipping and supply chain management. Drawing on his 15 years of experience in the industry, he established Kargon to provide solutions that combine cutting-edge technology with personalized service.
              </p>
              <p className="text-gray-700">
                Today, we serve thousands of clients worldwide, from small e-commerce startups to multinational corporations, maintaining the same dedication to exceptional service that has been our hallmark from day one.
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl scroll-animate">
              <img 
                src="/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png" 
                alt="Kargon Headquarters" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <span className="text-white font-medium">Kargon Headquarters - Est. 2010</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-3xl font-bold text-kargon-dark mb-4">Our Core Values</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Everything we do is guided by these fundamental principles that define who we are as a company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 scroll-animate">
              <div className="w-14 h-14 bg-kargon-red/10 rounded-full flex items-center justify-center mb-6">
                <Truck className="text-kargon-red" size={28} />
              </div>
              <h3 className="text-xl font-bold text-kargon-dark mb-3">Reliability</h3>
              <p className="text-gray-700">
                We understand that timely delivery is critical for your business. That's why we maintain a 98.7% on-time delivery rate.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 scroll-animate">
              <div className="w-14 h-14 bg-kargon-red/10 rounded-full flex items-center justify-center mb-6">
                <Users className="text-kargon-red" size={28} />
              </div>
              <h3 className="text-xl font-bold text-kargon-dark mb-3">Customer-Centric</h3>
              <p className="text-gray-700">
                Every solution we provide is tailored to meet the unique needs and challenges of each client we serve.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 scroll-animate">
              <div className="w-14 h-14 bg-kargon-red/10 rounded-full flex items-center justify-center mb-6">
                <Award className="text-kargon-red" size={28} />
              </div>
              <h3 className="text-xl font-bold text-kargon-dark mb-3">Excellence</h3>
              <p className="text-gray-700">
                We continuously strive to exceed industry standards and improve our services through innovation and expertise.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:-translate-y-1 scroll-animate">
              <div className="w-14 h-14 bg-kargon-red/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-kargon-red" size={28} />
              </div>
              <h3 className="text-xl font-bold text-kargon-dark mb-3">Integrity</h3>
              <p className="text-gray-700">
                Transparency and ethical practices are at the core of our business relationships and operations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-3xl font-bold text-kargon-dark mb-4">Meet Our Leadership</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our experienced team brings decades of industry expertise to deliver exceptional logistics solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Mitchell",
                role: "Founder & CEO",
                image: "/lovable-uploads/adca88c5-d496-48f1-ad5b-d09424c574af.png",
                bio: "With over 20 years in logistics, Alex has transformed Kargon into a global leader in the industry."
              },
              {
                name: "Sarah Johnson",
                role: "Chief Operations Officer",
                image: "/lovable-uploads/1e21aeaa-540f-4dde-8a28-4ab829e83c16.png",
                bio: "Sarah oversees our global operations network, ensuring seamless service delivery across all regions."
              },
              {
                name: "David Chen",
                role: "Chief Technology Officer",
                image: "/lovable-uploads/adca88c5-d496-48f1-ad5b-d09424c574af.png",
                bio: "David leads our digital transformation, developing innovative solutions to optimize supply chains."
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md scroll-animate">
                <div className="h-64 bg-gray-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-kargon-dark">{member.name}</h3>
                  <p className="text-kargon-red font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
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

export default About;
