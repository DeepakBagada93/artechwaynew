
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
import type { Session } from "@supabase/supabase-js";
import { createBrowserClient } from '@supabase/ssr'

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Portal.",
      });
    }
    setLoading(false);
  };
  
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
        toast({
            variant: "destructive",
            title: "Logout Failed",
            description: error.message,
        });
    } else {
        toast({
            title: "Logged Out",
            description: "You have successfully logged out.",
        });
    }
    setLoading(false);
  }

  if (loading) {
    return <div className="container mx-auto flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return (
        <>
        <AppHeader />
        <div className="container mx-auto flex h-screen max-w-lg items-center justify-center">
            <Card>
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
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <AppHeader />
    <div className="container mx-auto max-w-5xl px-4 py-8">
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
    </div>
    <Footer />
    </>
  );
}
