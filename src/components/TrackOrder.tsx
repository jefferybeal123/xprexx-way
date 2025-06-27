
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { createSampleTrackingData } from "@/utils/sampleTrackingData";

interface TrackingData {
  id: string;
  tracking_number: string;
  origin: string;
  destination: string;
  status: string;
  current_location?: string;
  estimated_delivery?: string;
  created_at: string;
  tracking_events: Array<{
    id: string;
    event_type: string;
    description: string | null;
    location: string | null;
    created_at: string;
  }>;
}

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Initialize sample tracking data on component mount
    createSampleTrackingData();
  }, []);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipments')
        .select(`
          id,
          tracking_number,
          origin,
          destination,
          status,
          current_location,
          estimated_delivery,
          created_at
        `)
        .eq('tracking_number', trackingNumber.trim())
        .single();

      if (shipmentError) {
        if (shipmentError.code === 'PGRST116') {
          setError("Tracking number not found. Please check and try again.");
        } else {
          throw shipmentError;
        }
        return;
      }

      // Fetch tracking events
      const { data: eventsData, error: eventsError } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('shipment_id', shipmentData.id)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      setTrackingData({
        ...shipmentData,
        tracking_events: eventsData || []
      });

      toast({
        title: "Package Found",
        description: `Tracking information loaded for ${trackingNumber}`,
      });

    } catch (err: any) {
      console.error('Error tracking shipment:', err);
      setError("An error occurred while tracking your shipment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
      case 'order received':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
      case 'exception':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-kargon-dark mb-4">
            Track Your Package
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates on your shipment status and location.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-kargon-red" />
                Package Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., XPR123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full"
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </p>
                  )}
                </div>
                <Button 
                  onClick={handleTrack} 
                  disabled={isLoading}
                  className="bg-kargon-red hover:bg-kargon-red/90"
                >
                  {isLoading ? "Tracking..." : "Track Package"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {trackingData && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Shipment Details</span>
                    <Badge className={getStatusColor(trackingData.status)}>
                      {trackingData.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-medium">{trackingData.tracking_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{trackingData.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{trackingData.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Location</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-kargon-red" />
                        {trackingData.current_location || "Processing"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estimated Delivery</p>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="h-4 w-4 text-kargon-red" />
                        {trackingData.estimated_delivery ? 
                          new Date(trackingData.estimated_delivery).toLocaleDateString() : 
                          "TBD"
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Shipped Date</p>
                      <p className="font-medium">
                        {new Date(trackingData.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-kargon-red" />
                    Tracking Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingData.tracking_events.length > 0 ? (
                      trackingData.tracking_events.map((event, index) => (
                        <div key={event.id} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full ${
                              index === 0 ? 'bg-kargon-red' : 'bg-gray-300'
                            }`} />
                            {index < trackingData.tracking_events.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-300 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-kargon-dark">{event.event_type}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(event.created_at).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              {event.description || `Package ${event.event_type.toLowerCase()}`}
                            </p>
                            {event.location && (
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No tracking events available yet</p>
                        <p className="text-sm">Your package is being processed</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Sample tracking numbers for testing: <span className="font-mono">XPR123456789</span>, <span className="font-mono">XPR987654321</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackOrder;
