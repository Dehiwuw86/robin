'use client';

import { useState, useEffect } from 'react';
import { Plus, ExternalLink, Trash2, Copy, Check, Sparkles, QrCode, Upload, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { QRCodeModal } from '@/components/qr-code-modal';
import { ProfileData } from '@/lib/types';
import { getAllProfiles, deleteProfile, generateSlug } from '@/lib/profile-store';
import { generateShareableUrl } from '@/lib/url-encoder';
import Link from 'next/link';
import { toast } from 'sonner';

export default function HomePage() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    setProfiles(getAllProfiles());
  }, []);

  const handleCreateProfile = () => {
    const newId = generateSlug();
    window.location.href = `/create/${newId}`;
  };

  const handleDeleteProfile = (id: string) => {
    deleteProfile(id);
    setProfiles(getAllProfiles());
    toast.success('تم حذف الصفحة بنجاح');
  };

  const handleCopyLink = (profile: ProfileData) => {
    const shareableUrl = generateShareableUrl(profile, window.location.origin);
    navigator.clipboard.writeText(shareableUrl);
    setCopiedId(profile.id);
    toast.success('تم نسخ الرابط');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenProfile = (profile: ProfileData) => {
    const shareableUrl = generateShareableUrl(profile, window.location.origin);
    window.open(shareableUrl, '_blank');
  };

  const handleShowQRCode = (profile: ProfileData) => {
    const shareableUrl = generateShareableUrl(profile, window.location.origin);
    setQrCodeUrl(shareableUrl);
    setSelectedProfile(profile);
    setShowQRCode(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">EasyLink</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight text-balance">
            أنشئ صفحتك الشخصية
            <span className="block text-primary">بأسلوبك الخاص</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            صمم صفحة شخصية فريدة مع روابط التواصل الاجتماعي، الموسيقى، الصور والفيديوهات. 
            شاركها مع العالم برابط واحد.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleCreateProfile}
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Plus className="w-5 h-5 ml-2" />
              إنشاء صفحة جديدة
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold"
              onClick={() => window.open('https://f.top4top.io/', '_blank')}
            >
              <Upload className="w-5 h-5 ml-2" />
              تحويل وسائط لرابط
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold"
              onClick={() => window.open('https://www-tinyurl.com/', '_blank')}
            >
              <Link2 className="w-5 h-5 ml-2" />
              تقصير رابط صفحتك الشخصية
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'تخصيص كامل',
                description: 'ألوان، خطوط، خلفيات، وتأثيرات حركية',
                icon: '🎨',
              },
              {
                title: 'روابط التواصل',
                description: 'جميع منصات التواصل الاجتماعي في مكان واحد',
                icon: '🔗',
              },
              {
                title: 'وسائط متعددة',
                description: 'أضف صور، فيديوهات، وموسيقى لصفحتك',
                icon: '🎵',
              },
            ].map((feature, index) => (
              <Card key={index} className="border-border/50 bg-card/50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* My Profiles */}
      {profiles.length > 0 && (
        <section className="py-12 px-4 border-t border-border/50">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-2xl font-bold mb-6 text-foreground">صفحاتي</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profiles.map((profile) => (
                <Card key={profile.id} className="border-border/50 bg-card/50 overflow-hidden group">
                  {/* Preview Header */}
                  <div
                    className="h-20 relative"
                    style={{
                      background: profile.theme.backgroundType === 'gradient'
                        ? `linear-gradient(to bottom right, ${profile.theme.gradientFrom}, ${profile.theme.gradientTo})`
                        : profile.theme.backgroundColor,
                    }}
                  >
                    {profile.avatar && (
                      <div className="absolute -bottom-6 right-4">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-12 h-12 rounded-full ring-2 ring-background object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4 pt-8">
                    <h4 className="font-semibold text-foreground mb-1">
                      {profile.name || 'بدون اسم'}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-4">
                      {profile.socialLinks.length} روابط
                    </p>

                    <div className="flex items-center gap-2">
                      <Link href={`/create/${profile.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          تعديل
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopyLink(profile)}
                        className="shrink-0"
                      >
                        {copiedId === profile.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShowQRCode(profile)}
                        className="shrink-0"
                      >
                        <QrCode className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="shrink-0"
                        onClick={() => handleOpenProfile(profile)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteProfile(profile.id)}
                        className="shrink-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          By Robin
        </div>
      </footer>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQRCode}
        onClose={() => setShowQRCode(false)}
        url={qrCodeUrl}
        profileName={selectedProfile?.name}
      />
    </div>
  );
}
