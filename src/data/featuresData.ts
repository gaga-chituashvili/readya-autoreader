import { type Feature } from "@/types/home.type";
import {
  Sparkles,
  Settings,
  Bookmark,
  Headphones,
  Download,
  Languages,
} from "lucide-react";

export const features: Feature[] = [
  {
    icon: Sparkles,
    title: "home:feature_ai_title",
    description: "home:feature_ai_desc",
  },
  {
    icon: Settings,
    description: "home:feature_voice_desc",
  },
  {
    icon: Bookmark,
    description: "home:feature_save_desc",
  },
  {
    icon: Headphones,
    description: "home:feature_listen_desc",
  },
  {
    icon: Download,
    description: "home:feature_download_desc",
  },
  {
    icon: Languages,
    title: "home:feature_lang_title",
    description: "home:feature_lang_desc",
  },
];
