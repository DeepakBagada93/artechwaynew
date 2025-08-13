import { BlogForm } from "@/components/admin/blog-form";
import { ManageBlogs } from "@/components/admin/manage-blogs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-4xl font-headline font-bold mb-8">Admin Portal</h1>
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
  );
}
