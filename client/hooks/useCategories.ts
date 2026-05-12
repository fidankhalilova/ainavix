import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/services/categoriesService';
import { featuresService } from '@/services/featuresService';
import { tagsService } from '@/services/tagsService';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn:  categoriesService.getAll,
  });
}

export function useFeatures() {
  return useQuery({
    queryKey: ['features'],
    queryFn:  featuresService.getAll,
  });
}

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn:  tagsService.getAll,
  });
}
