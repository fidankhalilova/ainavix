import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '@/services/categoriesService';
import { featuresService } from '@/services/featuresService';
import { tagsService } from '@/services/tagsService';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => categoriesService.create(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });
}

export function useCreateFeature() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => featuresService.create(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['features'] }),
  });
}

export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => tagsService.create(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tags'] }),
  });
}
