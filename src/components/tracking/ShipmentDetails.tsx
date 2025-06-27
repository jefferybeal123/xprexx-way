
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { TrackingData } from "@/types/tracking";
import { getStatusColor } from "@/utils/trackingUtils";

interface ShipmentDetailsProps {
  trackingData: TrackingData;
}

const ShipmentDetails = ({ trackingData }: ShipmentDetailsProps) => {
  return (
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
  );
};

export default ShipmentDetails;
