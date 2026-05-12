import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '@/services/reviewsService';

export function useReviewsByTool(toolId: string | number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['reviews', 'tool', String(toolId)],
    queryFn:  () => reviewsService.getByTool(String(toolId)),
    enabled:  options?.enabled !== false && !!toolId,
  });
}

export function useReviewsByUser(userId: string | number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['reviews', 'user', String(userId)],
    queryFn:  () => reviewsService.getByUser(String(userId)),
    enabled:  options?.enabled !== false && !!userId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewsService.create,
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'tool', String(vars.tool)] });
      queryClient.invalidateQueries({ queryKey: ['tool'] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
