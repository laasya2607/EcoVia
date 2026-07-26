import {
  useState,
  useEffect,
  useRef,
  type CSSProperties,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}


// ─── Static leaf data (no Math.random in render) ─────────────────────────────

const HERO_LEAVES: Array<{
  top: string;
  left: string;
  delay: string;
  dur: string;
  size: number;
  rotate: number;
}> = [
  {
    top: "8%",
    left: "4%",
    delay: "0s",
    dur: "7s",
    size: 20,
    rotate: 20,
  },
  {
    top: "18%",
    left: "92%",
    delay: "1.2s",
    dur: "9s",
    size: 15,
    rotate: -15,
  },
  {
    top: "45%",
    left: "96%",
    delay: "2.5s",
    dur: "8s",
    size: 18,
    rotate: 30,
  },
  {
    top: "72%",
    left: "2%",
    delay: "0.8s",
    dur: "10s",
    size: 14,
    rotate: -25,
  },
  {
    top: "85%",
    left: "88%",
    delay: "3.2s",
    dur: "7.5s",
    size: 16,
    rotate: 10,
  },
  {
    top: "35%",
    left: "1%",
    delay: "1.8s",
    dur: "11s",
    size: 12,
    rotate: 45,
  },
  {
    top: "60%",
    left: "95%",
    delay: "4s",
    dur: "8.5s",
    size: 19,
    rotate: -35,
  },
  {
    top: "90%",
    left: "50%",
    delay: "2s",
    dur: "9.5s",
    size: 13,
    rotate: 60,
  },
];

// ─── Leaf component ───────────────────────────────────────────────────────────

function FloatingLeaf({
  top,
  left,
  delay,
  dur,
  size,
  rotate,
}: (typeof HERO_LEAVES)[0]) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        pointerEvents: "none",
        zIndex: 0,
        animation: `floatLeaf ${dur} ${delay} ease-in-out infinite`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="rgba(105,240,174,0.35)"
      >
        <path d="M17 8C8 10 5.9 16.17 3.82 20.15L5.71 21l1-2.3A4.49 4.49 0 0 0 8 19c9-2 12-9.5 12-16a43.58 43.58 0 0 1-3 5z" />
      </svg>
    </div>
  );
}

// ─── Glow orb component ───────────────────────────────────────────────────────

function GlowOrb({
  style,
  color = "0,200,83",
}: {
  style: CSSProperties;
  color?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
        background: `radial-gradient(circle, rgba(${color},0.18) 0%, transparent 70%)`,
        animation: `floatOrb 16s ease-in-out infinite`,
        ...style,
      }}
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        animation: "navReveal 0.6s ease forwards",
        background: scrolled
          ? "rgba(7,26,9,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #00e676, #2e7d32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(0,230,118,0.35)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "white",
              letterSpacing: "-0.3px",
            }}
          >
            EcoVia
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          {["Home", "About", "Features", "Contact"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  letterSpacing: "0.1px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#69f0ae")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    "rgba(255,255,255,0.75)")
                }
              >
                {link}
              </a>
            ),
          )}
        </nav>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
          className="hidden-mobile"
        >
          <button
  onClick={() => navigate("/login")}
  style={{
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    padding: "8px 20px",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 50,
    transition: "all 0.2s",
    background: "transparent",
    cursor: "pointer",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = "#69f0ae";
    e.currentTarget.style.color = "#69f0ae";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor =
      "rgba(255,255,255,0.2)";
    e.currentTarget.style.color =
      "rgba(255,255,255,0.8)";
  }}
>
  Login
</button>
        <button
  onClick={() => navigate("/register")}
  className="btn-primary"
  style={{
    color: "#071a09",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    padding: "9px 22px",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: "none",
    cursor: "pointer",
  }}
>
  Sign Up →
</button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: 4,
          }}
          className="show-mobile"
        >
          {open ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          style={{
            background: "rgba(7,26,9,0.96)",
            padding: "16px 24px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {["Home", "About", "Features", "Contact"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link}
              </a>
            ),
          )}
          <a
            href="#"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 16,
              color: "#071a09",
              fontSize: 14,
              fontWeight: 700,
              padding: "12px 0",
              borderRadius: 50,
              textDecoration: "none",
              background:
                "linear-gradient(135deg, #00e676, #2e7d32)",
            }}
          >
            Sign Up
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Eco City SVG ─────────────────────────────────────────────────────────────

