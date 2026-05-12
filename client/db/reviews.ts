import { Review } from '@/types';

const reviews: Review[] = [
  {
    _id: 'rev-1', id: 'rev-1',
    rating: 5, title: 'Game changer for my workflow',
    content: 'ChatGPT has completely transformed how I work. I use it every day for drafting emails, brainstorming ideas, and debugging code. The free tier is already very powerful.',
    pros: 'Easy to use, versatile, free tier available', cons: 'Occasional hallucinations',
    tool: { _id: 'tool-1', id: 'tool-1', name: 'ChatGPT', slug: 'chatgpt' } as any,
    user: { _id: 'user-demo', id: 'user-demo', username: 'ainavix_demo' } as any,
    createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    _id: 'rev-2', id: 'rev-2',
    rating: 5, title: 'Best AI assistant available',
    content: 'Claude consistently gives more thoughtful and nuanced answers than other models. The long context window is fantastic for analysing large documents.',
    pros: 'Excellent reasoning, long context window, honest', cons: 'No image generation',
    tool: { _id: 'tool-2', id: 'tool-2', name: 'Claude', slug: 'claude' } as any,
    user: { _id: 'user-demo', id: 'user-demo', username: 'ainavix_demo' } as any,
    createdAt: '2024-03-02T00:00:00Z', updatedAt: '2024-03-02T00:00:00Z',
  },
  {
    _id: 'rev-3', id: 'rev-3',
    rating: 4, title: 'Stunning images every time',
    content: 'Midjourney produces the most beautiful AI art I have seen. The v6 model is incredible. The Discord workflow takes getting used to but it works well.',
    pros: 'Stunning quality, unique artistic style', cons: 'Discord-only, no free tier',
    tool: { _id: 'tool-4', id: 'tool-4', name: 'Midjourney', slug: 'midjourney' } as any,
    user: { _id: 'user-demo', id: 'user-demo', username: 'ainavix_demo' } as any,
    createdAt: '2024-03-03T00:00:00Z', updatedAt: '2024-03-03T00:00:00Z',
  },
  {
    _id: 'rev-4', id: 'rev-4',
    rating: 5, title: 'Copilot pays for itself in hours saved',
    content: 'I estimate GitHub Copilot saves me 2+ hours a day. It completes entire functions, writes tests, and even helps with documentation. Worth every penny.',
    pros: 'Huge productivity boost, integrates everywhere', cons: 'Suggestions not always accurate',
    tool: { _id: 'tool-7', id: 'tool-7', name: 'GitHub Copilot', slug: 'github-copilot' } as any,
    user: { _id: 'user-demo', id: 'user-demo', username: 'ainavix_demo' } as any,
    createdAt: '2024-03-04T00:00:00Z', updatedAt: '2024-03-04T00:00:00Z',
  },
  {
    _id: 'rev-5', id: 'rev-5',
    rating: 5, title: 'Cursor is the future of coding',
    content: 'Cursor understands my entire codebase. I can ask it to refactor a module and it touches all the right files. It\'s like pairing with a senior developer.',
    pros: 'Full codebase context, multi-file edits', cons: 'Pricier than Copilot',
    tool: { _id: 'tool-8', id: 'tool-8', name: 'Cursor', slug: 'cursor' } as any,
    user: { _id: 'user-demo', id: 'user-demo', username: 'ainavix_demo' } as any,
    createdAt: '2024-03-05T00:00:00Z', updatedAt: '2024-03-05T00:00:00Z',
  },
  {
    _id: 'rev-6', id: 'rev-6',
    rating: 4, title: 'ElevenLabs voices are shockingly realistic',
    content: 'I use ElevenLabs for podcast production and YouTube voiceovers. The voices are indistinguishable from real humans. The free tier is generous enough to try it.',
    pros: 'Best voice quality, easy API', cons: 'Cost adds up for high volume',
    tool: { _id: 'tool-19', id: 'tool-19', name: 'ElevenLabs', slug: 'elevenlabs' } as any,
    user: { _id: 'user-demo', id: 'user-demo', username: 'ainavix_demo' } as any,
    createdAt: '2024-03-06T00:00:00Z', updatedAt: '2024-03-06T00:00:00Z',
  },
];

export default reviews;
