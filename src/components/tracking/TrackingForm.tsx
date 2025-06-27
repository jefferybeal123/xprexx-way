
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertCircle } from "lucide-react";

interface TrackingFormProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  onTrack: () => void;
  isLoading: boolean;
  error: string;
}

const TrackingForm = ({ 
  trackingNumber, 
  setTrackingNumber, 
  onTrack, 
  isLoading, 
  error 
}: TrackingFormProps) => {
  return (
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
              onKeyPress={(e) => e.key === 'Enter' && onTrack()}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>
          <Button 
            onClick={onTrack} 
            disabled={isLoading}
            className="bg-kargon-red hover:bg-kargon-red/90"
          >
            {isLoading ? "Tracking..." : "Track Package"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingForm;
