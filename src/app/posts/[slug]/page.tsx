
import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { AppHeader } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RightSidebar } from "@/components/right-sidebar";
import { Card } from "@/components/ui/card";
import { LeftSidebar } from "@/components/left-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export const revalidate = 3600; // Revalidate every hour

type Props = {
  params: { slug: string };
};

export default async function PostPage({ params }: Props) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    );

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1">
          <LeftSidebar />
          <div className="flex flex-1 flex-col">
            <AppHeader />
            <div className="container mx-auto max-w-7xl flex-1 px-4 py-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <main className="lg:col-span-8">
                  <Card className="overflow-hidden">
                    <article className="prose prose-invert max-w-none p-6 lg:p-8">
                      <Badge
                        variant={
                          post.category === "Creatives" ? "default" : "secondary"
                        }
                        className="mb-4"
                      >
                        {post.category}
                      </Badge>
                      <h1 className="font-headline text-4xl font-bold !mb-4">{post.title}</h1>
                      <div className="flex items-center gap-4 my-6">
                          <Avatar>
                              <AvatarFallback>A</AvatarFallback>
                          </Avatar>
                          <div>
                              <span className="font-bold">Artechway</span>
                              <p className="text-sm text-muted-foreground">
                                  Published on {new Date(post.created_at).toLocaleDateString()}
                              </p>
                          </div>
                      </div>

                      {post.imageUrl && (
                        <div className="relative my-8 w-full aspect-video">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h2 className="text-3xl font-bold font-headline mt-8 mb-4" {...props} />,
                          h2: ({node, ...props}) => <h3 className="text-2xl font-bold font-headline mt-6 mb-3" {...props} />,
                          h3: ({node, ...props}) => <h4 className="text-xl font-bold font-headline mt-4 mb-2" {...props} />,
                          p: ({node, ...props}) => <p className="text-lg leading-relaxed my-4" {...props} />,
                          a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
                          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4" {...props} />,
                        }}
                      >
                          {post.content}
                      </ReactMarkdown>

                    </article>
                  </Card>
                </main>
                <aside className="lg:col-span-4">
                  <RightSidebar />
                </aside>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
