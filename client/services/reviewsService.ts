import { Review } from '@/types';
import { reviewsStore, toolsStore, usersStore, newId } from '@/db/store';

export const reviewsService = {
  getByTool: (toolId: string): Promise<Review[]> =>
    Promise.resolve(reviewsStore.getByTool(toolId)),

  getByUser: (userId: string): Promise<Review[]> =>
    Promise.resolve(reviewsStore.getByUser(userId)),

  create: (data: {
    rating: number; title?: string; content: string;
    pros?: string; cons?: string; tool: any; user: any;
  }): Promise<Review> => {
    const toolId = String(data.tool?._id ?? data.tool?.id ?? data.tool);
    const userId = String(data.user?._id ?? data.user?.id ?? data.user);

    if (reviewsStore.hasReviewed(toolId, userId)) {
      return Promise.reject(new Error('You have already reviewed this tool'));
    }

    const tool = toolsStore.getById(toolId);
    const user = usersStore.findById(userId);

    const id  = newId('rev');
    const now = new Date().toISOString();

    const review: Review = {
      _id: id, id,
      rating:  data.rating,
      title:   data.title   || '',
      content: data.content,
      pros:    data.pros    || '',
      cons:    data.cons    || '',
      tool: tool
        ? { _id: tool._id, id: tool.id, name: tool.name, slug: tool.slug } as any
        : { _id: toolId, id: toolId } as any,
      user: user
        ? { _id: user._id, id: user.id, username: user.username } as any
        : { _id: userId, id: userId } as any,
      createdAt: now,
      updatedAt: now,
    };

    reviewsStore.add(review);

    // Recalculate averageRating on the tool
    toolsStore.updateRating(toolId);

    return Promise.resolve(review);
  },

  delete: (id: string): Promise<void> => {
    reviewsStore.delete(id);
    return Promise.resolve();
  },
};
