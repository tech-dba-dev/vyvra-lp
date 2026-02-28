import React, { useState } from 'react';

const VYVRA_LOGO_PATH = "M0 0.0666707C19.16 0.133337 38.3333 0.0666691 57.5067 0.106669C86.16 80.52 114.813 160.947 143.467 241.36C160.32 288.053 174.827 335.547 188.973 383.107C189.787 381.773 190.253 380.28 190.653 378.787C206.093 324.387 223.853 270.667 242.613 217.333C267.76 144.92 292.907 72.5067 318.053 0.093338C339.853 0.0266713 361.653 0.14667 383.467 0.0400035C409.76 42.5733 435.773 85.2933 461.96 127.88C477.853 153.747 493.8 179.787 505.547 207.867C518.52 177.053 536.133 148.507 553.573 120.08C578.053 80.08 602.44 40.0133 626.987 0.0533346C648.427 0.173335 669.88 0.0133341 691.32 0.146667C711.2 56.0933 731.08 112.027 750.96 167.973C768.347 217.48 786.76 266.64 802.307 316.773C809.333 339.04 816.04 361.413 822.627 383.827C846.253 340.227 870 296.693 893.667 253.107C871.04 245.04 850.187 230.76 836.467 210.813C821.96 189.72 815.293 164.013 814.547 138.627C813.56 110.88 819.027 82.3467 833.48 58.36C847.293 35.3467 870.12 18.5733 895.267 9.77334C918.28 1.70667 942.907 -0.226662 967.133 0.093338C1013.72 0.093338 1060.31 0.093338 1106.89 0.093338C1106.87 71.4 1107 142.707 1106.83 214C1130.19 214.453 1153.6 214.067 1176.97 214.187C1202.97 142.827 1228.48 71.28 1254.71 0C1275.71 0.213333 1296.71 0.0400047 1317.69 0.093338C1370.2 143.213 1422.67 286.333 1475.15 429.453C1455.99 429.467 1436.84 429.467 1417.69 429.453C1397.96 373.973 1378.04 318.573 1358.47 263.04C1310.57 262.72 1262.67 262.96 1214.76 262.933C1195.63 318.4 1176.27 373.8 1157.24 429.32C1122.27 429.653 1087.28 429.36 1052.31 429.467C1052.32 373.947 1052.32 318.427 1052.31 262.907C1018.25 262.813 984.2 263.067 950.147 262.773C920.347 318.32 890.787 374.027 860.84 429.507C837.667 429.373 814.493 429.547 791.307 429.4C745.72 305.16 700.147 180.92 654.6 56.6533C613.933 122.147 572.92 187.453 532.48 253.067C532.293 311.427 532.453 369.787 532.4 428.133C514.2 428.173 496.013 428.133 477.813 428.147C477.773 369.867 477.893 311.587 477.76 253.307C468.587 237.413 458.373 222.053 448.827 206.347C417.707 156.413 386.653 106.453 355.493 56.5467C310.56 180.453 265.427 304.28 220.373 428.147C199.533 428.12 178.68 428.227 157.84 428.093L157.307 427.653C104.827 285.147 52.4933 142.573 0 0.0666707ZM1274.95 81.4933C1261.75 126.133 1247.05 170.32 1231.64 214.253C1268.09 214.093 1304.55 214.293 1341.01 214.147C1320.23 158.293 1302.56 101.36 1285.96 44.1467C1282.04 56.52 1278.73 69.08 1274.95 81.4933ZM892.547 69.44C874.92 84.96 868.707 109.48 868.747 132.187C868.533 154.493 874.653 178.72 892.187 193.787C910.053 209.44 934.667 213.667 957.693 214.133C989.227 214.253 1020.76 214.187 1052.29 214.173C1052.35 158.853 1052.31 103.533 1052.31 48.2133C1020.8 48.2667 989.293 48.1333 957.773 48.2933C934.733 48.7733 910.173 53.5067 892.547 69.44ZM1106.95 262.907C1106.83 308.653 1106.96 354.4 1106.88 400.147C1107.01 402.107 1106.4 404.333 1107.59 406.08C1124.77 358.333 1142.09 310.627 1159.39 262.92C1141.91 262.867 1124.43 262.907 1106.95 262.907Z";

