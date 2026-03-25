import { ProfileData } from './types';
import { deflate, inflate } from 'pako';

// Optimize profile data for smaller URL
function optimizeProfileData(profile: ProfileData): Record<string, unknown> {
  const optimized: Record<string, unknown> = {
    i: profile.id,
    n: profile.name,
    nc: profile.nameColor,
    nf: profile.nameFont,
  };

  // Only include non-default values
  if (profile.nameSize && profile.nameSize !== 'medium') optimized.ns = profile.nameSize;
  if (profile.nameGlow) optimized.ng = 1;
  if (profile.nameGlowColor) optimized.ngc = profile.nameGlowColor;
  if (profile.nameAlignment && profile.nameAlignment !== 'center') optimized.na = profile.nameAlignment;
  if (profile.nameBackground) optimized.nb = 1;
  if (profile.bio) optimized.b = profile.bio;
  if (profile.bioFont && profile.bioFont !== 'font-cairo') optimized.bf = profile.bioFont;
  if (profile.bioGlow) optimized.bg = 1;
  if (profile.bioGlowColor) optimized.bgc = profile.bioGlowColor;
  if (profile.bioAlignment && profile.bioAlignment !== 'center') optimized.ba = profile.bioAlignment;
  if (profile.bioBackground) optimized.bb = 1;
  if (profile.avatar) optimized.a = profile.avatar;
  if (profile.avatarStyle && profile.avatarStyle !== 'circle') optimized.as = profile.avatarStyle;
  if (profile.avatarSize && profile.avatarSize !== 'medium') optimized.az = profile.avatarSize;
  if (profile.avatarAlignment && profile.avatarAlignment !== 'center') optimized.aa = profile.avatarAlignment;
  if (profile.avatarGlow) optimized.ag = 1;
  if (profile.avatarGlowColor) optimized.agc = profile.avatarGlowColor;
  if (profile.avatarFloat) optimized.af = 1;
  if (profile.hideAvatar) optimized.ha = 1;
  if (profile.hideName) optimized.hn = 1;

  // Text blocks
  if (profile.textBlocks && profile.textBlocks.length > 0) {
    optimized.tb = profile.textBlocks.map(b => ({
      c: b.content,
      a: b.alignment !== 'center' ? b.alignment : undefined,
      f: b.fontSize !== 'medium' ? b.fontSize : undefined,
      ff: b.fontFamily !== 'font-cairo' ? b.fontFamily : undefined,
    }));
  }

  // Optimize social links
  if (profile.socialLinks.length > 0) {
    optimized.sl = profile.socialLinks.map(link => ({
      p: link.platform,
      u: link.url,
    }));
  }

  // Optimize theme - only include non-default values
  const theme = profile.theme;
  const t: Record<string, unknown> = {};
  
  t.bt = theme.backgroundType;
  if (theme.backgroundType === 'color') {
    t.bc = theme.backgroundColor;
  } else if (theme.backgroundType === 'gradient') {
    t.gf = theme.gradientFrom;
    t.gt = theme.gradientTo;
  } else if (theme.backgroundType === 'image' && theme.backgroundImage) {
    t.bi = theme.backgroundImage;
  } else if (theme.backgroundType === 'animated' && theme.animatedBackground) {
    t.ab = theme.animatedBackground;
    t.bc = theme.backgroundColor;
  }
  
  t.tc = theme.textColor;
  t.ac = theme.accentColor;
  t.ctc = theme.cardTextColor;
  
  if (theme.buttonStyle !== 'pill') t.bs = theme.buttonStyle;
  if (theme.animation !== 'float') t.an = theme.animation;
  if (theme.borderStyle && theme.borderStyle !== 'none') t.brs = theme.borderStyle;
  if (theme.shadowStyle && theme.shadowStyle !== 'soft') t.ss = theme.shadowStyle;
  if (theme.cardOpacity !== undefined && theme.cardOpacity !== 10) t.co = theme.cardOpacity;
  
  optimized.t = t;

  // Optimize media
  if (profile.media.length > 0) {
    optimized.m = profile.media.map(media => {
      const m: Record<string, unknown> = {
        t: media.type,
        u: media.url,
      };
      if (media.caption) m.c = media.caption;
      if (media.width && media.width !== 'half') m.w = media.width;
      if (media.aspectRatio && media.aspectRatio !== 'auto') m.ar = media.aspectRatio;
      return m;
    });
  }

  return optimized;
}

