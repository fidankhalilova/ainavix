import { Tag } from '@/types';
import { tagsStore, newId } from '@/db/store';

export const tagsService = {
  getAll: (): Promise<Tag[]> =>
    Promise.resolve(tagsStore.getAll()),

  create: (name: string): Promise<Tag> => {
    const normalized = name.trim().toLowerCase();
    const existing   = tagsStore.findByName(normalized);
    if (existing) return Promise.resolve(existing);

    const id  = newId('tag');
    const tag: Tag = { _id: id, id, name: normalized };
    tagsStore.add(tag);
    return Promise.resolve(tag);
  },
};
