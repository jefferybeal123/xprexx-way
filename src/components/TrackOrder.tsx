
import { useState, useEffect } from "react";
import TrackingForm from "./tracking/TrackingForm";
import ShipmentDetails from "./tracking/ShipmentDetails";
import TrackingTimeline from "./tracking/TrackingTimeline";
import { useTrackingData } from "@/hooks/useTrackingData";
import { createSampleTrackingData } from "@/utils/sampleTrackingData";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const { trackingData, isLoading, error, trackShipment } = useTrackingData();

  useEffect(() => {
    // Initialize sample tracking data on component mount
    createSampleTrackingData();
  }, []);

  const handleTrack = () => {
    trackShipment(trackingNumber);
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
          <TrackingForm
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            onTrack={handleTrack}
            isLoading={isLoading}
            error={error}
          />

          {trackingData && (
            <div className="space-y-6">
              <ShipmentDetails trackingData={trackingData} />
              <TrackingTimeline trackingData={trackingData} />
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
