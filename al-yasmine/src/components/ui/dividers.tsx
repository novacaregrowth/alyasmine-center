// Section transition shapes — rendered as inline SVGs so they inherit color and
// create seamless gradient blends between adjacent sections.

interface DividerProps {
  from: string; // color of the section ABOVE
  to: string;   // color of the section BELOW
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ from, to, flip = false, className = "" }: DividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`} style={{ height: 80 }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <rect width="1440" height="80" fill={from} />
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

export function CurveDivider({ from, to, flip = false, className = "" }: DividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none ${flip ? "scale-y-[-1]" : ""} ${className}`} style={{ height: 70 }}>
      <svg
        viewBox="0 0 1440 70"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <rect width="1440" height="70" fill={from} />
        <path
          d="M0,0 Q720,70 1440,0 L1440,70 L0,70 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

export function TiltDivider({ from, to, flip = false, className = "" }: DividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none ${className}`} style={{ height: 60 }}>
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <rect width="1440" height="60" fill={from} />
        <path
          d={flip ? "M1440,0 L0,60 L0,60 L1440,60 Z" : "M0,0 L1440,60 L1440,60 L0,60 Z"}
          fill={to}
        />
      </svg>
    </div>
  );
}