// Tracking steps
const STEPS = [
  { id: 1, label: 'Order Confirmed', icon: '✓' },
  { id: 2, label: 'Preparing', icon: '◎' },
  { id: 3, label: 'Shipped', icon: '▸' },
  { id: 4, label: 'In Transit', icon: '◈' },
  { id: 5, label: 'Out for Delivery', icon: '◉' },
  { id: 6, label: 'Delivered', icon: '★' },
];

// Mock orders database — will be replaced by API
const MOCK_ORDERS: Record<string, {
  code: string;
  customerName: string;
  currentStep: number;
  estimatedDelivery: string;
  lastUpdate: string;
  items: string[];
}> = {
  'VYVRA-001': {
    code: 'VYVRA-001',
    customerName: 'Customer',
    currentStep: 3,
    estimatedDelivery: 'March 5, 2026',
    lastUpdate: 'Feb 27, 2026 — 14:32',
    items: ['Elevate V-Legging (M)', 'Pulse Bra (S)'],
  },
  'VYVRA-002': {
    code: 'VYVRA-002',
    customerName: 'Customer',
    currentStep: 5,
    estimatedDelivery: 'Feb 28, 2026',
    lastUpdate: 'Feb 28, 2026 — 09:15',
    items: ['Flow Dress (L)'],
  },
};

// Colors — vyvra.com palette
const C = {
  sage: '#6B7B6E',
  sageDark: '#4A5A4D',
  sageLight: '#8A9A8D',
  earth: '#8B7355',
  earthLight: '#A89279',
  bg: '#F7F5F2',
  bgCard: '#FFFFFF',
  text: '#2D2D2D',
  textMuted: '#7A7A7A',
  border: '#E8E4DF',
};

