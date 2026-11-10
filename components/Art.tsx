// Original flat illustrations used as scene backgrounds until you add your own photos.
export type ArtVariant = "sky" | "dawn" | "road" | "street" | "wild" | "wedding";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const ridge = (pts: number[][]) => `M0 900 L${pts.map(([x, y]) => `${x} ${y}`).join(" L")} L1600 900 Z`;

function Mountains({ far, mid, near, snow }: { far: string; mid: string; near: string; snow: string }) {
  const farPts = [[0, 640], [180, 540], [300, 590], [470, 430], [640, 570], [800, 480], [980, 600], [1160, 440], [1340, 580], [1500, 510], [1600, 560]];
  return (
    <g>
      <path d={ridge(farPts)} fill={far} />
      {[[470, 430], [1160, 440], [800, 480], [180, 540]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} L${x - 46} ${y + 62} L${x - 18} ${y + 50} L${x} ${y + 76} L${x + 20} ${y + 48} L${x + 50} ${y + 66} Z`} fill={snow} opacity="0.9" />
      ))}
      <path d={ridge([[0, 720], [220, 610], [420, 690], [640, 600], [860, 700], [1100, 620], [1320, 710], [1600, 630]])} fill={mid} />
      <path d={ridge([[0, 810], [300, 750], [620, 820], [960, 740], [1280, 810], [1600, 760]])} fill={near} />
    </g>
  );
}

function Flags() {
  const colors = ["#2f5fd0", "#f4f1ea", "#d9342b", "#2e8b57", "#f2c230"];
  return (
    <g>
      <path d="M60 110 Q 400 250 760 170" stroke="#f4f1ea" strokeWidth="2" fill="none" opacity="0.8" />
      {range(15).map((i) => {
        const t = (i + 0.5) / 15;
        const x = (1 - t) * (1 - t) * 60 + 2 * (1 - t) * t * 400 + t * t * 760;
        const y = (1 - t) * (1 - t) * 110 + 2 * (1 - t) * t * 250 + t * t * 170;
        return <rect key={i} x={x - 11} y={y} width="22" height="30" fill={colors[i % 5]} transform={`rotate(${-6 + t * 14} ${x} ${y})`} />;
      })}
    </g>
  );
}

export default function Art({ variant }: { variant: ArtVariant }) {
  const common = { viewBox: "0 0 1600 900", preserveAspectRatio: "xMidYMid slice", "aria-hidden": true, focusable: false } as const;

  if (variant === "sky" || variant === "dawn") {
    const dawn = variant === "dawn";
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={dawn ? "#ffbf9b" : "#1747b8"} />
            <stop offset="1" stopColor={dawn ? "#fff1e0" : "#6aa0f5"} />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill={`url(#g-${variant})`} />
        {dawn && <circle cx="1100" cy="400" r="120" fill="#fff6d8" />}
        <g fill={dawn ? "#ffe3d0" : "#ffffff"} opacity="0.9">
          {[[1180, 200, 1], [1260, 188, 1.2], [1350, 206, 0.9], [300, 330, 1], [380, 322, 1.3], [470, 336, 0.9]].map(([x, y, s], i) => (
            <ellipse key={i} cx={x} cy={y} rx={70 * s} ry={26 * s} />
          ))}
        </g>
        <Mountains far={dawn ? "#f3b99a" : "#b9d0f8"} mid={dawn ? "#d98f7c" : "#6f93dc"} near={dawn ? "#7d4f6b" : "#1b3d94"} snow={dawn ? "#fff6ee" : "#ffffff"} />
        {!dawn && <Flags />}
      </svg>
    );
  }

  if (variant === "road") {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="g-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f4c5c" />
            <stop offset="1" stopColor="#f08a4b" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#g-road)" />
        <circle cx="800" cy="520" r="130" fill="#ffd28a" />
        <path d="M0 520 L160 470 L330 515 L520 450 L700 520 L900 480 L1100 525 L1300 460 L1470 520 L1600 490 V900 H0 Z" fill="#0b2a35" />
        <rect y="520" width="1600" height="380" fill="#161214" />
        <path d="M760 520 L840 520 L1480 900 L120 900 Z" fill="#2a2126" />
        {range(8).map((i) => {
          const t = i / 8, t2 = (i + 0.55) / 8;
          const y1 = 520 + t * t * 380, y2 = 520 + t2 * t2 * 380;
          const w1 = 3 + t * t * 26, w2 = 3 + t2 * t2 * 26;
          return <path key={i} d={`M${800 - w1} ${y1} L${800 + w1} ${y1} L${800 + w2} ${y2} L${800 - w2} ${y2} Z`} fill="#f2c14e" />;
        })}
      </svg>
    );
  }

  if (variant === "street") {
    const b = [[0, 150, 360], [150, 120, 470], [270, 170, 300], [440, 140, 420], [580, 190, 340], [770, 130, 500], [900, 160, 380], [1060, 150, 450], [1210, 180, 330], [1390, 210, 410]];
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="g-street" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1b3d" />
            <stop offset="1" stopColor="#e8743b" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#g-street)" />
        <circle cx="1000" cy="560" r="130" fill="#ffc37a" />
        {b.map(([x, w, h], i) => (
          <g key={i}>
            <rect x={x} y={820 - h} width={w} height={h} fill={i % 2 ? "#1d1424" : "#271a2d"} />
            {range(Math.floor(h / 46)).flatMap((r) => range(Math.floor(w / 40)).map((c) => ((i * 7 + r * 13 + c * 5) % 5 < 2 ? <rect key={`${r}-${c}`} x={x + 14 + c * 40} y={820 - h + 16 + r * 46} width="16" height="22" fill="#ffd27a" opacity="0.9" /> : null)))}
          </g>
        ))}
        <rect y="820" width="1600" height="80" fill="#120c14" />
        {[250, 760, 1330].map((x) => <rect key={x} x={x} y="430" width="8" height="400" fill="#120c14" />)}
        <path d="M-20 470 Q 120 520 254 440 T 764 440 T 1334 440 T 1620 480" stroke="#120c14" strokeWidth="3" fill="none" />
        <path d="M-20 500 Q 120 550 254 470 T 764 470 T 1334 470 T 1620 510" stroke="#120c14" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  if (variant === "wild") {
    const trunks = [[120, 70], [330, 90], [560, 60], [760, 80], [980, 66], [1320, 92], [1500, 70]];
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="g-wild" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b2a1d" />
            <stop offset="1" stopColor="#8fbf7a" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#g-wild)" />
        <circle cx="1150" cy="260" r="200" fill="#fff2b0" opacity="0.18" />
        <circle cx="1150" cy="260" r="90" fill="#fff2b0" />
        {trunks.map(([x, w], i) => (
          <g key={i}>
            <rect x={x} y="120" width={w * 0.28} height="780" fill={i % 2 ? "#0f2b1d" : "#143822"} />
            <ellipse cx={x + w * 0.14} cy={150 + (i % 3) * 30} rx={w * 2} ry="120" fill={i % 2 ? "#1f4d2f" : "#2d6a3a"} opacity="0.92" />
          </g>
        ))}
        <ellipse cx="800" cy="720" rx="900" ry="90" fill="#ffffff" opacity="0.14" />
        {range(41).map((i) => <path key={i} d={`M${i * 40} 900 L${i * 40 + 10} ${700 + ((i * 37) % 120)} L${i * 40 + 22} 900 Z`} fill="#0d2417" />)}
      </svg>
    );
  }

  // wedding
  return (
    <svg {...common}>
      <defs>
        <linearGradient id="g-wedding" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a0a18" />
          <stop offset="1" stopColor="#b3261e" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#g-wedding)" />
      <g fill="none" stroke="#f2c14e">
        {range(8).map((i) => <circle key={i} cx="800" cy="490" r={50 + i * 42} strokeWidth={i % 2 ? 1.5 : 3} strokeDasharray={i % 2 ? "4 10" : undefined} opacity={0.75 - i * 0.05} />)}
        {range(24).map((i) => <ellipse key={i} cx="800" cy="290" rx="16" ry="62" transform={`rotate(${i * 15} 800 490)`} opacity="0.5" />)}
      </g>
      {[0, 1].map((row) => range(26).map((i) => {
        const t = i / 25, y0 = 40 + row * 46, cy = 260 + row * 40;
        const x = t * 1600, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y0;
        return <circle key={`${row}-${i}`} cx={x} cy={y} r="17" fill={(i + row) % 2 ? "#ff9f1c" : "#f5b700"} />;
      }))}
    </svg>
  );
}
