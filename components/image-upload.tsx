'use client';

import { useState } from 'react';
import { X, Image as ImageIcon, Video, Link2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Validate if a URL is a valid image URL
function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Validate if a URL is a valid video URL
function isValidVideoUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  } catch {
    return false;
  }
}

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  className?: string;
  label?: string;
  previewClassName?: string;
  aspectRatio?: 'square' | 'video' | 'cover' | 'avatar';
  icon?: 'image' | 'video';
}

export function ImageUpload({
  value,
  onChange,
  accept = 'image/*',
  className,
  label = 'رابط الصورة',
  previewClassName,
  aspectRatio = 'square',
}: ImageUploadProps) {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    cover: 'aspect-[3/1]',
    avatar: 'aspect-square w-28 h-28 sm:w-32 sm:h-32',
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('الرجاء إدخال رابط');
      return;
    }
    
    if (!isValidImageUrl(urlInput)) {
      setError('الرابط غير صالح');
      return;
    }
    
    onChange(urlInput.trim());
    setUrlInput('');
    setError(null);
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    setError(null);
  };

  if (value) {
    return (
      <div className={cn('relative group', className)}>
        <div className={cn('rounded-xl overflow-hidden bg-muted', aspectClasses[aspectRatio], previewClassName)}>
          {accept.includes('video') ? (
            <video
              src={value}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => setError('فشل تحميل الصورة')}
            />
          )}
        </div>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full"
          onClick={handleRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Link2 className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setError(null);
            }}
            placeholder="https://example.com/image.jpg"
            className="flex-1 h-10 text-sm"
            dir="ltr"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            className="h-10"
            size="sm"
          >
            إضافة
          </Button>
        </div>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    </div>
  );
}

interface MediaUploadProps {
  onUpload: (url: string, type: 'image' | 'video') => void;
  onYouTubeAdd?: (url: string) => void;
  hasVideo?: boolean;
  className?: string;
}

export function MediaUpload({ onUpload, onYouTubeAdd, hasVideo = false, className }: MediaUploadProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showYouTubeInput, setShowYouTubeInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const handleYouTubeSubmit = () => {
    const videoId = extractYouTubeId(youtubeUrl);
    if (videoId && onYouTubeAdd) {
      onYouTubeAdd(youtubeUrl);
      setYoutubeUrl('');
      setShowYouTubeInput(false);
      setError(null);
    } else {
      setError('رابط يوتيوب غير صالح');
    }
  };

  const handleImageSubmit = () => {
    if (!imageUrl.trim()) {
      setError('الرجاء إدخال رابط الصورة');
      return;
    }
    
    if (!isValidImageUrl(imageUrl)) {
      setError('رابط الصورة غير صالح');
      return;
    }
    
    onUpload(imageUrl.trim(), 'image');
    setImageUrl('');
    setShowImageInput(false);
    setError(null);
  };

  const handleVideoSubmit = () => {
    if (!videoUrl.trim()) {
      setError('الرجاء إدخال رابط الفيديو');
      return;
    }
    
    if (!isValidVideoUrl(videoUrl)) {
      setError('رابط الفيديو غير صالح (يجب أن يكون ملف فيديو مثل .mp4)');
      return;
    }

    
    onUpload(videoUrl.trim(), 'video');
    setVideoUrl('');
    setShowVideoInput(false);
    setError(null);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* YouTube URL Input */}
      {showYouTubeInput ? (
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Video className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-sm font-medium">إضافة فيديو يوتيوب</span>
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="h-10"
              dir="ltr"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleYouTubeSubmit}
                className="flex-1"
                size="sm"
              >
                إضافة
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowYouTubeInput(false);
                  setYoutubeUrl('');
                  setError(null);
                }}
                size="sm"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowYouTubeInput(true)}
          className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-red-500/50 hover:bg-red-500/5 transition-all flex items-center justify-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
            <Video className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-sm font-medium">إضافة فيديو يوتيوب</span>
        </button>
      )}

      {/* Image URL Input */}
      {showImageInput ? (
        <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">إضافة صورة برابط</span>
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-10"
              dir="ltr"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleImageSubmit}
                className="flex-1"
                size="sm"
              >
                إضافة
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowImageInput(false);
                  setImageUrl('');
                  setError(null);
                }}
                size="sm"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowImageInput(true)}
          className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-medium">إضافة صورة برابط</span>
        </button>
      )}

      {/* Video URL Input */}
      {showVideoInput ? (
          <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-sm font-medium">إضافة فيديو برابط</span>
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="h-10"
                dir="ltr"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleVideoSubmit}
                  className="flex-1"
                  size="sm"
                >
                  إضافة
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowVideoInput(false);
                    setVideoUrl('');
                    setError(null);
                  }}
                  size="sm"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowVideoInput(true)}
            className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-medium">إضافة فيديو برابط</span>
          </button>
        )}

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}

// Validate if a URL is a valid audio URL
function isValidAudioUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

interface MusicUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function MusicUpload({ value, onChange, className }: MusicUploadProps) {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!urlInput.trim()) {
      setError('الرجاء إدخال رابط الصوت');
      return;
    }
    
    if (!isValidAudioUrl(urlInput)) {
      setError('الرابط غير صالح');
      return;
    }
    
    onChange(urlInput.trim());
    setUrlInput('');
    setError(null);
  };

  const handleRemove = () => {
    onChange('');
    setUrlInput('');
    setError(null);
  };

  if (value) {
    return (
      <div className={cn('relative group', className)}>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Music className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-muted-foreground" dir="ltr">{value}</p>
            <audio src={value} controls className="w-full h-8 mt-2" />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0 text-destructive hover:text-destructive"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Music className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">رابط ملف الصوت</span>
        </div>
        <div className="space-y-2">
          <Input
            type="text"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setError(null);
            }}
            placeholder="https://example.com/music.mp3"
            className="h-10"
            dir="ltr"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="sm"
          >
            إضافة الصوت
          </Button>
          {error && (
            <p className="text-xs text-destructive text-center">{error}</p>
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          أدخل رابط مباشر لملف صوتي (MP3, WAV, OGG)
        </p>
      </div>
    </div>
  );
}
