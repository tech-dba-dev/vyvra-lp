import React, { useEffect, useState } from 'react';

const VYVRA_LOGO_PATH = "M0 0.0666707C19.16 0.133337 38.3333 0.0666691 57.5067 0.106669C86.16 80.52 114.813 160.947 143.467 241.36C160.32 288.053 174.827 335.547 188.973 383.107C189.787 381.773 190.253 380.28 190.653 378.787C206.093 324.387 223.853 270.667 242.613 217.333C267.76 144.92 292.907 72.5067 318.053 0.093338C339.853 0.0266713 361.653 0.14667 383.467 0.0400035C409.76 42.5733 435.773 85.2933 461.96 127.88C477.853 153.747 493.8 179.787 505.547 207.867C518.52 177.053 536.133 148.507 553.573 120.08C578.053 80.08 602.44 40.0133 626.987 0.0533346C648.427 0.173335 669.88 0.0133341 691.32 0.146667C711.2 56.0933 731.08 112.027 750.96 167.973C768.347 217.48 786.76 266.64 802.307 316.773C809.333 339.04 816.04 361.413 822.627 383.827C846.253 340.227 870 296.693 893.667 253.107C871.04 245.04 850.187 230.76 836.467 210.813C821.96 189.72 815.293 164.013 814.547 138.627C813.56 110.88 819.027 82.3467 833.48 58.36C847.293 35.3467 870.12 18.5733 895.267 9.77334C918.28 1.70667 942.907 -0.226662 967.133 0.093338C1013.72 0.093338 1060.31 0.093338 1106.89 0.093338C1106.87 71.4 1107 142.707 1106.83 214C1130.19 214.453 1153.6 214.067 1176.97 214.187C1202.97 142.827 1228.48 71.28 1254.71 0C1275.71 0.213333 1296.71 0.0400047 1317.69 0.093338C1370.2 143.213 1422.67 286.333 1475.15 429.453C1455.99 429.467 1436.84 429.467 1417.69 429.453C1397.96 373.973 1378.04 318.573 1358.47 263.04C1310.57 262.72 1262.67 262.96 1214.76 262.933C1195.63 318.4 1176.27 373.8 1157.24 429.32C1122.27 429.653 1087.28 429.36 1052.31 429.467C1052.32 373.947 1052.32 318.427 1052.31 262.907C1018.25 262.813 984.2 263.067 950.147 262.773C920.347 318.32 890.787 374.027 860.84 429.507C837.667 429.373 814.493 429.547 791.307 429.4C745.72 305.16 700.147 180.92 654.6 56.6533C613.933 122.147 572.92 187.453 532.48 253.067C532.293 311.427 532.453 369.787 532.4 428.133C514.2 428.173 496.013 428.133 477.813 428.147C477.773 369.867 477.893 311.587 477.76 253.307C468.587 237.413 458.373 222.053 448.827 206.347C417.707 156.413 386.653 106.453 355.493 56.5467C310.56 180.453 265.427 304.28 220.373 428.147C199.533 428.12 178.68 428.227 157.84 428.093L157.307 427.653C104.827 285.147 52.4933 142.573 0 0.0666707ZM1274.95 81.4933C1261.75 126.133 1247.05 170.32 1231.64 214.253C1268.09 214.093 1304.55 214.293 1341.01 214.147C1320.23 158.293 1302.56 101.36 1285.96 44.1467C1282.04 56.52 1278.73 69.08 1274.95 81.4933ZM892.547 69.44C874.92 84.96 868.707 109.48 868.747 132.187C868.533 154.493 874.653 178.72 892.187 193.787C910.053 209.44 934.667 213.667 957.693 214.133C989.227 214.253 1020.76 214.187 1052.29 214.173C1052.35 158.853 1052.31 103.533 1052.31 48.2133C1020.8 48.2667 989.293 48.1333 957.773 48.2933C934.733 48.7733 910.173 53.5067 892.547 69.44ZM1106.95 262.907C1106.83 308.653 1106.96 354.4 1106.88 400.147C1107.01 402.107 1106.4 404.333 1107.59 406.08C1124.77 358.333 1142.09 310.627 1159.39 262.92C1141.91 262.867 1124.43 262.907 1106.95 262.907Z";

// Circle checkout URL — replace with your actual Circle trial plan checkout link
const CIRCLE_CHECKOUT_URL = "https://community.vyvra.com/checkout/premium-trial";

const BENEFITS = [
  "Full Premium access",
  "Exclusive content",
  "Member-only perks",
  "Early access to drops",
];

export default function MembershipPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleActivate = () => {
    // Fire GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'Towel_Activation', {
        event_category: 'Membership',
        event_label: 'towel_qr_activation',
      });
    }

    // Fire Meta Pixel event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Towel_Activation', {
        content_name: 'towel_qr_premium_trial',
      });
    }

    window.location.href = CIRCLE_CHECKOUT_URL;
  };

  return (
    <main className="relative min-h-screen bg-brand-dark flex items-center justify-center overflow-hidden selection:bg-brand-accent selection:text-brand-dark">
      {/* Background blur orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12 md:py-16 flex flex-col items-center">

        {/* Logo */}
        <div
          className="mb-10 md:mb-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0ms',
          }}
        >
          <svg className="h-6 md:h-8" viewBox="0 0 1476 430" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={VYVRA_LOGO_PATH} fill="#EADEDA" />
          </svg>
        </div>

        {/* Title */}
        <h1
          className="font-serif text-2xl md:text-4xl font-bold text-brand-beige text-center tracking-tight mb-4 md:mb-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '150ms',
          }}
        >
          You've unlocked 1 month of Premium access.
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-sm md:text-base font-light text-brand-beige/80 text-center leading-relaxed max-w-sm mb-8 md:mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '300ms',
          }}
        >
          As part of our first 300 customers, you get full access to our private community, free for 30 days.
        </p>

        {/* Benefits */}
        <ul
          className="w-full space-y-3 mb-8 md:mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '450ms',
          }}
        >
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3">
              <span className="text-brand-accent text-sm">&#10022;</span>
              <span className="font-sans text-sm md:text-base text-brand-beige font-normal">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div
          className="w-full transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '600ms',
          }}
        >
          <button
            onClick={handleActivate}
            aria-label="Activate your free month of Premium access"
            className="w-full py-4 px-8 bg-brand-accent text-brand-dark rounded-full text-sm md:text-base font-semibold uppercase tracking-widest hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Activate My Free Month
          </button>
        </div>

        {/* Legal text */}
        <p
          className="mt-6 text-[11px] md:text-xs font-light text-brand-accent/50 text-center leading-relaxed max-w-xs transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '750ms',
          }}
        >
          Valid for selected customers only. Free for 30 days. Cancel anytime. After 30 days, renews at standard rate.
        </p>
      </div>
    </main>
  );
}
