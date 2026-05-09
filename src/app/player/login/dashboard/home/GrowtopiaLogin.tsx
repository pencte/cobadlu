"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const GrowtopiaLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const loginFormRef = useRef<HTMLFormElement>(null);
  const guestFormRef = useRef<HTMLFormElement>(null);

  const [growId, setGrowId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = useMemo(() => searchParams.get("data") || "", [searchParams]);

  useEffect(() => {
    setGrowId(localStorage.getItem("growId") || "");
  }, []);

  useEffect(() => {
    document.title = "Growtopia Player Support";

    const setFavicon = (href: string) => {
      const setIcon = (rel: string) => {
        let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement("link");
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = href;
      };
      setIcon("icon");
      setIcon("shortcut icon");
    };

    const loadCSS = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    };

    setFavicon(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/images/growtopia.ico"
    );

    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/faq-main.css"
    );
    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/shop-custom.css"
    );
    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/ingame-custom.css"
    );

    if (!document.querySelector('link[href*="Syne"]')) {
      const font = document.createElement("link");
      font.rel = "stylesheet";
      font.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
      document.head.appendChild(font);
    }

    const style = document.createElement("style");
    style.innerHTML = `
      html, body {
        background: transparent !important;
        overflow-x: hidden;
      }
      .modal {
        background: transparent !important;
      }
      body {
        font-family: 'JetBrains Mono', monospace;
      }

      /* ── MODAL WRAPPER ── */
      .modal-content {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        backdrop-filter: none !important;
      }
      .modal-body {
        padding: 0 !important;
      }

      /* ── OUTER CARD ── */
      .gt-card-outer {
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid #2a1a10;
        box-shadow: 0 0 0 1px rgba(234,88,12,0.08), 0 20px 60px rgba(0,0,0,0.6);
        position: relative;
      }

      /* ── TOP GRADIENT BAR ── */
      .gt-top-bar {
        height: 3px;
        background: linear-gradient(90deg, #f97316, #ef4444, #dc2626);
      }

      /* ── IDENTITY STRIP ── */
      .gt-identity {
        background: #111111;
        border-bottom: 1px solid #1e1208;
        padding: 14px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      }
      .gt-identity::after {
        content: '';
        position: absolute;
        top: 0; right: 0;
        width: 80px; height: 80px;
        background: radial-gradient(ellipse at top right, rgba(234,88,12,0.12), transparent 70%);
        pointer-events: none;
      }

      .gt-logo-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .gt-logo-icon {
        width: 34px; height: 34px;
        border-radius: 9px;
        background: linear-gradient(135deg, #f97316, #dc2626);
        display: flex; align-items: center; justify-content: center;
        color: #fff;
        font-size: 18px;
        box-shadow: 0 2px 12px rgba(234,88,12,0.35);
        flex-shrink: 0;
      }

      .gt-title {
        font-family: 'Syne', sans-serif !important;
        font-size: 15px !important;
        font-weight: 800 !important;
        background: linear-gradient(90deg, #f97316, #ef4444) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        letter-spacing: -0.3px;
        line-height: 1;
        margin: 0 !important;
      }
      .gt-logo-sub {
        font-size: 10px;
        color: #3a3a3a;
        margin-top: 2px;
        font-family: 'JetBrains Mono', monospace;
      }

      .gt-live-pill {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #f97316;
        border: 1px solid rgba(249,115,22,0.25);
        background: rgba(234,88,12,0.08);
        padding: 4px 10px;
        border-radius: 99px;
        font-family: 'JetBrains Mono', monospace;
      }
      .gt-live-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f97316, #ef4444);
        animation: gtBlink 1.5s infinite;
      }
      @keyframes gtBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.25; }
      }

      /* ── FORM AREA ── */
      .gt-form-area {
        background: linear-gradient(170deg, #0f0a07 0%, #0c0707 60%, #0a0505 100%);
        padding: 20px 18px 16px;
        position: relative;
        overflow: hidden;
      }

      /* scanline */
      .gt-form-area::before {
        content: '';
        position: absolute;
        left: 0; right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent);
        animation: gtScan 5s linear infinite;
        pointer-events: none;
        z-index: 0;
      }
      @keyframes gtScan {
        0%  { top: 0%; }
        100%{ top: 100%; }
      }

      /* ember particles */
      .gt-ember {
        position: absolute;
        bottom: 0;
        width: 2px;
        border-radius: 99px;
        animation: gtRise linear infinite;
        opacity: 0;
        pointer-events: none;
      }
      .gt-ember:nth-child(1){ left:10%; height:12px; background:#f97316; animation-duration:3s;   animation-delay:0s; }
      .gt-ember:nth-child(2){ left:25%; height:8px;  background:#ef4444; animation-duration:4s;   animation-delay:1s; }
      .gt-ember:nth-child(3){ left:45%; height:10px; background:#f97316; animation-duration:3.5s; animation-delay:0.5s; }
      .gt-ember:nth-child(4){ left:65%; height:6px;  background:#dc2626; animation-duration:2.8s; animation-delay:1.5s; }
      .gt-ember:nth-child(5){ left:82%; height:9px;  background:#f97316; animation-duration:3.2s; animation-delay:0.8s; }
      @keyframes gtRise {
        0%   { transform: translateY(0);    opacity: 0.5; }
        100% { transform: translateY(-70px); opacity: 0; }
      }

      .gt-section-label {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        background: linear-gradient(90deg, #f97316, #ef4444);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        z-index: 1;
        font-family: 'JetBrains Mono', monospace;
      }
      .gt-section-label::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, rgba(249,115,22,0.2), transparent);
        -webkit-text-fill-color: unset;
      }

      /* ── LABELS ── */
      .label-text {
        font-size: 10px !important;
        font-weight: 600 !important;
        letter-spacing: 1.2px !important;
        text-transform: uppercase !important;
        color: #3a3a3a !important;
        display: block !important;
        margin-bottom: 6px !important;
        font-family: 'JetBrains Mono', monospace !important;
        position: relative;
        z-index: 1;
      }

      /* ── FIELD ROW ── */
      .gt-field-row {
        display: flex;
        align-items: stretch;
        border: 1px solid #1e1208;
        background: #080808;
        border-radius: 8px;
        overflow: hidden;
        transition: border-color 0.2s, box-shadow 0.2s;
        margin-bottom: 12px;
        position: relative;
        z-index: 1;
      }
      .gt-field-row:focus-within {
        border-color: rgba(249,115,22,0.5);
        box-shadow: 0 0 0 3px rgba(234,88,12,0.08);
      }

      .gt-field-prefix {
        padding: 0 11px;
        display: flex;
        align-items: center;
        border-right: 1px solid #181008;
        color: #2a2a2a;
        font-size: 15px;
        background: transparent;
        transition: color 0.2s;
        flex-shrink: 0;
      }
      .gt-field-row:focus-within .gt-field-prefix {
        color: #f97316;
      }

      .form-control {
        flex: 1 !important;
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        padding: 11px 13px !important;
        color: #e8e8e8 !important;
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 12px !important;
        outline: none !important;
        box-shadow: none !important;
        height: 42px !important;
      }
      .form-control::placeholder {
        color: #252525 !important;
      }
      .form-control:focus {
        box-shadow: none !important;
        background: transparent !important;
        border: none !important;
      }

      /* ── PASSWORD WRAPPER ── */
      .password-wrapper {
        display: flex;
        align-items: stretch;
        border: 1px solid #1e1208;
        background: #080808;
        border-radius: 8px;
        overflow: hidden;
        transition: border-color 0.2s, box-shadow 0.2s;
        margin-bottom: 12px;
        position: relative;
        z-index: 1;
      }
      .password-wrapper:focus-within {
        border-color: rgba(249,115,22,0.5);
        box-shadow: 0 0 0 3px rgba(234,88,12,0.08);
      }
      .password-wrapper .form-control {
        margin-bottom: 0 !important;
      }

      .toggle-eye {
        padding: 0 11px;
        display: flex;
        align-items: center;
        color: #2a2a2a;
        cursor: pointer;
        font-size: 15px;
        transition: color 0.15s;
        background: transparent;
        border: none;
        line-height: 1;
        border-left: 1px solid #181008;
      }
      .toggle-eye:hover { color: #f97316; }

      /* ── BUTTONS ── */
      .btn {
        border-radius: 8px !important;
        font-family: 'JetBrains Mono', monospace !important;
        transition: all 0.15s !important;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }

      .btn-secondary {
        height: 44px !important;
        border: 1px solid #1e1208 !important;
        background: #080808 !important;
        color: #333 !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
      }
      .btn-secondary:hover {
        border-color: #2a2a2a !important;
        color: #555 !important;
        background: #0f0f0f !important;
        transform: none !important;
      }

      .btn-primary {
        height: 44px !important;
        border: none !important;
        background: linear-gradient(135deg, #f97316 0%, #ef4444 50%, #dc2626 100%) !important;
        color: #fff !important;
        font-family: 'Syne', sans-serif !important;
        font-size: 13px !important;
        font-weight: 800 !important;
        letter-spacing: 0.5px !important;
        text-transform: uppercase !important;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(234,88,12,0.3) !important;
      }
      .btn-primary::before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        animation: gtShimmer 3s infinite;
      }
      @keyframes gtShimmer {
        0%   { left: -100%; }
        100% { left: 200%; }
      }
      .btn-primary::after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 1px;
        background: rgba(255,255,255,0.25);
      }
      .btn-primary:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 25px rgba(234,88,12,0.45) !important;
        filter: brightness(1.08);
      }
      .btn-primary:active {
        transform: translateY(0) !important;
      }

      /* ── FOOTER ── */
      .gt-footer {
        background: #0a0705;
        border-top: 1px solid #1a0f08;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .gt-footer a {
        font-size: 10px !important;
        font-weight: 600 !important;
        letter-spacing: 0.5px !important;
        color: #2e2e2e !important;
        text-decoration: none !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        transition: color 0.15s !important;
        font-family: 'JetBrains Mono', monospace !important;
      }
      .gt-footer a:hover { color: #f97316 !important; }
      .gt-footer-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
      }
      .gt-credit {
        font-size: 10px;
        color: #222;
        font-family: 'JetBrains Mono', monospace;
      }
      .gt-ver {
        font-size: 10px;
        color: #1c1c1c;
        font-family: 'JetBrains Mono', monospace;
      }

      /* hide original section-title h2 wrapper */
      .section-title.center-align { display: none !important; }
      .form-group { margin-bottom: 0 !important; }

      @media (max-width: 480px) {
        .modal-dialog { width: 95vw !important; max-width: 95vw !important; }
      }
    `;
    document.head.appendChild(style);

    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyHeight = document.body.style.height;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlHeight = document.documentElement.style.height;

    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        key === "f12" ||
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && ["i", "c", "j"].includes(key)) ||
        (e.ctrlKey && key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.height = prevBodyHeight;
      document.documentElement.style.height = prevHtmlHeight;
    };
  }, []);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (growId.trim() && password.trim()) {
      localStorage.setItem("growId", growId);
      loginFormRef.current?.submit();
    }
  };

  const handleGuestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("growId", "");
    guestFormRef.current?.submit();
  };

  return (
    <>
      <button type="button" className="btn btn-primary hidden" style={{ display: "none" }} />

      <div
        className="modal fade product-list-popup in"
        style={{
          display: "block",
          inset: 0,
          position: "fixed",
          overflow: "auto",
          background: "transparent",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            maxWidth: 420,
            width: "92vw",
            margin: "20px auto",
          }}
        >
          <div className="modal-content">
            <div className="modal-body" style={{ padding: 0 }}>
              <div className="content">
                <section className="common-box" style={{ padding: 0 }}>
                  <div className="container" style={{ width: "100%", padding: 0 }}>
                    <div className="row" style={{ margin: 0 }}>
                      <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>

                        <div className="gt-card-outer">

                          {/* ── TOP GRADIENT BAR ── */}
                          <div className="gt-top-bar" />

                          {/* ── IDENTITY STRIP ── */}
                          <div className="gt-identity">
                            <div className="gt-logo-row">
                              <div className="gt-logo-icon">⚔️</div>
                              <div>
                                <h2 className="gt-title">TerorismePS</h2>
                                <div className="gt-logo-sub">Private Server · GT</div>
                              </div>
                            </div>
                            <div className="gt-live-pill">
                              <div className="gt-live-dot" />
                              Live
                            </div>
                          </div>

                          {/* ── FORM AREA ── */}
                          <div className="gt-form-area">
                            {/* ember particles */}
                            <div className="gt-ember" />
                            <div className="gt-ember" />
                            <div className="gt-ember" />
                            <div className="gt-ember" />
                            <div className="gt-ember" />

                            <div className="gt-section-label">🔐 Authentication</div>

                            <div className="row div-content-center" style={{ margin: 0 }}>
                              <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>

                                <form
                                  ref={loginFormRef}
                                  method="POST"
                                  action="/player/growid/login/validate"
                                  acceptCharset="UTF-8"
                                  role="form"
                                  autoComplete="off"
                                  onSubmit={handleLoginSubmit}
                                >
                                  <input name="_token" type="hidden" value={token} />

                                  <label className="label-text">GrowID</label>
                                  <div className="form-group">
                                    <div className="gt-field-row">
                                      <span className="gt-field-prefix">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                      </span>
                                      <input
                                        className="form-control grow-text"
                                        placeholder="your_growid"
                                        name="growId"
                                        type="text"
                                        value={growId}
                                        onChange={(e) => setGrowId(e.target.value)}
                                      />
                                    </div>
                                  </div>

                                  <label className="label-text">Password</label>
                                  <div className="form-group password-wrapper">
                                    <span className="gt-field-prefix" style={{ borderRight: "1px solid #181008" }}>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    </span>
                                    <input
                                      className="form-control grow-text"
                                      placeholder="••••••••••"
                                      name="password"
                                      type={showPassword ? "text" : "password"}
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span
                                      className="toggle-eye"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? "🙈" : "👁️"}
                                    </span>
                                  </div>
                                </form>

                                <div
                                  className="form-group"
                                  style={{
                                    display: "flex",
                                    gap: 10,
                                    marginTop: 10,
                                    position: "relative",
                                    zIndex: 1,
                                  }}
                                >
                                  <form
                                    ref={guestFormRef}
                                    method="POST"
                                    action="/player/growid/login/validate"
                                    acceptCharset="UTF-8"
                                    role="form"
                                    autoComplete="off"
                                    onSubmit={handleGuestSubmit}
                                    style={{ flex: 1 }}
                                  >
                                    <input name="_token" type="hidden" value={token} />
                                    <input name="growId" type="hidden" value="" />
                                    <input name="password" type="hidden" value="" />

                                    <input
                                      className="btn btn-secondary grow-button"
                                      type="submit"
                                      value="Register"
                                      style={{ width: "100%", height: 44 }}
                                    />
                                  </form>

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      loginFormRef.current?.requestSubmit();
                                    }}
                                    className="btn btn-primary grow-button"
                                    style={{ flex: 2, height: 44 }}
                                  >
                                    Login →
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>

                          {/* ── FOOTER ── */}
                          <div className="gt-footer">
                            <a
                              href="https://discord.gg/vaFUAhDfUH"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.029.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                              Join Discord
                            </a>
                            <div className="gt-footer-right">
                              <span className="gt-credit">by Test</span>
                              <span className="gt-ver">GT:PS // 2026</span>
                            </div>
                          </div>

                        </div>{/* end gt-card-outer */}

                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrowtopiaLogin;
