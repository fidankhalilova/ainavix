'use client';
import { useState, useEffect, useCallback } from 'react';
import { Tool } from '@/types';

const STORAGE_KEY   = 'ainavix_favorites';
const VISIBILITY_KEY = 'ainavix_fav_visibility';

export function useFavorites() {
  const [favorites,   setFavorites]   = useState<Tool[]>([]);
  const [visibility,  setVisibility]  = useState<'public' | 'private'>('private');
  const [hydrated,    setHydrated]    = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
      const vis = localStorage.getItem(VISIBILITY_KEY);
      if (vis === 'public' || vis === 'private') setVisibility(vis);
    } catch (_) {}
    setHydrated(true);
  }, []);

  const persist = (list: Tool[]) => {
    setFavorites(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  // Returns true if added, false if removed
  const toggleFavorite = useCallback((tool: Tool): boolean => {
    setFavorites(prev => {
      const exists = prev.some(t => t._id === tool._id || t.id === tool.id);
      const next   = exists
        ? prev.filter(t => t._id !== tool._id && t.id !== tool.id)
        : [...prev, tool];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    const exists = favorites.some(t => t._id === tool._id || t.id === tool.id);
    return !exists;
  }, [favorites]);

  const removeFromFavorites = useCallback((toolId: string | number) => {
    setFavorites(prev => {
      const next = prev.filter(t =>
        String(t._id) !== String(toolId) && String(t.id) !== String(toolId)
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = (toolId: string | number) =>
    favorites.some(t => String(t._id) === String(toolId) || String(t.id) === String(toolId));

  const toggleVisibility = () => {
    setVisibility(prev => {
      const next = prev === 'public' ? 'private' : 'public';
      localStorage.setItem(VISIBILITY_KEY, next);
      return next;
    });
  };

  return { favorites, toggleFavorite, removeFromFavorites, isFavorite, visibility, toggleVisibility, hydrated };
}
