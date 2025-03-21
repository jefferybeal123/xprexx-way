
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
import { 
  Search, 
  Filter, 
  CreditCard, 
  Download, 
  Eye,
  BarChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock payment data
  const payments = [
    { id: "PAY-12345", customer: "John Doe", amount: 1250.00, method: "Credit Card", status: "Completed", date: "2023-06-15" },
    { id: "PAY-12346", customer: "Jane Smith", amount: 850.50, method: "PayPal", status: "Completed", date: "2023-06-12" },
    { id: "PAY-12347", customer: "Bob Johnson", amount: 1500.00, method: "Bank Transfer", status: "Pending", date: "2023-06-17" },
    { id: "PAY-12348", customer: "Alice Brown", amount: 950.25, method: "Credit Card", status: "Completed", date: "2023-06-14" },
    { id: "PAY-12349", customer: "Charlie Wilson", amount: 2200.00, method: "PayPal", status: "Failed", date: "2023-06-13" },
    { id: "PAY-12350", customer: "Diana Miller", amount: 1100.75, method: "Credit Card", status: "Pending", date: "2023-06-18" },
    { id: "PAY-12351", customer: "Edward Davis", amount: 750.50, method: "Bank Transfer", status: "Completed", date: "2023-06-10" },
    { id: "PAY-12352", customer: "Fiona Clark", amount: 1800.00, method: "Credit Card", status: "Completed", date: "2023-06-16" },
  ];
  
  const filteredPayments = payments.filter(payment => 
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Pending": return "warning";
      case "Failed": return "destructive";
      default: return "outline";
    }
  };

  // Calculate summary statistics
  const totalRevenue = payments.reduce((sum, payment) => 
    payment.status === "Completed" ? sum + payment.amount : sum, 0
  );
  
  const pendingRevenue = payments.reduce((sum, payment) => 
    payment.status === "Pending" ? sum + payment.amount : sum, 0
  );
  
  const failedRevenue = payments.reduce((sum, payment) => 
    payment.status === "Failed" ? sum + payment.amount : sum, 0
  );
  
  const completedCount = payments.filter(payment => payment.status === "Completed").length;
  const pendingCount = payments.filter(payment => payment.status === "Pending").length;
  const failedCount = payments.filter(payment => payment.status === "Failed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments Management</h1>
        <p className="text-muted-foreground">Track and manage all payment transactions</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{completedCount} successful transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{pendingCount} pending transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${failedRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{failedCount} failed transactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments.length > 0 
                ? `${((completedCount / payments.length) * 100).toFixed(1)}%` 
                : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">Based on all transactions</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments..."
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
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
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

export default PaymentsManagement;
