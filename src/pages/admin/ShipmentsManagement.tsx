
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
  weight?: string;
  dimensions?: string;
  service_type?: string;
  payment_status?: string;
  is_paused?: boolean;
  notes?: string;
  created_at: string;
  profiles: {
    email: string;
    first_name: string | null;
    last_name: string | null;
  } | null;
}

const ShipmentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newShipment, setNewShipment] = useState({
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    service_type: "Standard",
    recipient_email: "",
    notes: ""
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
          dimensions,
          service_type,
          payment_status,
          is_paused,
          notes,
          created_at,
          profiles:user_id (
            email,
            first_name,
            last_name
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

  const createShipment = async () => {
    try {
      const trackingNumber = `XPR${Date.now()}`;
      
      const { data, error } = await supabase
        .from('shipments')
        .insert({
          tracking_number: trackingNumber,
          origin: newShipment.origin,
          destination: newShipment.destination,
          weight: newShipment.weight,
          dimensions: newShipment.dimensions,
          service_type: newShipment.service_type,
          status: 'Processing',
          payment_status: 'Pending',
          current_location: newShipment.origin,
          notes: newShipment.notes,
          estimated_delivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });

      if (error) throw error;

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
        notes: ""
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

  const updateShipmentStatus = async (shipmentId: string, newStatus: string, location?: string) => {
    try {
      const updates: any = { status: newStatus };
      if (location) {
        updates.current_location = location;
      }

      const { error } = await supabase
        .from('shipments')
        .update(updates)
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Shipment status updated to ${newStatus}`,
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

  const togglePauseShipment = async (shipmentId: string, currentPauseState: boolean) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ is_paused: !currentPauseState })
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: currentPauseState ? "Shipment Resumed" : "Shipment Paused",
        description: `Shipment has been ${currentPauseState ? 'resumed' : 'paused'}`,
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

  const requestPayment = async (shipmentId: string) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ payment_status: 'Requested' })
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: "Payment Requested",
        description: "Payment request has been sent to the customer",
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

  const verifyPayment = async (shipmentId: string) => {
    try {
      const { error } = await supabase
        .from('shipments')
        .update({ payment_status: 'Completed' })
        .eq('id', shipmentId);

      if (error) throw error;

      toast({
        title: "Payment Verified",
        description: "Payment has been verified and marked as completed",
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
      paymentStatus: shipment.payment_status,
      customer: getCustomerName(shipment),
      createdDate: new Date(shipment.created_at).toLocaleDateString()
    }));

    const csvContent = [
      'Tracking Number,Origin,Destination,Status,Payment Status,Customer,Created Date',
      ...reportData.map(row => `${row.trackingNumber},${row.origin},${row.destination},${row.status},${row.paymentStatus},${row.customer},${row.createdDate}`)
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
    (shipment.profiles?.email && shipment.profiles.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Delivered": return "default";
      case "In Transit": return "secondary";
      case "Processing": return "secondary";
      case "Delayed": return "destructive";
      case "Out for Delivery": return "default";
      default: return "outline";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Requested": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCustomerName = (shipment: Shipment) => {
    if (!shipment.profiles) return "Unknown";
    
    const firstName = shipment.profiles.first_name || "";
    const lastName = shipment.profiles.last_name || "";
    
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    
    return shipment.profiles.email;
  };

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
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={newShipment.weight}
                    onChange={(e) => setNewShipment({...newShipment, weight: e.target.value})}
                    placeholder="e.g. 2.5 kg"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={newShipment.dimensions}
                    onChange={(e) => setNewShipment({...newShipment, dimensions: e.target.value})}
                    placeholder="e.g. 30x20x15 cm"
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
                <div className="col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newShipment.notes}
                    onChange={(e) => setNewShipment({...newShipment, notes: e.target.value})}
                    placeholder="Additional notes or instructions"
                  />
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
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className={shipment.is_paused ? "bg-yellow-50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {shipment.tracking_number}
                        {shipment.is_paused && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                            Paused
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getCustomerName(shipment)}</TableCell>
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
                      <Badge variant="outline" className={getPaymentStatusColor(shipment.payment_status || 'Pending')}>
                        {shipment.payment_status || 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedShipment(shipment)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Shipment Details - {selectedShipment?.tracking_number}</DialogTitle>
                            </DialogHeader>
                            {selectedShipment && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Basic Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div>
                                        <p className="text-xs text-gray-500">Origin</p>
                                        <p className="font-medium">{selectedShipment.origin}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Destination</p>
                                        <p className="font-medium">{selectedShipment.destination}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500">Current Location</p>
                                        <p className="font-medium">{selectedShipment.current_location || 'N/A'}</p>
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
                                        <p className="font-medium">{selectedShipment.weight || 'N/A'}</p>
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
                                </div>
                                <div className="flex gap-2">
                                  <Select onValueChange={(value) => updateShipmentStatus(selectedShipment.id, value)}>
                                    <SelectTrigger className="w-40">
                                      <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Processing">Processing</SelectItem>
                                      <SelectItem value="In Transit">In Transit</SelectItem>
                                      <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                                      <SelectItem value="Delivered">Delivered</SelectItem>
                                      <SelectItem value="Delayed">Delayed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => togglePauseShipment(selectedShipment.id, selectedShipment.is_paused || false)}
                                  >
                                    {selectedShipment.is_paused ? <Play className="h-4 w-4 mr-1" /> : <Pause className="h-4 w-4 mr-1" />}
                                    {selectedShipment.is_paused ? 'Resume' : 'Pause'}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => requestPayment(selectedShipment.id)}
                                    disabled={selectedShipment.payment_status === 'Completed'}
                                  >
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    Request Payment
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => verifyPayment(selectedShipment.id)}
                                    disabled={selectedShipment.payment_status === 'Completed'}
                                  >
                                    <CreditCard className="h-4 w-4 mr-1" />
                                    Verify Payment
                                  </Button>
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
                  <TableCell colSpan={7} className="text-center">
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
