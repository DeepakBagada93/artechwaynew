
export function MobileCta() {
    return (
        <div className="md:hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="40"
                height="40"
                className="fill-primary stroke-foreground"
            >
                <defs>
                    <clipPath id="circleClip">
                        <circle cx="50" cy="50" r="25" />
                    </clipPath>
                </defs>
                <circle cx="50" cy="50" r="25" className="fill-background stroke-primary" strokeWidth="2" />
                <g clipPath="url(#circleClip)">
                    <g>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="360 50 50"
                            to="0 50 50"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                        {/* Simplified continents */}
                        <path d="M30,30 Q40,20 50,30 T70,30" strokeWidth="2" fill="none" />
                        <path d="M25,50 Q35,60 45,50 T65,50" strokeWidth="2" fill="none" />
                        <path d="M40,70 Q50,60 60,70 T80,70" strokeWidth="2" fill="none" />
                    </g>
                </g>
                 <style>{`
                    .fill-primary { fill: hsl(var(--primary)); }
                    .stroke-primary { stroke: hsl(var(--primary)); }
                    .fill-background { fill: hsl(var(--background)); }
                    .stroke-foreground { stroke: hsl(var(--foreground)); }
                `}</style>
            </svg>
        </div>
    )
}
