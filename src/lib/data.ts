
export type Article = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "Creatives" | "Business";
  imageUrl: string;
  aiHint: string;
  createdAt?: string;
};

// Mock articles are no longer the primary source of data.
// They can be kept for fallback or testing purposes.
export const mockArticles: Article[] = [
  {
    id: "1",
    slug: "ai-for-photographers-automating-your-editing-workflow",
    title: "AI for Photographers: Automating Your Editing Workflow",
    description: "Discover AI tools that can handle culling, color correction, and retouching, saving you hours of manual work.",
    category: "Creatives",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "camera lens",
  },
  {
    id: "2",
    slug: "automated-bookkeeping-with-ai-for-small-businesses",
    title: "Automated Bookkeeping with AI for Small Businesses",
    description: "See how AI-powered platforms can manage invoices, track expenses, and simplify your accounting.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "receipts calculator",
  },
];
