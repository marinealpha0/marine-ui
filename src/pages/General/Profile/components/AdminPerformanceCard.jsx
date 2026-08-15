import React from "react";

// Animated circular progress ring
const CircularRing = ({ value, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(value, 100) / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#perfGradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <defs>
        <linearGradient id="perfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(207 82% 33%)" />
          <stop offset="100%" stopColor="hsl(34 77% 47%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Star icon
const Star = ({ filled, half }) => (
  <svg className="w-4 h-4" viewBox="0 0 20 20">
    {half ? (
      <>
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="hsl(38 92% 55%)" />
            <stop offset="50%" stopColor="hsl(214 32% 91%)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfStar)"
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </>
    ) : (
      <path
        fill={filled ? "hsl(38 92% 55%)" : "hsl(214 32% 91%)"}
        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
      />
    )}
  </svg>
);

const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<Star key={i} filled />);
    } else if (i === Math.ceil(value) && value % 1 >= 0.5) {
      stars.push(<Star key={i} half />);
    } else {
      stars.push(<Star key={i} />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

const getGrade = (rating) => {
  if (rating >= 4.8) return { label: "A+", color: "#22c55e", bg: "hsl(142 76% 36% / 0.12)" };
  if (rating >= 4.5) return { label: "A", color: "#4ade80", bg: "hsl(142 60% 50% / 0.12)" };
  if (rating >= 4.0) return { label: "B+", color: "hsl(207 82% 45%)", bg: "hsl(207 82% 33% / 0.12)" };
  if (rating >= 3.5) return { label: "B", color: "hsl(201 84% 55%)", bg: "hsl(201 84% 39% / 0.12)" };
  return { label: "C", color: "hsl(34 77% 47%)", bg: "hsl(34 77% 47% / 0.12)" };
};

const AdminPerformanceCard = ({ rating = 0 }) => {
  const grade = getGrade(rating);
  const progress = ((rating / 5) * 100).toFixed(0);

  return (
    <div className="w-full h-full bg-card border border-border rounded-2xl p-6 flex flex-col shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
            Performance Rating
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Overall admin score</p>
        </div>
        {/* Grade badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black shadow-sm border"
          style={{
            color: grade.color,
            background: grade.bg,
            borderColor: grade.color + "40",
          }}
        >
          {grade.label}
        </div>
      </div>

      {/* Circular progress + score */}
      <div className="flex items-center justify-center gap-6 flex-1">
        <div className="relative flex-shrink-0">
          <CircularRing value={rating ? (rating / 5) * 100 : 0} size={110} strokeWidth={9} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-foreground leading-none">
              {rating ? rating.toFixed(1) : "—"}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">/ 5.0</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <StarRating value={rating} />
          <p className="text-xs text-muted-foreground leading-snug max-w-[110px]">
            Based on administrative performance metrics
          </p>

          {/* Mini progress bar */}
          <div className="mt-1">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>Score</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, hsl(207 82% 33%), hsl(34 77% 47%))`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPerformanceCard;
