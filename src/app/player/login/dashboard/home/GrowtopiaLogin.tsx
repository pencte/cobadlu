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

    // Load fonts
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

      /* ── IDENTITY STRIP (top white bar) ── */
      .gt-identity {
        background: #fff;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 2.5px solid #fff;
        border-bottom: none;
      }

      .gt-title {
        font-family: 'Syne', sans-serif !important;
        font-size: 26px !important;
        font-weight: 800 !important;
        color: #0a0a0a !important;
        letter-spacing: -0.5px;
        line-height: 1;
        margin: 0 !important;
      }

      .gt-title-dot {
        display: inline-block;
        width: 8px; height: 8px;
        background: #ff3b00;
        border-radius: 50%;
        margin-left: 3px;
        margin-bottom: 6px;
        vertical-align: bottom;
        animation: gtDotPop 2.5s ease infinite;
      }

      @keyframes gtDotPop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.4); }
      }

      .gt-identity-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;
      }

      .gt-ps-badge {
        font-family: 'Syne', sans-serif;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #fff;
        background: #0a0a0a;
        padding: 4px 10px;
      }

      .gt-live-pill {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 8px;
        font-weight: 500;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: #0a0a0a;
        font-family: 'JetBrains Mono', monospace;
      }

      .gt-live-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #22c55e;
        animation: gtBlink 1.5s infinite;
      }

      @keyframes gtBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; }
      }

      /* ── FORM AREA ── */
      .gt-form-area {
        background: #0c0c0c;
        border: 2.5px solid #fff;
        border-top: 3px solid #ff3b00;
        padding: 22px 20px 18px;
        position: relative;
        overflow: hidden;
      }

      .gt-deco-corner {
        position: absolute;
        top: 0; right: 0;
        width: 60px; height: 60px;
        background: repeating-linear-gradient(
          -45deg,
          rgba(255,59,0,0.06) 0px, rgba(255,59,0,0.06) 3px,
          transparent 3px, transparent 9px
        );
        pointer-events: none;
      }

      .gt-section-label {
        font-size: 8px;
        font-weight: 700;
        letter-spacing: 2.5px;
        text-transform: uppercase;
        color: #ff3b00;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'JetBrains Mono', monospace;
      }

      .gt-section-label::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #1e1e1e;
      }

      /* ── LABELS ── */
      .label-text {
        font-size: 8px !important;
        font-weight: 700 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        color: #3a3a3a !important;
        display: block !important;
        margin-bottom: 6px !important;
        font-family: 'JetBrains Mono', monospace !important;
      }

      /* ── FIELD ROW ── */
      .gt-field-row {
        display: flex;
        align-items: stretch;
        border: 1.5px solid #1e1e1e;
        background: #080808;
        transition: border-color 0.2s;
        margin-bottom: 14px;
      }

      .gt-field-row:focus-within {
        border-color: #ff3b00;
      }

      .gt-field-prefix {
        padding: 0 12px;
        display: flex;
        align-items: center;
        border-right: 1.5px solid #1e1e1e;
        color: #2a2a2a;
        font-size: 14px;
        background: #060606;
        transition: color 0.2s, border-color 0.2s;
      }

      .gt-field-row:focus-within .gt-field-prefix {
        color: #ff3b00;
        border-color: #ff3b00;
      }

      .form-control {
        flex: 1 !important;
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;
        padding: 12px 14px !important;
        color: #e8e8e8 !important;
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 12.5px !important;
        outline: none !important;
        box-shadow: none !important;
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
        border: 1.5px solid #1e1e1e;
        background: #080808;
        transition: border-color 0.2s;
        margin-bottom: 14px;
      }

      .password-wrapper:focus-within {
        border-color: #ff3b00;
      }

      .password-wrapper .form-control {
        margin-bottom: 0 !important;
      }

      .toggle-eye {
        padding: 0 12px;
        display: flex;
        align-items: center;
        color: #2a2a2a;
        cursor: pointer;
        font-size: 15px;
        transition: color 0.15s;
        background: transparent;
        border: none;
        line-height: 1;
      }

      .toggle-eye:hover { color: #ff3b00; }

      /* ── BUTTONS ── */
      .btn {
        border-radius: 0 !important;
        font-family: 'JetBrains Mono', monospace !important;
        transition: all 0.15s !important;
        cursor: pointer;
      }

      .btn-secondary {
        height: 50px !important;
        border: 1.5px solid #1e1e1e !important;
        background: #080808 !important;
        color: #2e2e2e !important;
        font-size: 9px !important;
        font-weight: 700 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
      }

      .btn-secondary:hover {
        border-color: #333 !important;
        color: #666 !important;
        background: #0f0f0f !important;
        transform: none !important;
      }

      .btn-primary {
        height: 50px !important;
        border: none !important;
        background: #ff3b00 !important;
        color: #fff !important;
        font-family: 'Syne', sans-serif !important;
        font-size: 13px !important;
        font-weight: 800 !important;
        letter-spacing: 1.5px !important;
        text-transform: uppercase !important;
        position: relative;
        overflow: hidden;
      }

      .btn-primary:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 20px rgba(255,59,0,0.35) !important;
        background: #ff4d1a !important;
      }

      .btn-primary:active {
        transform: translateY(0) !important;
      }

      /* ── FOOTER ── */
      .gt-footer {
        background: #080808;
        border: 2.5px solid #fff;
        border-top: 1.5px solid #111;
        padding: 11px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .gt-footer a {
        font-size: 9px !important;
        font-weight: 700 !important;
        letter-spacing: 1px !important;
        text-transform: uppercase !important;
        color: #2a2a2a !important;
        text-decoration: none !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        transition: color 0.15s !important;
        font-family: 'JetBrains Mono', monospace !important;
      }

      .gt-footer a:hover { color: #ff3b00 !important; }

      .gt-footer-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
      }

      .gt-credit {
        font-size: 8px;
        color: #1a1a1a;
        letter-spacing: 0.5px;
        font-family: 'JetBrains Mono', monospace;
      }

      .gt-ver {
        font-size: 8px;
        color: #151515;
        letter-spacing: 0.5px;
        font-family: 'JetBrains Mono', monospace;
      }

      /* hide original section-title h2 wrapper */
      .section-title.center-align { display: none !important; }

      /* hide form-group margin default */
      .form-group { margin-bottom: 0 !important; }

      @media (max-width: 480px) {
        .modal-dialog { width: 95vw !important; }
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
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            maxWidth: 420,
            width: "92vw",
            margin: "0 auto",
          }}
        >
          <div className="modal-content">
            <div className="modal-body" style={{ padding: 0 }}>
              <div className="content">
                <section className="common-box" style={{ padding: 0 }}>
                  <div className="container" style={{ width: "100%", padding: 0 }}>
                    <div className="row" style={{ margin: 0 }}>
                      <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>

                        {/* ── IDENTITY STRIP ── */}
                        <div className="gt-identity">
                          <h2 className="gt-title">
                            TerorismePS
                            <span className="gt-title-dot" />
                          </h2>
                          <div className="gt-identity-right">
                            <span className="gt-ps-badge">Private Server</span>
                            <div className="gt-live-pill">
                              <div className="gt-live-dot" />
                              Online
                            </div>
                          </div>
                        </div>

                        {/* ── FORM AREA ── */}
                        <div className="gt-form-area">
                          <div className="gt-deco-corner" />
                          <div className="gt-section-label">Authentication</div>

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
                                  <span className="gt-field-prefix" style={{ borderRight: "1.5px solid #1e1e1e" }}>
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
                                  marginTop: 8,
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
                                    style={{ width: "100%", height: 50 }}
                                  />
                                </form>

                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    loginFormRef.current?.requestSubmit();
                                  }}
                                  className="btn btn-primary grow-button"
                                  style={{ flex: 2, height: 50 }}
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
