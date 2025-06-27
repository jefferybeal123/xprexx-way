
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TrackingData } from "@/types/tracking";

export const useTrackingData = () => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const trackShipment = async (trackingNumber: string) => {
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

  return {
    trackingData,
    isLoading,
    error,
    trackShipment
  };
};
