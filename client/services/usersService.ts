import { User } from '@/types';
import { usersStore } from '@/db/store';

function toUser(u: ReturnType<typeof usersStore.toSafe>): User {
  return { ...u, id: u._id } as User;
}

export const usersService = {
  getById: (id: string): Promise<User> => {
    const u = usersStore.findById(id);
    if (!u) return Promise.reject(new Error('User not found'));
    return Promise.resolve(toUser(usersStore.toSafe(u)));
  },

  updateProfile: (userId: string, data: { bio?: string; username?: string }): Promise<User> => {
    // Check username uniqueness
    if (data.username) {
      const taken = usersStore.findByUsername(data.username);
      if (taken && taken._id !== userId) {
        return Promise.reject(new Error('Username already taken'));
      }
    }
    const updated = usersStore.update(userId, data);
    if (!updated) return Promise.reject(new Error('User not found'));
    return Promise.resolve(toUser(usersStore.toSafe(updated)));
  },

  updateAvatar: (userId: string, url: string, name: string): Promise<User> => {
    const updated = usersStore.update(userId, { avatar: { url, name } });
    if (!updated) return Promise.reject(new Error('User not found'));
    return Promise.resolve(toUser(usersStore.toSafe(updated)));
  },

  // Static mode: no real file upload — return a placeholder URL
  uploadAvatar: async (userId: string, file: File): Promise<{ url: string; name: string }> => {
    // Create a local object URL so the image shows immediately in the browser
    const url  = URL.createObjectURL(file);
    const name = file.name;
    await usersService.updateAvatar(userId, url, name);
    return { url, name };
  },
};
