import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '@/services/usersService';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: { bio?: string; username?: string } }) =>
      usersService.updateProfile(userId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
  });
}

export function useUploadAvatar() {
  return useMutation({
    mutationFn: ({ userId, file }: { userId: string; file: File }) =>
      usersService.uploadAvatar(userId, file),
  });
}
