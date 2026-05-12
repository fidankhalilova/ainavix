import { Tool, ToolsQueryParams, ToolsResponse } from '@/types';
import { toolsStore, categoriesStore, featuresStore, tagsStore, newId } from '@/db/store';

function buildSort(sort: string | undefined) {
  return (a: Tool, b: Tool): number => {
    switch (sort) {
      case 'rating':   return (b.averageRating  || 0) - (a.averageRating  || 0);
      case 'popular':  return (b.viewsCount     || 0) - (a.viewsCount     || 0);
      case 'name':     return a.name.localeCompare(b.name);
      default:         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  };
}

function matchText(tool: Tool, search: string): boolean {
  const q = search.toLowerCase();
  return (
    tool.name.toLowerCase().includes(q) ||
    tool.shortDescription.toLowerCase().includes(q) ||
    (tool.description || '').toLowerCase().includes(q) ||
    (tool.categories?.some(c => c.name.toLowerCase().includes(q)) ?? false) ||
    (tool.tags?.some(t => t.name.toLowerCase().includes(q)) ?? false)
  );
}

function generateSlug(name: string): string {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export const toolsService = {
  getTools: (params: ToolsQueryParams = {}): Promise<ToolsResponse> => {
    const { search, category, pricing, sort, page = 1, pageSize = 12, featured } = params;
    const ids = (params as any).ids as string | undefined;

    let list = toolsStore.getAll();

    if (ids) {
      const idList = String(ids).split(',').filter(Boolean);
      list = list.filter(t => idList.includes(t._id) || idList.includes(t.id));
      return Promise.resolve({
        data: list,
        meta: { pagination: { page: 1, pageSize: list.length, pageCount: 1, total: list.length } },
      });
    }

    list = list.filter(t => t.isPublished);

    if (featured)  list = list.filter(t => t.isFeatured);
    if (search)    list = list.filter(t => matchText(t, search));
    if (pricing && pricing !== 'all') {
      list = list.filter(t => t.pricing?.toLowerCase() === (pricing as string).toLowerCase());
    }
    if (category && category !== 'all') {
      list = list.filter(t => t.categories?.some(c => c.slug === category));
    }

    list = [...list].sort(buildSort(sort as string));

    const total     = list.length;
    const pageNum   = Number(page);
    const size      = Number(pageSize);
    const pageCount = Math.ceil(total / size) || 0;
    const data      = list.slice((pageNum - 1) * size, pageNum * size);

    return Promise.resolve({
      data,
      meta: { pagination: { page: pageNum, pageSize: size, pageCount, total } },
    });
  },

  getToolBySlug: (slug: string): Promise<Tool> => {
    const tool = toolsStore.getBySlug(slug) ?? toolsStore.getById(slug);
    if (!tool) return Promise.reject(new Error('Tool not found'));
    return Promise.resolve(tool);
  },

  getToolsByIds: (ids: string[]): Promise<ToolsResponse> =>
    toolsService.getTools({ ids: ids.join(',') } as any),

  getFeaturedTools: (limit = 6): Promise<ToolsResponse> =>
    toolsService.getTools({ featured: true as any, pageSize: limit }),

  getUserTools: (userId: string): Promise<Tool[]> => {
    const list = toolsStore.getAll().filter(t => {
      const sid = (t.submittedBy as any)?._id ?? (t.submittedBy as any)?.id ?? t.submittedBy;
      return String(sid) === String(userId);
    });
    return Promise.resolve(list);
  },

  submitTool: (data: Partial<Tool> & { submittedBy?: any }): Promise<Tool> => {
    const id   = newId('tool');
    const slug = (data as any).slug || generateSlug(data.name || id);

    const resolveCategory = (c: any) => {
      if (!c) return null;
      if (typeof c === 'string') {
        return categoriesStore.findBySlug(c)
          ?? categoriesStore.getAll().find(x => x._id === c || x.id === c)
          ?? { _id: c, id: c, name: c, slug: c, description: '' };
      }
      return c;
    };
    const resolveFeature = (f: any) => {
      if (!f) return null;
      if (typeof f === 'string') {
        return featuresStore.findByName(f)
          ?? featuresStore.getAll().find(x => x._id === f || x.id === f)
          ?? { _id: f, id: f, name: f, description: '' };
      }
      return f;
    };
    const resolveTag = (t: any) => {
      if (!t) return null;
      if (typeof t === 'string') {
        return tagsStore.findByName(t)
          ?? tagsStore.getAll().find(x => x._id === t || x.id === t)
          ?? { _id: t, id: t, name: t };
      }
      return t;
    };

    const now  = new Date().toISOString();
    const tool: Tool = {
      _id: id, id,
      name:             data.name || '',
      slug,
      shortDescription: data.shortDescription || '',
      description:      data.description || '',
      website:          data.website || '',
      pricing:          (data.pricing as any) || 'Free',
      pricingDetails:   data.pricingDetails || '',
      logo:             data.logo ?? { url: null, name: null },
      isVerified: false, isFeatured: false, isPublished: false,
      viewsCount: 0, averageRating: 0, reviewsCount: 0,
      categories: ((data.categories as any[]) || []).map(resolveCategory).filter(Boolean),
      features:   ((data.features   as any[]) || []).map(resolveFeature).filter(Boolean),
      tags:       ((data.tags       as any[]) || []).map(resolveTag).filter(Boolean),
      submittedBy: data.submittedBy,
      createdAt: now, updatedAt: now,
    };
    toolsStore.add(tool);
    return Promise.resolve(tool);
  },

  incrementViews: (id: string): Promise<void> => {
    toolsStore.incrementViews(id);
    return Promise.resolve();
  },
};

export const incrementToolViews = (id: string) => toolsService.incrementViews(id);
