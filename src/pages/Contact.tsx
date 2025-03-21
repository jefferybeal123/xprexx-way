
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
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
    
    // This is just a placeholder for form submission logic
    // In a real app, this would connect to your backend
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond shortly.",
    });
    
    // Reset form
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
      
      <section className="pt-28 pb-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-kargon-dark mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              We're here to answer your questions and help with your logistics needs
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-kargon-dark mb-6">Get In Touch</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
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
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={6}
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-kargon-red hover:bg-kargon-red/90 text-white px-8 py-6 text-lg">
                  SEND MESSAGE
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-kargon-dark mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="p-3 bg-kargon-red/10 text-kargon-red rounded-full mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-kargon-dark mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      123 Logistics Avenue<br />
                      Cargo District, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-kargon-red/10 text-kargon-red rounded-full mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-kargon-dark mb-1">Phone Number</h3>
                    <p className="text-gray-600">
                      General: +1 (555) 123-4567<br />
                      Customer Support: +1 (555) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-kargon-red/10 text-kargon-red rounded-full mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-kargon-dark mb-1">Email Address</h3>
                    <p className="text-gray-600">
                      info@kargon.com<br />
                      support@kargon.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="font-bold text-kargon-dark mb-3">Office Hours</h3>
                <p className="text-gray-600 mb-2">
                  Monday - Friday: 8:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-kargon-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-kargon-dark mb-8 text-center">Our Global Offices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-kargon-dark mb-2">New York (HQ)</h3>
              <p className="text-gray-600 mb-4">
                123 Logistics Avenue<br />
                Cargo District, NY 10001<br />
                United States
              </p>
              <p className="text-gray-600">
                Phone: +1 (555) 123-4567<br />
                Email: newyork@kargon.com
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-kargon-dark mb-2">London</h3>
              <p className="text-gray-600 mb-4">
                45 Shipping Lane<br />
                Docklands, E14 5HQ<br />
                United Kingdom
              </p>
              <p className="text-gray-600">
                Phone: +44 20 1234 5678<br />
                Email: london@kargon.com
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-kargon-dark mb-2">Singapore</h3>
              <p className="text-gray-600 mb-4">
                78 Harbor Road<br />
                Marina Bay, 018956<br />
                Singapore
              </p>
              <p className="text-gray-600">
                Phone: +65 6123 4567<br />
                Email: singapore@kargon.com
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
