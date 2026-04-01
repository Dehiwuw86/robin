'use client';

import { useState, useEffect, use } from 'react';
import { ArrowRight, Eye, EyeOff, Save, ExternalLink, Sparkles } from 'lucide-react';
import { ProfileEditor } from '@/components/profile-editor';
import { ProfilePreview } from '@/components/profile-preview';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProfileData } from '@/lib/types';
import { createDefaultProfile, saveProfile, getProfile } from '@/lib/profile-store';
import { generateShareableUrl } from '@/lib/url-encoder';
import Link from 'next/link';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function CreatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveAnim, setSaveAnim] = useState(false);

  useEffect(() => {
    const existing = getProfile(id);
    if (existing) {
      setProfile(existing);
    } else {
      const p = createDefaultProfile();
      p.id = id;
      setProfile(p);
    }
    setIsLoading(false);
  }, [id]);

  const handleSave = () => {
    if (!profile) return;
    setIsSaving(true);
    const result = saveProfile(profile);
    setTimeout(() => {
      setIsSaving(false);
      if (result.success) {
        setSaveAnim(true);
        toast.success('تم حفظ التغييرات بنجاح ✓');
        setTimeout(() => setSaveAnim(false), 1500);
      } else {
        toast.error(result.error || 'حدث خطأ أثناء الحفظ');
      }
    }, 300);
  };

  const handleOpenPage = () => {
    if (!profile) return;
    window.open(generateShareableUrl(profile, window.location.origin), '_blank');
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-ios-fade-in">
          <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-border border-t-foreground animate-spin" />
          </div>
          <span className="text-muted-foreground text-sm font-medium">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">

      {/* Header */}
      <header className="sticky top-0 z-50 ios-nav animate-ios-fade-in">
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <Link href="/">
              <button className="ios-press flex items-center gap-1.5 px-3 py-2 rounded-xl
                text-foreground/70 hover:bg-secondary hover:text-foreground transition-all text-sm font-medium">
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">رجوع</span>
              </button>
            </Link>

            {/* Logo dot */}
            <div className="hidden sm:flex items-center gap-1.5 pr-1 border-r border-border/50">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary to-blue-400 dark:from-white dark:to-white/60 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white dark:text-black" />
              </div>
            </div>
          </div>

          {/* Profile name — mobile */}
          <span className="sm:hidden text-sm font-bold text-foreground/80 truncate max-w-[130px]">
            {profile.name || 'تعديل الصفحة'}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Preview toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="ios-press hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl
                bg-secondary border border-border/60 text-xs font-semibold
                hover:bg-muted transition-all text-foreground/80"
            >
              {showPreview
                ? <><EyeOff className="w-3.5 h-3.5" /><span>إخفاء</span></>
                : <><Eye className="w-3.5 h-3.5" /><span>معاينة</span></>
              }
            </button>

            {/* Open */}
            <button
              onClick={handleOpenPage}
              className="ios-press flex items-center gap-1.5 px-3 py-2 rounded-xl
                bg-secondary border border-border/60 text-xs font-semibold
                hover:bg-muted transition-all text-foreground/80"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">فتح</span>
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "ios-press flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm",
                saveAnim
                  ? "bg-emerald-500 text-white"
                  : "bg-primary text-primary-foreground hover:opacity-90",
                isSaving && "opacity-50"
              )}
            >
              <Save className="w-3.5 h-3.5" />
              {isSaving ? 'جاري...' : saveAnim ? 'تم ✓' : 'حفظ'}
            </button>

            <ThemeToggle />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="h-0.5 bg-border/30">
          <div className="h-full bg-gradient-to-r from-primary/60 to-blue-400/60 dark:from-white/40 dark:to-white/20"
            style={{width: `${Math.min(100, (profile.socialLinks.length * 20) + (profile.name ? 20 : 0) + (profile.bio ? 20 : 0))}%`, transition: 'width 0.5s ease'}} />
        </div>
      </header>

      {/* Mobile Preview FAB */}
      <div className="sm:hidden fixed bottom-5 left-5 z-50">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="ios-press w-12 h-12 rounded-2xl bg-foreground text-background shadow-xl flex items-center justify-center hover:opacity-90 transition-all animate-ios-spring-in"
        >
          {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-52px)]">

        <div className={cn(
          'flex-1 overflow-y-auto animate-ios-page-enter',
          showPreview && 'hidden lg:block lg:max-w-xl xl:max-w-2xl'
        )}>
          <div className="max-w-2xl mx-auto px-3 py-4 pb-24 lg:pb-8">
            <ProfileEditor profile={profile} onChange={setProfile} />
          </div>
        </div>

        <div className={cn(
          'flex-1 border-r border-border/30 overflow-hidden',
          !showPreview && 'hidden lg:block'
        )}>
          <div className="h-full overflow-y-auto">
            <ProfilePreview profile={profile} isPreview={true} />
          </div>
        </div>

      </div>
    </div>
  );
}
