
"use client";

import { useEffect, useState } from "react";
import { BlogForm } from "@/components/admin/blog-form";
import { ManageBlogs } from "@/components/admin/manage-blogs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { AppHeader } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (
      email === "deeepakbagada25@gmail.com" &&
      password === "Deeepak@3093"
    ) {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Portal.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setLoading(true);
    setIsLoggedIn(false);
    toast({
        title: "Logged Out",
        description: "You have successfully logged out.",
    });
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Please enter your credentials to access the admin portal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow container mx-auto max-w-5xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-headline font-bold">Admin Portal</h1>
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </div>
        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create New Post</TabsTrigger>
            <TabsTrigger value="manage">Manage Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>New Blog Post</CardTitle>
                <CardDescription>
                  Fill out the form to create a new SEO-optimized blog post.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Existing Posts</CardTitle>
                <CardDescription>
                  Edit or delete existing blog posts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ManageBlogs />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
