export type Article = {
  id: string;
  title: string;
  description: string;
  category: "Creative" | "Business" | "Technology" | "Future";
  imageUrl: string;
  aiHint: string;
};

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Generative Art: The New Frontier of Digital Expression",
    description: "Explore how AI is transforming the art world, enabling artists to create stunning visuals with algorithms.",
    category: "Creative",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "abstract art",
  },
  {
    id: "2",
    title: "AI in Business: Boosting Efficiency and Innovation",
    description: "Discover the practical applications of AI in modern businesses, from automating tasks to driving strategic decisions.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "business meeting",
  },
  {
    id: "3",
    title: "The Core Technologies Behind Modern AI",
    description: "A deep dive into the fundamental technologies like machine learning and neural networks that power today's AI.",
    category: "Technology",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "server room",
  },
  {
    id: "4",
    title: "Future Gazing: AI's Role in Shaping Tomorrow's Society",
    description: "What does a future with advanced AI look like? We explore the potential societal shifts and ethical considerations.",
    category: "Future",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "futuristic city",
  },
  {
    id: "5",
    title: "AI-Powered Music Composition",
    description: "Can an algorithm write a symphony? Exploring the rise of AI composers and what it means for the music industry.",
    category: "Creative",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "audio waveform",
  },
  {
    id: "6",
    title: "Startup Strategies: Leveraging AI for Market Disruption",
    description: "How small teams can use AI to compete with industry giants and carve out new market niches.",
    category: "Business",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "startup office",
  },
  {
    id: "7",
    title: "Quantum Computing and AI: A Revolutionary Synergy",
    description: "Unpacking the potential of quantum computing to unlock unprecedented capabilities in artificial intelligence.",
    category: "Technology",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "quantum computer",
  },
  {
    id: "8",
    title: "Ethical AI: Navigating Bias and Fairness",
    description: "A critical look at the challenges of building fair and unbiased AI systems and the frameworks for achieving them.",
    category: "Future",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "balanced scales",
  },
];