// Restore optimized data to full profile
function restoreProfileData(optimized: Record<string, unknown>): ProfileData {
  const profile: ProfileData = {
    id: String(optimized.i || ''),
    name: String(optimized.n || ''),
    nameColor: String(optimized.nc || '#ffffff'),
    nameFont: String(optimized.nf || 'font-cairo'),
    nameSize: (optimized.ns as ProfileData['nameSize']) || 'medium',
    nameGlow: optimized.ng === 1,
    nameGlowColor: optimized.ngc ? String(optimized.ngc) : undefined,
    nameAlignment: (optimized.na as ProfileData['nameAlignment']) || 'center',
    nameBackground: optimized.nb === 1,
    bio: String(optimized.b || ''),
    bioFont: String(optimized.bf || 'font-cairo'),
    bioGlow: optimized.bg === 1,
    bioGlowColor: optimized.bgc ? String(optimized.bgc) : undefined,
    bioAlignment: (optimized.ba as ProfileData['bioAlignment']) || 'center',
    bioBackground: optimized.bb === 1,
    avatar: optimized.a ? String(optimized.a) : undefined,
    avatarStyle: (optimized.as as ProfileData['avatarStyle']) || 'circle',
    avatarSize: (optimized.az as ProfileData['avatarSize']) || 'medium',
    avatarAlignment: (optimized.aa as ProfileData['avatarAlignment']) || 'center',
    avatarGlow: optimized.ag === 1,
    avatarGlowColor: optimized.agc ? String(optimized.agc) : undefined,
    avatarFloat: optimized.af === 1,
    hideAvatar: optimized.ha === 1,
    hideName: optimized.hn === 1,
    textBlocks: Array.isArray(optimized.tb) ? optimized.tb.map((b: Record<string, unknown>, i: number) => ({
      id: String(i),
      content: String(b.c || ''),
      alignment: (b.a as 'start' | 'center' | 'end') || 'center',
      fontSize: (b.f as 'small' | 'medium' | 'large' | 'xlarge') || 'medium',
      fontFamily: b.ff ? String(b.ff) : 'font-cairo',
    })) : [],
    socialLinks: [],
    theme: {
      backgroundColor: '#0f172a',
      backgroundType: 'gradient',
      gradientFrom: '#0f172a',
      gradientTo: '#1e1b4b',
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
    },
    media: [],
    musicUrl: optimized.mu ? String(optimized.mu) : undefined,
    musicAutoplay: optimized.ma === 1,
    musicLoop: optimized.ml === 1,
    createdAt: new Date().toISOString(),
  };

  // Restore social links
  if (Array.isArray(optimized.sl)) {
    profile.socialLinks = optimized.sl.map((link: { p: string; u: string }, index: number) => ({
      id: String(index),
      platform: link.p,
      url: link.u,
      icon: link.p,
    }));
  }

  // Restore theme
  const t = optimized.t as Record<string, unknown>;
  if (t) {
    profile.theme.backgroundType = t.bt as ProfileData['theme']['backgroundType'];
    if (t.bc) profile.theme.backgroundColor = String(t.bc);
    if (t.gf) profile.theme.gradientFrom = String(t.gf);
    if (t.gt) profile.theme.gradientTo = String(t.gt);
    if (t.bi) profile.theme.backgroundImage = String(t.bi);
    if (t.ab) profile.theme.animatedBackground = t.ab as ProfileData['theme']['animatedBackground'];
    if (t.tc) profile.theme.textColor = String(t.tc);
    if (t.ac) profile.theme.accentColor = String(t.ac);
    if (t.ctc) profile.theme.cardTextColor = String(t.ctc);
    if (t.bs) profile.theme.buttonStyle = t.bs as ProfileData['theme']['buttonStyle'];
    if (t.an) profile.theme.animation = t.an as ProfileData['theme']['animation'];
    if (t.brs) profile.theme.borderStyle = t.brs as ProfileData['theme']['borderStyle'];
    if (t.ss) profile.theme.shadowStyle = t.ss as ProfileData['theme']['shadowStyle'];
    if (t.co !== undefined) profile.theme.cardOpacity = Number(t.co);
  }

  // Restore media
  if (Array.isArray(optimized.m)) {
    profile.media = optimized.m.map((media: Record<string, unknown>, index: number) => ({
      id: String(index),
      type: media.t as 'image' | 'video' | 'youtube',
      url: String(media.u),
      caption: media.c ? String(media.c) : undefined,
      width: (media.w as 'full' | 'half') || 'half',
      aspectRatio: (media.ar as 'auto' | 'square' | 'video' | 'portrait') || 'auto',
    }));
  }

  return profile;
}

// Encode profile data to a URL-safe string (optimized)
export function encodeProfileToUrl(profile: ProfileData): string {
  try {
    const optimized = optimizeProfileData(profile);
    const json = JSON.stringify(optimized);
    const compressed = deflate(json, { level: 9 });
    const base64 = btoa(String.fromCharCode(...compressed));
    // Make URL-safe
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Error encoding profile:', error);
    return '';
  }
}

// Decode profile data from URL string
export function decodeProfileFromUrl(encoded: string): ProfileData | null {
  try {
    // Restore base64 characters
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decompressed = inflate(bytes, { to: 'string' });
    const data = JSON.parse(decompressed);
    
    // Check if it's optimized format or full format
    if ('i' in data) {
      return restoreProfileData(data);
    }
    
    return data as ProfileData;
  } catch (error) {
    console.error('Error decoding profile:', error);
    return null;
  }
}

// Generate shareable URL (shorter)
export function generateShareableUrl(profile: ProfileData, baseUrl: string): string {
  const encoded = encodeProfileToUrl(profile);
  // Use shorter path
  return `${baseUrl}/p/${profile.id}?d=${encoded}`;
}
