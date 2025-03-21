
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Logistics",
    excerpt: "Exploring eco-friendly transportation methods and their impact on the global supply chain.",
    image: "https://images.unsplash.com/photo-1620783770629-122b7f187703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    category: "Sustainability"
  },
  {
    id: 2,
    title: "How AI is Transforming Supply Chain Management",
    excerpt: "An in-depth look at artificial intelligence applications in modern logistics operations.",
    image: "https://images.unsplash.com/photo-1581092921461-7384261d7cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "May 22, 2023",
    author: "Michael Chang",
    category: "Technology"
  },
  {
    id: 3,
    title: "Navigating Global Shipping Challenges in 2023",
    excerpt: "Strategies for overcoming current obstacles in international freight transportation.",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "April 10, 2023",
    author: "David Wilson",
    category: "International Trade"
  },
  {
    id: 4,
    title: "The Rise of Last-Mile Delivery Solutions",
    excerpt: "How companies are optimizing the final stage of the delivery process to enhance customer satisfaction.",
    image: "/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png",
    date: "March 5, 2023",
    author: "Emma Rodriguez",
    category: "E-commerce"
  },
  {
    id: 5,
    title: "Warehouse Automation: Cost vs. Benefit Analysis",
    excerpt: "Examining the financial implications of implementing automated systems in warehouse operations.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "February 18, 2023",
    author: "Robert Chen",
    category: "Warehouse Management"
  },
  {
    id: 6,
    title: "Risk Management in Modern Supply Chains",
    excerpt: "Strategies for identifying, assessing, and mitigating risks in complex global supply networks.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    date: "January 30, 2023",
    author: "Patricia Alvarez",
    category: "Risk Management"
  }
];

const Blog = () => {
  return (
    <div className="bg-white">
      <Navigation />
      
      <section className="pt-28 pb-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-kargon-dark mb-6">Our Blog</h1>
            <p className="text-lg text-gray-600">
              Insights, trends, and expert perspectives on logistics and supply chain management
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-kargon-red/10 text-kargon-red text-sm px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-kargon-dark mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="text-kargon-red hover:text-kargon-red/90 hover:bg-transparent p-0 flex items-center gap-1">
                    READ MORE <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white px-6">
              LOAD MORE ARTICLES
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-kargon-dark mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-gray-600 mb-8">
              Stay updated with the latest industry insights and company news
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow h-12 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kargon-red"
              />
              <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white h-12 px-6">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
