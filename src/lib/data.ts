export type Article = {
  id: string;
  title: string;
  description: string;
  category: "Creatives" | "Business";
  imageUrl: string;
  aiHint: string;
};

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "AI for Photographers: Automating Your Editing Workflow",
    description: "Discover AI tools that can handle culling, color correction, and retouching, saving you hours of manual work.",
    category: "Creatives",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "camera lens",
  },
  {
    id: "2",
    title: "Automated Bookkeeping with AI for Small Businesses",
    description: "See how AI-powered platforms can manage invoices, track expenses, and simplify your accounting.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "receipts calculator",
  },
  {
    id: "3",
    title: "Generative AI for Musicians: Co-writing with an Algorithm",
    description: "Break through creative blocks by using AI to generate melodies, chord progressions, and lyrical ideas.",
    category: "Creatives",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "music notes",
  },
  {
    id: "4",
    title: "AI-Powered Customer Support Chatbots",
    description: "Implement intelligent chatbots that can answer common questions and resolve issues 24/7, freeing up your team.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "headset chat",
  },
  {
    id: "5",
    title: "AI in Graphic Design: From Idea to Asset in Minutes",
    description: "Learn how to use AI to generate logos, social media graphics, and other visual assets with simple text prompts.",
    category: "Creatives",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "design tools",
  },
  {
    id: "6",
    title: "Streamlining Your Sales Funnel with AI Automation",
    description: "Automate lead scoring, email follow-ups, and appointment scheduling to close more deals with less effort.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "sales funnel",
  },
  {
    id: "7",
    title: "AI for Writers: Your New Research and Editing Partner",
    description: "Use AI to brainstorm ideas, summarize research, check grammar, and even help draft content.",
    category: "Creatives",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "writing book",
  },
  {
    id: "8",
    title: "Inventory Management Automation for E-commerce",
    description: "Let AI forecast demand, automate reordering, and optimize stock levels to prevent stockouts and overstocking.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "warehouse boxes",
  },
];
