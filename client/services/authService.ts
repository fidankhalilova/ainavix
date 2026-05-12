import { User } from '@/types';
import { usersStore, newId, LocalUser } from '@/db/store';

interface AuthResponse { jwt: string; user: User }

function makeJwt(userId: string): string {
  // Simple base64 token — good enough for static mode (no real verification)
  const payload = btoa(JSON.stringify({ id: userId, exp: Date.now() + 7 * 86400_000 }));
  return `static.${payload}.token`;
}

function parseJwt(token: string): string | null {
  try {
    const part = token.split('.')[1];
    const data = JSON.parse(atob(part));
    if (data.exp < Date.now()) return null;
    return data.id;
  } catch {
    return null;
  }
}

function toUser(u: ReturnType<typeof usersStore.toSafe>): User {
  return { ...u, id: u._id } as User;
}

export const authService = {
  login: (data: { identifier: string; password: string }): Promise<AuthResponse> => {
    const user = usersStore.findByIdentifier(data.identifier);
    if (!user || user.password !== data.password) {
      return Promise.reject({ response: { data: { error: { message: 'Invalid credentials' } } } });
    }
    return Promise.resolve({ jwt: makeJwt(user._id), user: toUser(usersStore.toSafe(user)) });
  },

  register: (data: { username: string; email: string; password: string }): Promise<AuthResponse> => {
    if (usersStore.findByEmail(data.email)) {
      return Promise.reject({ response: { data: { error: { message: 'Email already in use' } } } });
    }
    if (usersStore.findByUsername(data.username)) {
      return Promise.reject({ response: { data: { error: { message: 'Username already taken' } } } });
    }
    const id  = newId('user');
    const now = new Date().toISOString();
    const newUser: LocalUser = {
      _id: id, id,
      username:  data.username.trim(),
      email:     data.email.trim().toLowerCase(),
      password:  data.password,
      bio:       '',
      role:      'user',
      avatar:    { url: null, name: null },
      createdAt: now,
      updatedAt: now,
    };
    usersStore.add(newUser);
    return Promise.resolve({ jwt: makeJwt(id), user: toUser(usersStore.toSafe(newUser)) });
  },

  me: (token?: string): Promise<User> => {
    const t = token ?? (typeof window !== 'undefined' ? localStorage.getItem('jwt') : null);
    if (!t) return Promise.reject(new Error('No token'));
    const userId = parseJwt(t);
    if (!userId) return Promise.reject(new Error('Invalid token'));
    const user = usersStore.findById(userId);
    if (!user) return Promise.reject(new Error('User not found'));
    return Promise.resolve(toUser(usersStore.toSafe(user)));
  },
};
