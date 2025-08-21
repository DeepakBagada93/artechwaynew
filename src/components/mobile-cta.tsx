
export function MobileCta() {
    return (
        <div className="md:hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="40"
                height="40"
                className="fill-primary"
            >
                <g>
                    <path d="M 50,25 A 25,25 0 1,1 50,75 A 25,25 0 1,1 50,25 Z">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 50 50"
                            to="360 50 50"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <circle cx="50" cy="50" r="20" className="fill-background" />
                    <circle cx="42" cy="45" r="3" className="fill-foreground" />
                    <circle cx="58" cy="45" r="3" className="fill-foreground" />
                    <path
                        d="M 40 55 Q 50 65, 60 55"
                        strokeWidth="2"
                        className="stroke-foreground"
                        fill="none"
                    />
                    <rect x="48" y="70" width="4" height="10" rx="2" className="fill-muted" />
                    <rect x="42" y="78" width="16" height="4" rx="2" className="fill-muted" />
                </g>
                 <style>{`
                    .fill-primary { fill: hsl(var(--primary)); }
                    .fill-background { fill: hsl(var(--background)); }
                    .fill-foreground { fill: hsl(var(--foreground)); }
                    .fill-muted { fill: hsl(var(--muted)); }
                    .stroke-foreground { stroke: hsl(var(--foreground)); }
                `}</style>
            </svg>
        </div>
    )
}
