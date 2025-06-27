
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Eye,
  MapPin,
  Clock,
  Bell
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface UserShipment {
  id: string;
  tracking_number: string;
  origin: string;
  destination: string;
  status: string;
  current_location?: string;
  estimated_delivery?: string;
  weight?: number;
  dimensions?: string;
  service_type?: string;
  created_at: string;
}

interface TrackingEvent {
  id: string;
  event_type: string;
  description: string | null;
  location: string | null;
  created_at: string;
}

const ShipmentsPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState<UserShipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<UserShipment | null>(null);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserShipments();
    }
  }, [user]);

  const fetchUserShipments = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select(`
          id,
          tracking_number,
          origin,
          destination,
          status,
          current_location,
          estimated_delivery,
          weight,
          dimensions,
          service_type,
          created_at
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setShipments(data || []);
    } catch (err: any) {
      console.error('Error fetching shipments:', err.message);
      toast({
        title: "Error",
        description: "Failed to load shipments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrackingEvents = async (shipmentId: string) => {
    try {
      const { data, error } = await supabase
        .from('tracking_events')
        .select('*')
        .eq('shipment_id', shipmentId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTrackingEvents(data || []);
    } catch (err: any) {
      console.error('Error fetching tracking events:', err.message);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "In Transit":
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Order Received":
      case "Processing":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Delayed":
      case "Exception":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || shipment.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-kargon-dark">My Shipments</h1>
          <p className="text-gray-600">Track and monitor your package deliveries</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Bell className="h-4 w-4" />
          <span>You'll receive notifications for status updates</span>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Track Your Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by tracking number..."
                  className="pl-8 w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">Loading your shipments...</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking Number</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Est. Delivery</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">
                          {shipment.tracking_number}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{shipment.origin}</div>
                            <div className="text-gray-500">→ {shipment.destination}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusBadgeColor(shipment.status)}>
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {shipment.estimated_delivery ? 
                            new Date(shipment.estimated_delivery).toLocaleDateString() : 
                            'TBD'
                          }
                        </TableCell>
                        <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <button 
                                className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-kargon-red text-white rounded hover:bg-kargon-red/90"
                                onClick={() => {
                                  setSelectedShipment(shipment);
                                  fetchTrackingEvents(shipment.id);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                                Track
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Package Tracking - {selectedShipment?.tracking_number}</DialogTitle>
                              </DialogHeader>
                              {selectedShipment && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">Shipment Details</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div>
                                          <p className="text-xs text-gray-500">From</p>
                                          <p className="font-medium">{selectedShipment.origin}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-500">To</p>
                                          <p className="font-medium">{selectedShipment.destination}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-500">Current Location</p>
                                          <p className="font-medium">{selectedShipment.current_location || 'Processing'}</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-sm">Package Info</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div>
                                          <p className="text-xs text-gray-500">Weight</p>
                                          <p className="font-medium">{selectedShipment.weight ? `${selectedShipment.weight} kg` : 'N/A'}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-500">Service</p>
                                          <p className="font-medium">{selectedShipment.service_type || 'Standard'}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-500">Est. Delivery</p>
                                          <p className="font-medium">
                                            {selectedShipment.estimated_delivery ? 
                                              new Date(selectedShipment.estimated_delivery).toLocaleDateString() : 
                                              'TBD'
                                            }
                                          </p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Tracking Timeline
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-4">
                                        {trackingEvents.length > 0 ? (
                                          trackingEvents.map((event, index) => (
                                            <div key={event.id} className="flex items-start gap-4">
                                              <div className="flex flex-col items-center">
                                                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                                {index < trackingEvents.length - 1 && (
                                                  <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                                                )}
                                              </div>
                                              <div className="flex-1 pb-4">
                                                <div className="flex items-center justify-between">
                                                  <h4 className="font-medium text-sm">{event.event_type}</h4>
                                                  <span className="text-xs text-gray-500">
                                                    {new Date(event.created_at).toLocaleString()}
                                                  </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                                {event.location && (
                                                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                                    <MapPin className="h-3 w-3" />
                                                    {event.location}
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                          ))
                                        ) : (
                                          <p className="text-gray-500 text-center py-4">No tracking events available</p>
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        {searchTerm || statusFilter !== "all" ? 
                          "No shipments match your search criteria" : 
                          "You don't have any shipments yet"
                        }
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsPage;
