import { Category } from '@/types';

const categories: Category[] = [
  { _id: 'cat-1', id: 'cat-1', name: 'AI Writing',          slug: 'ai-writing',          description: 'Content creation and writing assistants' },
  { _id: 'cat-2', id: 'cat-2', name: 'Image Generation',    slug: 'image-generation',    description: 'AI-powered image and art creation' },
  { _id: 'cat-3', id: 'cat-3', name: 'Code Generation',     slug: 'code-generation',     description: 'AI coding assistants and pair programmers' },
  { _id: 'cat-4', id: 'cat-4', name: 'Conversational AI',   slug: 'conversational-ai',   description: 'Chatbots and conversational agents' },
  { _id: 'cat-5', id: 'cat-5', name: 'Automated Analytics', slug: 'automated-analytics', description: 'Data analysis and business intelligence' },
  { _id: 'cat-6', id: 'cat-6', name: 'Adaptive Learning',   slug: 'adaptive-learning',   description: 'AI-powered education and tutoring' },
  { _id: 'cat-7', id: 'cat-7', name: 'Productivity',        slug: 'productivity',        description: 'Tools to boost work efficiency' },
  { _id: 'cat-8', id: 'cat-8', name: 'Voice & Audio',       slug: 'voice-audio',         description: 'Voice synthesis and audio generation' },
];

export default categories;