function EcoCityScene() {
  return (
    <svg
      viewBox="0 0 600 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      aria-label="Animated eco city with roads, buildings, trees, mountains and eco-friendly vehicles"
    >
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B3E5FC" />
          <stop offset="45%" stopColor="#C8E6C9" />
          <stop offset="100%" stopColor="#DCEDC8" />
        </linearGradient>
        <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor="#FFF176"
            stopOpacity="0.9"
          />
          <stop
            offset="60%"
            stopColor="#FFE082"
            stopOpacity="0.4"
          />
          <stop
            offset="100%"
            stopColor="#FFE082"
            stopOpacity="0"
          />
        </radialGradient>
        <pattern
          id="winPat"
          width="11"
          height="15"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="1"
            y="1"
            width="4"
            height="6"
            rx="0.5"
            fill="#B3E5FC"
            opacity="0.85"
          />
          <rect
            x="6"
            y="1"
            width="4"
            height="6"
            rx="0.5"
            fill="#263238"
            opacity="0.35"
          />
          <rect
            x="1"
            y="9"
            width="4"
            height="6"
            rx="0.5"
            fill="#263238"
            opacity="0.3"
          />
          <rect
            x="6"
            y="9"
            width="4"
            height="6"
            rx="0.5"
            fill="#B3E5FC"
            opacity="0.9"
          />
        </pattern>
        <filter id="routeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="600" height="460" fill="url(#skyG)" />

      {/* Sun glow + core */}
      <circle cx="508" cy="68" r="72" fill="url(#sunG)" />
      <circle cx="508" cy="68" r="32" fill="#FFD54F">
        <animate
          attributeName="r"
          values="30;34;30"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="508"
        cy="68"
        r="46"
        fill="none"
        stroke="#FFF9C4"
        strokeWidth="1"
        opacity="0.4"
      >
        <animate
          attributeName="r"
          values="40;55;40"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.1;0.4"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Clouds — group 1 drifting left */}
      <g opacity="0.9">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="-220 0"
          dur="32s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="100"
          cy="76"
          rx="52"
          ry="18"
          fill="white"
        />
        <ellipse
          cx="128"
          cy="62"
          rx="36"
          ry="22"
          fill="white"
        />
        <ellipse cx="82" cy="68" rx="28" ry="16" fill="white" />
        <ellipse
          cx="330"
          cy="50"
          rx="46"
          ry="16"
          fill="white"
          opacity="0.85"
        />
        <ellipse
          cx="354"
          cy="38"
          rx="32"
          ry="20"
          fill="white"
          opacity="0.85"
        />
        <ellipse
          cx="314"
          cy="44"
          rx="24"
          ry="14"
          fill="white"
          opacity="0.85"
        />
      </g>
      {/* Clouds — group 2 offset */}
      <g opacity="0.75">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="220 0"
          to="0 0"
          dur="40s"
          repeatCount="indefinite"
        />
        <ellipse
          cx="200"
          cy="88"
          rx="40"
          ry="14"
          fill="white"
        />
        <ellipse
          cx="222"
          cy="76"
          rx="28"
          ry="18"
          fill="white"
        />
        <ellipse
          cx="182"
          cy="82"
          rx="22"
          ry="12"
          fill="white"
        />
      </g>

      {/* Far mountains — sage teal */}
      <path
        d="M0,228 Q80,172 160,198 Q240,162 320,186 Q400,152 480,174 Q540,160 600,166 L600,460 L0,460 Z"
        fill="#7CB8A0"
      />
      {/* Mid mountains — green */}
      <path
        d="M0,278 Q62,238 132,260 Q202,228 272,254 Q342,220 412,246 Q478,222 560,240 L600,248 L600,460 L0,460 Z"
        fill="#4CAF50"
      />
      {/* Near hills — bright green */}
      <path
        d="M0,324 Q72,292 152,314 Q232,290 312,312 Q392,286 472,308 Q532,296 600,304 L600,460 L0,460 Z"
        fill="#43A047"
      />

      {/* River */}
      <path
        d="M240,208 C234,238 228,266 224,292 C220,318 218,344 215,370 C212,395 210,428 208,460"
        stroke="#4FC3F7"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M240,208 C234,238 228,266 224,292 C220,318 218,344 215,370 C212,395 210,428 208,460"
        stroke="#81D4FA"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      >
        <animate
          attributeName="strokeDashoffset"
          values="0;-30;0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M240,208 C234,238 228,266 224,292 C220,318 218,344 215,370 C212,395 210,428 208,460"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
        strokeDasharray="12 20"
      >
        <animate
          attributeName="strokeDashoffset"
          values="0;-32"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Background trees (far) */}
      {(
        [
          [42, 318, 12, 18, "#1B5E20", "#2E7D32"],
          [88, 308, 14, 20, "#1B5E20", "#388E3C"],
          [148, 302, 12, 17, "#2E7D32", "#43A047"],
          [184, 315, 11, 15, "#1B5E20", "#2E7D32"],
          [490, 310, 13, 18, "#1B5E20", "#2E7D32"],
          [528, 305, 12, 17, "#2E7D32", "#388E3C"],
          [560, 312, 11, 15, "#1B5E20", "#2E7D32"],
        ] as const
      ).map(([x, y, tw, cr, c1, c2], i) => (
        <g key={i}>
          <rect
            x={x - tw / 2}
            y={y}
            width={tw}
            height={18}
            rx="2"
            fill="#4E342E"
            opacity="0.85"
          />
          <circle
            cx={x}
            cy={y - 2}
            r={cr + 4}
            fill={c1}
            opacity="0.6"
          />
          <circle cx={x} cy={y - 4} r={cr} fill={c2} />
        </g>
      ))}

      {/* Side road (leading to buildings) */}
      <path
        d="M600,342 C540,350 490,360 460,376 C430,392 415,398 378,402"
        stroke="#37474F"
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M600,342 C540,350 490,360 460,376 C430,392 415,398 378,402"
        stroke="#546E7A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="10 8"
        opacity="0.4"
      />

      {/* Main road */}
      <rect
        x="0"
        y="398"
        width="600"
        height="24"
        fill="#37474F"
      />
      <rect
        x="0"
        y="398"
        width="600"
        height="2"
        fill="#546E7A"
        opacity="0.4"
      />
      <rect
        x="0"
        y="420"
        width="600"
        height="2"
        fill="#546E7A"
        opacity="0.4"
      />
      <line
        x1="0"
        y1="410"
        x2="600"
        y2="410"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="18 14"
        opacity="0.45"
      />

      {/* Buildings */}
      <rect
        x="322"
        y="290"
        width="22"
        height="110"
        fill="#546E7A"
      />
      <rect
        x="322"
        y="290"
        width="22"
        height="110"
        fill="url(#winPat)"
        opacity="0.7"
      />

      <rect
        x="347"
        y="272"
        width="28"
        height="128"
        fill="#455A64"
      />
      <rect
        x="347"
        y="272"
        width="28"
        height="128"
        fill="url(#winPat)"
        opacity="0.75"
      />
      <rect
        x="347"
        y="268"
        width="28"
        height="5"
        rx="1"
        fill="#00BCD4"
        opacity="0.7"
      />

      <rect
        x="378"
        y="248"
        width="34"
        height="152"
        fill="#37474F"
      />
      <rect
        x="378"
        y="248"
        width="34"
        height="152"
        fill="url(#winPat)"
        opacity="0.8"
      />
      <rect
        x="378"
        y="244"
        width="34"
        height="5"
        rx="1"
        fill="#00E5FF"
        opacity="0.85"
      />
      <rect
        x="384"
        y="238"
        width="22"
        height="8"
        rx="2"
        fill="#37474F"
      />

      <rect
        x="415"
        y="268"
        width="24"
        height="132"
        fill="#546E7A"
      />
      <rect
        x="415"
        y="268"
        width="24"
        height="132"
        fill="url(#winPat)"
        opacity="0.65"
      />

      <rect
        x="442"
        y="288"
        width="20"
        height="112"
        fill="#607D8B"
      />
      <rect
        x="442"
        y="288"
        width="20"
        height="112"
        fill="url(#winPat)"
        opacity="0.6"
      />

      <rect
        x="465"
        y="278"
        width="18"
        height="122"
        fill="#455A64"
      />
      <rect
        x="465"
        y="278"
        width="18"
        height="122"
        fill="url(#winPat)"
        opacity="0.7"
      />
      <rect
        x="465"
        y="274"
        width="18"
        height="5"
        rx="1"
        fill="#00BCD4"
        opacity="0.6"
      />

      {/* Foreground trees — left cluster */}
      <rect
        x="18"
        y="360"
        width="7"
        height="28"
        rx="2"
        fill="#4E342E"
      />
      <circle
        cx="21"
        cy="346"
        r="24"
        fill="#1B5E20"
        opacity="0.65"
      />
      <circle cx="21" cy="340" r="18" fill="#2E7D32" />
      <circle cx="21" cy="336" r="12" fill="#388E3C" />

      <rect
        x="64"
        y="358"
        width="6"
        height="24"
        rx="2"
        fill="#4E342E"
      />
      <circle
        cx="67"
        cy="344"
        r="21"
        fill="#1B5E20"
        opacity="0.7"
      />
      <circle cx="67" cy="339" r="16" fill="#388E3C" />

      <rect
        x="104"
        y="362"
        width="5"
        height="20"
        rx="2"
        fill="#4E342E"
      />
      <circle
        cx="107"
        cy="350"
        r="18"
        fill="#1B5E20"
        opacity="0.65"
      />
      <circle cx="107" cy="346" r="13" fill="#2E7D32" />

      {/* Foreground trees — right cluster */}
      <rect
        x="510"
        y="358"
        width="7"
        height="26"
        rx="2"
        fill="#4E342E"
      />
      <circle
        cx="513"
        cy="344"
        r="23"
        fill="#1B5E20"
        opacity="0.7"
      />
      <circle cx="513" cy="338" r="17" fill="#2E7D32" />

      <rect
        x="553"
        y="360"
        width="6"
        height="22"
        rx="2"
        fill="#4E342E"
      />
      <circle
        cx="556"
        cy="347"
        r="20"
        fill="#1B5E20"
        opacity="0.65"
      />
      <circle cx="556" cy="342" r="14" fill="#388E3C" />

      {/* Ground grass strip */}
      <rect
        x="0"
        y="420"
        width="600"
        height="40"
        fill="#388E3C"
      />

      {/* AI Route line (glowing green, animated draw) */}
      <path
        d="M55,406 Q140,402 220,404 Q268,406 300,396 Q360,370 420,356 Q468,346 540,348"
        stroke="#00E676"
        strokeWidth="3.5"
        fill="none"
        strokeDasharray="560"
        strokeDashoffset="560"
        filter="url(#routeGlow)"
        opacity="0.9"
      >
        <animate
          attributeName="strokeDashoffset"
          from="560"
          to="0"
          dur="2.8s"
          fill="freeze"
        />
        <animate
          attributeName="strokeDashoffset"
          values="560;0;560"
          dur="8s"
          begin="2.8s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M55,406 Q140,402 220,404 Q268,406 300,396 Q360,370 420,356 Q468,346 540,348"
        stroke="#69F0AE"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="10 7"
        opacity="0.55"
      >
        <animate
          attributeName="strokeDashoffset"
          from="0"
          to="-34"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>

      {/* Location pin — origin */}
      <g transform="translate(55,406)">
        <circle r="12" fill="#00E676" opacity="0">
          <animate
            attributeName="r"
            values="8;22;8"
            dur="2.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle r="9" fill="#00E676" opacity="0.25" />
        <circle r="6" fill="#00E676" />
        <circle r="3" fill="white" />
      </g>

      {/* Location pin — destination */}
      <g transform="translate(540,348)">
        <circle r="12" fill="#FF6F00" opacity="0">
          <animate
            attributeName="r"
            values="8;22;8"
            dur="2.2s"
            begin="1.1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="2.2s"
            begin="1.1s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M0,-22 C-9,-22 -15,-15 -15,-8 C-15,4 0,18 0,18 C0,18 15,4 15,-8 C15,-15 9,-22 0,-22Z"
          fill="#FF6F00"
        />
        <circle r="6" cy="-8" fill="white" />
        <circle r="3" cy="-8" fill="#FF6F00" />
      </g>

      {/* Walking person */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="-18 396"
          to="180 396"
          dur="26s"
          repeatCount="indefinite"
        />
        <circle cx="0" cy="-20" r="6" fill="#FF8F00" />
        <line
          x1="0"
          y1="-14"
          x2="0"
          y2="-4"
          stroke="#FF8F00"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="-11"
          x2="-5"
          y2="-5"
          stroke="#FF8F00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="-11"
          x2="5"
          y2="-5"
          stroke="#FF8F00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="-4"
          x2="-4"
          y2="4"
          stroke="#FF8F00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="-4"
          x2="4"
          y2="4"
          stroke="#FF8F00"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Bicycle + rider */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="-50 397"
          to="660 397"
          dur="19s"
          begin="4s"
          repeatCount="indefinite"
        />
        <circle
          cx="0"
          cy="0"
          r="9"
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="0" cy="0" r="2.5" fill="#2E7D32" />
        <circle
          cx="24"
          cy="0"
          r="9"
          stroke="#2E7D32"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="24" cy="0" r="2.5" fill="#2E7D32" />
        <path
          d="M0,0 L10,-10 L24,0"
          stroke="#388E3C"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M10,-10 L15,0"
          stroke="#388E3C"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="24"
          y1="-10"
          x2="24"
          y2="-14"
          stroke="#388E3C"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="-14"
          x2="28"
          y2="-14"
          stroke="#388E3C"
          strokeWidth="2.5"
        />
        <line
          x1="10"
          y1="-10"
          x2="10"
          y2="-15"
          stroke="#388E3C"
          strokeWidth="2"
        />
        <line
          x1="7"
          y1="-15"
          x2="13"
          y2="-15"
          stroke="#388E3C"
          strokeWidth="2.5"
        />
        <circle cx="15" cy="-24" r="5.5" fill="#43A047" />
        <path
          d="M15,-18 Q11,-12 7,-8"
          stroke="#43A047"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M15,-18 Q19,-13 24,-11"
          stroke="#43A047"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Electric Car */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="-60 396"
          to="660 396"
          dur="12s"
          begin="1s"
          repeatCount="indefinite"
        />
        <rect
          x="0"
          y="-2"
          width="46"
          height="14"
          rx="4"
          fill="#1B7A3E"
        />
        <path
          d="M7,-2 Q12,-12 21,-14 L30,-14 Q38,-12 41,-2"
          fill="#2E9E58"
        />
        <path
          d="M9,-2 Q14,-10 22,-12 L24,-12 Q21,-10 19,-2"
          fill="#A5D6A7"
          opacity="0.5"
        />
        <path
          d="M25,-2 Q27,-10 31,-12 L37,-10 L38,-2"
          fill="#A5D6A7"
          opacity="0.5"
        />
        <circle cx="10" cy="14" r="6" fill="#1A237E" />
        <circle cx="10" cy="14" r="3.5" fill="#5C6BC0" />
        <circle cx="35" cy="14" r="6" fill="#1A237E" />
        <circle cx="35" cy="14" r="3.5" fill="#5C6BC0" />
        <rect
          x="44"
          y="2"
          width="3"
          height="6"
          rx="1"
          fill="#FFF9C4"
        />
        <rect
          x="-1"
          y="2"
          width="3"
          height="6"
          rx="1"
          fill="#FFCC80"
          opacity="0.5"
        />
        <path
          d="M20,0 L18,5 L22,5 L19,10"
          stroke="#69F0AE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Electric Bus */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          from="-110 397"
          to="680 397"
          dur="24s"
          begin="8s"
          repeatCount="indefinite"
        />
        <rect
          x="0"
          y="-13"
          width="80"
          height="22"
          rx="5"
          fill="#1565C0"
        />
        <rect
          x="4"
          y="-11"
          width="13"
          height="9"
          rx="1.5"
          fill="#B3E5FC"
          opacity="0.85"
        />
        <rect
          x="20"
          y="-11"
          width="13"
          height="9"
          rx="1.5"
          fill="#B3E5FC"
          opacity="0.85"
        />
        <rect
          x="36"
          y="-11"
          width="13"
          height="9"
          rx="1.5"
          fill="#B3E5FC"
          opacity="0.85"
        />
        <rect
          x="52"
          y="-11"
          width="13"
          height="9"
          rx="1.5"
          fill="#B3E5FC"
          opacity="0.85"
        />
        <rect
          x="67"
          y="-11"
          width="9"
          height="9"
          rx="1.5"
          fill="#B3E5FC"
          opacity="0.85"
        />
        <rect
          x="6"
          y="-15"
          width="68"
          height="3"
          rx="1"
          fill="#0D47A1"
        />
        <rect
          x="12"
          y="-16"
          width="56"
          height="2.5"
          rx="1"
          fill="#FFF176"
          opacity="0.8"
        />
        <circle cx="14" cy="11" r="7.5" fill="#1A237E" />
        <circle cx="14" cy="11" r="4" fill="#5C6BC0" />
        <circle cx="64" cy="11" r="7.5" fill="#1A237E" />
        <circle cx="64" cy="11" r="4" fill="#5C6BC0" />
        <rect
          x="77"
          y="-10"
          width="5"
          height="12"
          rx="2"
          fill="#FFF9C4"
          opacity="0.9"
        />
        <rect
          x="-2"
          y="-10"
          width="4"
          height="12"
          rx="2"
          fill="#FFCC80"
          opacity="0.4"
        />
        <text
          x="3"
          y="4"
          fontSize="8"
          fill="#69F0AE"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          ⚡ E
        </text>
      </g>

      {/* Birds */}
      <g opacity="0.65">
        <animateTransform
          attributeName="transform"
          type="translate"
          from="620 95"
          to="-20 55"
          dur="20s"
          begin="3s"
          repeatCount="indefinite"
        />
        <path
          d="M0,0 Q4,-5 8,0 Q12,-5 16,0"
          stroke="#546E7A"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M24,4 Q28,-1 32,4 Q36,-1 40,4"
          stroke="#546E7A"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M52,1 Q56,-4 60,1 Q64,-4 68,1"
          stroke="#546E7A"
          strokeWidth="1.6"
          fill="none"
        />
      </g>

      {/* Floating eco particles */}
      <circle
        cx="130"
        cy="148"
        r="2.5"
        fill="#69F0AE"
        opacity="0.45"
      >
        <animate
          attributeName="cy"
          values="148;128;148"
          dur="4.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.45;0.85;0.45"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="195"
        cy="196"
        r="1.8"
        fill="#4FC3F7"
        opacity="0.4"
      >
        <animate
          attributeName="cy"
          values="196;176;196"
          dur="5.5s"
          begin="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.75;0.4"
          dur="5.5s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="290"
        cy="172"
        r="2"
        fill="#FFD54F"
        opacity="0.35"
      >
        <animate
          attributeName="cy"
          values="172;154;172"
          dur="6s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="390"
        cy="130"
        r="1.5"
        fill="#69F0AE"
        opacity="0.4"
      >
        <animate
          attributeName="cy"
          values="130;112;130"
          dur="5s"
          begin="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur="5s"
          begin="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Mini info cards floating */}
      <g transform="translate(10, 16)">
        <rect
          width="112"
          height="46"
          rx="10"
          fill="rgba(0,0,0,0.35)"
        />
        <rect
          width="112"
          height="46"
          rx="10"
          fill="none"
          stroke="rgba(105,240,174,0.3)"
          strokeWidth="1"
        />
        <text
          x="10"
          y="18"
          fontFamily="Inter,sans-serif"
          fontSize="9"
          fill="rgba(255,255,255,0.6)"
          fontWeight="500"
        >
          CO₂ Saved Today
        </text>
        <text
          x="10"
          y="36"
          fontFamily="Poppins,sans-serif"
          fontSize="16"
          fill="#69F0AE"
          fontWeight="700"
        >
          2.4 kg
        </text>
        <text
          x="86"
          y="30"
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          🌿
        </text>
      </g>

      <g transform="translate(476, 16)">
        <rect
          width="114"
          height="46"
          rx="10"
          fill="rgba(0,0,0,0.35)"
        />
        <rect
          width="114"
          height="46"
          rx="10"
          fill="none"
          stroke="rgba(79,195,247,0.3)"
          strokeWidth="1"
        />
        <text
          x="10"
          y="18"
          fontFamily="Inter,sans-serif"
          fontSize="9"
          fill="rgba(255,255,255,0.6)"
          fontWeight="500"
        >
          Weather Now
        </text>
        <text
          x="10"
          y="36"
          fontFamily="Poppins,sans-serif"
          fontSize="13"
          fill="white"
          fontWeight="600"
        >
          ☀ 23°C Clear
        </text>
      </g>

      {/* Route time badge */}
      <g transform="translate(200,432)">
        <rect width="200" height="28" rx="14" fill="#00E676" />
        <text
          x="100"
          y="19"
          fontFamily="Poppins,sans-serif"
          fontSize="12"
          fill="#071a09"
          fontWeight="700"
          textAnchor="middle"
        >
          🚲 28 min · 4.2 km · Eco Route
        </text>
      </g>
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #071a09 0%, #0d3015 30%, #1a4724 60%, #0d2b15 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 16s ease infinite",
        paddingTop: 68,
      }}
    >
      {/* Animated background blobs */}
      <GlowOrb
        style={{
          top: "10%",
          left: "8%",
          width: 360,
          height: 360,
        }}
        color="0,200,83"
      />
      <GlowOrb
        style={{
          top: "50%",
          left: "55%",
          width: 480,
          height: 480,
          animationDelay: "5s",
        }}
        color="0,188,212"
      />
      <GlowOrb
        style={{
          top: "70%",
          left: "5%",
          width: 280,
          height: 280,
          animationDelay: "2.5s",
        }}
        color="255,214,0"
      />

      {/* Topographic lines overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.04,
          pointerEvents: "none",
        }}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={i}
            cx="400"
            cy="300"
            rx={100 + i * 80}
            ry={60 + i * 48}
            fill="none"
            stroke="#69F0AE"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Floating leaves */}
      {HERO_LEAVES.map((l, i) => (
        <FloatingLeaf key={i} {...l} />
      ))}

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "60px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: 48,
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              width: "fit-content",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              borderRadius: 50,
              background: "rgba(0,230,118,0.12)",
              border: "1px solid rgba(0,230,118,0.25)",
              color: "#69F0AE",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.8px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#00e676",
                display: "inline-block",
                animation: "buttonGlow 2s ease-in-out infinite",
              }}
            />
            AI-Powered Sustainable Navigation
          </div>

          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.06,
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Smarter Routes.
            <br />
            <span className="gradient-text glow-text">
              Greener Journeys.
            </span>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.75,
              maxWidth: 440,
              margin: 0,
            }}
          >
            EcoVia is an AI-powered sustainable navigation
            platform that helps users discover safer, smarter
            and environmentally friendly travel routes using
            weather intelligence, traveller preferences and
            intelligent route recommendations.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#071a09",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                padding: "13px 28px",
                borderRadius: 50,
              }}
            >
              Get Started
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#features"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(255,255,255,0.85)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                padding: "13px 28px",
                borderRadius: 50,
                border: "1px solid rgba(255,255,255,0.18)",
                transition: "all 0.25s",
                background: "rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor =
                  "rgba(105,240,174,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.18)";
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon
                  points="10,8 16,12 10,16 10,8"
                  fill="currentColor"
                />
              </svg>
              Learn More
            </a>
          </div>
        </div>

        {/* City Scene */}
        <div
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(105,240,174,0.15)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,230,118,0.08)",
          }}
        >
          <EcoCityScene />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(to bottom, transparent, #071a09)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutIllustration() {
  return (
    <svg
      viewBox="0 0 420 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      aria-label="EcoVia app interface illustration"
    >
      {/* Phone/device frame */}
      <rect
        x="120"
        y="20"
        width="180"
        height="300"
        rx="24"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(105,240,174,0.2)"
        strokeWidth="1.5"
      />
      <rect
        x="132"
        y="36"
        width="156"
        height="268"
        rx="16"
        fill="rgba(0,0,0,0.3)"
      />

      {/* Map inside phone */}
      <rect
        x="132"
        y="36"
        width="156"
        height="160"
        rx="12"
        fill="#1a3d1e"
      />
      <path
        d="M132,110 Q200,100 288,108 L288,196 L132,196Z"
        fill="#2e7d32"
        opacity="0.6"
      />
      <path
        d="M132,155 Q200,145 288,152 L288,196 L132,196Z"
        fill="#388e3c"
        opacity="0.7"
      />

      {/* Roads on map */}
      <path
        d="M132,140 Q210,137 288,140"
        stroke="#455A64"
        strokeWidth="8"
      />
      <path
        d="M210,36 L210,196"
        stroke="#455A64"
        strokeWidth="8"
      />
      <path
        d="M132,140 Q210,137 288,140"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        opacity="0.4"
      />

      {/* Route glow */}
      <path
        d="M148,180 Q175,160 210,145 Q240,132 270,125"
        stroke="#00E676"
        strokeWidth="2.5"
        filter="url(#routeGlow)"
        strokeDasharray="120"
        strokeDashoffset="120"
      >
        <animate
          attributeName="strokeDashoffset"
          values="120;0;120"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Pin origin */}
      <circle cx="148" cy="180" r="5" fill="#00E676" />
      <circle
        cx="148"
        cy="180"
        r="9"
        fill="#00E676"
        opacity="0.2"
      >
        <animate
          attributeName="r"
          values="5;14;5"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Pin destination */}
      <path
        d="M270,125 C265,125 262,129 262,133 C262,139 270,146 270,146 C270,146 278,139 278,133 C278,129 275,125 270,125Z"
        fill="#FF6F00"
      />
      <circle cx="270" cy="133" r="3.5" fill="white" />

      {/* App UI below map */}
      <rect
        x="132"
        y="200"
        width="156"
        height="104"
        rx="0"
        fill="#0d2510"
      />
      <rect
        x="140"
        y="208"
        width="80"
        height="8"
        rx="4"
        fill="rgba(255,255,255,0.15)"
      />
      <rect
        x="140"
        y="222"
        width="120"
        height="6"
        rx="3"
        fill="rgba(0,230,118,0.4)"
      />
      <rect
        x="140"
        y="234"
        width="100"
        height="6"
        rx="3"
        fill="rgba(255,255,255,0.1)"
      />

      {/* Route options */}
      <rect
        x="140"
        y="248"
        width="60"
        height="24"
        rx="8"
        fill="rgba(0,230,118,0.2)"
        stroke="rgba(0,230,118,0.4)"
        strokeWidth="1"
      />
      <text
        x="170"
        y="264"
        fontSize="8"
        fill="#69F0AE"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontWeight="600"
      >
        🚲 Eco
      </text>
      <rect
        x="206"
        y="248"
        width="60"
        height="24"
        rx="8"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <text
        x="236"
        y="264"
        fontSize="8"
        fill="rgba(255,255,255,0.6)"
        textAnchor="middle"
        fontFamily="Inter,sans-serif"
      >
        🚶 Walk
      </text>

      {/* Floating data cards around phone */}
      {/* Weather card */}
      <rect
        x="0"
        y="60"
        width="108"
        height="60"
        rx="14"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(79,195,247,0.25)"
        strokeWidth="1"
        style={{
          animation: "cardFloat 4s ease-in-out infinite",
        }}
      />
      <text
        x="12"
        y="82"
        fontSize="9"
        fill="rgba(255,255,255,0.5)"
        fontFamily="Inter,sans-serif"
      >
        Weather
      </text>
      <text
        x="12"
        y="100"
        fontSize="14"
        fill="white"
        fontFamily="Poppins,sans-serif"
        fontWeight="600"
      >
        ☀ 23°C
      </text>
      <text x="70" y="82" fontSize="18" textAnchor="middle">
        🌤
      </text>

      {/* CO2 card */}
      <rect
        x="312"
        y="80"
        width="108"
        height="60"
        rx="14"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(0,230,118,0.25)"
        strokeWidth="1"
        style={{
          animation: "cardFloat 5s 1.5s ease-in-out infinite",
        }}
      />
      <text
        x="324"
        y="102"
        fontSize="9"
        fill="rgba(255,255,255,0.5)"
        fontFamily="Inter,sans-serif"
      >
        CO₂ Saved
      </text>
      <text
        x="324"
        y="122"
        fontSize="16"
        fill="#69F0AE"
        fontFamily="Poppins,sans-serif"
        fontWeight="700"
      >
        2.4 kg
      </text>

      {/* AI card */}
      <rect
        x="0"
        y="200"
        width="108"
        height="60"
        rx="14"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(105,240,174,0.2)"
        strokeWidth="1"
        style={{
          animation: "cardFloat 3.5s 0.8s ease-in-out infinite",
        }}
      />
      <text
        x="12"
        y="222"
        fontSize="9"
        fill="rgba(255,255,255,0.5)"
        fontFamily="Inter,sans-serif"
      >
        AI Score
      </text>
      <text
        x="12"
        y="242"
        fontSize="14"
        fill="#69F0AE"
        fontFamily="Poppins,sans-serif"
        fontWeight="600"
      >
        98% Eco ✓
      </text>

      {/* Time card */}
      <rect
        x="312"
        y="200"
        width="108"
        height="60"
        rx="14"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,214,0,0.25)"
        strokeWidth="1"
        style={{
          animation: "cardFloat 4.5s 2s ease-in-out infinite",
        }}
      />
      <text
        x="324"
        y="222"
        fontSize="9"
        fill="rgba(255,255,255,0.5)"
        fontFamily="Inter,sans-serif"
      >
        ETA
      </text>
      <text
        x="324"
        y="242"
        fontSize="14"
        fill="#FFD54F"
        fontFamily="Poppins,sans-serif"
        fontWeight="600"
      >
        28 min
      </text>

      <defs>
        <filter id="routeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function AboutSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="about"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #071a09 0%, #102a13 50%, #0a1e0d 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 20s ease infinite",
        padding: "100px 0",
      }}
    >
      <GlowOrb
        style={{
          top: "20%",
          right: "5%",
          width: 400,
          height: 400,
          animationDelay: "3s",
        }}
        color="0,188,212"
      />

      <div
        ref={ref}
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 72,
          alignItems: "center",
        }}
      >
        {/* Illustration */}
        <div
          className={`reveal-left ${visible ? "visible" : ""}`}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              inset: -20,
              borderRadius: 32,
              background:
                "radial-gradient(ellipse at center, rgba(0,230,118,0.06) 0%, transparent 70%)",
            }}
          />
          <AboutIllustration />
        </div>

        {/* Content */}
        <div
          className={`reveal-right ${visible ? "visible" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            animationDelay: "0.15s",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "2px",
              color: "#69F0AE",
              textTransform: "uppercase",
            }}
          >
            Why EcoVia
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              color: "white",
              lineHeight: 1.12,
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Where AI meets
            <br />
            <span className="gradient-text">
              sustainable travel
            </span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            EcoVia combines advanced artificial intelligence
            with real-time weather intelligence, sustainable
            transportation options, and personalized traveller
            profiles to create journeys that are not just
            smarter — but genuinely better for you and the
            planet.
          </p>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            Every route recommendation balances speed, comfort,
            environmental impact, and safety — learning your
            preferences to get better with every trip you take.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              paddingTop: 8,
            }}
          >
            {[
              {
                icon: "🧠",
                title: "Adaptive AI Engine",
                desc: "Learns your habits and refines recommendations over time",
              },
              {
                icon: "🌦",
                title: "Live Weather Integration",
                desc: "Adjusts routes in real-time for rain, wind, and temperature",
              },
              {
                icon: "🌿",
                title: "Carbon Intelligence",
                desc: "Quantifies your environmental impact across every trip",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    fontSize: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,230,118,0.1)",
                    border: "1px solid rgba(0,230,118,0.2)",
                  }}
                >
                  {icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "white",
                      marginBottom: 3,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "🗺",
    title: "Smart Route Planning",
    desc: "Multi-modal AI routing across cycling, walking, transit and EVs — balancing speed, safety, and carbon footprint in real time.",
    color: "#00E676",
    border: "rgba(0,230,118,0.25)",
  },
  {
    icon: "🌦",
    title: "Weather Intelligence",
    desc: "Live and 7-day forecast data woven into every route suggestion so you always arrive prepared, never caught off guard.",
    color: "#4FC3F7",
    border: "rgba(79,195,247,0.25)",
  },
  {
    icon: "🌱",
    title: "Eco Recommendations",
    desc: "Personalized green-travel tips, carbon offset tracking, and monthly sustainability impact reports for every journey.",
    color: "#69F0AE",
    border: "rgba(105,240,174,0.25)",
  },
  {
    icon: "🤖",
    title: "Personalized AI Assistant",
    desc: "A context-aware travel companion that learns your schedule, preferences and lifestyle to anticipate journeys before you ask.",
    color: "#CE93D8",
    border: "rgba(206,147,216,0.25)",
  },
];

function FeatureCard({
  icon,
  title,
  desc,
  color,
  border,
}: (typeof FEATURES)[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 28,
        borderRadius: 24,
        background: hovered
          ? "rgba(255,255,255,0.09)"
          : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? color.replace(")", ",0.4)").replace("rgb", "rgba") : border}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered
          ? "translateY(-8px)"
          : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${color}22`
          : "0 4px 20px rgba(0,0,0,0.2)",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          fontSize: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${color}18`,
          border: `1px solid ${color}30`,
          transition: "transform 0.3s",
          transform: hovered
            ? "scale(1.12) rotate(-4deg)"
            : "scale(1) rotate(0deg)",
          boxShadow: hovered ? `0 0 20px ${color}44` : "none",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "white",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color,
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}
        >
          Learn more
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          style={{
            opacity: hovered ? 1 : 0.6,
            transition: "all 0.3s",
            transform: hovered ? "translateX(3px)" : "none",
          }}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="features"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #061508 0%, #0d2a10 40%, #102d14 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 18s ease infinite",
        padding: "100px 0",
      }}
    >
      <GlowOrb
        style={{
          bottom: "10%",
          left: "10%",
          width: 500,
          height: 500,
          animationDelay: "1s",
        }}
        color="0,230,118"
      />

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          ref={ref}
          className={`reveal-up ${visible ? "visible" : ""}`}
          style={{
            textAlign: "center",
            marginBottom: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "2px",
              color: "#69F0AE",
              textTransform: "uppercase",
            }}
          >
            Core Features
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.5px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Everything you need to travel
            <br />
            <span className="gradient-text">
              smarter and greener
            </span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.58)",
              maxWidth: 500,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Built from the ground up to make sustainable travel
            the obvious, effortless, and delightful choice.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`reveal-up ${visible ? "visible" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <FeatureCard {...f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: "📍",
    label: "Choose Source",
    desc: "Set your starting point with smart location search or use GPS",
  },
  {
    icon: "🎯",
    label: "Select Destination",
    desc: "Enter where you want to go — nearby or across the city",
  },
  {
    icon: "🚗",
    label: "Choose Travel Mode",
    desc: "Walk, cycle, take transit, drive EV, or mix and match modes",
  },
  {
    icon: "👤",
    label: "Select Traveller Type",
    desc: "Leisure, commuter, accessibility needs — we adapt to you",
  },
  {
    icon: "🤖",
    label: "AI Analysis",
    desc: "Our model analyses weather, traffic, CO₂, and your history in milliseconds",
  },
  {
    icon: "🗺",
    label: "Smart Route Generated",
    desc: "Your optimal eco-route appears — turn by turn, real time",
  },
];

function HowItWorksSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
       background:
  "linear-gradient(135deg, #061508 0%, #0d2a10 40%, #102d14 100%)",
        backgroundSize: "300% 300%",
animation: "gradientShift 15s ease infinite",
        padding: "100px 0",
      }}
    >
      {/* Light topographic overlay */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.06,
          pointerEvents: "none",
        }}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse
            key={i}
            cx="700"
            cy="500"
            rx={80 + i * 70}
            ry={50 + i * 44}
            fill="none"
            stroke="#2e7d32"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          ref={ref}
          className={`reveal-up ${visible ? "visible" : ""}`}
          style={{
            textAlign: "center",
            marginBottom: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "2px",
              color: "#69F0AE",
              textTransform: "uppercase",
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.5px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Six steps to a greener journey
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 28,
              bottom: 28,
              width: 2,
              background:
                "linear-gradient(to bottom, #00e676, #2e7d32, #00e676)",
              borderRadius: 2,
              opacity: 0.4,
            }}
          />

          {STEPS.map(({ icon, label, desc }, i) => {
            const { ref: sRef, visible: sVisible } =
              useReveal();
            return (
              <div
                key={label}
                ref={sRef}
                className={`reveal-left ${sVisible ? "visible" : ""}`}
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  padding: "18px 0",
                  animationDelay: `${i * 0.12}s`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    fontSize: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
  "linear-gradient(135deg,#69F0AE,#2E7D32)",
color: "white",
boxShadow: "0 0 25px rgba(105,240,174,.35)",
border: "none",
                    animation:
                      "timelinePulse 3s ease-in-out infinite",
                    animationDelay: `${i * 0.4}s`,
                    zIndex: 1,
                  }}
                >
                  {icon}
                </div>
                <div
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow =
      "0 18px 40px rgba(0,230,118,.25)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    padding: 22,
    width: "100%",
    borderRadius: 22,
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "all .35s ease",
  }}
