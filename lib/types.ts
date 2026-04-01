export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  customLabel?: string;
}

export interface ProfileTheme {
  backgroundColor: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundType: 'color' | 'gradient' | 'image' | 'animated' | 'video';
  animatedBackground?: 'particles' | 'waves' | 'stars' | 'bubbles' | 'aurora' | 'rain' | 'snow' | 'fireflies';
  animatedBackgroundSpeed?: number;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: string;
  textColor: string;
  accentColor: string;
  cardBackground: string;
  cardTextColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'pill' | 'square';
  animation: 'none' | 'float' | 'pulse' | 'glow';
  borderStyle?: 'none' | 'solid' | 'dashed' | 'glow';
  shadowStyle?: 'none' | 'soft' | 'hard' | 'neon';
  cardOpacity?: number;
}

export const animatedBackgrounds = [
  { id: 'particles', name: 'جزيئات', icon: '✨' },
  { id: 'waves', name: 'أمواج', icon: '🌊' },
  { id: 'stars', name: 'نجوم', icon: '⭐' },
  { id: 'bubbles', name: 'فقاعات', icon: '🫧' },
  { id: 'aurora', name: 'شفق قطبي', icon: '🌌' },
  { id: 'rain', name: 'مطر', icon: '🌧️' },
  { id: 'snow', name: 'ثلج', icon: '❄️' },
  { id: 'fireflies', name: 'يراعات', icon: '🪲' },
];

export interface ProfileMedia {
  id: string;
  type: 'image' | 'video' | 'youtube' | 'pdf';
  url: string;
  caption?: string;
  width?: 'full' | 'half' | 'third';
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
  position?: 'start' | 'center' | 'end';
}

export interface ProfileTextBlock {
  id: string;
  content: string;
  alignment: 'start' | 'center' | 'end';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontFamily?: string;
}

export interface ProfileData {
  id: string;
  name: string;
  nameColor: string;
  nameFont: string;
  nameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  nameGlow?: boolean;
  nameGlowColor?: string;
  nameAlignment?: 'start' | 'center' | 'end';
  nameBackground?: boolean;
  bio: string;
  bioFont?: string;
  bioGlow?: boolean;
  bioGlowColor?: string;
  bioAlignment?: 'start' | 'center' | 'end';
  bioBackground?: boolean;
  avatar?: string;
  avatarStyle?: 'circle' | 'rounded' | 'square';
  avatarSize?: 'small' | 'medium' | 'large' | 'xlarge';
  avatarAlignment?: 'start' | 'center' | 'end';
  avatarGlow?: boolean;
  avatarGlowColor?: string;
  avatarFloat?: boolean;
  hideAvatar?: boolean;
  hideName?: boolean;
  textBlocks?: ProfileTextBlock[];
  socialLinks: SocialLink[];
  theme: ProfileTheme;
  media: ProfileMedia[];
  musicUrl?: string;
  musicYoutubeUrl?: string;
  musicAutoplay: boolean;
  musicLoop?: boolean;
  createdAt: string;
}

export const defaultTheme: ProfileTheme = {
  backgroundColor: '#0f172a',
  backgroundType: 'gradient',
  gradientFrom: '#0f172a',
  gradientTo: '#1e1b4b',
  gradientDirection: 'to-br',
  textColor: '#f8fafc',
  accentColor: '#818cf8',
  cardBackground: 'rgba(255, 255, 255, 0.1)',
  cardTextColor: '#f8fafc',
  fontFamily: 'font-sans',
  buttonStyle: 'pill',
  animation: 'float',
  borderStyle: 'none',
  shadowStyle: 'soft',
  cardOpacity: 10,
};

