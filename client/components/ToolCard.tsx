"use client";
import Link from "next/link";
import Image from "next/image";
import { Star, ExternalLink, GitCompare, Check, Heart } from "lucide-react";
import { getStrapiMedia } from "@/lib/apiClient";
import { Tool } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import toast from "react-hot-toast";

const PRICING_COLORS: Record<string, string> = {
  free: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  freemium: "bg-blue-50 text-blue-700 border border-blue-200",
  paid: "bg-amber-50 text-amber-700 border border-amber-200",
  enterprise: "bg-purple-50 text-purple-700 border border-purple-200",
};

interface ToolCardProps {
  tool: Tool;
  compareList: string[];
  onToggleCompare: (id: string) => void;
}

export default function ToolCard({
  tool,
  compareList,
  onToggleCompare,
}: ToolCardProps) {
  const {
    name,
    slug,
    shortDescription,
    logo,
    pricing,
    averageRating,
    reviewsCount,
    categories,
    isVerified,
    website,
  } = tool;
  const toolId = String(tool._id || tool.id);
  const logoUrl = logo?.url ? getStrapiMedia(logo.url) : null;
  const catName = categories?.[0]?.name;
  const inCompare = compareList.includes(toolId);
  const rating = averageRating || 0;
  const pricingKey = pricing?.toLowerCase() ?? "free";

  const { toggleFavorite, isFavorite } = useFavorites();
  const isFavorited = isFavorite(toolId);

  const handleToggleFavorite = () => {
    const wasAdded = toggleFavorite(tool);
    toast.success(
      wasAdded
        ? `Added ${name} to favorites ❤️`
        : `Removed ${name} from favorites`,
      { position: "bottom-right" },
    );
  };

  return (
    <div className="group bg-white rounded-3xl shadow-[0_4px_20px_rgba(27,20,100,0.06)] hover:shadow-[0_10px_32px_rgba(27,20,100,0.10)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full min-w-70 w-full border border-transparent relative">
      <button
        onClick={handleToggleFavorite}
        className="absolute bottom-20 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all hover:scale-110 active:scale-95"
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          size={20}
          className={`transition-all duration-200 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-gray-600"}`}
        />
      </button>
      <div className="p-5 flex-1">
        <div className="flex gap-4 mb-4">
          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-[#F8F9FF] shrink-0 flex items-center justify-center border border-[#E8EAFF]">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={name}
                width={44}
                height={44}
                className="object-contain"
              />
            ) : (
              <span className="font-bold text-[#2E4BC6] text-xl">
                {name[0]}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h3 className="font-semibold text-[#1B1464] text-base truncate">
                  {name}
                </h3>
                {isVerified && (
                  <span className="w-4 h-4 rounded-full bg-[#00C2CB] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={9} className="text-white" strokeWidth={3} />
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full capitalize whitespace-nowrap shrink-0 ${PRICING_COLORS[pricingKey] || "bg-emerald-100 text-emerald-700"}`}
              >
                {pricing || "Free"}
              </span>
            </div>
            {catName && (
              <span className="text-[#2E4BC6] text-xs bg-[#F0F4FF] px-2.5 py-0.5 rounded-md mt-2 inline-block w-max">
                {catName}
              </span>
            )}
          </div>
        </div>
        <p className="text-[#1B1464]/65 text-sm leading-relaxed line-clamp-2 mb-5">
          {shortDescription}
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={
                i < Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          ))}
          <span className="ml-2 text-[#1B1464] text-sm font-medium">
            {rating.toFixed(1)}
          </span>
          <span className="text-[#1B1464]/40 text-sm">
            ({reviewsCount || 0})
          </span>
        </div>
      </div>
      <div className="border-t border-[#F1F3F9] px-5 py-4 flex items-center gap-3 bg-white">
        <Link
          href={`/tools/${slug}`}
          className="flex-1 text-center py-2.5 text-sm font-semibold text-[#2E4BC6] hover:text-[#1B1464] transition-colors rounded-xl hover:bg-[#F8F9FF]"
        >
          View Details
        </Link>
        <button
          onClick={() => onToggleCompare(toolId)}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${inCompare ? "text-[#2E4BC6] bg-[#E8EAFF]" : "text-[#64748B] hover:text-[#2E4BC6] hover:bg-[#F8F9FF]"}`}
        >
          <GitCompare size={15} />
          <span>{inCompare ? "Added" : "Compare"}</span>
        </button>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 text-[#64748B] hover:text-[#2E4BC6] hover:bg-[#F8F9FF] rounded-xl transition-colors"
          aria-label="Visit website"
        >
          <ExternalLink size={17} />
        </a>
      </div>
    </div>
  );
}
