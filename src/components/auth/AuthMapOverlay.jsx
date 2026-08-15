import React from "react";

/**
 * AuthMapOverlay Component
 * Pure SVG Animated Radar Scan background overlay for the Auth left panel.
 */
const AuthMapOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Dynamic Ambient Glow Layers with Pulse Animation */}
      <div className="absolute -top-32 -left-32 size-96 rounded-full bg-cyan/20 blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-ocean/25 blur-3xl pointer-events-none animate-glow-pulse" style={{ animationDelay: "3s" }} />

      {/* TACTICAL ANIMATED RADAR SCAN OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50 transition-opacity duration-500">
        <svg className="w-full h-full max-w-2xl max-h-[700px]" viewBox="0 0 600 600" fill="none">
          {/* Outer Rotating Compass Reticle Ring */}
          <g className="animate-reticle-reverse">
            <circle cx="300" cy="300" r="275" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" strokeDasharray="3 9" />
            <circle cx="300" cy="300" r="260" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
          </g>

          {/* Concentric Radar Distance Rings */}
          <circle cx="300" cy="300" r="200" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1" />
          <circle cx="300" cy="300" r="140" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1.2" strokeDasharray="6 4" />
          <circle cx="300" cy="300" r="80" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
          <circle cx="300" cy="300" r="20" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />

          {/* Radar Crosshairs */}
          <line x1="40" y1="300" x2="560" y2="300" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="300" y1="40" x2="300" y2="560" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          <line x1="116" y1="116" x2="484" y2="484" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="484" y1="116" x2="116" y2="484" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Compass Degree Ticks */}
          <text x="300" y="30" fill="#38BDF8" fontSize="10" textAnchor="middle" fontFamily="monospace" opacity="0.85">000° N</text>
          <text x="578" y="304" fill="#38BDF8" fontSize="10" textAnchor="start" fontFamily="monospace" opacity="0.85">090° E</text>
          <text x="300" y="578" fill="#38BDF8" fontSize="10" textAnchor="middle" fontFamily="monospace" opacity="0.85">180° S</text>
          <text x="18" y="304" fill="#38BDF8" fontSize="10" textAnchor="end" fontFamily="monospace" opacity="0.85">270° W</text>
          <text x="492" y="112" fill="#38BDF8" fontSize="9" fontFamily="monospace" opacity="0.55">045° NE</text>
          <text x="492" y="495" fill="#38BDF8" fontSize="9" fontFamily="monospace" opacity="0.55">135° SE</text>

          {/* 360° Radar Sweep Beam (Rotating Fan Animation) */}
          <g className="animate-radar-sweep">
            <polygon points="300,300 300,35 480,100" fill="url(#radarSweepGradient)" />
            <line x1="300" y1="300" x2="300" y2="35" stroke="#38BDF8" strokeWidth="2.5" opacity="0.95" />
          </g>

          {/* VESSEL TARGET 1 (MV PACIFIC) - Ping, Expanding Ripple & Floating Callout */}
          <g transform="translate(410, 210)" className="animate-blip-float-1">
            {/* Expanding Ripple Ring Wave */}
            <circle cx="0" cy="0" r="14" fill="none" stroke="#38BDF8" className="animate-radar-pulse" />
            <circle cx="0" cy="0" r="10" fill="rgba(56, 189, 248, 0.2)" />
            <circle cx="0" cy="0" r="4.5" fill="#38BDF8" />
            <line x1="0" y1="0" x2="18" y2="-14" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="20" y="-24" width="96" height="20" rx="5" fill="rgba(11, 23, 40, 0.88)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
            <text x="26" y="-10" fill="#F0F4F8" fontSize="8" fontFamily="sans-serif" fontWeight="bold">MV PACIFIC · 18.4kn</text>
          </g>

          {/* VESSEL TARGET 2 (MT ATLANTIC) - Ping, Expanding Ripple & Floating Callout */}
          <g transform="translate(210, 390)" className="animate-blip-float-2">
            {/* Expanding Ripple Ring Wave */}
            <circle cx="0" cy="0" r="14" fill="none" stroke="#38BDF8" className="animate-radar-pulse" style={{ animationDelay: "1.2s" }} />
            <circle cx="0" cy="0" r="8" fill="rgba(56, 189, 248, 0.2)" />
            <circle cx="0" cy="0" r="3.5" fill="#38BDF8" />
            <line x1="0" y1="0" x2="-14" y2="10" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="-112" y="8" width="96" height="20" rx="5" fill="rgba(11, 23, 40, 0.88)" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" />
            <text x="-106" y="22" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">MT ATLANTIC · 14.1kn</text>
          </g>

          {/* VESSEL TARGET 3 (Center Station Anchor) */}
          <g transform="translate(300, 300)">
            <circle cx="0" cy="0" r="6" fill="#38BDF8" />
            <circle cx="0" cy="0" r="16" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '10s' }} />
          </g>

          {/* Radar Sweep Gradient Definition */}
          <defs>
            <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AuthMapOverlay;
