import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import BreadcrumbBar from "../components/BreadcrumbBar";

export default function ProfilVideo() {
  const videoRef = useRef(null);
  const hideTimerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showYoutube, setShowYoutube] = useState(false);

  // CONTROL BAR
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ================= INTERSECTION OBSERVER =================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          setIsPlaying(false);
          setIsMuted(true);
        } else {
          video.play().catch(() => {});
          setIsPlaying(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // ================= PLAY =================
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // ================= MUTE =================
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // ================= CLICK VIDEO =================
  const handleToggleControls = () => {
    // klik kedua → langsung hide
    if (showControls) {
      setShowControls(false);
      clearTimeout(hideTimerRef.current);
      return;
    }

    // klik pertama → show
    setShowControls(true);

    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 10000);
  };

  return (
    <>
      {/* ================= VIDEO HERO ================= */}
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/profile.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          onTimeUpdate={() =>
            setCurrentTime(videoRef.current?.currentTime || 0)
          }
          onLoadedMetadata={() =>
            setDuration(videoRef.current?.duration || 0)
          }
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* ================= OVERLAY ================= */}
        <div
          className="absolute inset-0 flex flex-col justify-end z-10"
          onClick={handleToggleControls}
        >
          {/* ================= CONTROL BAR ================= */}
          {showControls && (
            <div className="px-6 pb-3 flex items-center gap-4 text-white">
              {/* PLAY */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80"
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>

              {/* PROGRESS */}
              <div
                className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  videoRef.current.currentTime = percent * duration;
                }}
              >
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{
                    width: `${
                      duration ? (currentTime / duration) * 100 : 0
                    }%`,
                  }}
                />
              </div>

              {/* TIME */}
              <span className="text-xs text-white/80 min-w-[90px] text-right">
                {Math.floor(currentTime / 60)}:
                {String(Math.floor(currentTime % 60)).padStart(2, "0")} /{" "}
                {Math.floor(duration / 60)}:
                {String(Math.floor(duration % 60)).padStart(2, "0")}
              </span>

              {/* VOLUME */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="p-2 rounded-full bg-black/60 hover:bg-black/80"
              >
                {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
            </div>
          )}

          {/* ================= BOTTOM BAR (ALWAYS SHOW) ================= */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <BreadcrumbBar solid={false} />

            {/* YOUTUBE BUTTON */}
           <button
  onClick={(e) => {
    e.stopPropagation();
    setShowYoutube(true);
  }}
  className="flex items-center gap-2 bg-black/60 hover:bg-black/80 px-3 py-1.5 rounded-md transition"
  title="Play Full Video"
>
  {/* ICON YOUTUBE (MERAH) */}
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
    alt="YouTube"
    className="h-4"
  />

  {/* TEXT */}
  <div className="flex flex-col leading-tight">
    <span className="text-xs text-white font-medium">
      Watch Full Video
    </span>
  </div>
</button>

          </div>
        </div>
      </section>

      {/* ================= TITLE ================= */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            Company Profile
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-800">
            PT Sigma Cipta Utama (SCU) — Subsidiary of PT Elnusa Tbk
          </p>
        </div>
      </section>

      {/* ================= YOUTUBE MODAL ================= */}
      {showYoutube && (
        <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowYoutube(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 hover:bg-black"
            >
              <X size={22} className="text-white" />
            </button>

            <iframe
              src="https://www.youtube.com/embed/IXofkWzNXXo?autoplay=1"
              title="Company Profile Video"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
