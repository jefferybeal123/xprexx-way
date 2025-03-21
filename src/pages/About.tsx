
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="bg-white">
      <Navigation />
      
      <section className="pt-28 pb-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-kargon-dark mb-6">About KARGON</h1>
            <p className="text-lg text-gray-600">
              We are a leading logistics company dedicated to providing efficient and reliable cargo transportation services worldwide.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-kargon-dark mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, KARGON has grown from a small local logistics provider to an international transportation company serving clients across multiple industries.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a simple mission: to provide efficient, reliable, and cost-effective logistics solutions that enable businesses to focus on their core operations.
              </p>
              <p className="text-gray-600">
                Today, we operate a global network with strategic partnerships in key markets, allowing us to offer seamless transportation services worldwide.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/adca88c5-d496-48f1-ad5b-d09424c574af.png" 
                alt="Kargon Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-kargon-dark mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Reliability</h3>
              <p className="text-gray-600">
                We understand that timely deliveries are crucial for your business. That's why we prioritize reliability in every service we provide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously invest in new technologies and methodologies to improve our services and provide better solutions for our clients.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-kargon-dark mb-4">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We tailor our services to meet your specific needs and ensure a seamless logistics experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
