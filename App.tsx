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
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  image: string;
}

// --- Constants ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    image: "/IMAG16.jpg"
  },
  {
    id: 2,
    image: "/IMG32.jpg"
  },
  {
    id: 3,
    image: "/IMG56.jpg"
  },
  {
    id: 4,
    image: "/IMG60.jpg"
  }
];

// --- Components ---

// Modal Component
const ActivationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(() => {
    // Check if user already activated
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aleen_activated') ? 2 : 1;
    }
    return 1;
  });
  const [email, setEmail] = useState(() => {
    // Restore email if already activated
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aleen_email') || '';
    }
    return '';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && email) {
      // Save activation state
      localStorage.setItem('aleen_activated', 'true');
      localStorage.setItem('aleen_email', email);
      setStep(2);
    } else if (step === 2) {
      window.open('https://aleen.fit', '_blank');
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    // Reset to appropriate step based on activation state
    setTimeout(() => {
      const isActivated = localStorage.getItem('aleen_activated');
      setStep(isActivated ? 2 : 1);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#273c3f] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#009929]/10 mb-4">
                <svg width="40" height="40" viewBox="0 0 290 247" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.4795 230.035C18.0945 230.035 12.7291 228.215 8.36229 224.553C-0.332086 217.27 -2.54487 204.896 3.13389 195.087L108.641 12.5502C112.832 5.30593 120.606 0.841858 129.007 0.841858C129.085 0.841858 129.163 0.841858 129.222 0.841858C137.701 0.920175 145.494 5.56045 149.568 12.9418L250.042 194.617C255.525 204.524 253.078 216.859 244.266 223.966C235.434 231.093 222.745 230.897 214.129 223.516C155.795 173.53 99.9861 173.902 38.4988 224.651C34.1321 228.254 28.8058 230.035 23.4795 230.035ZM128.713 52.6483L64.3666 163.975C85.2018 154.362 106.096 149.428 126.853 149.232C148.021 149.036 169.169 153.775 189.945 163.368L128.713 52.6679V52.6483Z" fill="#009929"/>
                  <path d="M84.8299 246.169C78.0937 246.169 71.5926 242.566 68.2245 236.222C63.3878 227.118 66.8929 215.841 76.0573 211.044C111.011 192.698 148.236 192.953 178.157 211.768C186.911 217.27 189.515 228.782 183.993 237.476C178.451 246.169 166.878 248.773 158.125 243.271C139.581 231.621 116.67 231.876 93.5831 243.995C90.7828 245.464 87.7868 246.149 84.8495 246.149L84.8299 246.169Z" fill="#009929"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#273c3f] mb-2">Activate Your AI Coach</h3>
              <p className="text-gray-600 text-sm">Get 1 free month of Aleen.fit premium access</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#273c3f] uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border-2 border-[#009929]/30 rounded-xl bg-white text-[#273c3f] placeholder-gray-400 focus:outline-none focus:border-[#009929] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#009929] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#007a20] transition-colors shadow-lg"
            >
              Activate Free Month
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#009929]/10 mb-4">
              <svg width="50" height="50" viewBox="0 0 290 247" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4795 230.035C18.0945 230.035 12.7291 228.215 8.36229 224.553C-0.332086 217.27 -2.54487 204.896 3.13389 195.087L108.641 12.5502C112.832 5.30593 120.606 0.841858 129.007 0.841858C129.085 0.841858 129.163 0.841858 129.222 0.841858C137.701 0.920175 145.494 5.56045 149.568 12.9418L250.042 194.617C255.525 204.524 253.078 216.859 244.266 223.966C235.434 231.093 222.745 230.897 214.129 223.516C155.795 173.53 99.9861 173.902 38.4988 224.651C34.1321 228.254 28.8058 230.035 23.4795 230.035ZM128.713 52.6483L64.3666 163.975C85.2018 154.362 106.096 149.428 126.853 149.232C148.021 149.036 169.169 153.775 189.945 163.368L128.713 52.6679V52.6483Z" fill="#009929"/>
                <path d="M84.8299 246.169C78.0937 246.169 71.5926 242.566 68.2245 236.222C63.3878 227.118 66.8929 215.841 76.0573 211.044C111.011 192.698 148.236 192.953 178.157 211.768C186.911 217.27 189.515 228.782 183.993 237.476C178.451 246.169 166.878 248.773 158.125 243.271C139.581 231.621 116.67 231.876 93.5831 243.995C90.7828 245.464 87.7868 246.149 84.8495 246.149L84.8299 246.169Z" fill="#009929"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#273c3f] mb-2">You're All Set!</h3>
            <p className="text-gray-600 leading-relaxed">
              Your free month has been activated for <span className="font-semibold text-[#273c3f]">{email}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Create your account on Aleen.fit to start your personalized fitness journey powered by AI.
            </p>
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-[#009929] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#007a20] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Go to Aleen.fit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev
}: {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
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
        {currentIndex + 1} / {images.length}
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
        className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt=""
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          style={{ imageRendering: 'auto' }}
          loading="eager"
          decoding="sync"
        />
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
          backgroundImage: `url('/imagehero.jpg')`,
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

const AppPromo = ({ onActivate }: { onActivate: () => void }) => {
  return (
    <section id="app-promo" className="bg-brand-dark relative overflow-hidden py-24 px-6 md:px-12 border-t border-brand-accent/10">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
        
        {/* Left Content */}
        <div className="md:col-span-7 text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent text-[10px] font-bold tracking-widest uppercase mb-8">
            <Zap className="w-3 h-3" />
            Exclusive Partnership
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-2">
            Your Workout & Your Diet, <br />
            <span className="text-brand-accent italic font-medium">Our Technology.</span>
          </h2>

          <div className="mt-8 mb-6">
            <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Gift for Guests
            </p>
            <h3 
              onClick={onActivate}
              className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-black leading-none cursor-pointer hover:from-brand-accent hover:to-brand-accent/60 transition-all"
            >
              1 FREE <br /> MONTH
            </h3>
          </div>

          <p className="text-gray-300 font-light max-w-md leading-relaxed mb-10">
            Aleen.fit is your AI-powered personal trainer and nutritionist. Get personalized workout plans and meal guidance tailored to your goals.
          </p>

          <button 
            onClick={onActivate}
            className="flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-dark rounded-full text-xs font-bold tracking-[0.15em] uppercase hover:bg-white transition-all shadow-lg hover:shadow-brand-accent/20 group"
          >
            Activate My Free Month
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Content: Phone UI */}
        <div className="md:col-span-5 flex justify-center md:justify-end relative z-10">
          <div className="relative w-[300px] h-[600px] bg-white rounded-[3rem] border-[8px] border-black shadow-2xl overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-all duration-700 ease-out hover:scale-105">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-36 bg-black rounded-b-2xl z-20"></div>
            
            {/* Screen Content */}
            <div className="h-full w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 flex flex-col relative pt-8">
              
              {/* Header with Aleen Logo */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center mb-3">
                  <svg width="100" height="30" viewBox="0 0 828 247" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4795 230.035C18.0945 230.035 12.7291 228.215 8.36229 224.553C-0.332086 217.27 -2.54487 204.896 3.13389 195.087L108.641 12.5502C112.832 5.30593 120.606 0.841858 129.007 0.841858C129.085 0.841858 129.163 0.841858 129.222 0.841858C137.701 0.920175 145.494 5.56045 149.568 12.9418L250.042 194.617C255.525 204.524 253.078 216.859 244.266 223.966C235.434 231.093 222.745 230.897 214.129 223.516C155.795 173.53 99.9861 173.902 38.4988 224.651C34.1321 228.254 28.8058 230.035 23.4795 230.035ZM128.713 52.6483L64.3666 163.975C85.2018 154.362 106.096 149.428 126.853 149.232C148.021 149.036 169.169 153.775 189.945 163.368L128.713 52.6679V52.6483Z" fill="#0f172a"/>
                    <path d="M84.8299 246.169C78.0937 246.169 71.5926 242.566 68.2245 236.222C63.3878 227.118 66.8929 215.841 76.0573 211.044C111.011 192.698 148.236 192.953 178.157 211.768C186.911 217.27 189.515 228.782 183.993 237.476C178.451 246.169 166.878 248.773 158.125 243.271C139.581 231.621 116.67 231.876 93.5831 243.995C90.7828 245.464 87.7868 246.149 84.8495 246.149L84.8299 246.169Z" fill="#0f172a"/>
                    <path d="M290.401 229.37C301.308 229.37 310.159 220.481 310.159 209.517V19.8533C310.159 8.88893 301.308 0 290.401 0C279.494 0 270.643 8.88893 270.643 19.8533V209.517C270.643 220.481 279.494 229.37 290.401 229.37Z" fill="#0f172a"/>
                    <path d="M467.48 81.9192C460.646 74.4791 452.343 68.6445 442.592 64.435C432.84 60.2059 421.521 58.1109 408.656 58.1109C393.382 58.1109 379.557 61.831 367.182 69.271C354.825 76.7111 345.074 86.8139 337.926 99.5795C330.779 112.345 327.215 126.971 327.215 143.456C327.215 159.942 330.74 173.804 337.77 186.883C344.799 199.962 354.649 210.3 367.319 217.936C379.988 225.571 394.772 229.389 411.652 229.389C422.912 229.389 433.212 227.686 442.552 224.26C451.893 220.833 460 216.115 466.834 210.084C467.03 209.908 467.226 209.732 467.422 209.556C476.84 201.039 474.451 185.61 463.055 180.011C456.201 176.643 448.016 177.974 442.513 183.261C440.281 185.415 437.774 187.314 435.033 188.978C428.708 192.796 421.012 194.715 411.965 194.715C402.919 194.715 394.929 192.6 387.997 188.391C381.065 184.161 375.837 178.19 372.312 170.456C371.353 168.361 370.569 166.188 369.943 163.936C368.67 159.413 372.038 154.93 376.718 154.93H479.308C483.772 154.93 487.65 151.621 488.1 147.177C488.1 147.137 488.1 147.118 488.1 147.079C488.394 144.063 488.55 141.146 488.55 138.327C488.55 127.284 486.749 116.966 483.126 107.431C479.503 97.8957 474.275 89.3984 467.441 81.9583L467.48 81.9192ZM386.666 96.8581C393.088 92.7464 400.432 90.671 408.676 90.671C416.92 90.671 424.713 92.7856 430.842 96.9951C436.972 101.224 441.397 106.941 444.119 114.186C444.256 114.558 444.393 114.949 444.53 115.341C446.077 119.961 442.592 124.739 437.735 124.739H378.696C373.683 124.739 370.099 119.668 372.018 115.028C372.018 114.988 372.038 114.969 372.058 114.93C375.367 107 380.243 100.97 386.685 96.8385L386.666 96.8581Z" fill="#0f172a"/>
                    <path d="M645.402 81.9192C638.568 74.4791 630.265 68.6445 620.514 64.435C610.762 60.2059 599.443 58.1109 586.578 58.1109C571.304 58.1109 557.479 61.831 545.104 69.271C532.747 76.7111 522.995 86.8139 515.848 99.5795C508.701 112.345 505.137 126.971 505.137 143.456C505.137 159.942 508.661 173.804 515.691 186.883C522.721 199.962 532.571 210.3 545.241 217.936C557.91 225.571 572.675 229.389 589.574 229.389C600.834 229.389 611.134 227.686 620.474 224.26C629.815 220.833 637.922 216.115 644.756 210.084C644.952 209.908 645.148 209.732 645.343 209.556C654.762 201.039 652.373 185.61 640.977 180.011C634.123 176.643 625.938 177.974 620.435 183.261C618.203 185.415 615.696 187.314 612.955 188.978C606.63 192.796 598.934 194.715 589.887 194.715C580.841 194.715 572.851 192.6 565.919 188.391C558.987 184.161 553.759 178.19 550.234 170.456C549.235 168.263 548.413 165.992 547.767 163.603C546.572 159.237 549.784 154.91 554.307 154.91H657.23C661.694 154.91 665.572 151.601 666.022 147.157C666.022 147.118 666.022 147.098 666.022 147.059C666.316 144.044 666.472 141.126 666.472 138.307C666.472 127.264 664.671 116.946 661.048 107.411C657.425 97.8761 652.197 89.3788 645.363 81.9388L645.402 81.9192ZM564.588 96.8581C571.01 92.7464 578.354 90.671 586.598 90.671C594.842 90.671 602.635 92.7856 608.764 96.9951C614.894 101.224 619.319 106.941 622.041 114.186C622.178 114.558 622.315 114.949 622.452 115.341C623.999 119.961 620.513 124.739 615.657 124.739H556.618C551.605 124.739 548.021 119.668 549.94 115.028C549.94 114.988 549.96 114.969 549.979 114.93C553.289 107 558.165 100.97 564.607 96.8385L564.588 96.8581Z" fill="#0f172a"/>
                    <path d="M703.287 167.089H700.878C690.636 167.089 682.334 175.39 682.334 185.63V210.828C682.334 221.068 690.636 229.37 700.878 229.37H703.287C713.528 229.37 721.831 221.068 721.831 210.828V185.63C721.831 175.39 713.528 167.089 703.287 167.089Z" fill="#0f172a"/>
                    <path d="M819.838 87.6558C814.61 78.3557 807.325 71.1115 797.985 65.9034C788.644 60.6954 777.933 58.1109 765.87 58.1109C753.808 58.1109 744.017 60.6562 735.264 65.7664C728.508 69.7018 723.241 75.0665 719.422 81.8017V80.1766C719.422 69.9759 711.119 61.7135 700.878 61.7135C690.637 61.7135 682.334 69.9759 682.334 80.1766V136.271C682.334 146.472 690.637 154.734 700.878 154.734H703.287C713.528 154.734 721.831 146.472 721.831 136.271V131.807C721.831 124.602 723.241 115.85 726.06 110.642C728.88 105.434 732.797 101.4 737.829 98.4831C742.842 95.5854 748.58 94.1365 755.022 94.1365C761.465 94.1365 767.437 95.5854 772.352 98.4831C777.267 101.381 781.144 105.434 783.964 110.642C786.784 115.85 788.194 122.037 788.194 129.242V210.946C788.194 221.146 796.497 229.409 806.738 229.409H809.146C819.388 229.409 827.691 221.146 827.691 210.946V119.942C827.691 107.744 825.067 96.9755 819.838 87.6754V87.6558Z" fill="#0f172a"/>
                  </svg>
                </div>
                <p className="text-[#009929] text-[10px] font-bold uppercase tracking-widest">AI Personal Trainer</p>
              </div>

              {/* Today's Plan */}
              <div className="bg-white backdrop-blur-sm rounded-2xl p-4 mb-4 border border-[#009929]/20 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[#273c3f] font-bold text-sm">Today's Workout</h4>
                  <span className="text-[#009929] text-xs font-semibold">45 min</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#009929]/10 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-[#009929]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#273c3f] text-xs font-medium">Upper Body Strength</p>
                      <p className="text-gray-500 text-[10px]">5 exercises</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meal Plan Card */}
              <div className="bg-white backdrop-blur-sm rounded-2xl p-4 mb-4 border border-[#273c3f]/20 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[#273c3f] font-bold text-sm">Meal Plan</h4>
                  <span className="text-[#273c3f] text-xs font-semibold">2,100 kcal</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#273c3f]/5 rounded-lg p-2">
                    <p className="text-[#273c3f] text-xs font-bold">180g</p>
                    <p className="text-gray-500 text-[9px]">Protein</p>
                  </div>
                  <div className="bg-[#273c3f]/5 rounded-lg p-2">
                    <p className="text-[#273c3f] text-xs font-bold">220g</p>
                    <p className="text-gray-500 text-[9px]">Carbs</p>
                  </div>
                  <div className="bg-[#273c3f]/5 rounded-lg p-2">
                    <p className="text-[#273c3f] text-xs font-bold">70g</p>
                    <p className="text-gray-500 text-[9px]">Fats</p>
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="bg-white backdrop-blur-sm rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2 font-semibold">Weekly Progress</p>
                <div className="flex items-end gap-1 h-16">
                  <div className="flex-1 bg-[#009929]/20 rounded-t" style={{height: '45%'}}></div>
                  <div className="flex-1 bg-[#009929]/30 rounded-t" style={{height: '60%'}}></div>
                  <div className="flex-1 bg-[#009929]/50 rounded-t" style={{height: '75%'}}></div>
                  <div className="flex-1 bg-[#009929] rounded-t shadow-lg shadow-[#009929]/50" style={{height: '90%'}}></div>
                  <div className="flex-1 bg-[#009929]/30 rounded-t" style={{height: '50%'}}></div>
                  <div className="flex-1 bg-[#009929]/20 rounded-t" style={{height: '30%'}}></div>
                  <div className="flex-1 bg-gray-100 rounded-t border-2 border-dashed border-gray-300" style={{height: '35%'}}></div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-2">
                <button 
                  onClick={onActivate}
                  className="w-full py-4 bg-[#009929] text-white rounded-xl font-bold text-sm hover:bg-[#007a20] transition-colors shadow-lg"
                >
                    Start Workout
                </button>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-400/40 rounded-full"></div>
            </div>
          </div>
          
          {/* Back Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[500px] bg-[#009929]/15 blur-[60px] -z-10"></div>
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
                  alt=""
                  className="product-image w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <button
                    onClick={() => onViewImage(index)}
                    className="flex items-center gap-2 py-3 px-6 bg-white text-brand-dark text-xs font-bold uppercase tracking-widest rounded shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-beige"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button className="bg-brand-dark text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-primary transition-colors shadow-2xl hover:shadow-brand-dark/40 hover:-translate-y-1 transform duration-300">
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
            <button onClick={() => document.getElementById('app-promo')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Aleen.fit</button>
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

  const allImages = PRODUCTS.map(p => p.image);

  const handleViewImage = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <main className="w-full min-h-screen bg-brand-beige selection:bg-brand-accent selection:text-brand-dark">
      <ActivationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        currentIndex={currentImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
      <Navbar />
      <Hero />
      <AppPromo onActivate={() => setModalOpen(true)} />
      <ProductGrid onViewImage={handleViewImage} />
      <Footer />
    </main>
  );
}