function TrackingInput({ onSubmit }: { onSubmit: (code: string) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError('Please enter a tracking code.');
      return;
    }
    setError('');
    onSubmit(trimmed);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <header className="w-full py-6 flex justify-center" style={{ borderBottom: `1px solid ${C.border}` }}>
        <svg className="h-8 md:h-10" viewBox="0 0 1476 430" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={VYVRA_LOGO_PATH} fill={C.sageDark} />
        </svg>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1
            className="text-2xl md:text-3xl font-semibold tracking-tight mb-2"
            style={{ color: C.text, fontFamily: "'Cinzel', serif" }}
          >
            Track Your Order
          </h1>
          <p className="text-sm md:text-base mb-8" style={{ color: C.textMuted }}>
            Enter your tracking code to see the delivery status.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(''); }}
              placeholder="e.g. VYVRA-001"
              className="w-full py-3.5 px-5 rounded-lg text-sm md:text-base outline-none transition-all duration-200"
              style={{
                background: C.bgCard,
                border: `1.5px solid ${error ? '#c0392b' : C.border}`,
                color: C.text,
              }}
              onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = C.sage; }}
              onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = C.border; }}
            />
            {error && (
              <p className="text-xs text-left" style={{ color: '#c0392b' }}>{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg text-sm md:text-base font-semibold uppercase tracking-widest transition-all duration-200 hover:opacity-90"
              style={{ background: C.sage, color: '#fff' }}
            >
              Track
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function TrackingResult({ order, onBack }: {
  order: typeof MOCK_ORDERS[string];
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <header className="w-full py-6 flex justify-center" style={{ borderBottom: `1px solid ${C.border}` }}>
        <svg className="h-8 md:h-10" viewBox="0 0 1476 430" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={VYVRA_LOGO_PATH} fill={C.sageDark} />
        </svg>
      </header>

      <div className="flex-1 flex justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-lg">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm mb-6 transition-opacity hover:opacity-70"
            style={{ color: C.textMuted }}
          >
            ← Track another order
          </button>

          {/* Order card */}
          <div
            className="rounded-xl p-6 md:p-8 mb-6"
            style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
          >
            {/* Order info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: C.textMuted }}>
                  Tracking Code
                </p>
                <p className="text-lg font-semibold tracking-wide" style={{ color: C.text }}>
                  {order.code}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: C.textMuted }}>
                  Estimated Delivery
                </p>
                <p className="text-sm font-medium" style={{ color: C.earth }}>
                  {order.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: C.border }} />

            {/* Steps timeline */}
            <div className="relative">
              {STEPS.map((step, i) => {
                const isCompleted = step.id <= order.currentStep;
                const isCurrent = step.id === order.currentStep;
                const isLast = i === STEPS.length - 1;

                return (
                  <div key={step.id} className="flex items-start gap-4 relative">
                    {/* Circle + line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isCompleted ? C.sage : C.bg,
                          color: isCompleted ? '#fff' : C.textMuted,
                          border: isCompleted ? 'none' : `2px solid ${C.border}`,
                          boxShadow: isCurrent ? `0 0 0 4px ${C.sage}25` : 'none',
                        }}
                      >
                        {isCompleted ? '✓' : step.id}
                      </div>
                      {!isLast && (
                        <div
                          className="w-0.5 flex-1 min-h-[32px]"
                          style={{
                            background: step.id < order.currentStep ? C.sage : C.border,
                          }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <div className={`pt-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
                      <p
                        className="text-sm font-medium"
                        style={{
                          color: isCompleted ? C.text : C.textMuted,
                        }}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-xs mt-0.5" style={{ color: C.sage }}>
                          Last update: {order.lastUpdate}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items card */}
          <div
            className="rounded-xl p-6"
            style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
          >
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.textMuted }}>
              Items in this order
            </p>
            <ul className="space-y-2">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm" style={{ color: C.text }}>
                  <span style={{ color: C.sage }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function NotFound({ code, onBack }: { code: string; onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <header className="w-full py-6 flex justify-center" style={{ borderBottom: `1px solid ${C.border}` }}>
        <svg className="h-8 md:h-10" viewBox="0 0 1476 430" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={VYVRA_LOGO_PATH} fill={C.sageDark} />
        </svg>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
            style={{ background: `${C.earth}15`, color: C.earth }}
          >
            ?
          </div>
          <h2
            className="text-xl md:text-2xl font-semibold mb-2"
            style={{ color: C.text, fontFamily: "'Cinzel', serif" }}
          >
            Order Not Found
          </h2>
          <p className="text-sm mb-2" style={{ color: C.textMuted }}>
            We couldn't find an order with the code:
          </p>
          <p className="text-base font-semibold mb-6" style={{ color: C.text }}>
            {code}
          </p>
          <p className="text-xs mb-8" style={{ color: C.textMuted }}>
            Please check the code and try again. If the issue persists, contact us at support@vyvra.com
          </p>
          <button
            onClick={onBack}
            className="py-3 px-8 rounded-lg text-sm font-semibold uppercase tracking-widest transition-all duration-200 hover:opacity-90"
            style={{ background: C.sage, color: '#fff' }}
          >
            Try Again
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-6 text-center">
      <p
        className="text-[11px] uppercase tracking-[0.2em]"
        style={{ color: C.textMuted }}
      >
        Movement. Consistency. Community.
      </p>
    </footer>
  );
}

type View =
  | { type: 'input' }
  | { type: 'result'; order: typeof MOCK_ORDERS[string] }
  | { type: 'not-found'; code: string };

export default function TrackingPage() {
  const [view, setView] = useState<View>({ type: 'input' });

  const handleSubmit = (code: string) => {
    const order = MOCK_ORDERS[code];
    if (order) {
      setView({ type: 'result', order });
    } else {
      setView({ type: 'not-found', code });
    }
  };

  const handleBack = () => setView({ type: 'input' });

  switch (view.type) {
    case 'input':
      return <TrackingInput onSubmit={handleSubmit} />;
    case 'result':
      return <TrackingResult order={view.order} onBack={handleBack} />;
    case 'not-found':
      return <NotFound code={view.code} onBack={handleBack} />;
  }
}
