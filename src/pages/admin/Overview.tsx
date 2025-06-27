import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  Clock, 
  Truck, 
  Search,
  FileText,
  Plus,
  ChevronRight,
  Download
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AdminOverviewProps {
  onTabChange?: (tab: string) => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ onTabChange }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTrackDialogOpen, setIsTrackDialogOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [newShipment, setNewShipment] = useState({
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    service_type: "Standard",
    recipient_email: "",
    recipient_name: "",
    sender_name: "",
    sender_email: ""
  });
  const { toast } = useToast();

  // Mock data for shipments
  const recentShipments = [
    { id: "SH-2023-001", origin: "New York, USA", destination: "London, UK", status: "in-transit", date: "2023-10-15" },
    { id: "SH-2023-002", origin: "Berlin, Germany", destination: "Paris, France", status: "delivered", date: "2023-10-10" },
    { id: "SH-2023-003", origin: "Tokyo, Japan", destination: "Seoul, South Korea", status: "pending", date: "2023-10-18" },
    { id: "SH-2023-004", origin: "Sydney, Australia", destination: "Melbourne, Australia", status: "in-transit", date: "2023-10-14" }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "in-transit":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
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
          receiver_email: newShipment.recipient_email
        })
        .select();

      if (error) throw error;

      // Create initial tracking event
      if (data && data.length > 0) {
        await supabase
          .from('tracking_events')
          .insert({
            shipment_id: data[0].id,
            event_type: 'Order Received',
            description: 'Your shipment has been received and is being processed',
            location: newShipment.origin
          });
      }

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
        sender_email: ""
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const trackShipment = async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber)
        .single();

      if (error) throw error;

      if (data) {
        setTrackingResult(data);
        toast({
          title: "Shipment Found",
          description: `Status: ${data.status}`,
        });
      }
    } catch (err: any) {
      toast({
        title: "Shipment Not Found",
        description: "Please check the tracking number and try again",
        variant: "destructive",
      });
      setTrackingResult(null);
    }
  };

  const generateReport = async () => {
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const reportData = (data || []).map(shipment => ({
        trackingNumber: shipment.tracking_number,
        origin: shipment.origin,
        destination: shipment.destination,
        status: shipment.status,
        senderName: shipment.sender_name || 'N/A',
        receiverName: shipment.receiver_name || 'N/A',
        createdDate: new Date(shipment.created_at).toLocaleDateString()
      }));

      const csvContent = [
        'Tracking Number,Origin,Destination,Status,Sender,Receiver,Created Date',
        ...reportData.map(row => `${row.trackingNumber},${row.origin},${row.destination},${row.status},${row.senderName},${row.receiverName},${row.createdDate}`)
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-shipments-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Generated",
        description: "Admin shipments report has been downloaded",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-kargon-dark">Admin Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search shipments..." 
            className="max-w-xs"
          />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Shipments</CardTitle>
            <Package className="h-4 w-4 text-kargon-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-gray-500 mt-1">+14% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-kargon-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500 mt-1">5 arriving today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-kargon-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500 mt-1">Require your attention</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Shipments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Shipments</CardTitle>
          <Button variant="ghost" size="sm" className="text-kargon-red" onClick={() => onTabChange?.('shipments')}>
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeColor(shipment.status)}>
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Create New Shipment
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

            <Button className="w-full justify-start" variant="outline" onClick={generateReport}>
              <FileText className="mr-2 h-4 w-4" /> Generate Report
            </Button>

            <Dialog open={isTrackDialogOpen} onOpenChange={setIsTrackDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <Truck className="mr-2 h-4 w-4" /> Track Shipment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Track Shipment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tracking_number">Tracking Number</Label>
                    <Input
                      id="tracking_number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
                    />
                  </div>
                  {trackingResult && (
                    <Card>
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium">Status:</span> {trackingResult.status}
                          </div>
                          <div>
                            <span className="font-medium">Current Location:</span> {trackingResult.current_location || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Origin:</span> {trackingResult.origin}
                          </div>
                          <div>
                            <span className="font-medium">Destination:</span> {trackingResult.destination}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsTrackDialogOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={trackShipment}>
                      Track
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        {/* ... keep existing code (notifications card) the same ... */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">Shipment SH-2023-001 is arriving today</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">New quote request submitted</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
              <div>
                <p className="font-medium">Your monthly report is ready</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
