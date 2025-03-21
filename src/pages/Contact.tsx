
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Your message has been sent! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="bg-white">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-kargon-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/6fa84550-fe8c-4549-a9c9-c0f071c2cd75.png" 
            alt="Logistics Network" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-kargon-dark/80"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              Get in touch with our team to discuss your logistics needs or request a quote for our services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-kargon-dark mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Our team is here to assist you with any questions about our services, pricing, or logistics solutions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-kargon-red/10 rounded-full p-3 mr-4">
                    <MapPin className="text-kargon-red" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kargon-dark mb-1">Our Location</h3>
                    <p className="text-gray-700">
                      123 Logistics Way<br />
                      Suite 500<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kargon-red/10 rounded-full p-3 mr-4">
                    <Mail className="text-kargon-red" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kargon-dark mb-1">Email Us</h3>
                    <p className="text-gray-700">
                      info@kargon.com<br />
                      support@kargon.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kargon-red/10 rounded-full p-3 mr-4">
                    <Phone className="text-kargon-red" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kargon-dark mb-1">Call Us</h3>
                    <p className="text-gray-700">
                      +1 (555) 123-4567<br />
                      +1 (800) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kargon-red/10 rounded-full p-3 mr-4">
                    <Clock className="text-kargon-red" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kargon-dark mb-1">Working Hours</h3>
                    <p className="text-gray-700">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-kargon-dark mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Service Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your logistics needs..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="resize-none"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-kargon-red hover:bg-kargon-red/90 text-white w-full py-6 flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96 w-full">
            {/* Placeholder for an actual map integration */}
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <div className="text-center">
                <MapPin className="mx-auto text-kargon-red mb-4" size={48} />
                <h3 className="text-xl font-bold text-kargon-dark">Our Location</h3>
                <p className="text-gray-700">
                  123 Logistics Way, San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Global Offices */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-3xl font-bold text-kargon-dark mb-4">Our Global Offices</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              With locations around the world, we're ready to serve your logistics needs wherever you operate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                city: "San Francisco",
                country: "United States",
                address: "123 Logistics Way, Suite 500, San Francisco, CA 94107",
                phone: "+1 (555) 123-4567"
              },
              {
                city: "London",
                country: "United Kingdom",
                address: "45 Transport Street, Canary Wharf, London E14 5HQ",
                phone: "+44 20 7123 4567"
              },
              {
                city: "Singapore",
                country: "Singapore",
                address: "78 Harbor Front Place, #12-03, Singapore 098675",
                phone: "+65 6123 4567"
              },
              {
                city: "Dubai",
                country: "United Arab Emirates",
                address: "Trade Center Road, Business Bay Tower, Floor 15, Dubai",
                phone: "+971 4 123 4567"
              }
            ].map((office, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 scroll-animate">
                <h3 className="text-xl font-bold text-kargon-dark mb-2">{office.city}</h3>
                <p className="text-kargon-red font-medium mb-4">{office.country}</p>
                <p className="text-gray-700 mb-4">{office.address}</p>
                <p className="text-gray-700 flex items-center">
                  <Phone className="mr-2 text-kargon-red" size={16} />
                  {office.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
