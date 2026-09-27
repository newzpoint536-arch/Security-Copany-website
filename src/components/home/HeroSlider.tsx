import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSite, PageRoute } from '../../context/SiteContext';
import { HeroSlide } from '../../types';
import {
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Scan,
  Radio,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export const HeroSlider: React.FC = () => {
  const { heroSlides, navigate } = useSite();

  // Active slides only
  const activeSlides = heroSlides.filter((s) => s.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});
  const [videoReady, setVideoReady] = useState<Record<string, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const progressIntervalRef = useRef<number | null>(null);
  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  // Enable Ken Burns transition immediately after initial mount and paint so slide 0 animates on initial load
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Duration for current slide
  const duration = currentSlide?.durationMs || 6500;

  // Handle navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + activeSlides.length) % activeSlides.length);
    setProgress(0);
  }, [activeSlides.length]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay and Progress Bar timer with smooth 50ms tick
  useEffect(() => {
    if (!isPlaying || activeSlides.length <= 1) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / duration) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, duration, currentIndex, nextSlide, activeSlides.length]);

  // Seamless Video management: pre-buffer upcoming video and play current
  useEffect(() => {
    activeSlides.forEach((slide, idx) => {
      const vidEl = videoRefs.current[slide.id];
      if (vidEl) {
        if (idx === currentIndex && slide.mediaType === 'VIDEO') {
          if (isPlaying) {
            vidEl.currentTime = 0;
            const playPromise = vidEl.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay policy fallback - fallback image remains seamless
              });
            }
          } else {
            vidEl.pause();
          }
        } else {
          vidEl.pause();
        }
      }
    });
  }, [currentIndex, isPlaying, activeSlides]);

  // Keyboard navigation & accessibility controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isCarouselFocused = activeEl?.closest('#hero-carousel-region');

      if (e.key === 'ArrowRight') {
        if (isCarouselFocused) e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        if (isCarouselFocused) e.preventDefault();
        prevSlide();
      } else if (e.key === ' ' && isCarouselFocused) {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'Home' && isCarouselFocused) {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End' && isCarouselFocused) {
        e.preventDefault();
        goToSlide(activeSlides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, activeSlides.length]);

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  if (!currentSlide) return null;

  return (
    <section
      id="hero-carousel-region"
      role="region"
      aria-roledescription="carousel"
      aria-label="SafeNet Corporate Security Media Showcase"
      aria-live={isPlaying ? 'off' : 'polite'}
      tabIndex={0}
      className="relative bg-slate-950 text-white min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] flex items-center overflow-hidden select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Media Layers (Seamless Image-to-Video & Video-to-Image Crossfade) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isVideo = slide.mediaType === 'VIDEO' && !videoError[slide.id];
          const isStaticImage = slide.mediaType === 'IMAGE' || !!videoError[slide.id];

          // Subtle Ken Burns animation configuration for static image slides using Tailwind CSS transitions & scaling transforms
          const movement = slide.kenBurnsMovement || 'zoom-in';
          const isAnimating = isActive && isMounted;

          let kenBurnsTransform = 'scale-100 origin-center';
          if (isStaticImage) {
            if (movement === 'zoom-in') {
              kenBurnsTransform = isAnimating
                ? 'scale-[1.07] origin-center'
                : 'scale-100 origin-center';
            } else if (movement === 'zoom-out') {
              kenBurnsTransform = isAnimating
                ? 'scale-100 origin-center'
                : 'scale-[1.07] origin-center';
            } else if (movement === 'pan-left') {
              kenBurnsTransform = isAnimating
                ? 'scale-[1.06] -translate-x-3.5 origin-center'
                : 'scale-[1.06] translate-x-3.5 origin-center';
            } else if (movement === 'pan-right') {
              kenBurnsTransform = isAnimating
                ? 'scale-[1.06] translate-x-3.5 origin-center'
                : 'scale-[1.06] -translate-x-3.5 origin-center';
            }
          }

          const kenBurnsClass = isStaticImage
            ? `transform transition-transform ease-out will-change-transform ${kenBurnsTransform}`
            : 'scale-100 origin-center';

          const kenBurnsStyle = isStaticImage
            ? {
                transitionDuration: isAnimating
                  ? `${(slide.durationMs || 6500) + 700}ms`
                  : '1000ms'
              }
            : undefined;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${activeSlides.length}: ${slide.headline}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Always mount poster/static image layer underneath to guarantee zero black flash during video load */}
              <img
                src={slide.posterUrl || slide.mediaUrl}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover object-center ${kenBurnsClass}`}
                style={kenBurnsStyle}
                referrerPolicy="no-referrer"
              />

              {/* Video Layer mounted if slide is video */}
              {isVideo && (
                <video
                  ref={(el) => {
                    videoRefs.current[slide.id] = el;
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={isActive ? 'auto' : 'metadata'}
                  poster={slide.posterUrl}
                  onCanPlay={() => {
                    setVideoReady((prev) => ({ ...prev, [slide.id]: true }));
                  }}
                  onError={() => {
                    setVideoError((prev) => ({ ...prev, [slide.id]: true }));
                  }}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                    videoReady[slide.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {slide.videoSources && slide.videoSources.length > 0 ? (
                    slide.videoSources.map((v, vIdx) => (
                      <source key={vIdx} src={v.src} type={v.type} />
                    ))
                  ) : (
                    <source src={slide.mediaUrl} type="video/mp4" />
                  )}
                </video>
              )}

              {/* Adaptive Directional Scrim (Deep Navy & Slate) for 100% WCAG Contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />
            </div>
          );
        })}
      </div>

      {/* Security Scan HUD-Style Overlay & Telemetry */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
        {/* Subtle Horizontal Scanning Line traversing across hero */}
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent animate-[scanline_8s_linear_infinite]" />

        {/* Tactical Corner HUD Brackets */}
        <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-sky-400/50 hidden md:block" />
        <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-sky-400/50 hidden md:block" />
        <div className="absolute bottom-24 left-6 w-5 h-5 border-b border-l border-sky-400/50 hidden md:block" />
        <div className="absolute bottom-24 right-6 w-5 h-5 border-b border-r border-sky-400/50 hidden md:block" />

        {/* Top-Right Corporate Telemetry Status Badge */}
        <div className="absolute top-6 right-6 lg:right-12 hidden sm:flex items-center gap-3 text-[11px] font-mono text-sky-400/80 bg-slate-950/60 backdrop-blur-xs px-3 py-1.5 rounded-md border border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DISPATCH MATRIX</span>
          </span>
          <span className="text-slate-600">·</span>
          <span>LAT 6.4281° N</span>
          <span>LNG 3.4245° E</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">24/7 ACTIVE</span>
        </div>

        {/* Dynamic HUD Scan Effects Based on Slide Configuration */}
        {currentSlide.scanEffect === 'horizontal-grid' && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
        )}

        {currentSlide.scanEffect === 'radar' && (
          <div className="absolute right-12 bottom-24 w-44 h-44 rounded-full border border-sky-500/20 hidden xl:flex items-center justify-center pointer-events-none">
            <div className="w-28 h-28 rounded-full border border-sky-400/15 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border border-sky-300/10" />
            </div>
            {/* Smooth radar sweep arm */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/15 to-transparent animate-spin [animation-duration:5s]" />
            <span className="absolute text-[9px] font-mono text-sky-400/70 top-2 tracking-wider">
              PERIMETER SCAN
            </span>
          </div>
        )}

        {currentSlide.scanEffect === 'target-hud' && (
          <div className="absolute top-1/2 right-16 -translate-y-1/2 w-44 h-44 hidden xl:flex items-center justify-center border border-sky-500/20 rounded-lg pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
            <span className="absolute bottom-2 text-[9px] font-mono text-sky-300 tracking-wider">
              FIELD POST LOCK
            </span>
          </div>
        )}
      </div>

      {/* Hero Content & Text Animations */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-3xl space-y-6">
          {/* 1. Eyebrow Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>{currentSlide.eyebrow}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-mono text-[11px]">
              {currentSlide.mediaType === 'VIDEO' ? 'SURVEILLANCE FEED' : 'VERIFIED POST ORDER'}
            </span>
          </div>

          {/* 2. Main Headline */}
          <h1
            key={`title-${currentSlide.id}`}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1] text-balance drop-shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {currentSlide.headline}
          </h1>

          {/* 3. Supporting Description */}
          <p
            key={`desc-${currentSlide.id}`}
            className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal drop-shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100"
          >
            {currentSlide.description}
          </p>

          {/* 4. Action CTAs */}
          <div
            key={`ctas-${currentSlide.id}`}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200"
          >
            <button
              onClick={() => {
                trackEvent(`Hero Slider CTA: ${currentSlide.primaryCtaText}`, 'Conversion');
                navigate(currentSlide.primaryCtaPage as PageRoute, currentSlide.primaryCtaParam);
              }}
              className="px-6 py-3.5 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-100 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap active:scale-95 text-xs sm:text-sm"
            >
              {currentSlide.primaryCtaText}
            </button>

            <button
              onClick={() => {
                trackEvent(`Hero Slider Secondary CTA: ${currentSlide.secondaryCtaText}`, 'Engagement');
                navigate(currentSlide.secondaryCtaPage as PageRoute, currentSlide.secondaryCtaParam);
              }}
              className="px-6 py-3.5 bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 whitespace-nowrap flex items-center gap-2 active:scale-95 text-xs sm:text-sm"
            >
              <span>{currentSlide.secondaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar & Accessible Navigation Controls Bar */}
      <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 z-30 flex flex-col gap-3">
        {/* Segmented Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Slide ${currentIndex + 1} progress`}
          className="grid grid-cols-5 gap-2 max-w-7xl mx-auto w-full"
        >
          {activeSlides.map((slide, idx) => {
            const isSlideActive = idx === currentIndex;
            const isPassed = idx < currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="group py-2 flex flex-col gap-1.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded-sm"
                aria-label={`Navigate to slide ${idx + 1}: ${slide.eyebrow}`}
              >
                {/* Visual Progress Track */}
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-400 transition-all duration-75"
                    style={{
                      width: isSlideActive ? `${progress}%` : isPassed ? '100%' : '0%'
                    }}
                  />
                </div>

                {/* Text Indicator (desktop/tablet) */}
                <div className="hidden md:flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                  <span className={isSlideActive ? 'text-white font-semibold' : ''}>
                    0{idx + 1}
                  </span>
                  <span className="truncate max-w-[120px]">{slide.eyebrow.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Accessible Navigation Controls (Counter, Format Badge, Prev, Play/Pause, Next) */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-1 text-xs">
          {/* Left: Slide Number & Media Format Indicator */}
          <div className="flex items-center gap-3 font-mono text-slate-400 text-xs">
            <span className="text-white font-bold" aria-current="true">
              0{currentIndex + 1}
            </span>
            <span className="text-slate-600">/</span>
            <span>0{activeSlides.length}</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-[10px] text-sky-400">
              {currentSlide.mediaType === 'VIDEO'
                ? 'CINEMATIC VIDEO'
                : `IMAGE · KEN BURNS (${currentSlide.kenBurnsMovement?.toUpperCase() || 'ZOOM-IN'})`}
            </span>
          </div>

          {/* Right: Play/Pause, Previous, Next Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Button for WCAG Accessibility */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-pressed={!isPlaying}
              className="p-2 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={isPlaying ? 'Pause hero slider autoplay' : 'Play hero slider autoplay'}
              title={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Previous Slide Button */}
            <button
              onClick={prevSlide}
              className="p-2 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Previous slide"
              title="Previous slide (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Slide Button */}
            <button
              onClick={nextSlide}
              className="p-2 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Next slide"
              title="Next slide (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
