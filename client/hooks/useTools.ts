import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toolsService } from "@/services/toolsService";
import { ToolsQueryParams } from "@/types";

// useTools — returns full ToolsResponse { data: Tool[], meta }
export function useTools(params: ToolsQueryParams = {}) {
  return useQuery({
    queryKey: ["tools", params],
    queryFn: () => toolsService.getTools(params),
  });
}

// useTool — returns single Tool
export function useTool(slug: string) {
  return useQuery({
    queryKey: ["tool", slug],
    queryFn: () => toolsService.getToolBySlug(slug),
    enabled: !!slug,
  });
}

// useFeaturedTools — returns Tool[] directly
// getFeaturedTools() returns ToolsResponse, so .then(r => r.data) gives Tool[]
export function useFeaturedTools(limit = 6) {
  return useQuery({
    queryKey: ["tools", "featured", limit],
    queryFn: () => toolsService.getFeaturedTools(limit).then((r) => r.data),
  });
}

// useToolsByIds — returns Tool[] directly
// getToolsByIds() returns ToolsResponse, so .then(r => r.data) gives Tool[]
export function useToolsByIds(ids: string[]) {
  return useQuery({
    queryKey: ["tools", "compare", ids],
    queryFn: () => toolsService.getToolsByIds(ids).then((r) => r.data),
    enabled: ids.length > 0,
  });
}

// useUserSubmittedTools — returns Tool[]
export function useUserSubmittedTools(
  userId: number | string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["tools", "user", String(userId)],
    queryFn: () => toolsService.getUserTools(String(userId)),
    enabled: options?.enabled !== false && !!userId,
  });
}

export function useSubmitTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toolsService.submitTool,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tools"] }),
  });
}
