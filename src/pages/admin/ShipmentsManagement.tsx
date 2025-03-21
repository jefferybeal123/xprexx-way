
import React, { useState } from "react";
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
import { Search, Filter, Package, Eye, Pencil } from "lucide-react";

const ShipmentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock shipment data
  const shipments = [
    { id: "SH-12345", customer: "John Doe", origin: "New York", destination: "Los Angeles", status: "In Transit", date: "2023-06-15" },
    { id: "SH-12346", customer: "Jane Smith", origin: "Chicago", destination: "Miami", status: "Delivered", date: "2023-06-12" },
    { id: "SH-12347", customer: "Bob Johnson", origin: "Seattle", destination: "Denver", status: "Processing", date: "2023-06-17" },
    { id: "SH-12348", customer: "Alice Brown", origin: "Boston", destination: "Atlanta", status: "In Transit", date: "2023-06-14" },
    { id: "SH-12349", customer: "Charlie Wilson", origin: "San Francisco", destination: "Las Vegas", status: "Delayed", date: "2023-06-13" },
    { id: "SH-12350", customer: "Diana Miller", origin: "Portland", destination: "Phoenix", status: "Processing", date: "2023-06-18" },
    { id: "SH-12351", customer: "Edward Davis", origin: "Houston", destination: "Detroit", status: "Delivered", date: "2023-06-10" },
    { id: "SH-12352", customer: "Fiona Clark", origin: "Dallas", destination: "Philadelphia", status: "In Transit", date: "2023-06-16" },
  ];
  
  const filteredShipments = shipments.filter(shipment => 
    shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Delivered": return "success";
      case "In Transit": return "default";
      case "Processing": return "secondary";
      case "Delayed": return "destructive";
      default: return "outline";
    }
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
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Package className="mr-2 h-4 w-4" />
            New Shipment
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">{shipment.id}</TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(shipment.status)}>
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ShipmentsManagement;