export const socialPlatforms = [
  { id: 'tiktok', name: 'TikTok', icon: 'tiktok', color: '#000000' },
  { id: 'instagram', name: 'Instagram', icon: 'instagram', color: '#E4405F' },
  { id: 'twitter', name: 'X (Twitter)', icon: 'twitter', color: '#1DA1F2' },
  { id: 'youtube', name: 'YouTube', icon: 'youtube', color: '#FF0000' },
  { id: 'facebook', name: 'Facebook', icon: 'facebook', color: '#1877F2' },
  { id: 'snapchat', name: 'Snapchat', icon: 'snapchat', color: '#FFFC00' },
  { id: 'discord', name: 'Discord', icon: 'discord', color: '#5865F2' },
  { id: 'telegram', name: 'Telegram', icon: 'telegram', color: '#0088cc' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2' },
  { id: 'github', name: 'GitHub', icon: 'github', color: '#181717' },
  { id: 'twitch', name: 'Twitch', icon: 'twitch', color: '#9146FF' },
  { id: 'spotify', name: 'Spotify', icon: 'spotify', color: '#1DB954' },
  { id: 'soundcloud', name: 'SoundCloud', icon: 'soundcloud', color: '#FF3300' },
  { id: 'pinterest', name: 'Pinterest', icon: 'pinterest', color: '#E60023' },
  { id: 'reddit', name: 'Reddit', icon: 'reddit', color: '#FF4500' },
  { id: 'tumblr', name: 'Tumblr', icon: 'tumblr', color: '#36465D' },
  { id: 'behance', name: 'Behance', icon: 'behance', color: '#1769FF' },
  { id: 'dribbble', name: 'Dribbble', icon: 'dribbble', color: '#EA4C89' },
  { id: 'website', name: 'Website', icon: 'globe', color: '#6366f1' },
  { id: 'email', name: 'Email', icon: 'mail', color: '#EA4335' },
  { id: 'custom', name: 'رابط مخصص', icon: 'link', color: '#6366f1' },
];

// 10 Arabic fonts
export const arabicFonts = [
  { id: 'font-cairo', name: 'Cairo', family: 'Cairo' },
  { id: 'font-tajawal', name: 'Tajawal', family: 'Tajawal' },
  { id: 'font-almarai', name: 'Almarai', family: 'Almarai' },
  { id: 'font-changa', name: 'Changa', family: 'Changa' },
  { id: 'font-el-messiri', name: 'El Messiri', family: 'El Messiri' },
  { id: 'font-amiri', name: 'Amiri', family: 'Amiri' },
  { id: 'font-lateef', name: 'Lateef', family: 'Lateef' },
  { id: 'font-scheherazade', name: 'Scheherazade', family: 'Scheherazade New' },
  { id: 'font-reem-kufi', name: 'Reem Kufi', family: 'Reem Kufi' },
  { id: 'font-harmattan', name: 'Harmattan', family: 'Harmattan' },
];

// 10 English fonts
export const englishFonts = [
  { id: 'font-sans', name: 'Geist Sans', family: 'var(--font-geist)' },
  { id: 'font-mono', name: 'Geist Mono', family: 'var(--font-geist-mono)' },
  { id: 'font-inter', name: 'Inter', family: 'Inter' },
  { id: 'font-poppins', name: 'Poppins', family: 'Poppins' },
  { id: 'font-roboto', name: 'Roboto', family: 'Roboto' },
  { id: 'font-montserrat', name: 'Montserrat', family: 'Montserrat' },
  { id: 'font-playfair', name: 'Playfair Display', family: 'Playfair Display' },
  { id: 'font-oswald', name: 'Oswald', family: 'Oswald' },
  { id: 'font-raleway', name: 'Raleway', family: 'Raleway' },
  { id: 'font-dancing', name: 'Dancing Script', family: 'Dancing Script' },
];

export const fontOptions = [...arabicFonts, ...englishFonts];

export const gradientPresets = [
  { id: 'midnight', name: 'Midnight', from: '#0f172a', to: '#1e1b4b' },
  { id: 'ocean', name: 'Ocean', from: '#0369a1', to: '#0d9488' },
  { id: 'sunset', name: 'Sunset', from: '#f97316', to: '#ec4899' },
  { id: 'forest', name: 'Forest', from: '#065f46', to: '#14532d' },
  { id: 'purple', name: 'Purple', from: '#7c3aed', to: '#c026d3' },
  { id: 'rose', name: 'Rose', from: '#be123c', to: '#9f1239' },
  { id: 'amber', name: 'Amber', from: '#d97706', to: '#b45309' },
  { id: 'slate', name: 'Slate', from: '#334155', to: '#1e293b' },
  { id: 'emerald', name: 'Emerald', from: '#059669', to: '#047857' },
  { id: 'sky', name: 'Sky', from: '#0284c7', to: '#0369a1' },
  { id: 'pink', name: 'Pink', from: '#db2777', to: '#be185d' },
  { id: 'cyan', name: 'Cyan', from: '#06b6d4', to: '#0891b2' },
];

export const nameSizeOptions = [
  { id: 'small', name: 'صغير', class: 'text-xl sm:text-2xl' },
  { id: 'medium', name: 'متوسط', class: 'text-2xl sm:text-3xl md:text-4xl' },
  { id: 'large', name: 'كبير', class: 'text-3xl sm:text-4xl md:text-5xl' },
  { id: 'xlarge', name: 'كبير جداً', class: 'text-4xl sm:text-5xl md:text-6xl' },
];

export const mediaWidthOptions = [
  { id: 'full', name: 'كامل العرض', class: 'col-span-2' },
  { id: 'half', name: 'نصف العرض', class: 'col-span-1' },
];

export const mediaAspectOptions = [
  { id: 'auto', name: 'تلقائي', class: 'aspect-auto' },
  { id: 'square', name: 'مربع', class: 'aspect-square' },
  { id: 'video', name: 'فيديو 16:9', class: 'aspect-video' },
  { id: 'portrait', name: 'عمودي 3:4', class: 'aspect-[3/4]' },
];

export const avatarStyleOptions = [
  { id: 'circle', name: 'دائري', class: 'rounded-full' },
  { id: 'rounded', name: 'مستدير', class: 'rounded-2xl' },
  { id: 'square', name: 'مربع', class: 'rounded-none' },
];

export const avatarSizeOptions = [
  { id: 'small', name: 'صغير', class: 'w-20 h-20 sm:w-24 sm:h-24' },
  { id: 'medium', name: 'متوسط', class: 'w-28 h-28 sm:w-32 sm:h-32' },
  { id: 'large', name: 'كبير', class: 'w-36 h-36 sm:w-40 sm:h-40' },
  { id: 'xlarge', name: 'كبير جداً', class: 'w-44 h-44 sm:w-48 sm:h-48' },
];
