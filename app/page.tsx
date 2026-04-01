'use client';

import { useState, useEffect } from 'react';
import { Plus, ExternalLink, Trash2, Copy, Check, QrCode, Upload, Link2, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { QRCodeModal } from '@/components/qr-code-modal';
import { ProfileData } from '@/lib/types';
import { getAllProfiles, deleteProfile, generateSlug } from '@/lib/profile-store';
import { generateShareableUrl } from '@/lib/url-encoder';
import NextLink from 'next/link';
import { toast } from 'sonner';

export default function HomePage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => { setProfiles(getAllProfiles()); }, []);

  const handleCreateProfile = () => { window.location.href = `/create/${generateSlug()}`; };

  const handleDeleteProfile = (id: string) => {
    deleteProfile(id);
    setProfiles(getAllProfiles());
    toast.success('تم حذف الصفحة بنجاح');
  };

  const handleCopyLink = (profile: ProfileData) => {
    navigator.clipboard.writeText(generateShareableUrl(profile, window.location.origin));
    setCopiedId(profile.id);
    toast.success('تم نسخ الرابط');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenProfile = (profile: ProfileData) => {
    window.open(generateShareableUrl(profile, window.location.origin), '_blank');
  };

  const handleShowQRCode = (profile: ProfileData) => {
    setQrCodeUrl(generateShareableUrl(profile, window.location.origin));
    setSelectedProfile(profile);
    setShowQRCode(true);
  };


  return (
    <div className="min-h-screen bg-background overflow-x-hidden" dir="rtl">

      {/* Nav */}
      <header className="sticky top-0 z-50 ios-nav animate-ios-fade-in">
        <div className="container mx-auto px-5 py-3 flex items-center justify-end">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 dark:hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-white/3 blur-[100px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px'}} />

        <div className="relative container mx-auto text-center max-w-3xl">
          <div className="animate-ios-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-primary/10 dark:bg-white/10 border border-primary/20 dark:border-white/15
            text-primary dark:text-white/80 text-xs font-semibold mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-white/70 animate-pulse" />
            صفحتك الشخصية في دقيقة واحدة
          </div>

          <h1 className="animate-ios-list-enter stagger-1 text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className="text-foreground">اصنع </span>
            <span className="bg-gradient-to-l from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent
              dark:from-white dark:via-white/80 dark:to-white/60">هويتك</span>
            <span className="text-foreground"> الرقمية</span>
          </h1>

          <p className="animate-ios-list-enter stagger-2 text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
            صمّم صفحة شخصية فريدة مع روابط التواصل، الموسيقى، الصور وقوالب النصوص المخصصة.
          </p>

          <div className="animate-ios-list-enter stagger-3 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button onClick={handleCreateProfile}
              className="group ios-press relative flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm
                bg-foreground text-background shadow-xl shadow-foreground/10 hover:shadow-foreground/20 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:hidden" />
              <Plus className="w-4 h-4 relative z-10" />
              <span className="relative z-10">إنشاء صفحة مجانية</span>
            </button>
            <a href="https://f.top4top.io/" target="_blank" rel="noopener noreferrer"
              className="ios-press flex items-center gap-2.5 px-6 py-4 rounded-2xl font-medium text-sm
                bg-secondary border border-border hover:bg-muted transition-all text-foreground/80">
              <Upload className="w-4 h-4 text-muted-foreground" />رفع وسائط
            </a>
            <a href="https://is.gd/" target="_blank" rel="noopener noreferrer"
              className="ios-press flex items-center gap-2.5 px-6 py-4 rounded-2xl font-medium text-sm
                bg-secondary border border-border hover:bg-muted transition-all text-foreground/80">
              <Link2 className="w-4 h-4 text-muted-foreground" />تقصير رابط
            </a>
          </div>
        </div>
      </section>



      {/* My Profiles */}
      {profiles.length > 0 && (
        <section className="py-6 px-5">
          <div className="container mx-auto max-w-2xl">
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">صفحاتي</p>
              <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full font-medium">
                {profiles.length} {profiles.length === 1 ? 'صفحة' : 'صفحات'}
              </span>
            </div>
            <div className="space-y-3">
              {profiles.map((profile, index) => (
                <div key={profile.id}
                  className="animate-ios-list-enter rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-border hover:shadow-sm transition-all"
                  style={{animationDelay:`${index*0.06}s`}}>
                  <div className="h-16 w-full relative" style={{
                    background: profile.theme.backgroundType === 'gradient'
                      ? `linear-gradient(135deg, ${profile.theme.gradientFrom}, ${profile.theme.gradientTo})`
                      : profile.theme.backgroundType === 'color' ? profile.theme.backgroundColor
                      : 'linear-gradient(135deg, #0f172a, #1e1b4b)',
                  }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                    {profile.avatar && (
                      <div className="absolute -bottom-5 right-4">
                        <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full ring-2 ring-card object-cover shadow-md" />
                      </div>
                    )}
                    <div className="absolute top-2.5 left-3 flex gap-1.5">
                      {(profile.musicUrl || profile.musicYoutubeUrl) && (
                        <span className="px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium">♪ موسيقى</span>
                      )}
                      {profile.media?.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium">🖼 {profile.media.length}</span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-3">
                    <div className={profile.avatar ? 'pt-4' : ''}>
                      <p className="font-bold text-sm text-foreground">{profile.name || 'بدون اسم'}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {profile.socialLinks.length} رابط
                        {profile.bio ? ` · ${profile.bio.slice(0, 30)}${profile.bio.length > 30 ? '...' : ''}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <NextLink href={`/create/${profile.id}`} className="flex-1">
                        <button className="ios-press w-full py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all">تعديل</button>
                      </NextLink>
                      {[
                        { icon: copiedId === profile.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />, action: () => handleCopyLink(profile) },
                        { icon: <QrCode className="w-3.5 h-3.5" />, action: () => handleShowQRCode(profile) },
                        { icon: <ExternalLink className="w-3.5 h-3.5" />, action: () => handleOpenProfile(profile) },
                        { icon: <Trash2 className="w-3.5 h-3.5 text-destructive" />, action: () => handleDeleteProfile(profile.id) },
                      ].map((btn, i) => (
                        <button key={i} onClick={btn.action}
                          className="ios-press w-9 h-9 rounded-xl bg-secondary border border-border/60 flex items-center justify-center text-muted-foreground hover:bg-muted transition-all shrink-0">
                          {btn.icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleCreateProfile}
              className="ios-press mt-3 w-full py-3.5 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 dark:hover:border-white/30
                text-xs font-semibold text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />إنشاء صفحة جديدة
            </button>
          </div>
        </section>
      )}


      <footer className="py-8 px-5 text-center border-t border-border/40">
        <p className="text-xs text-muted-foreground/40">By Robin</p>
      </footer>

      <QRCodeModal isOpen={showQRCode} onClose={() => setShowQRCode(false)} url={qrCodeUrl} profileName={selectedProfile?.name} />
    </div>
  );
}
