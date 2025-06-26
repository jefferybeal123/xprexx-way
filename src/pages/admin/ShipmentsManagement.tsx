
import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  Package, 
  Eye, 
  Pencil, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign,
  Pause,
  Play,
  CreditCard,
  Download,
  FileText
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Shipment {
  id: string;
  tracking_number: string;
  origin: string;
  destination: string;
  status: string;
  current_location?: string;
  estimated_delivery?: string;
  weight?: number;
  physical_weight?: number;
  dimensions?: string;
  service_type?: string;
  quantity?: number;
  volume?: string;
  sender_name?: string;
  sender_email?: string;
  receiver_name?: string;
  receiver_email?: string;
  term?: string;
  payment_status?: string;
  is_paused?: boolean;
  created_at: string;
  updated_at?: string;
  profiles: {
    email: string;
    first_name: string | null;
    last_name: string | null;
    customer_id: string | null;
  } | null;
}

interface TrackingEvent {
  id: string;
  event_type: string;
  description: string | null;
  location: string | null;
  created_at: string;
}

const ShipmentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: "",
    location: "",
    description: ""
  });
  const [newShipment, setNewShipment] = useState({
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    service_type: "Standard",
    recipient_email: "",
    recipient_name: "",
    sender_name: "",
    sender_email: "",
    quantity: "",
    volume: "",
    term: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    setIsLoading(true);
    setError(null);
    
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
          physical_weight,
          dimensions,
          service_type,
          quantity,
          volume,
          sender_name,
          sender_email,
          receiver_name,
          receiver_email,
          term,
          payment_status,
          is_paused,
          created_at,
          updated_at,
          profiles:user_id (
            email,
            first_name,
            last_name,
            customer_id
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setShipments(data || []);
    } catch (err: any) {
      console.error('Error fetching shipments:', err.message);
      setError(err.message);
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

  const createShipment = async () => {
    try {
      const trackingNumber = `XPR${Date.now()}`;
      
      const { data, error } = await supabase
        .from('shipments')
        .insert({
          tracking_number: trackingNumber,
          origin: newShipment.origin,
          destination: newShipment.destination,
          weight: newShipment.weight ? parseFloat(newShipment.weight) : null,
          dimensions: newShipment.dimensions,
          service_type: newShipment.service_type,
          status: 'Order Received',
          current_location: newShipment.origin,
          estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          sender_name: newShipment.sender_name,
          sender_email: newShipment.sender_email,
          receiver_name: newShipment.recipient_name,
          receiver_email: newShipment.recipient_email,
          quantity: newShipment.quantity ? parseInt(newShipment.quantity) : null,
          volume: newShipment.volume,
          term: newShipment.term,
          payment_status: 'pending',
          is_paused: false
        });

      if (error) throw error;

      // Create initial tracking event
      await supabase
        .from('tracking_events')
        .insert({
          shipment_id: data[0].id,
          event_type: 'Order Received',
          description: 'Your shipment has been received and is being processed',
          location: newShipment.origin
        });

      toast({
        title: "Shipment Created",
        description: `Tracking number: ${trackingNumber}`,
      });

      setIsCreateDialogOpen(false);
      setNewShipment({
        origin: "",
        destination: "",
        weight: "",
        dimensions: "",
        service_type: "Standard",
        recipient_email: "",
        recipient_name: "",
        sender_name: "",
        sender_email: "",
        quantity: "",
        volume: "",
        term: ""
      });
      fetchShipments();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const updateShipmentStatus = async (shipmentId: string, newStatus: string, location?: string, description?: string) => {
    try {
      const updates: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };
      if (location) {
        updates.current_location = location;
      }

      const { error } = await supabase
        .from('shipments')
        .update(updates)
        .eq('id', shipmentId);

      if (error) throw error;

      // Create tracking event
      await supabase
        .from('tracking_events')
        .insert({
          shipment_id: shipmentId,
          event_type: newStatus,
          description: description || `Shipment status updated to ${newStatus}`,
          location: location || null
        });

      toast({
        title: "Status Updated",
        description: `Shipment status updated to ${newStatus}`,
      });

      fetchShipments();
      if (selectedShipment?.id === shipmentId) {
        fetchTrackingEvents(shipmentId);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const togglePauseShipment = async (shipmentId: string, currentPauseState: boolean) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ 
          is_paused: !currentPauseState,
          updated_at: new Date().toISOString()
        })
        .eq('id', shipmentId);

      if (error) throw error;

      // Create tracking event
      await supabase
        .from('tracking_events')
        .insert({
          shipment_id: shipmentId,
          event_type: !currentPauseState ? 'Shipment Paused' : 'Shipment Resumed',
          description: !currentPauseState ? 'Shipment has been paused' : 'Shipment has been resumed',
          location: null
        });

      toast({
        title: !currentPauseState ? "Shipment Paused" : "Shipment Resumed",
        description: `Shipment has been ${!currentPauseState ? 'paused' : 'resumed'}`,
      });

      fetchShipments();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const updatePaymentStatus = async (shipmentId: string, paymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ 
          payment_status: paymentStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: "Payment Status Updated",
        description: `Payment status updated to ${paymentStatus}`,
      });

      fetchShipments();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const generateReport = () => {
    const reportData = shipments.map(shipment => ({
      trackingNumber: shipment.tracking_number,
      origin: shipment.origin,
      destination: shipment.destination,
      status: shipment.status,
      paymentStatus: shipment.payment_status || 'pending',
      isPaused: shipment.is_paused ? 'Yes' : 'No',
      customer: getCustomerName(shipment),
      customerId: shipment.profiles?.customer_id || 'N/A',
      createdDate: new Date(shipment.created_at).toLocaleDateString()
    }));

    const csvContent = [
      'Tracking Number,Origin,Destination,Status,Payment Status,Is Paused,Customer,Customer ID,Created Date',
      ...reportData.map(row => `${row.trackingNumber},${row.origin},${row.destination},${row.status},${row.paymentStatus},${row.isPaused},${row.customer},${row.customerId},${row.createdDate}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shipments-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Generated",
      description: "Shipments report has been downloaded",
    });
  };
  
  const filteredShipments = shipments.filter(shipment => 
    shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (shipment.profiles?.email && shipment.profiles.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (shipment.profiles?.customer_id && shipment.profiles.customer_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Delivered": return "default";
      case "In Transit": 
      case "Out for Delivery": return "secondary";
      case "Order Received":
      case "Processing": return "outline";
      case "Delayed": return "destructive";
      default: return "outline";
    }
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "pending": return "secondary";
      case "failed": return "destructive";
      default: return "outline";
    }
  };

  const getCustomerName = (shipment: Shipment) => {
    if (!shipment.profiles) return shipment.receiver_name || "Unknown";
    
    const firstName = shipment.profiles.first_name || "";
    const lastName = shipment.profiles.last_name || "";
    
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    
    return shipment.profiles.email;
  };

  const realisticStatuses = [
    "Order Received",
    "Processing", 
    "Pickup Scheduled",
    "In Transit - Origin Facility",
    "In Transit - International",
    "Customs Clearance",
    "In Transit - Destination Facility", 
    "Out for Delivery",
    "Delivered",
    "Delayed",
    "Exception"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Shipments Management</h1>
        <p className="text-muted-foreground">Monitor and manage all shipments in the system</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search shipments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={generateReport}>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Package className="mr-2 h-4 w-4" />
                New Shipment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Shipment</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sender_name">Sender Name</Label>
                  <Input
                    id="sender_name"
                    value={newShipment.sender_name}
                    onChange={(e) => setNewShipment({...newShipment, sender_name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="sender_email">Sender Email</Label>
                  <Input
                    id="sender_email"
                    type="email"
                    value={newShipment.sender_email}
                    onChange={(e) => setNewShipment({...newShipment, sender_email: e.target.value})}
                    placeholder="sender@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    value={newShipment.origin}
                    onChange={(e) => setNewShipment({...newShipment, origin: e.target.value})}
                    placeholder="Origin address"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={newShipment.destination}
                    onChange={(e) => setNewShipment({...newShipment, destination: e.target.value})}
                    placeholder="Destination address"
                  />
                </div>
                <div>
                  <Label htmlFor="recipient_name">Recipient Name</Label>
                  <Input
                    id="recipient_name"
                    value={newShipment.recipient_name}
                    onChange={(e) => setNewShipment({...newShipment, recipient_name: e.target.value})}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="recipient_email">Recipient Email</Label>
                  <Input
                    id="recipient_email"
                    type="email"
                    value={newShipment.recipient_email}
                    onChange={(e) => setNewShipment({...newShipment, recipient_email: e.target.value})}
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newShipment.weight}
                    onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                    placeholder="2.5"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={newShipment.dimensions}
                    onChange={(e) => setNewShipment({...newShipment, dimensions: e.target.value})}
                    placeholder="30x20x15 cm"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newShipment.quantity}
                    onChange={(e) => setNewShipment({...newShipment, quantity: e.target.value})}
                    placeholder="1"
                  />
                </div>
                <div>
                  <Label htmlFor="service_type">Service Type</Label>
                  <Select value={newShipment.service_type} onValueChange={(value) => setNewShipment({...newShipment, service_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Express">Express</SelectItem>
                      <SelectItem value="Overnight">Overnight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createShipment}>
                  Create Shipment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="border rounded-md">
        {isLoading ? (
          <div className="p-8 text-center">Loading shipments...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Error: {error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className={shipment.is_paused ? "bg-gray-50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {shipment.tracking_number}
                        {shipment.is_paused && <Pause className="h-4 w-4 text-orange-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{getCustomerName(shipment)}</div>
                        <div className="text-gray-500">{shipment.profiles?.customer_id || 'N/A'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{shipment.origin}</div>
                        <div className="text-gray-500">→ {shipment.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(shipment.status)}>
                        {shipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPaymentStatusVariant(shipment.payment_status || 'pending')}>
                        {shipment.payment_status || 'pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>{shipment.weight ? `${shipment.weight} kg` : 'N/A'}</TableCell>
                    <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedShipment(shipment);
                              fetchTrackingEvents(shipment.id);
                            }}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Shipment Details - {selectedShipment?.tracking_number}</DialogTitle>
                            </DialogHeader>
                            {selectedShipment && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Basic Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div>
                                        <p className="text-xs text-gray-500">Customer</p>
                                        <p className="font-medium">{getCustomerName(selectedShipment)}</p>
                                        <p className="text-xs text-gray-500">{selectedShipment.profiles?.customer_id}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Origin</p>
                                        <p className="font-medium">{selectedShipment.origin}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Destination</p>
                                        <p className="font-medium">{selectedShipment.destination}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Package Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div>
                                        <p className="text-xs text-gray-500">Weight</p>
                                        <p className="font-medium">{selectedShipment.weight ? `${selectedShipment.weight} kg` : 'N/A'}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Dimensions</p>
                                        <p className="font-medium">{selectedShipment.dimensions || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Service</p>
                                        <p className="font-medium">{selectedShipment.service_type || 'Standard'}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Status & Payment</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <Badge variant={getStatusVariant(selectedShipment.status)}>
                                          {selectedShipment.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Payment</p>
                                        <Badge variant={getPaymentStatusVariant(selectedShipment.payment_status || 'pending')}>
                                          {selectedShipment.payment_status || 'pending'}
                                        </Badge>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Paused</p>
                                        <p className="font-medium">{selectedShipment.is_paused ? 'Yes' : 'No'}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-sm">Tracking History</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {trackingEvents.map((event) => (
                                        <div key={event.id} className="flex items-start gap-3 border-l-2 border-blue-200 pl-4">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                              <h4 className="font-medium text-sm">{event.event_type}</h4>
                                              <span className="text-xs text-gray-500">
                                                {new Date(event.created_at).toLocaleString()}
                                              </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{event.description}</p>
                                            {event.location && (
                                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {event.location}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>

                                <div className="flex gap-2 pt-4 border-t">
                                  <Select onValueChange={(value) => {
                                    setStatusUpdateData({...statusUpdateData, status: value});
                                  }}>
                                    <SelectTrigger className="w-48">
                                      <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {realisticStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    placeholder="Location"
                                    value={statusUpdateData.location}
                                    onChange={(e) => setStatusUpdateData({...statusUpdateData, location: e.target.value})}
                                    className="w-40"
                                  />
                                  <Input
                                    placeholder="Description"
                                    value={statusUpdateData.description}
                                    onChange={(e) => setStatusUpdateData({...statusUpdateData, description: e.target.value})}
                                    className="flex-1"
                                  />
                                  <Button onClick={() => {
                                    if (statusUpdateData.status) {
                                      updateShipmentStatus(
                                        selectedShipment.id, 
                                        statusUpdateData.status, 
                                        statusUpdateData.location || undefined,
                                        statusUpdateData.description || undefined
                                      );
                                      setStatusUpdateData({status: "", location: "", description: ""});
                                    }
                                  }}>
                                    Update
                                  </Button>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => togglePauseShipment(selectedShipment.id, selectedShipment.is_paused || false)}
                                  >
                                    {selectedShipment.is_paused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
                                    {selectedShipment.is_paused ? 'Resume' : 'Pause'} Shipment
                                  </Button>
                                  <Select onValueChange={(value) => updatePaymentStatus(selectedShipment.id, value)}>
                                    <SelectTrigger className="w-48">
                                      <SelectValue placeholder="Update Payment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="paid">Paid</SelectItem>
                                      <SelectItem value="failed">Failed</SelectItem>
                                      <SelectItem value="refunded">Refunded</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No shipments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ShipmentsManagement;
