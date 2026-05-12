/**
 * store.ts — singleton in-memory store
 *
 * All mutable data lives here. Because this is a module-level singleton,
 * it survives React re-renders and state updates for the whole browser session.
 * Data resets on page refresh (intentional — no backend needed).
 */

import { Tool, Review, Category, Feature, Tag } from '@/types';
import seedTools      from './tools';
import seedCategories from './categories';
import seedFeatures   from './features';
import seedTags       from './tags';
import seedReviews    from './reviews';

// Deep-clone seed data so mutations don't corrupt the imports
function clone<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr));
}

// ── Mutable in-memory tables ─────────────────────────────────
let _tools:      Tool[]     = clone(seedTools);
let _categories: Category[] = clone(seedCategories);
let _features:   Feature[]  = clone(seedFeatures);
let _tags:       Tag[]      = clone(seedTags);
let _reviews:    Review[]   = clone(seedReviews);

// ── ID generator ─────────────────────────────────────────────
let _seq = 1000;
export const newId = (prefix: string) => {
  _seq++;
  return `${prefix}-${_seq}-${Date.now()}`;
};

// ─────────────────────────────────────────────────────────────
// TOOLS
// ─────────────────────────────────────────────────────────────
export const toolsStore = {
  getAll:   () => _tools,
  getById:  (id: string)   => _tools.find(t => t._id === id || t.id === id) ?? null,
  getBySlug:(slug: string) => _tools.find(t => t.slug === slug) ?? null,

  add: (tool: Tool) => {
    _tools = [tool, ..._tools];
    return tool;
  },

  incrementViews: (id: string) => {
    _tools = _tools.map(t =>
      t._id === id || t.id === id
        ? { ...t, viewsCount: (t.viewsCount || 0) + 1 }
        : t
    );
  },

  updateRating: (toolId: string) => {
    const toolReviews = _reviews.filter(r => {
      const tid = (r.tool as any)?._id ?? (r.tool as any)?.id ?? r.tool;
      return String(tid) === String(toolId);
    });
    if (toolReviews.length === 0) return;
    const avg = toolReviews.reduce((s, r) => s + r.rating, 0) / toolReviews.length;
    _tools = _tools.map(t =>
      t._id === toolId || t.id === toolId
        ? { ...t, averageRating: Math.round(avg * 10) / 10, reviewsCount: toolReviews.length }
        : t
    );
  },
};

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────
export const categoriesStore = {
  getAll: () => _categories,

  findBySlug: (slug: string) => _categories.find(c => c.slug === slug) ?? null,

  findByName: (name: string) =>
    _categories.find(c => c.name.toLowerCase() === name.toLowerCase()) ?? null,

  add: (cat: Category) => {
    _categories = [..._categories, cat];
    return cat;
  },
};

// ─────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────
export const featuresStore = {
  getAll: () => _features,

  findByName: (name: string) =>
    _features.find(f => f.name.toLowerCase() === name.toLowerCase()) ?? null,

  add: (feat: Feature) => {
    _features = [..._features, feat];
    return feat;
  },
};

// ─────────────────────────────────────────────────────────────
// TAGS
// ─────────────────────────────────────────────────────────────
export const tagsStore = {
  getAll: () => _tags,

  findByName: (name: string) =>
    _tags.find(t => t.name.toLowerCase() === name.toLowerCase()) ?? null,

  add: (tag: Tag) => {
    _tags = [..._tags, tag];
    return tag;
  },
};

// ─────────────────────────────────────────────────────────────
// REVIEWS
// ─────────────────────────────────────────────────────────────
export const reviewsStore = {
  getAll: () => _reviews,

  getByTool: (toolId: string) =>
    _reviews.filter(r => {
      const tid = (r.tool as any)?._id ?? (r.tool as any)?.id ?? r.tool;
      return String(tid) === String(toolId);
    }),

  getByUser: (userId: string) =>
    _reviews.filter(r => {
      const uid = (r.user as any)?._id ?? (r.user as any)?.id ?? r.user;
      return String(uid) === String(userId);
    }),

  hasReviewed: (toolId: string, userId: string) =>
    _reviews.some(r => {
      const tid = (r.tool as any)?._id ?? (r.tool as any)?.id ?? r.tool;
      const uid = (r.user as any)?._id ?? (r.user as any)?.id ?? r.user;
      return String(tid) === String(toolId) && String(uid) === String(userId);
    }),

  add: (review: Review) => {
    _reviews = [review, ..._reviews];
    return review;
  },

  delete: (id: string) => {
    _reviews = _reviews.filter(r => r._id !== id && r.id !== id);
  },
};

// ─────────────────────────────────────────────────────────────
// USERS  (lightweight — only what auth needs)
// ─────────────────────────────────────────────────────────────
export interface LocalUser {
  _id: string;
  id:  string;
  username: string;
  email:    string;
  password: string;   // stored plain for demo (no real security needed)
  bio:      string;
  role:     'user' | 'admin';
  avatar:   { url: string | null; name: string | null };
  createdAt: string;
  updatedAt: string;
}

let _users: LocalUser[] = [
  {
    _id: 'user-demo', id: 'user-demo',
    username: 'ainavix_demo',
    email:    'demo@ainavix.ai',
    password: 'demo123456',
    bio:      'Demo account for AINavix.',
    role:     'user',
    avatar:   { url: null, name: null },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const usersStore = {
  getAll: () => _users,

  findById: (id: string) =>
    _users.find(u => u._id === id || u.id === id) ?? null,

  findByIdentifier: (identifier: string) =>
    _users.find(u =>
      u.email.toLowerCase() === identifier.toLowerCase() ||
      u.username.toLowerCase() === identifier.toLowerCase()
    ) ?? null,

  findByEmail: (email: string) =>
    _users.find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null,

  findByUsername: (username: string) =>
    _users.find(u => u.username.toLowerCase() === username.toLowerCase()) ?? null,

  add: (user: LocalUser) => {
    _users = [..._users, user];
    return user;
  },

  update: (id: string, updates: Partial<LocalUser>) => {
    _users = _users.map(u =>
      u._id === id || u.id === id
        ? { ...u, ...updates, updatedAt: new Date().toISOString() }
        : u
    );
    return _users.find(u => u._id === id || u.id === id) ?? null;
  },

  toSafe: (u: LocalUser) => {
    const { password, ...safe } = u;
    return safe;
  },
};
