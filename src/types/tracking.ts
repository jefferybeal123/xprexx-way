
export interface TrackingData {
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
