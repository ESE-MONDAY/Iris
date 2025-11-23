import React from "react";

type HeroProps = {
    onGetStarted?: () => void;
    whitepaperUrl?: string;
};

const EyeIcon: React.FC<{ size?: number }> = ({ size = 120 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <defs>
            <radialGradient id="g1" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#6EE7B7" stopOpacity="1" />
                <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
            </radialGradient>
        </defs>
        <rect width="120" height="120" rx="20" fill="url(#g1)" opacity="0.12" />
        <g transform="translate(12 28)">
            <ellipse cx="48" cy="28" rx="48" ry="28" fill="#0f172a" opacity="0.06" />
            <path
                d="M0 28C12 8 84 8 96 28C84 48 12 48 0 28Z"
                fill="transparent"
                stroke="url(#g1)"
                strokeWidth="3"
            />
            <circle cx="48" cy="28" r="12" fill="#0f172a" />
            <circle cx="48" cy="28" r="6" fill="#fff" opacity="0.92" />
            <circle cx="54" cy="24" r="1.7" fill="#fff" opacity="0.9" />
        </g>
    </svg>
);

const Feature: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="flex gap-12 flex-start" >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" fill="#111827" opacity="0.08" />
            <path d="M9 12.5l2 2 4-5" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 600 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>{subtitle}</div>}
        </div>
    </div>
);

const Hero: React.FC<HeroProps> = ({ onGetStarted, whitepaperUrl }) => {
    return (
        <section
            aria-label="IRIS Hero"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "64px 20px",
                background: "linear-gradient(180deg, #0f172a 0%, #07112a 100%)",
                color: "white",
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    width: "100%",
                    display: "flex",
                    gap: 36,
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ flex: "1 1 420px", minWidth: 280 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
                        <div style={{ background: "linear-gradient(90deg,#7C3AED,#60A5FA)", padding: 8, borderRadius: 10 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <circle cx="12" cy="12" r="10" fill="white" opacity="0.06" />
                                <path d="M7 12h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600 }}>IRIS • ERC-8004</span>
                    </div>

                    <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1.03, letterSpacing: -0.5 }}>
                        IRIS: The All-Seeing Eye
                    </h1>

                    <p style={{ marginTop: 16, fontSize: 18, color: "#cbd5e1", maxWidth: 680 }}>
                        The unfakeable trust layer for autonomous AI Agents. We are the ERC-8004 blueprint for verifiable identity and
                        payment-backed reputation.
                    </p>

                    <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                   

                        <a
                            href={whitepaperUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block",
                                padding: "12px 18px",
                                borderRadius: 10,
                                background: "transparent",
                                border: "1px solid rgba(148,163,184,0.12)",
                                color: "#cbd5e1",
                                textDecoration: "none",
                                fontWeight: 600,
                            }}
                        >
                            Read Whitepaper
                        </a>
                    </div>

                    <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
                        <Feature
                            title="Verifiable Identity"
                            subtitle="On-chain attestations that can’t be forged or copied."
                        />
                        <Feature
                            title="Payment-backed Reputation"
                            subtitle="Reputation anchored by economic stake to make sybil attacks expensive."
                        />
                        <Feature
                            title="ERC-8004 Blueprint"
                            subtitle="A modular standard for interoperable agent identity and trust."
                        />
                    </div>
                </div>

                <div
                    style={{
                        width: 320,
                        minWidth: 260,
                        borderRadius: 18,
                        padding: 18,
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                        boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    aria-hidden
                >
                    <EyeIcon size={160} />
                    <div style={{ marginTop: 14, textAlign: "center", color: "#cbd5e1" }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>Unfakeable signals</div>
                        <div style={{ fontSize: 13, marginTop: 6, color: "#94a3b8" }}>
                            Verifiable claims + backed reputations = reliable agent identity for open ecosystems.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;