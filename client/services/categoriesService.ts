import { Category } from '@/types';
import { categoriesStore, newId } from '@/db/store';
import slugify from '@/db/slugify';

export const categoriesService = {
  getAll: (): Promise<{ data: Category[] }> =>
    Promise.resolve({ data: categoriesStore.getAll() }),

  create: (name: string, description = '', color = ''): Promise<Category> => {
    const existing = categoriesStore.findByName(name);
    if (existing) return Promise.resolve(existing);

    const id   = newId('cat');
    const slug = slugify(name);
    const cat: Category = { _id: id, id, name: name.trim(), slug, description, color };
    categoriesStore.add(cat);
    return Promise.resolve(cat);
  },
};
