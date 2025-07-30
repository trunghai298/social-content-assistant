export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'shopee';
export type CaptionLength = 'short' | 'medium' | 'long';
export type CaptionLanguage = 'english' | 'vietnamese';

export interface VideoContent {
  id: string;
  platform: Platform;
  prompt: string;
  caption: string;
  hashtags: string[];
  sounds: Sound[];
  createdAt: Date;
}

export interface Sound {
  id: string;
  name: string;
  artist: string;
  trending: boolean;
  url?: string;
}

export interface GeneratedContent {
  captions: string[];
  hashtags: string[];
  sounds: Sound[];
}