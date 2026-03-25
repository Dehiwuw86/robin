'use client';

import { useState, useEffect, use } from 'react';
import { ArrowRight, Eye, EyeOff, Save, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    const existingProfile = getProfile(id);
    if (existingProfile) {
      setProfile(existingProfile);
    } else {
      const newProfile = createDefaultProfile();
      newProfile.id = id;
      setProfile(newProfile);
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
        toast.success('تم حفظ التغييرات بنجاح');
      } else {
        toast.error(result.error || 'حدث خطأ أثناء الحفظ');
      }
    }, 300);
  };

  const handleOpenPage = () => {
    if (!profile) return;
    const shareableUrl = generateShareableUrl(profile, window.location.origin);
    window.open(shareableUrl, '_blank');
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
          <span className="text-muted-foreground text-sm">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground hidden sm:block">EasyLink</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)} className="hidden sm:flex">
              {showPreview ? (<><EyeOff className="w-4 h-4 ml-2" />إخفاء المعاينة</>) : (<><Eye className="w-4 h-4 ml-2" />معاينة</>)}
            </Button>

            <Button variant="outline" size="sm" onClick={handleOpenPage}>
              <ExternalLink className="w-4 h-4 ml-2" />
              <span className="hidden sm:inline">فتح الصفحة</span>
            </Button>

            <Button onClick={handleSave} size="sm" disabled={isSaving}>
              <Save className="w-4 h-4 ml-2" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ'}
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Preview Toggle */}
      <div className="sm:hidden fixed bottom-4 left-4 z-50">
        <Button variant="default" size="icon" onClick={() => setShowPreview(!showPreview)} className="w-12 h-12 rounded-full shadow-lg">
          {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-57px)]">
        <div className={cn('flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto', showPreview && 'hidden lg:block lg:max-w-xl xl:max-w-2xl')}>
          <div className="max-w-2xl mx-auto pb-20 lg:pb-6">
            <ProfileEditor profile={profile} onChange={setProfile} />
          </div>
        </div>

        <div className={cn('flex-1 border-r border-border/50 bg-muted/30 overflow-hidden', !showPreview && 'hidden lg:block')}>
          <div className="h-full overflow-y-auto">
            <div className="min-h-full">
              <ProfilePreview profile={profile} isPreview={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
