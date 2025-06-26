
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mockTrackingData = {
    "XPR123456789": {
      trackingNumber: "XPR123456789",
      status: "In Transit",
      currentLocation: "Chicago, IL Distribution Center",
      estimatedDelivery: "2024-01-15",
      shipmentDetails: {
        origin: "New York, NY",
        destination: "Los Angeles, CA",
        weight: "2.5 kg",
        dimensions: "30x20x15 cm",
        service: "Express Delivery"
      },
      timeline: [
        { status: "Package Picked Up", location: "New York, NY", time: "2024-01-10 09:00 AM", completed: true },
        { status: "In Transit", location: "Newark, NJ Hub", time: "2024-01-10 02:00 PM", completed: true },
        { status: "In Transit", location: "Chicago, IL Distribution Center", time: "2024-01-11 08:30 AM", completed: true },
        { status: "Out for Delivery", location: "Los Angeles, CA", time: "Estimated 2024-01-15 10:00 AM", completed: false },
        { status: "Delivered", location: "Los Angeles, CA", time: "Estimated 2024-01-15 12:00 PM", completed: false }
      ]
    },
    "XPR987654321": {
      trackingNumber: "XPR987654321",
      status: "Delivered",
      currentLocation: "Miami, FL - Delivered",
      estimatedDelivery: "2024-01-12",
      shipmentDetails: {
        origin: "Boston, MA",
        destination: "Miami, FL",
        weight: "1.2 kg",
        dimensions: "25x15x10 cm",
        service: "Standard Delivery"
      },
      timeline: [
        { status: "Package Picked Up", location: "Boston, MA", time: "2024-01-08 11:00 AM", completed: true },
        { status: "In Transit", location: "Hartford, CT Hub", time: "2024-01-08 04:00 PM", completed: true },
        { status: "In Transit", location: "Jacksonville, FL", time: "2024-01-09 07:00 AM", completed: true },
        { status: "Out for Delivery", location: "Miami, FL", time: "2024-01-12 09:00 AM", completed: true },
        { status: "Delivered", location: "Miami, FL", time: "2024-01-12 02:30 PM", completed: true }
      ]
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockTrackingData[trackingNumber as keyof typeof mockTrackingData];
      if (result) {
        setTrackingResult(result);
        toast({
          title: "Package Found",
          description: `Tracking information for ${trackingNumber}`,
        });
      } else {
        setTrackingResult(null);
        toast({
          title: "Package Not Found",
          description: "Please check your tracking number and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "In Transit":
        return <Truck className="h-5 w-5 text-blue-600" />;
      case "Out for Delivery":
        return <Package className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="relative z-30 -mt-16 mb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-kargon-dark mb-4">Track Your Package</h2>
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Enter your tracking number (e.g., XPR123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                className="h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-kargon-red hover:bg-kargon-red/90 text-white h-12 px-6"
              disabled={isLoading}
            >
              <Search className="mr-2 h-5 w-5" />
              {isLoading ? "TRACKING..." : "TRACK"}
            </Button>
          </form>
          
          <p className="text-gray-500 text-sm mb-4">
            Enter your tracking number to get real-time updates on your package's location and status.
          </p>

          {trackingResult && (
            <div className="space-y-6 mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(trackingResult.status)}
                      Package Status
                    </CardTitle>
                    <Badge className={getStatusColor(trackingResult.status)}>
                      {trackingResult.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-semibold">{trackingResult.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Location</p>
                      <p className="font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-kargon-red" />
                        {trackingResult.currentLocation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-semibold">{trackingResult.estimatedDelivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Service Type</p>
                      <p className="font-semibold">{trackingResult.shipmentDetails.service}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Origin</p>
                      <p className="font-semibold">{trackingResult.shipmentDetails.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Destination</p>
                      <p className="font-semibold">{trackingResult.shipmentDetails.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weight</p>
                      <p className="font-semibold">{trackingResult.shipmentDetails.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Dimensions</p>
                      <p className="font-semibold">{trackingResult.shipmentDetails.dimensions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${event.completed ? 'bg-kargon-red' : 'bg-gray-300'}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {event.status}
                            </p>
                            <span className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                              {event.time}
                            </span>
                          </div>
                          <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Try these sample tracking numbers:</strong>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTrackingNumber("XPR123456789")}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                XPR123456789
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTrackingNumber("XPR987654321")}
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
              >
                XPR987654321
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
