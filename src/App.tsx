import { useEffect, useState } from 'react';
import { Download, X, Image as ImageIcon, Video, UploadCloud, RefreshCw, ArrowDown, Truck, Route, MapPin, GraduationCap, Calendar, Camera } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const isVideo = (url: string) => /\.(mov|mp4|webm|avi|mkv)$/i.test(url);

export default function App() {
  const [mediaFiles, setMediaFiles] = useState<{ url: string; name: string }[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMedia = () => {
    setLoading(true);
    fetch('/media-list.json')
      .then(res => {
        if (!res.ok) throw new Error('Cannot find media list');
        return res.json();
      })
      .then((data: string[]) => {
        setMediaFiles(data.map(name => ({
          url: `/slike/${name}`,
          name
        })));
      })
      .catch(err => {
        console.error('Greška:', err);
        setMediaFiles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleDownload = (e: React.MouseEvent, mediaUrl: string, mediaName: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = mediaName || 'medija';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-200 selection:bg-yellow-500/30">
      {/* Industrial Header */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000000_10px,#000000_20px)]" />
      <header className="sticky top-0 z-30 border-b border-zinc-900 bg-zinc-950/80 px-6 py-4 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-zinc-950 shadow-md ring-1 ring-yellow-400">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
                3.D 2025/2026 TSK
              </h1>
              <p className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase mt-0.5">
                Maturanti • Vozači
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {mediaFiles.length > 0 && (
              <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-sm font-bold text-zinc-300">
                <ImageIcon className="h-4 w-4 text-yellow-500" />
                <span>{mediaFiles.length}</span>
              </div>
            )}
            <button
              onClick={loadMedia}
              className="flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:bg-zinc-800 hover:text-yellow-500 transition-colors active:scale-95"
              title="Osvježi galeriju"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6">
        <div className="absolute inset-0 bg-[#09090b]">
           <div className="absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 bg-zinc-900/30" />
           <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-[6px] border-dashed border-yellow-500/10 -translate-x-1/2" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-500 text-zinc-950 shadow-2xl ring-1 ring-yellow-400/50"
          >
            <GraduationCap className="h-10 w-10" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold tracking-tight text-white mb-2 sm:text-7xl uppercase"
          >
            Maturanti <br /><span className="text-yellow-500">3.D</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-zinc-400 sm:text-xl max-w-2xl px-4 font-medium leading-relaxed"
          >
            Đabe konji pod haubom kad su magarci za volanom 😉
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 justify-center mt-2"
          >
            <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 flex items-center gap-2 text-sm font-bold text-zinc-300">
              <Truck className="w-4 h-4 text-yellow-500"/> Vozači motornog vozila
            </div>
            <div className="bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 flex items-center gap-2 text-sm font-bold text-zinc-300">
              <Calendar className="w-4 h-4 text-yellow-500"/> Generacija 2025/2026
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => document.getElementById('galerija')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 flex items-center gap-2 rounded-full bg-yellow-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-0.5 active:scale-95"
          >
            <span>Pregledaj Galeriju</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </section>

      {/* Main Content */}
      <main id="galerija" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-24 relative z-10">
        {loading ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-yellow-500"></div>
              <p className="animate-pulse text-sm text-yellow-500/70 tracking-widest uppercase font-bold">Učitavanje rute...</p>
            </div>
          </div>
        ) : mediaFiles.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center"
          >
            <div className="mb-6 rounded-full bg-zinc-800 p-6 ring-1 ring-zinc-700">
              <Camera className="h-10 w-10 text-yellow-500" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold text-white uppercase">Knjiga uspomena je prazna</h3>
            <p className="max-w-md text-zinc-400 leading-relaxed text-sm mb-6 font-medium">
              Ekipa, dodajte slike sa zadnjeg roštilja, fešte ili vožnje u folder <code className="rounded bg-zinc-950 px-2 py-1 font-mono text-xs text-yellow-500 border border-zinc-800">public/slike</code> i osvježite stranicu. Netlify će ih automatski učitati.
            </p>
            <button
              onClick={loadMedia}
              className="flex items-center gap-2 rounded-md bg-yellow-500 text-zinc-950 px-6 py-3 font-bold uppercase tracking-wide hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/10 active:scale-95"
            >
              <RefreshCw className="h-5 w-5" />
              Osvježi
            </button>
          </motion.div>
        ) : (
          <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4 xl:gap-6 xl:space-y-6">
            <AnimatePresence>
              {mediaFiles.map((media, idx) => (
                <motion.div
                  key={media.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx % 10) * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative inline-block w-full break-inside-avoid overflow-hidden rounded-xl bg-zinc-900 cursor-zoom-in border border-zinc-800 shadow-xl ring-1 ring-black/50"
                  onClick={() => setSelectedMedia(media)}
                >
                  {isVideo(media.name) ? (
                    <>
                      <video
                        src={media.url}
                        className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                        onMouseLeave={(e) => {
                           e.currentTarget.pause();
                           e.currentTarget.currentTime = 0;
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110">
                        <div className="rounded-full bg-black/60 p-3 text-yellow-500 backdrop-blur-md shadow-lg ring-1 ring-yellow-500/30">
                          <Video className="h-6 w-6" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <motion.img
                      src={media.url}
                      alt={media.name}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                  )}
                  
                  {/* Subtle vignette / hover overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Download Button */}
                  <div className="absolute bottom-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleDownload(e, media.url, media.name)}
                      className="group/btn z-10 flex h-11 w-11 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-500 backdrop-blur-md border border-yellow-500/20 transition-all hover:bg-yellow-500 hover:text-zinc-950 hover:shadow-lg active:scale-95"
                      title="Preuzmi"
                    >
                      <Download className="h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl"
            onClick={() => setSelectedMedia(null)}
          >
            {/* Controls */}
            <div className="absolute top-6 flex w-full max-w-7xl items-center justify-between px-6 z-10 text-white">
              <span className="font-mono text-xs tracking-widest text-zinc-500 opacity-0 sm:opacity-100 flex items-center gap-2 uppercase">
                {isVideo(selectedMedia.name) ? <Video className="h-4 w-4 text-yellow-500" /> : <ImageIcon className="h-4 w-4 text-yellow-500" />}
                {selectedMedia.name}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleDownload(e, selectedMedia.url, selectedMedia.name)}
                  className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 py-2.5 px-6 font-bold uppercase tracking-wider backdrop-blur-md transition-all hover:border-yellow-500 hover:text-yellow-500 active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm">Preuzmi</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMedia(null);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/80 backdrop-blur-md transition-all hover:border-red-500 hover:text-red-500 hover:scale-105 active:scale-95"
                  title="Zatvori"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Enlarged Media */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
              className="relative flex max-h-[85vh] max-w-[95vw] mt-12 items-center justify-center"
            >
               {isVideo(selectedMedia.name) ? (
                 <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-xl shadow-2xl ring-1 ring-white/10 outline-none bg-black/50"
                  onClick={(e) => e.stopPropagation()}
                />
               ) : (
                 <img
                  src={selectedMedia.url}
                  alt={selectedMedia.name}
                  className="max-h-full max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10 bg-black/50"
                  onClick={(e) => e.stopPropagation()}
                />
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
