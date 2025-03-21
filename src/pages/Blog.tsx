
import { useState } from "react";
import { CalendarIcon, Clock, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Define blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Logistics",
    excerpt: "Exploring how green technologies are reshaping the logistics industry and reducing its environmental impact.",
    category: "Sustainability",
    date: "June 15, 2023",
    readTime: "5 min read",
    author: "Alex Mitchell",
    image: "/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png"
  },
  {
    id: 2,
    title: "Navigating Global Supply Chain Disruptions",
    excerpt: "Strategies for maintaining operational resilience in the face of unexpected global challenges.",
    category: "Supply Chain",
    date: "May 28, 2023",
    readTime: "7 min read",
    author: "Sarah Johnson",
    image: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
  },
  {
    id: 3,
    title: "AI and Machine Learning in Modern Logistics",
    excerpt: "How artificial intelligence is optimizing routes, predicting demand, and transforming logistics operations.",
    category: "Technology",
    date: "April 12, 2023",
    readTime: "6 min read",
    author: "David Chen",
    image: "/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png"
  },
  {
    id: 4,
    title: "Last-Mile Delivery Innovations",
    excerpt: "New approaches to solving the challenges of last-mile delivery in urban environments.",
    category: "Innovation",
    date: "March 5, 2023",
    readTime: "4 min read",
    author: "Rebecca Torres",
    image: "/lovable-uploads/9bc9bb5d-5345-4122-9396-f69e5f467fc3.png"
  },
  {
    id: 5,
    title: "The Rise of E-commerce and Its Impact on Logistics",
    excerpt: "How the boom in online shopping is reshaping logistics networks and distribution strategies.",
    category: "E-commerce",
    date: "February 19, 2023",
    readTime: "8 min read",
    author: "Michael Wong",
    image: "/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png"
  },
  {
    id: 6,
    title: "Blockchain Technology in Supply Chain Management",
    excerpt: "Exploring how blockchain is creating more transparent, secure, and efficient supply chains.",
    category: "Technology",
    date: "January 25, 2023",
    readTime: "6 min read",
    author: "Emily Patel",
    image: "/lovable-uploads/3a1b8055-f4b1-4340-ac19-94530c129084.png"
  }
];

// Define blog categories
const categories = [
  "All Categories",
  "Sustainability",
  "Supply Chain",
  "Technology",
  "Innovation",
  "E-commerce"
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All Categories" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-kargon-red">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-kargon-red/90"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Logistics Insights</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Expert articles, industry trends, and thought leadership from our team of logistics professionals.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Input 
                type="text"
                placeholder="Search articles..."
                className="pr-10 bg-white/10 text-white placeholder:text-white/60 border-white/20 focus-visible:ring-white/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-4 mb-12 scroll-animate">
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
          
          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="mb-16 rounded-xl overflow-hidden shadow-lg scroll-animate">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img 
                    src={filteredPosts[0].image} 
                    alt={filteredPosts[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 bg-white">
                  <span className="text-sm font-medium text-kargon-red mb-2 inline-block">
                    {filteredPosts[0].category}
                  </span>
                  <h2 className="text-2xl font-bold text-kargon-dark mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-gray-700 mb-6">{filteredPosts[0].excerpt}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <span className="flex items-center">
                      <CalendarIcon size={14} className="mr-1" />
                      {filteredPosts[0].date}
                    </span>
                    <span className="mx-3">•</span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {filteredPosts[0].readTime}
                    </span>
                  </div>
                  
                  <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white flex items-center gap-2">
                    Read Article
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all scroll-animate">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-kargon-red mb-2 inline-block">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-kargon-dark mb-3">{post.title}</h3>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="flex items-center">
                      <CalendarIcon size={14} className="mr-1" />
                      {post.date}
                    </span>
                    <span className="mx-3">•</span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Button variant="ghost" className="text-kargon-red hover:text-kargon-red/90 hover:bg-kargon-red/10 p-0 flex items-center gap-1">
                    Read More
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-kargon-dark mb-2">No articles found</h3>
              <p className="text-gray-700">Try adjusting your search or category filter</p>
            </div>
          )}
          
          {/* Load More Button */}
          {filteredPosts.length > 6 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-kargon-red text-kargon-red hover:bg-kargon-red hover:text-white px-8">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-kargon-dark mb-4">Stay Updated with Logistics Insights</h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our newsletter to receive the latest articles, industry updates, and expert advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button className="bg-kargon-red hover:bg-kargon-red/90 text-white whitespace-nowrap">
                Subscribe
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
