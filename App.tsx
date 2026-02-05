import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  ArrowRight,
  Play,
  Activity,
  Zap,
  ChevronDown,
  User,
  Users,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Crown,
  Calendar,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  image: string;
}

// --- Constants ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Athletic Long Sleeve Top",
    image: "/Athletic long sleeve top.webp"
  },
  {
    id: 2,
    name: "Classic Motion Shorts",
    image: "/Classic Motion shorts.webp"
  },
  {
    id: 3,
    name: "Core Flow Legging",
    image: "/Core flow legging.webp"
  },
  {
    id: 4,
    name: "Edge Bra",
    image: "/Edge bra.webp"
  },
  {
    id: 5,
    name: "Elevate-V Legging",
    image: "/Elevate-V legging.webp"
  },
  {
    id: 6,
    name: "Flow Dress",
    image: "/Flow dress.webp"
  },
  {
    id: 7,
    name: "Layer Tee",
    image: "/Layer tee.webp"
  },
  {
    id: 8,
    name: "Pulse Bra",
    image: "/Pulse bra.webp"
  }
];

// --- Components ---

// Modal Component
const CommunityModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const handleJoin = () => {
    window.open('https://members.vyvra.com', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#273c3f] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-dark/10 mb-4">
            <Crown className="w-10 h-10 text-brand-dark" />
          </div>
          <h3 className="text-2xl font-bold text-[#273c3f] mb-2">Join the VYVRA Community</h3>
          <p className="text-gray-600 leading-relaxed">
            Get exclusive access to new drops, members-only content, and connect with like-minded individuals.
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary" />
              <span className="text-gray-700 text-sm">Early access to new collections</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary" />
              <span className="text-gray-700 text-sm">Exclusive member discounts</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-primary" />
              <span className="text-gray-700 text-sm">Community events & challenges</span>
            </div>
          </div>
          <button
            onClick={handleJoin}
            className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-brand-primary transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            Join Community
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox = ({
  isOpen,
  onClose,
  products,
  currentIndex,
  onNext,
  onPrev
}: {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition-colors p-2"
        aria-label="Close"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
        {currentIndex + 1} / {products.length}
      </div>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
        aria-label="Previous"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>

      {/* Image */}
      <div
        className="max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={products[currentIndex].image}
          alt={products[currentIndex].name}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          style={{ imageRendering: 'auto' }}
          loading="eager"
          decoding="sync"
        />
        <h3 className="mt-6 text-white text-lg font-medium tracking-wide">
          {products[currentIndex].name}
        </h3>
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
        aria-label="Next"
      >
        <ChevronRight className="w-10 h-10" />
      </button>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[65px] px-6 flex justify-center items-center ${scrolled ? 'bg-brand-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <svg className="h-8 md:h-10" viewBox="0 0 1476 430" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.0666707C19.16 0.133337 38.3333 0.0666691 57.5067 0.106669C86.16 80.52 114.813 160.947 143.467 241.36C160.32 288.053 174.827 335.547 188.973 383.107C189.787 381.773 190.253 380.28 190.653 378.787C206.093 324.387 223.853 270.667 242.613 217.333C267.76 144.92 292.907 72.5067 318.053 0.093338C339.853 0.0266713 361.653 0.14667 383.467 0.0400035C409.76 42.5733 435.773 85.2933 461.96 127.88C477.853 153.747 493.8 179.787 505.547 207.867C518.52 177.053 536.133 148.507 553.573 120.08C578.053 80.08 602.44 40.0133 626.987 0.0533346C648.427 0.173335 669.88 0.0133341 691.32 0.146667C711.2 56.0933 731.08 112.027 750.96 167.973C768.347 217.48 786.76 266.64 802.307 316.773C809.333 339.04 816.04 361.413 822.627 383.827C846.253 340.227 870 296.693 893.667 253.107C871.04 245.04 850.187 230.76 836.467 210.813C821.96 189.72 815.293 164.013 814.547 138.627C813.56 110.88 819.027 82.3467 833.48 58.36C847.293 35.3467 870.12 18.5733 895.267 9.77334C918.28 1.70667 942.907 -0.226662 967.133 0.093338C1013.72 0.093338 1060.31 0.093338 1106.89 0.093338C1106.87 71.4 1107 142.707 1106.83 214C1130.19 214.453 1153.6 214.067 1176.97 214.187C1202.97 142.827 1228.48 71.28 1254.71 0C1275.71 0.213333 1296.71 0.0400047 1317.69 0.093338C1370.2 143.213 1422.67 286.333 1475.15 429.453C1455.99 429.467 1436.84 429.467 1417.69 429.453C1397.96 373.973 1378.04 318.573 1358.47 263.04C1310.57 262.72 1262.67 262.96 1214.76 262.933C1195.63 318.4 1176.27 373.8 1157.24 429.32C1122.27 429.653 1087.28 429.36 1052.31 429.467C1052.32 373.947 1052.32 318.427 1052.31 262.907C1018.25 262.813 984.2 263.067 950.147 262.773C920.347 318.32 890.787 374.027 860.84 429.507C837.667 429.373 814.493 429.547 791.307 429.4C745.72 305.16 700.147 180.92 654.6 56.6533C613.933 122.147 572.92 187.453 532.48 253.067C532.293 311.427 532.453 369.787 532.4 428.133C514.2 428.173 496.013 428.133 477.813 428.147C477.773 369.867 477.893 311.587 477.76 253.307C468.587 237.413 458.373 222.053 448.827 206.347C417.707 156.413 386.653 106.453 355.493 56.5467C310.56 180.453 265.427 304.28 220.373 428.147C199.533 428.12 178.68 428.227 157.84 428.093L157.307 427.653C104.827 285.147 52.4933 142.573 0 0.0666707ZM1274.95 81.4933C1261.75 126.133 1247.05 170.32 1231.64 214.253C1268.09 214.093 1304.55 214.293 1341.01 214.147C1320.23 158.293 1302.56 101.36 1285.96 44.1467C1282.04 56.52 1278.73 69.08 1274.95 81.4933ZM892.547 69.44C874.92 84.96 868.707 109.48 868.747 132.187C868.533 154.493 874.653 178.72 892.187 193.787C910.053 209.44 934.667 213.667 957.693 214.133C989.227 214.253 1020.76 214.187 1052.29 214.173C1052.35 158.853 1052.31 103.533 1052.31 48.2133C1020.8 48.2667 989.293 48.1333 957.773 48.2933C934.733 48.7733 910.173 53.5067 892.547 69.44ZM1106.95 262.907C1106.83 308.653 1106.96 354.4 1106.88 400.147C1107.01 402.107 1106.4 404.333 1107.59 406.08C1124.77 358.333 1142.09 310.627 1159.39 262.92C1141.91 262.867 1124.43 262.907 1106.95 262.907Z" fill="white"/>
      </svg>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: `url('/imagehero.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 pt-20">
        <span className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
          New Collection
        </span>
        
        <h1 className="font-serif text-7xl md:text-9xl font-black tracking-tight mb-2 leading-none drop-shadow-2xl">
          DROP 01
        </h1>
        
        <p className="font-serif italic text-lg md:text-2xl font-light tracking-wide text-gray-200 mb-10">
          Where Ease Meets Empowerment
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md md:max-w-none justify-center">
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/30 rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Explore Collection
          </button>
          <button className="px-8 py-4 bg-brand-accent text-brand-dark rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
            Shop Drop 01
          </button>
        </div>

        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </div>
    </section>
  );
};

const CommunitySection = ({ onJoin }: { onJoin: () => void }) => {
  return (
    <section id="community" className="bg-brand-dark relative overflow-hidden py-24 px-6 md:px-12 border-t border-brand-accent/10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">

        {/* Left Content */}
        <div className="md:col-span-7 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent text-[10px] font-bold tracking-widest uppercase mb-8">
            <Users className="w-3 h-3" />
            Members Only
          </div>

          <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-2">
            Join the <br />
            <span className="text-brand-accent italic font-medium">VYVRA Community.</span>
          </h2>

          <div className="mt-8 mb-6">
            <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Exclusive Access
            </p>
            <h3
              onClick={onJoin}
              className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-black leading-none cursor-pointer hover:from-brand-accent hover:to-brand-accent/60 transition-all"
            >
              BECOME <br /> A MEMBER
            </h3>
          </div>

          <p className="text-gray-300 font-light max-w-md leading-relaxed mb-10">
            Get exclusive access to new drops before anyone else, members-only discounts, and connect with a community that shares your vision.
          </p>

          <button
            onClick={onJoin}
            className="flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-dark rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white transition-all shadow-lg hover:shadow-brand-accent/20 group"
          >
            Join the Community
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Content: Phone UI */}
        <div className="md:col-span-5 flex justify-center md:justify-end relative z-10">
          <div className="relative w-[300px] h-[600px] bg-white rounded-[3rem] border-[8px] border-black shadow-2xl overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-all duration-700 ease-out hover:scale-105">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-black rounded-b-2xl z-20"></div>

            {/* Screen Content */}
            <div className="h-full w-full bg-gradient-to-br from-white via-gray-50 to-brand-beige p-6 flex flex-col relative pt-8">

              {/* Header with VYVRA Logo */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center mb-3">
                  <svg className="h-6" viewBox="0 0 1476 430" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.0666707C19.16 0.133337 38.3333 0.0666691 57.5067 0.106669C86.16 80.52 114.813 160.947 143.467 241.36C160.32 288.053 174.827 335.547 188.973 383.107C189.787 381.773 190.253 380.28 190.653 378.787C206.093 324.387 223.853 270.667 242.613 217.333C267.76 144.92 292.907 72.5067 318.053 0.093338C339.853 0.0266713 361.653 0.14667 383.467 0.0400035C409.76 42.5733 435.773 85.2933 461.96 127.88C477.853 153.747 493.8 179.787 505.547 207.867C518.52 177.053 536.133 148.507 553.573 120.08C578.053 80.08 602.44 40.0133 626.987 0.0533346C648.427 0.173335 669.88 0.0133341 691.32 0.146667C711.2 56.0933 731.08 112.027 750.96 167.973C768.347 217.48 786.76 266.64 802.307 316.773C809.333 339.04 816.04 361.413 822.627 383.827C846.253 340.227 870 296.693 893.667 253.107C871.04 245.04 850.187 230.76 836.467 210.813C821.96 189.72 815.293 164.013 814.547 138.627C813.56 110.88 819.027 82.3467 833.48 58.36C847.293 35.3467 870.12 18.5733 895.267 9.77334C918.28 1.70667 942.907 -0.226662 967.133 0.093338C1013.72 0.093338 1060.31 0.093338 1106.89 0.093338C1106.87 71.4 1107 142.707 1106.83 214C1130.19 214.453 1153.6 214.067 1176.97 214.187C1202.97 142.827 1228.48 71.28 1254.71 0C1275.71 0.213333 1296.71 0.0400047 1317.69 0.093338C1370.2 143.213 1422.67 286.333 1475.15 429.453C1455.99 429.467 1436.84 429.467 1417.69 429.453C1397.96 373.973 1378.04 318.573 1358.47 263.04C1310.57 262.72 1262.67 262.96 1214.76 262.933C1195.63 318.4 1176.27 373.8 1157.24 429.32C1122.27 429.653 1087.28 429.36 1052.31 429.467C1052.32 373.947 1052.32 318.427 1052.31 262.907C1018.25 262.813 984.2 263.067 950.147 262.773C920.347 318.32 890.787 374.027 860.84 429.507C837.667 429.373 814.493 429.547 791.307 429.4C745.72 305.16 700.147 180.92 654.6 56.6533C613.933 122.147 572.92 187.453 532.48 253.067C532.293 311.427 532.453 369.787 532.4 428.133C514.2 428.173 496.013 428.133 477.813 428.147C477.773 369.867 477.893 311.587 477.76 253.307C468.587 237.413 458.373 222.053 448.827 206.347C417.707 156.413 386.653 106.453 355.493 56.5467C310.56 180.453 265.427 304.28 220.373 428.147C199.533 428.12 178.68 428.227 157.84 428.093L157.307 427.653C104.827 285.147 52.4933 142.573 0 0.0666707ZM1274.95 81.4933C1261.75 126.133 1247.05 170.32 1231.64 214.253C1268.09 214.093 1304.55 214.293 1341.01 214.147C1320.23 158.293 1302.56 101.36 1285.96 44.1467C1282.04 56.52 1278.73 69.08 1274.95 81.4933ZM892.547 69.44C874.92 84.96 868.707 109.48 868.747 132.187C868.533 154.493 874.653 178.72 892.187 193.787C910.053 209.44 934.667 213.667 957.693 214.133C989.227 214.253 1020.76 214.187 1052.29 214.173C1052.35 158.853 1052.31 103.533 1052.31 48.2133C1020.8 48.2667 989.293 48.1333 957.773 48.2933C934.733 48.7733 910.173 53.5067 892.547 69.44ZM1106.95 262.907C1106.83 308.653 1106.96 354.4 1106.88 400.147C1107.01 402.107 1106.4 404.333 1107.59 406.08C1124.77 358.333 1142.09 310.627 1159.39 262.92C1141.91 262.867 1124.43 262.907 1106.95 262.907Z" fill="#273c3f"/>
                  </svg>
                </div>
                <p className="text-brand-dark text-[10px] font-bold uppercase tracking-widest">Members Area</p>
              </div>

              {/* Member Benefits */}
              <div className="bg-white backdrop-blur-sm rounded-2xl p-4 mb-4 border border-brand-dark/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-brand-dark font-bold text-sm">Member Benefits</h4>
                  <Crown className="w-4 h-4 text-brand-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-brand-dark text-xs font-medium">Early Access</p>
                      <p className="text-gray-500 text-[10px]">Shop before anyone else</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Drop */}
              <div className="bg-white backdrop-blur-sm rounded-2xl p-4 mb-4 border border-brand-dark/10 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-brand-dark font-bold text-sm">Next Drop</h4>
                  <Calendar className="w-4 h-4 text-brand-dark" />
                </div>
                <div className="bg-brand-dark/5 rounded-lg p-3 text-center">
                  <p className="text-brand-dark text-lg font-bold">DROP 02</p>
                  <p className="text-gray-500 text-[10px]">Coming Soon</p>
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white backdrop-blur-sm rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Community</p>
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-brand-dark/5 rounded-lg p-2">
                    <p className="text-brand-dark text-sm font-bold">500+</p>
                    <p className="text-gray-500 text-[9px]">Members</p>
                  </div>
                  <div className="bg-brand-dark/5 rounded-lg p-2">
                    <p className="text-brand-dark text-sm font-bold">24/7</p>
                    <p className="text-gray-500 text-[9px]">Support</p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-2">
                <button
                  onClick={onJoin}
                  className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-primary transition-colors shadow-lg"
                >
                  Join Now
                </button>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-400/40 rounded-full"></div>
            </div>
          </div>

          {/* Back Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[500px] bg-brand-primary/15 blur-[60px] -z-10"></div>
        </div>
      </div>
    </section>
  );
};

const ProductGrid = ({ onViewImage }: { onViewImage: (index: number) => void }) => {
  return (
    <div id="products" className="scroll-mt-20">
      <section className="bg-brand-beige pb-24 px-6 md:px-12 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-brand-dark text-3xl md:text-4xl font-bold mb-6">Ease & Empowerment</h2>
            <div className="w-16 h-[1px] bg-brand-dark/20 mx-auto mb-8"></div>
            <p className="text-brand-charcoal/80 text-lg font-light leading-relaxed max-w-3xl mx-auto">
              More than activewear. A movement of raw authenticity. We strip away the unnecessary to reveal the essential you.
            </p>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {PRODUCTS.map((product, index) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-beige/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <button
                    onClick={() => onViewImage(index)}
                    className="flex items-center gap-2 py-3 px-6 bg-white text-brand-dark text-xs font-bold uppercase tracking-widest rounded shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-beige"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-brand-dark font-medium text-sm tracking-wide">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => window.open('https://vyvra.com', '_blank')}
            className="bg-brand-dark text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-primary transition-colors shadow-2xl hover:shadow-brand-dark/40 hover:-translate-y-1 transform duration-300"
          >
            Shop All Drop 01
          </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-beige py-20 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center gap-6 text-xs text-white/40 uppercase tracking-widest">
          <div className="flex gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Collection</button>
            <button onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Community</button>
          </div>
          <p>© {new Date().getFullYear()} VYVRA</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewImage = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <main className="w-full min-h-screen bg-brand-beige selection:bg-brand-accent selection:text-brand-dark">
      <CommunityModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        products={PRODUCTS}
        currentIndex={currentImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
      <Navbar />
      <Hero />
      <CommunitySection onJoin={() => setModalOpen(true)} />
      <ProductGrid onViewImage={handleViewImage} />
      <Footer />
    </main>
  );
}