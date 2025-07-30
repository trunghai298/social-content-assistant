import { Platform, GeneratedContent } from '@/app/types';
import { trendingSounds, trendingHashtags } from './mockData';

const platformTemplates: Record<Platform, { 
  captionStyles: string[], 
  tone: string[],
  callToAction: string[] 
}> = {
  tiktok: {
    captionStyles: [
      'POV: {content}',
      'Wait for it... {content} 😱',
      'Nobody: \nMe: {content}',
      'Tell me you\'re {content} without telling me',
      'Things that live rent free in my head: {content}'
    ],
    tone: ['playful', 'trendy', 'relatable', 'funny'],
    callToAction: ['Follow for more!', 'Which one are you?', 'Comment below!', 'Try this hack!']
  },
  instagram: {
    captionStyles: [
      '✨ {content} ✨',
      'Current mood: {content}',
      'Feeling {content} today 💕',
      'Life update: {content}',
      'Reminder: {content} 🌟'
    ],
    tone: ['aesthetic', 'inspirational', 'lifestyle', 'authentic'],
    callToAction: ['Save this for later!', 'Tag someone who needs this', 'Double tap if you agree', 'Share your thoughts below']
  },
  facebook: {
    captionStyles: [
      'Just discovered {content} and I\'m obsessed!',
      'Who else loves {content}?',
      'Pro tip: {content}',
      'Can we talk about {content}?',
      'My secret to {content}'
    ],
    tone: ['conversational', 'helpful', 'community-focused', 'informative'],
    callToAction: ['Share if you found this helpful!', 'What are your thoughts?', 'Tag a friend!', 'Follow for more tips']
  },
  shopee: {
    captionStyles: [
      '🛍️ Best finds: {content}',
      'Budol alert! {content} 🛒',
      'Worth every peso: {content}',
      'Add to cart na! {content}',
      'Shopee haul: {content} ✨'
    ],
    tone: ['enthusiastic', 'value-focused', 'review-style', 'authentic'],
    callToAction: ['Check out my cart!', 'Swipe up for links!', 'Use my voucher code!', 'Comment for the link!']
  }
};

export function generateContent(prompt: string, platform: Platform): GeneratedContent {
  const templates = platformTemplates[platform];
  const platformHashtags = trendingHashtags[platform];
  const platformSounds = trendingSounds[platform];
  
  const captions = templates.captionStyles
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(template => {
      const caption = template.replace('{content}', prompt);
      const cta = templates.callToAction[Math.floor(Math.random() * templates.callToAction.length)];
      return `${caption}\n\n${cta}`;
    });

  const hashtags = [
    ...platformHashtags.slice(0, 5),
    ...generateContextualHashtags(prompt)
  ].slice(0, 10);

  const sounds = platformSounds
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return {
    captions,
    hashtags,
    sounds
  };
}

function generateContextualHashtags(prompt: string): string[] {
  const words = prompt.toLowerCase().split(' ');
  const contextHashtags: string[] = [];
  
  const hashtagMap: Record<string, string[]> = {
    outfit: ['#outfitideas', '#outfitinspiration', '#styleinspo'],
    product: ['#productreview', '#musthave', '#recommendation'],
    makeup: ['#makeuptutorial', '#makeuplook', '#makeupideas'],
    food: ['#foodie', '#recipe', '#yummy'],
    travel: ['#wanderlust', '#travelgram', '#explore'],
    fitness: ['#workout', '#fitnessmotivation', '#healthylifestyle'],
    tech: ['#techreview', '#gadgets', '#innovation'],
    diy: ['#diyproject', '#crafts', '#handmade'],
    skincare: ['#skincareroutine', '#glowingskin', '#skincaretips']
  };

  Object.entries(hashtagMap).forEach(([key, tags]) => {
    if (words.some(word => word.includes(key))) {
      contextHashtags.push(...tags);
    }
  });

  if (contextHashtags.length === 0) {
    contextHashtags.push('#content', '#creator', '#viral');
  }

  return contextHashtags;
}