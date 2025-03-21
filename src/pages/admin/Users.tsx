
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
  UserPlus, 
  Edit, 
  Trash, 
  Lock, 
  Unlock,
  Filter
} from "lucide-react";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Staff", status: "Active" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Customer", status: "Suspended" },
    { id: 6, name: "Diana Miller", email: "diana@example.com", role: "Customer", status: "Inactive" },
    { id: 7, name: "Edward Davis", email: "edward@example.com", role: "Staff", status: "Active" },
    { id: 8, name: "Fiona Clark", email: "fiona@example.com", role: "Customer", status: "Active" },
  ];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
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
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={
                    user.role === "Admin" ? "default" : 
                    user.role === "Staff" ? "outline" : "secondary"
                  }>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    user.status === "Active" ? "default" : // Changed from "success" to "default"
                    user.status === "Suspended" ? "destructive" : "outline"
                  }>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {user.status === "Active" ? (
                      <Button variant="ghost" size="icon">
                        <Lock className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon">
                        <Unlock className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
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

export default UsersPage;
