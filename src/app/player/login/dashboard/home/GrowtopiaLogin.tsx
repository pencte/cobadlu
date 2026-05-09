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

    loadCSS("https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/faq-main.css");
    loadCSS("https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/shop-custom.css");
    loadCSS("https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/ingame-custom.css");

    if (!document.querySelector('link[href*="Syne"]')) {
      const font = document.createElement("link");
      font.rel = "stylesheet";
      font.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap";
      document.head.appendChild(font);
    }

    const old = document.getElementById("gt-fire-style");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "gt-fire-style";
    style.innerHTML = `
      @keyframes gtBlink    { 0%,100%{opacity:1} 50%{opacity:0.2} }
      @keyframes gtScan     { 0%{top:0%} 100%{top:100%} }
      @keyframes gtRise     { 0%{transform:translateY(0);opacity:0.6} 100%{transform:translateY(-80px);opacity:0} }
      @keyframes gtShimmer  { 0%{left:-120%} 100%{left:220%} }

      html, body { background: transparent !important; overflow-x: hidden !important; }
      body { font-family: 'JetBrains Mono', monospace !important; }
      .modal { background: transparent !important; }
      .modal-content {
        background: transparent !important; border: none !important;
        box-shadow: none !important; border-radius: 0 !important;
        backdrop-filter: none !important;
      }
      .modal-body { padding: 0 !important; }
      .section-title.center-align { display: none !important; }
      .form-group { margin-bottom: 0 !important; }

      /* CARD */
      .gt-ps-card {
        border-radius: 14px !important;
        overflow: hidden !important;
        border: 1px solid #2a1810 !important;
        box-shadow:
          0 0 0 1px rgba(249,115,22,0.1),
          0 8px 40px rgba(0,0,0,0.75),
          0 0 80px rgba(234,88,12,0.07) !important;
        position: relative !important;
      }

      /* TOP BAR */
      .gt-ps-topbar {
        height: 3px !important;
        background: linear-gradient(90deg,#f97316 0%,#ef4444 50%,#dc2626 100%) !important;
        display: block !important;
      }

      /* HEADER */
      .gt-ps-head {
        background: #111111 !important;
        border-bottom: 1px solid #1e1208 !important;
        padding: 14px 18px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        position: relative !important;
        overflow: hidden !important;
      }
      .gt-ps-head::before {
        content: '' !important;
        position: absolute !important; top: 0 !important; right: 0 !important;
        width: 100px !important; height: 100px !important;
        background: radial-gradient(ellipse at top right, rgba(249,115,22,0.14), transparent 70%) !important;
        pointer-events: none !important;
      }
      .gt-ps-head::after {
        content: '' !important;
        position: absolute !important; bottom: 0 !important; left: 0 !important;
        width: 60px !important; height: 60px !important;
        background: radial-gradient(ellipse at bottom left, rgba(220,38,38,0.07), transparent 70%) !important;
        pointer-events: none !important;
      }
      .gt-ps-logo-row {
        display: flex !important; align-items: center !important;
        gap: 11px !important; position: relative !important; z-index: 1 !important;
      }
      .gt-ps-logo-box {
        width: 36px !important; height: 36px !important;
        border-radius: 9px !important;
        background: linear-gradient(135deg,#f97316 0%,#dc2626 100%) !important;
        display: flex !important; align-items: center !important; justify-content: center !important;
        font-size: 18px !important; flex-shrink: 0 !important;
        box-shadow: 0 2px 14px rgba(234,88,12,0.45), 0 0 0 1px rgba(249,115,22,0.25) !important;
      }
      .gt-ps-name {
        font-family: 'Syne', sans-serif !important;
        font-size: 15px !important; font-weight: 800 !important;
        background: linear-gradient(90deg,#f97316,#ef4444) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        letter-spacing: -0.3px !important; line-height: 1 !important;
        margin: 0 !important; display: block !important;
      }
      .gt-ps-sub {
        font-size: 10px !important; color: #383838 !important;
        margin-top: 3px !important; font-family: 'JetBrains Mono', monospace !important;
        display: block !important;
      }
      .gt-ps-live {
        display: flex !important; align-items: center !important; gap: 6px !important;
        font-size: 10px !important; font-weight: 700 !important; letter-spacing: 1px !important;
        color: #f97316 !important;
        border: 1px solid rgba(249,115,22,0.3) !important;
        background: rgba(234,88,12,0.1) !important;
        padding: 5px 11px !important; border-radius: 99px !important;
        font-family: 'JetBrains Mono', monospace !important;
        position: relative !important; z-index: 1 !important;
      }
      .gt-ps-live-dot {
        width: 6px !important; height: 6px !important; border-radius: 50% !important;
        background: linear-gradient(135deg,#f97316,#ef4444) !important;
        animation: gtBlink 1.5s ease infinite !important;
        display: inline-block !important; flex-shrink: 0 !important;
      }

      /* BODY */
      .gt-ps-body {
        background: linear-gradient(160deg,#0f0a07 0%,#0c0707 55%,#090404 100%) !important;
        padding: 20px 18px 18px !important;
        position: relative !important; overflow: hidden !important;
      }
      .gt-ps-scan {
        position: absolute !important; left: 0 !important; right: 0 !important;
        height: 1px !important;
        background: linear-gradient(90deg,transparent 0%,rgba(249,115,22,0.18) 50%,transparent 100%) !important;
        animation: gtScan 5s linear infinite !important;
        pointer-events: none !important; z-index: 0 !important;
      }
      .gt-ps-ember {
        position: absolute !important; bottom: 0 !important;
        width: 2px !important; border-radius: 99px !important;
        animation: gtRise linear infinite !important;
        opacity: 0 !important; pointer-events: none !important; z-index: 0 !important;
      }
      .gt-ps-ember:nth-child(2){left:8%;  height:14px;background:#f97316;animation-duration:3.1s;animation-delay:0s}
      .gt-ps-ember:nth-child(3){left:22%;height:9px; background:#ef4444;animation-duration:4.0s;animation-delay:0.9s}
      .gt-ps-ember:nth-child(4){left:44%;height:11px;background:#f97316;animation-duration:3.4s;animation-delay:0.4s}
      .gt-ps-ember:nth-child(5){left:63%;height:7px; background:#dc2626;animation-duration:2.7s;animation-delay:1.6s}
      .gt-ps-ember:nth-child(6){left:81%;height:10px;background:#f97316;animation-duration:3.6s;animation-delay:0.7s}

      .gt-ps-section {
        font-size: 9px !important; font-weight: 700 !important;
        letter-spacing: 2.5px !important; text-transform: uppercase !important;
        color: #f97316 !important; margin-bottom: 18px !important;
        display: flex !important; align-items: center !important; gap: 8px !important;
        position: relative !important; z-index: 1 !important;
        font-family: 'JetBrains Mono', monospace !important;
      }
      .gt-ps-section::after {
        content: '' !important; flex: 1 !important; height: 1px !important;
        background: linear-gradient(90deg,rgba(249,115,22,0.25),transparent) !important;
      }

      /* LABELS */
      .gt-ps-label {
        font-size: 10px !important; font-weight: 700 !important;
        letter-spacing: 1.5px !important; text-transform: uppercase !important;
        color: #3a3a3a !important; display: block !important;
        margin-bottom: 7px !important;
        font-family: 'JetBrains Mono', monospace !important;
        position: relative !important; z-index: 1 !important;
      }

      /* FIELD */
      .gt-ps-field {
        display: flex !important; align-items: stretch !important;
        background: #080808 !important; border: 1px solid #1e1208 !important;
        border-radius: 8px !important; overflow: hidden !important;
        margin-bottom: 13px !important;
        position: relative !important; z-index: 1 !important;
        transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
      }
      .gt-ps-field:focus-within {
        border-color: rgba(249,115,22,0.55) !important;
        box-shadow: 0 0 0 3px rgba(234,88,12,0.1), inset 0 0 20px rgba(249,115,22,0.03) !important;
      }
      .gt-ps-field:focus-within .gt-ps-prefix {
        color: #f97316 !important;
        border-right-color: rgba(249,115,22,0.2) !important;
      }
      .gt-ps-prefix {
        padding: 0 12px !important; display: flex !important; align-items: center !important;
        color: #282828 !important; font-size: 14px !important;
        border-right: 1px solid #181008 !important; flex-shrink: 0 !important;
        transition: color 0.2s ease, border-color 0.2s ease !important;
      }
      .gt-ps-eye {
        padding: 0 12px !important; display: flex !important; align-items: center !important;
        color: #282828 !important; font-size: 14px !important;
        border-left: 1px solid #181008 !important; border-top: none !important;
        border-bottom: none !important; border-right: none !important;
        cursor: pointer !important; flex-shrink: 0 !important;
        background: transparent !important; line-height: 1 !important;
        transition: color 0.15s ease !important;
      }
      .gt-ps-eye:hover { color: #f97316 !important; }

      .gt-ps-field .form-control {
        flex: 1 !important; background: transparent !important;
        border: none !important; border-radius: 0 !important;
        padding: 11px 13px !important; height: 44px !important;
        color: #e0e0e0 !important; -webkit-text-fill-color: #e0e0e0 !important;
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 12.5px !important; outline: none !important; box-shadow: none !important;
      }
      .gt-ps-field .form-control::placeholder { color: #222 !important; -webkit-text-fill-color: #222 !important; }
      .gt-ps-field .form-control:focus { box-shadow: none !important; background: transparent !important; border: none !important; }

      /* BUTTONS ROW */
      .gt-ps-btnrow {
        display: flex !important; gap: 10px !important;
        margin-top: 12px !important;
        position: relative !important; z-index: 1 !important;
      }
      .gt-ps-btnrow .btn-secondary,
      .gt-ps-btnrow input.btn-secondary {
        flex: 1 !important; height: 46px !important;
        border: 1px solid #1e1208 !important; border-radius: 8px !important;
        background: #080808 !important; color: #2e2e2e !important;
        font-size: 10px !important; font-weight: 700 !important;
        letter-spacing: 1.2px !important; text-transform: uppercase !important;
        font-family: 'JetBrains Mono', monospace !important;
        cursor: pointer !important; box-shadow: none !important;
        transition: border-color 0.15s, color 0.15s !important;
      }
      .gt-ps-btnrow .btn-secondary:hover,
      .gt-ps-btnrow input.btn-secondary:hover {
        border-color: #2a2a2a !important; color: #4a4a4a !important;
      }
      .gt-ps-btnrow .btn-primary,
      .gt-ps-btnrow button.btn-primary {
        flex: 2 !important; height: 46px !important;
        border: none !important; border-radius: 8px !important;
        background: linear-gradient(135deg,#f97316 0%,#ef4444 55%,#dc2626 100%) !important;
        color: #fff !important; -webkit-text-fill-color: #fff !important;
        font-family: 'Syne', sans-serif !important;
        font-size: 14px !important; font-weight: 800 !important;
        letter-spacing: 0.5px !important; text-transform: uppercase !important;
        cursor: pointer !important; position: relative !important; overflow: hidden !important;
        box-shadow: 0 4px 20px rgba(234,88,12,0.35), inset 0 1px 0 rgba(255,255,255,0.15) !important;
        transition: transform 0.15s, box-shadow 0.15s, filter 0.15s !important;
      }
      .gt-ps-btnrow .btn-primary::before,
      .gt-ps-btnrow button.btn-primary::before {
        content: '' !important; position: absolute !important;
        top: 0 !important; left: -120% !important;
        width: 60% !important; height: 100% !important;
        background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent) !important;
        animation: gtShimmer 3s ease infinite !important; pointer-events: none !important;
      }
      .gt-ps-btnrow .btn-primary:hover,
      .gt-ps-btnrow button.btn-primary:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 28px rgba(234,88,12,0.5), inset 0 1px 0 rgba(255,255,255,0.15) !important;
        filter: brightness(1.08) !important;
      }
      .gt-ps-btnrow .btn-primary:active,
      .gt-ps-btnrow button.btn-primary:active { transform: translateY(0) !important; }

      /* FOOTER */
      .gt-ps-footer {
        background: #0a0705 !important; border-top: 1px solid #1a0f08 !important;
        padding: 11px 18px !important;
        display: flex !important; align-items: center !important; justify-content: space-between !important;
      }
      .gt-ps-footer a {
        font-size: 10px !important; font-weight: 600 !important;
        letter-spacing: 0.5px !important; color: #2a2a2a !important;
        text-decoration: none !important;
        display: flex !important; align-items: center !important; gap: 7px !important;
        font-family: 'JetBrains Mono', monospace !important;
        transition: color 0.15s !important;
      }
      .gt-ps-footer a:hover { color: #f97316 !important; }
      .gt-ps-footer-right { text-align: right !important; }
      .gt-ps-credit { font-size: 10px !important; color: #1e1e1e !important; font-family: 'JetBrains Mono', monospace !important; display: block !important; }
      .gt-ps-ver    { font-size: 10px !important; color: #191919 !important; font-family: 'JetBrains Mono', monospace !important; display: block !important; margin-top: 2px !important; }

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

                        {/* ── OUTER CARD ── */}
                        <div className="gt-ps-card">

                          {/* top gradient bar */}
                          <div className="gt-ps-topbar" />

                          {/* ── HEADER ── */}
                          <div className="gt-ps-head">
                            <div className="gt-ps-logo-row">
                              <div className="gt-ps-logo-box">⚔️</div>
                              <div>
                                <span className="gt-ps-name">TerorismePS</span>
                                <span className="gt-ps-sub">Private Server · GT</span>
                              </div>
                            </div>
                            <div className="gt-ps-live">
                              <span className="gt-ps-live-dot" />
                              Live
                            </div>
                          </div>

                          {/* ── BODY ── */}
                          <div className="gt-ps-body">
                            <div className="gt-ps-scan" />
                            <div className="gt-ps-ember" />
                            <div className="gt-ps-ember" />
                            <div className="gt-ps-ember" />
                            <div className="gt-ps-ember" />
                            <div className="gt-ps-ember" />

                            <div className="gt-ps-section">🔐 Authentication</div>

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

                                  <label className="gt-ps-label">GrowID</label>
                                  <div className="form-group">
                                    <div className="gt-ps-field">
                                      <span className="gt-ps-prefix">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                          <circle cx="12" cy="7" r="4"/>
                                        </svg>
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

                                  <label className="gt-ps-label">Password</label>
                                  <div className="form-group">
                                    <div className="gt-ps-field">
                                      <span className="gt-ps-prefix">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                        </svg>
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
                                        className="gt-ps-eye"
                                        onClick={() => setShowPassword(!showPassword)}
                                      >
                                        {showPassword ? "🙈" : "👁️"}
                                      </span>
                                    </div>
                                  </div>
                                </form>

                                <div className="gt-ps-btnrow">
                                  <form
                                    ref={guestFormRef}
                                    method="POST"
                                    action="/player/growid/login/validate"
                                    acceptCharset="UTF-8"
                                    role="form"
                                    autoComplete="off"
                                    onSubmit={handleGuestSubmit}
                                    style={{ flex: 1, display: "flex" }}
                                  >
                                    <input name="_token" type="hidden" value={token} />
                                    <input name="growId" type="hidden" value="" />
                                    <input name="password" type="hidden" value="" />
                                    <input
                                      className="btn btn-secondary grow-button"
                                      type="submit"
                                      value="Register"
                                      style={{ width: "100%" }}
                                    />
                                  </form>

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      loginFormRef.current?.requestSubmit();
                                    }}
                                    className="btn btn-primary grow-button"
                                    style={{ flex: 2 }}
                                  >
                                    Login →
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>

                          {/* ── FOOTER ── */}
                          <div className="gt-ps-footer">
                            <a
                              href="https://discord.gg/vaFUAhDfUH"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.056a19.9 19.9 0 0 0 5.993 3.029.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                              </svg>
                              Join Discord
                            </a>
                            <div className="gt-ps-footer-right">
                              <span className="gt-ps-credit">by Test</span>
                              <span className="gt-ps-ver">GT:PS // 2026</span>
                            </div>
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