>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#white",
                      marginBottom: 5,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose ───────────────────────────────────────────────────────────────

const WHY = [
  {
    icon: "⚡",
    title: "Faster Planning",
    desc: "Routes generated in under 2 seconds using our optimized AI pipeline",
    color: "#FFD54F",
  },
  {
    icon: "🌿",
    title: "Eco Friendly",
    desc: "Every route minimises carbon output without compromising on convenience",
    color: "#69F0AE",
  },
  {
    icon: "🧠",
    title: "AI Powered",
    desc: "Continuously learns from millions of journeys to improve every recommendation",
    color: "#CE93D8",
  },
  {
    icon: "🌦",
    title: "Weather Aware",
    desc: "Dynamically adjusts routes for rain, heat, wind, and seasonal conditions",
    color: "#4FC3F7",
  },
  {
    icon: "📍",
    title: "Accurate Navigation",
    desc: "Turn-by-turn guidance with real-time traffic and incident updates",
    color: "#FF8A65",
  },
  {
    icon: "💚",
    title: "Sustainable Travel",
    desc: "Track your green impact with monthly reports and carbon offset certificates",
    color: "#A5D6A7",
  },
];

function WhyChooseSection() {
  const { ref, visible } = useReveal();

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #071a09 0%, #0a2610 40%, #0e3018 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 15s ease infinite",
        padding: "100px 0",
      }}
    >
      <GlowOrb
        style={{
          top: "30%",
          right: "8%",
          width: 420,
          height: 420,
          animationDelay: "4s",
        }}
        color="105,240,174"
      />
      <GlowOrb
        style={{
          bottom: "10%",
          left: "5%",
          width: 300,
          height: 300,
          animationDelay: "8s",
        }}
        color="79,195,247"
      />

      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          ref={ref}
          className={`reveal-up ${visible ? "visible" : ""}`}
          style={{
            textAlign: "center",
            marginBottom: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "2px",
              color: "#69F0AE",
              textTransform: "uppercase",
            }}
          >
            Why Choose EcoVia
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.5px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Built for the planet,
            <br />
            <span className="gradient-text">
              designed for people
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 18,
          }}
        >
          {WHY.map(({ icon, title, desc, color }, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div
                key={title}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                className={`reveal-up ${visible ? "visible" : ""}`}
                style={{
                  padding: "24px 28px",
                  borderRadius: 20,
                  animationDelay: `${i * 0.08}s`,
                  background: hov
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${hov ? color + "44" : "rgba(255,255,255,0.07)"}`,
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  transform: hov ? "translateY(-5px)" : "none",
                  boxShadow: hov
                    ? `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${color}18`
                    : "none",
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: 26,
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${color}18`,
                    transition: "transform 0.3s",
                    transform: hov
                      ? "scale(1.15) rotate(-5deg)"
                      : "none",
                  }}
                >
                  {icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "white",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.65,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "white",
    fontSize: 14,
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #061508 0%, #0d2b15 50%, #071a09 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 20s ease infinite",
        padding: "100px 0",
      }}
    >
      <GlowOrb
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          animationDelay: "2s",
        }}
        color="0,230,118"
      />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          ref={ref}
          className={`reveal-up ${visible ? "visible" : ""}`}
          style={{
            textAlign: "center",
            marginBottom: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "2px",
              color: "#69F0AE",
              textTransform: "uppercase",
            }}
          >
            Get In Touch
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white",
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Let's build a greener future
            <br />
            <span className="gradient-text">together</span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
            }}
          >
            Have questions or suggestions? I'd love to hear from
            you.
          </p>
        
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Info */}
          <div
            className={`reveal-left ${visible ? "visible" : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            {[
              {
                icon: "📧",
                label: "Email",
                val: "laasyasri.lingala@example.com",
              },
              {
                icon: "📍",
                label: "Location",
                val: "India · Remote-first",
              },
            ].map(({ icon, label, val }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    fontSize: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,230,118,0.1)",
                    border: "1px solid rgba(0,230,118,0.2)",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.5px",
                      marginBottom: 3,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 500,
                    }}
                  >
                    {val}
                  </div>
                </div>
              </div>
            ))}

           <div
  style={{
    display: "flex",
    gap: 12,
    paddingTop: 8,
    flexWrap: "wrap",
  }}
>
  {[
    {
      icon: "G",
      label: "GitHub",
      color: "#ffffff",
      link: "https://github.com/laasya2607",
    },
    {
      icon: "in",
      label: "LinkedIn",
      color: "#0A66C2",
      link: "https://www.linkedin.com/in/laasya-sri-lingala",
    },
  ].map(({ icon, label, color, link }) => (
                <a
                  key={label}
                  href={link}
target="_blank"
rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 50,
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    background: "rgba(255,255,255,0.04)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "#69F0AE";
                    e.currentTarget.style.color = "#69F0AE";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color =
                      "rgba(255,255,255,0.8)";
                  }}
                >
                  <span style={{ fontWeight: 700, color }}>
                    {icon}
                  </span>{" "}
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className={`reveal-right ${visible ? "visible" : ""}`}
            style={{
              padding: 32,
              borderRadius: 24,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            {sent ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 48 }}>🌿</span>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#69F0AE",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  Thanks for reaching out. I'll get back to you
                  soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: 8,
                    padding: "10px 24px",
                    borderRadius: 50,
                    border: "1px solid rgba(0,230,118,0.3)",
                    background: "transparent",
                    color: "#69F0AE",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        name: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor =
                        "rgba(0,230,118,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor =
                        "rgba(255,255,255,0.12)")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        email: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor =
                        "rgba(0,230,118,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor =
                        "rgba(255,255,255,0.12)")
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me what's on your mind..."
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        message: e.target.value,
                      }))
                    }
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 100,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor =
                        "rgba(0,230,118,0.5)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor =
                        "rgba(255,255,255,0.12)")
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: "14px 0",
                    borderRadius: 50,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#071a09",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  Send Message
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        background: "#050f06",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 24px",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #00e676, #2e7d32)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "white",
            }}
          >
            EcoVia
          </span>
        </div>

        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            maxWidth: 400,
            lineHeight: 1.6,
          }}
        >
          AI Powered Sustainable Navigation Platform
        </p>

        

        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              margin: 0,
            }}
          >
            Made with ❤️ by{" "}
            <span style={{ color: "#69F0AE" }}>Laasya</span>
          </p>
          
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          [style*="grid-template-columns: 1fr 1fr"],
          [style*="grid-template-columns: 1fr 1.1fr"],
          [style*="grid-template-columns: 1fr 1.3fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        ::placeholder { color: rgba(255,255,255,0.25); }
        input:-webkit-autofill, textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.04) inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
      <Nav />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <ContactSection />
      <Footer />
    </div>
  );
}