
import ScrollAnimation from "./ScrollAnimation";

const StatsSection = () => {
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
          alt="Logistics Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-kargon-dark/80"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollAnimation className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl p-8 text-center" delay={0}>
            <div className="text-5xl font-bold text-kargon-red mb-2">426</div>
            <div className="text-lg font-medium text-white">Products Transport</div>
          </ScrollAnimation>
          
          <ScrollAnimation className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl p-8 text-center" delay={200}>
            <div className="flex justify-center items-center mb-2">
              <div className="text-5xl font-bold text-kargon-red">100</div>
              <div className="text-2xl font-bold text-kargon-red ml-1">%</div>
            </div>
            <div className="text-lg font-medium text-white">Client Satisfaction</div>
          </ScrollAnimation>
          
          <ScrollAnimation className="bg-white/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl p-8 text-center" delay={400}>
            <div className="text-lg font-medium text-white mb-2">Call For Info</div>
            <div className="text-3xl font-bold text-kargon-red">(+444) 555-6789</div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
