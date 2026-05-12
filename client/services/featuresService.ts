import { Feature } from '@/types';
import { featuresStore, newId } from '@/db/store';

export const featuresService = {
  getAll: (): Promise<Feature[]> =>
    Promise.resolve(featuresStore.getAll()),

  create: (name: string, description = ''): Promise<Feature> => {
    const existing = featuresStore.findByName(name);
    if (existing) return Promise.resolve(existing);

    const id   = newId('feat');
    const feat: Feature = { _id: id, id, name: name.trim(), description };
    featuresStore.add(feat);
    return Promise.resolve(feat);
  },
};
