import { Sound, Platform } from '@/app/types';

export const trendingSounds: Record<Platform, Sound[]> = {
  tiktok: [
    { id: '1', name: 'Flowers', artist: 'Miley Cyrus', trending: true },
    { id: '2', name: 'Unholy', artist: 'Sam Smith & Kim Petras', trending: true },
    { id: '3', name: 'Boy\'s a Liar Pt. 2', artist: 'PinkPantheress & Ice Spice', trending: true },
    { id: '4', name: 'Kill Bill', artist: 'SZA', trending: true },
    { id: '5', name: 'Creepin\'', artist: 'Metro Boomin, The Weeknd', trending: true },
  ],
  instagram: [
    { id: '6', name: 'As It Was', artist: 'Harry Styles', trending: true },
    { id: '7', name: 'Anti-Hero', artist: 'Taylor Swift', trending: true },
    { id: '8', name: 'Calm Down', artist: 'Rema & Selena Gomez', trending: true },
    { id: '9', name: 'golden hour', artist: 'JVKE', trending: true },
    { id: '10', name: 'I\'m Good (Blue)', artist: 'David Guetta & Bebe Rexha', trending: true },
  ],
  facebook: [
    { id: '11', name: 'Shivers', artist: 'Ed Sheeran', trending: true },
    { id: '12', name: 'Heat Waves', artist: 'Glass Animals', trending: true },
    { id: '13', name: 'Stay', artist: 'The Kid LAROI & Justin Bieber', trending: true },
    { id: '14', name: 'Levitating', artist: 'Dua Lipa', trending: true },
    { id: '15', name: 'Good 4 U', artist: 'Olivia Rodrigo', trending: true },
  ],
  shopee: [
    { id: '16', name: 'Cupid', artist: 'FIFTY FIFTY', trending: true },
    { id: '17', name: 'Ditto', artist: 'NewJeans', trending: true },
    { id: '18', name: 'Hype Boy', artist: 'NewJeans', trending: true },
    { id: '19', name: 'OMG', artist: 'NewJeans', trending: true },
    { id: '20', name: 'Shut Down', artist: 'BLACKPINK', trending: true },
  ],
};

export const trendingHashtags: Record<Platform, string[]> = {
  tiktok: [
    '#fyp', '#foryoupage', '#viral', '#trending', '#tiktok',
    '#aesthetic', '#outfit', '#ootd', '#fashion', '#style',
    '#makeup', '#beauty', '#skincare', '#grwm', '#transformation'
  ],
  instagram: [
    '#reels', '#explore', '#instagood', '#instagram', '#viral',
    '#fashion', '#style', '#ootd', '#instadaily', '#photooftheday',
    '#love', '#beautiful', '#happy', '#cute', '#lifestyle'
  ],
  facebook: [
    '#fbreels', '#facebook', '#viral', '#trending', '#shorts',
    '#fashion', '#style', '#daily', '#lifestyle', '#beauty',
    '#makeup', '#ootd', '#inspiration', '#motivation', '#love'
  ],
  shopee: [
    '#shopee', '#shopeehaul', '#shopeebudol', '#shopeefinds', '#shopeeootd',
    '#budolfinds', '#affordable', '#onlineshopping', '#shopeesale', '#voucher',
    '#fashion', '#beauty', '#skincare', '#makeup', '#lifestyle'
  ],
};