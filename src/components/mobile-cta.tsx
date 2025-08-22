
export function MobileCta() {
    return (
        <div className="md:hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="40"
                height="40"
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
                    </linearGradient>
                </defs>

                {/* Central Orb */}
                <circle cx="50" cy="50" r="12" fill="url(#coreGradient)" filter="url(#glow)" />
                <circle cx="50" cy="50" r="12" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="1" />

                {/* Orbiting Electrons/Particles */}
                <g>
                    <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeOpacity="0.5" />
                    <circle cx="20" cy="50" r="2" fill="hsl(var(--foreground))">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M30,0 a30,12 0 1,0 0,0.01z" />
                    </circle>
                </g>
                <g transform="rotate(60 50 50)">
                    <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeOpacity="0.5" />
                     <circle cx="20" cy="50" r="2" fill="hsl(var(--foreground))">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M30,0 a30,12 0 1,0 0,0.01z" />
                    </circle>
                </g>
                 <g transform="rotate(120 50 50)">
                    <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeOpacity="0.5" />
                     <circle cx="20" cy="50" r="2" fill="hsl(var(--foreground))">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M30,0 a30,12 0 1,0 0,0.01z" />
                    </circle>
                </g>

                 {/* Background static/grid */}
                <g opacity="0.2">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--foreground))" strokeWidth="0.2" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="hsl(var(--foreground))" strokeWidth="0.2" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.2" strokeDasharray="2 2" />
                </g>
            </svg>
        </div>
    )
}
