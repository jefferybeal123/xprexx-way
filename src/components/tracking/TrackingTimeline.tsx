
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Package, MapPin } from "lucide-react";
import { TrackingData } from "@/types/tracking";

interface TrackingTimelineProps {
  trackingData: TrackingData;
}

const TrackingTimeline = ({ trackingData }: TrackingTimelineProps) => {
  return (
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
  );
};

export default TrackingTimeline;
