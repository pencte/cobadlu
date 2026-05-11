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
  const [mounted, setMounted] = useState(false);

  const token = useMemo(() => searchParams.get("data") || "", [searchParams]);

  useEffect(() => {
    setGrowId(localStorage.getItem("growId") || "");
    setMounted(true);
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

    if (!document.querySelector('link[href*="Playfair"]')) {
      const font = document.createElement("link");
      font.rel = "stylesheet";
      font.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Serif+Display:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap";
      document.head.appendChild(font);
    }

    const old = document.getElementById("gt-leather-style");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "gt-leather-style";
    style.innerHTML = `
      /* ── KEYFRAMES ── */
      @keyframes leatherReveal {
        0%  { opacity: 0; transform: translateY(18px); }
        100%{ opacity: 1; transform: translateY(0); }
      }
      @keyframes sheen {
        0%   { left: -120%; }
        100% { left: 220%; }
      }
      @keyframes burnIn {
        0%  { opacity: 0; letter-spacing: 6px; }
        100%{ opacity: 1; letter-spacing: 2.5px; }
      }
      @keyframes glowPulse {
        0%, 100%{ box-shadow: 0 0 0 0 rgba(200,147,58,0.0); }
        50%     { box-shadow: 0 0 18px 3px rgba(200,147,58,0.18); }
      }

      html, body { background: transparent !important; overflow-x: hidden !important; }
      body { font-family: 'Inter', sans-serif !important; }
      .modal { background: transparent !important; }
      .modal-content {
        background: transparent !important; border: none !important;
        box-shadow: none !important; border-radius: 0 !important;
        backdrop-filter: none !important;
      }
      .modal-body { padding: 0 !important; }
      .section-title.center-align { display: none !important; }
      .form-group { margin-bottom: 0 !important; }

      /* ── ROOT VARIABLES ── */
      :root {
        --leather-bg:       #0f0800;
        --leather-surface:  #160e02;
        --leather-header:   #1c1000;
        --leather-border:   #2a1800;
        --leather-border2:  #3d2200;
        --leather-gold:     #c8933a;
        --leather-gold-lt:  #e8c87a;
        --leather-gold-dk:  #8b5e1a;
        --leather-muted:    #5c3d10;
        --leather-dim:      #3d2500;
        --leather-ghost:    #2a1800;
        --leather-text:     #e8d5a0;
        --ff-serif:         'DM Serif Display', 'Playfair Display', serif;
        --ff-body:          'Cormorant Garamond', 'Inter', sans-serif;
        --ff-ui:            'Inter', sans-serif;
      }

      /* ── OUTER WRAPPER ── */
      .lt-outer {
        animation: leatherReveal 0.7s cubic-bezier(0.16,1,0.3,1) both;
      }

      /* ── CARD ── */
      .lt-card {
        border-radius: 20px !important;
        overflow: hidden !important;
        border: 1px solid var(--leather-border2) !important;
        background: linear-gradient(160deg, #1a0e02 0%, #0f0800 60%, #1c1000 100%) !important;
        position: relative !important;
      }
      /* grain overlay */
      .lt-card::before {
        content: '' !important;
        position: absolute !important; inset: 0 !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E") !important;
        pointer-events: none !important; z-index: 0 !important;
        border-radius: 20px !important;
      }

      /* ── GOLD LINE ── */
      .lt-goldline {
        height: 2px !important;
        background: linear-gradient(90deg, transparent 0%, var(--leather-gold) 40%, var(--leather-gold-lt) 60%, transparent 100%) !important;
        position: relative !important; z-index: 2 !important;
      }

      /* ── HEADER ── */
      .lt-head {
        background: linear-gradient(135deg, #2a1500 0%, #1a0d00 100%) !important;
        border-bottom: 1px solid var(--leather-border) !important;
        padding: 20px 22px !important;
        display: flex !important; align-items: center !important; justify-content: space-between !important;
        position: relative !important; z-index: 1 !important;
      }
      .lt-head::after {
        content: '' !important;
        position: absolute !important; inset: 0 !important;
        background: radial-gradient(ellipse at 80% 50%, rgba(200,147,58,0.06), transparent 70%) !important;
        pointer-events: none !important;
      }
      .lt-logo {
        width: 44px !important; height: 44px !important; border-radius: 13px !important;
        background: linear-gradient(135deg, var(--leather-gold) 0%, var(--leather-gold-dk) 100%) !important;
        display: flex !important; align-items: center !important; justify-content: center !important;
        font-size: 22px !important; flex-shrink: 0 !important;
        box-shadow: 0 4px 20px rgba(200,147,58,0.35), inset 0 1px 0 rgba(255,255,255,0.15) !important;
        position: relative !important; overflow: hidden !important;
      }
      .lt-logo::after {
        content: '' !important; position: absolute !important;
        top: 0 !important; left: -120% !important;
        width: 60% !important; height: 100% !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent) !important;
        animation: sheen 4s ease infinite !important;
      }
      .lt-name {
        font-family: var(--ff-serif) !important;
        font-size: 19px !important; color: var(--leather-gold-lt) !important;
        line-height: 1.1 !important; letter-spacing: -0.3px !important;
        margin: 0 !important; display: block !important;
      }
      .lt-sub {
        font-family: var(--ff-ui) !important;
        font-size: 9px !important; font-weight: 500 !important;
        letter-spacing: 2.5px !important; text-transform: uppercase !important;
        color: var(--leather-muted) !important; margin-top: 4px !important; display: block !important;
        animation: burnIn 1.2s ease both !important; animation-delay: 0.4s !important;
      }
      .lt-badge {
        display: flex !important; align-items: center !important; gap: 6px !important;
        padding: 5px 13px !important;
        background: rgba(200,147,58,0.08) !important;
        border: 1px solid rgba(200,147,58,0.22) !important;
        border-radius: 99px !important;
        animation: glowPulse 3s ease infinite !important;
      }
      .lt-badge-dot {
        width: 6px !important; height: 6px !important; border-radius: 50% !important;
        background: var(--leather-gold) !important; display: inline-block !important;
        box-shadow: 0 0 6px rgba(200,147,58,0.6) !important;
      }
      .lt-badge-text {
        font-family: var(--ff-ui) !important;
        font-size: 9px !important; font-weight: 600 !important;
        letter-spacing: 1.5px !important; color: var(--leather-gold) !important;
      }

      /* ── BODY ── */
      .lt-body {
        padding: 22px 22px 18px !important;
        position: relative !important; z-index: 1 !important;
      }

      /* ── ORNAMENT DIVIDER ── */
      .lt-divider {
        display: flex !important; align-items: center !important;
        gap: 10px !important; margin-bottom: 20px !important;
        font-family: var(--ff-serif) !important;
        font-size: 12px !important; color: var(--leather-muted) !important;
      }
      .lt-divider::before,
      .lt-divider::after {
        content: '' !important; flex: 1 !important; height: 0.5px !important;
        background: linear-gradient(90deg, transparent, var(--leather-border2)) !important;
      }
      .lt-divider::after {
        background: linear-gradient(90deg, var(--leather-border2), transparent) !important;
      }

      /* ── LABEL ── */
      .lt-label {
        font-family: var(--ff-ui) !important;
        font-size: 9px !important; font-weight: 600 !important;
        letter-spacing: 2.5px !important; text-transform: uppercase !important;
        color: var(--leather-muted) !important;
        display: block !important; margin-bottom: 8px !important;
      }

      /* ── FIELD ── */
      .lt-field {
        display: flex !important; align-items: stretch !important;
        background: rgba(0,0,0,0.35) !important;
        border: 1px solid var(--leather-border) !important;
        border-radius: 11px !important; overflow: hidden !important;
        margin-bottom: 14px !important;
        transition: border-color 0.25s, box-shadow 0.25s !important;
      }
      .lt-field:focus-within {
        border-color: rgba(200,147,58,0.45) !important;
        box-shadow: 0 0 0 3px rgba(200,147,58,0.08), inset 0 0 24px rgba(200,147,58,0.03) !important;
      }
      .lt-field:focus-within .lt-prefix { color: var(--leather-gold) !important; border-right-color: rgba(200,147,58,0.2) !important; }

      .lt-prefix {
        padding: 0 14px !important; display: flex !important; align-items: center !important;
        color: var(--leather-dim) !important; font-size: 15px !important;
        border-right: 1px solid var(--leather-border) !important; flex-shrink: 0 !important;
        transition: color 0.2s, border-color 0.2s !important;
      }
      .lt-eye {
        padding: 0 14px !important; display: flex !important; align-items: center !important;
        color: var(--leather-ghost) !important; font-size: 15px !important;
        border-left: 1px solid var(--leather-border) !important;
        background: transparent !important; border-top: none !important;
        border-bottom: none !important; border-right: none !important;
        cursor: pointer !important; transition: color 0.15s !important;
      }
      .lt-eye:hover { color: var(--leather-gold) !important; }

      .lt-field .form-control {
        flex: 1 !important; background: transparent !important;
        border: none !important; border-radius: 0 !important;
        padding: 0 14px !important; height: 48px !important;
        color: var(--leather-text) !important;
        -webkit-text-fill-color: var(--leather-text) !important;
        font-family: var(--ff-body) !important;
        font-size: 15px !important; font-weight: 400 !important;
        outline: none !important; box-shadow: none !important;
        letter-spacing: 0.3px !important;
      }
      .lt-field .form-control::placeholder {
        color: var(--leather-dim) !important;
        -webkit-text-fill-color: var(--leather-dim) !important;
        font-style: italic !important;
      }
      .lt-field .form-control:focus { box-shadow: none !important; background: transparent !important; border: none !important; }

      /* ── BUTTONS ── */
      .lt-btnrow {
        display: flex !important; gap: 10px !important;
        margin-top: 14px !important;
      }
      .lt-btn-ghost,
      .lt-btn-ghost input {
        flex: 1 !important; height: 50px !important;
        background: rgba(0,0,0,0.3) !important;
        border: 1px solid var(--leather-border) !important;
        border-radius: 11px !important;
        color: var(--leather-dim) !important;
        font-family: var(--ff-ui) !important;
        font-size: 11px !important; font-weight: 500 !important;
        letter-spacing: 1.5px !important; text-transform: uppercase !important;
        cursor: pointer !important; transition: border-color 0.15s, color 0.15s !important;
        display: flex !important; align-items: center !important; justify-content: center !important;
        width: 100% !important;
      }
      .lt-btn-ghost:hover,
      .lt-btn-ghost input:hover { border-color: var(--leather-border2) !important; color: var(--leather-muted) !important; }

      .lt-btn-main {
        flex: 2 !important; height: 50px !important;
        background: linear-gradient(135deg, var(--leather-gold) 0%, #a06e20 55%, var(--leather-gold-dk) 100%) !important;
        border: none !important; border-radius: 11px !important;
        color: #1a0d00 !important; -webkit-text-fill-color: #1a0d00 !important;
        font-family: var(--ff-serif) !important;
        font-size: 17px !important; font-weight: 400 !important;
        letter-spacing: 0.5px !important;
        cursor: pointer !important;
        box-shadow: 0 4px 22px rgba(200,147,58,0.3), inset 0 1px 0 rgba(255,255,255,0.18) !important;
        transition: transform 0.15s, box-shadow 0.15s, filter 0.15s !important;
        display: flex !important; align-items: center !important; justify-content: center !important;
        gap: 8px !important; position: relative !important; overflow: hidden !important;
      }
      .lt-btn-main::before {
        content: '' !important; position: absolute !important;
        top: 0 !important; left: -120% !important;
        width: 60% !important; height: 100% !important;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) !important;
        animation: sheen 3s ease infinite !important;
      }
      .lt-btn-main:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 32px rgba(200,147,58,0.45), inset 0 1px 0 rgba(255,255,255,0.18) !important;
        filter: brightness(1.06) !important;
      }
      .lt-btn-main:active { transform: translateY(0) !important; }

      /* ── FOOTER ── */
      .lt-footer {
        background: rgba(0,0,0,0.45) !important;
        border-top: 1px solid var(--leather-border) !important;
        padding: 13px 22px !important;
        display: flex !important; align-items: center !important; justify-content: space-between !important;
        position: relative !important; z-index: 1 !important;
      }
      .lt-footer a {
        font-family: var(--ff-ui) !important;
        font-size: 10px !important; font-weight: 500 !important;
        letter-spacing: 0.5px !important; color: var(--leather-muted) !important;
        text-decoration: none !important;
        display: flex !important; align-items: center !important; gap: 7px !important;
        transition: color 0.15s !important;
      }
      .lt-footer a:hover { color: var(--leather-gold) !important; }
      .lt-footer-meta { text-align: right !important; }
      .lt-footer-by {
        font-family: var(--ff-ui) !important;
        font-size: 10px !important; color: var(--leather-ghost) !important; display: block !important;
      }
      .lt-footer-ver {
        font-family: var(--ff-ui) !important;
        font-size: 10px !important; color: #1e1200 !important; display: block !important; margin-top: 2px !important;
      }

      @media (max-width: 480px) {
        .modal-dialog { width: 95vw !important; max-width: 95vw !important; }
      }
    `;
    document.head.appendChild(style);

    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

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
    return () => document.removeEventListener("keydown", keyHandler);
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
          style={{ maxWidth: 430, width: "92vw", margin: "20px auto" }}
        >
          <div className="modal-content">
            <div className="modal-body" style={{ padding: 0 }}>
              <div className="content">
                <section className="common-box" style={{ padding: 0 }}>
                  <div className="container" style={{ width: "100%", padding: 0 }}>
                    <div className="row" style={{ margin: 0 }}>
                      <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>

                        <div className="lt-outer">
                          <div className="lt-card">

                            {/* gold line top */}
                            <div className="lt-goldline" />

                            {/* ── HEADER ── */}
                            <div className="lt-head">
                              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div className="lt-logo">⚜</div>
                                <div>
                                  <span className="lt-name">Terorisme</span>
                                  <span className="lt-sub">Private Server · GT</span>
                                </div>
                              </div>
                              <div className="lt-badge">
                                <span className="lt-badge-dot" />
                                <span className="lt-badge-text">Online</span>
                              </div>
                            </div>

                            {/* ── BODY ── */}
                            <div className="lt-body">
                              <div className="lt-divider">✦ Authentication ✦</div>

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

                                    <label className="lt-label">GrowID</label>
                                    <div className="form-group">
                                      <div className="lt-field">
                                        <span className="lt-prefix">
                                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

                                    <label className="lt-label">Password</label>
                                    <div className="form-group">
                                      <div className="lt-field">
                                        <span className="lt-prefix">
                                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
                                        <button
                                          type="button"
                                          className="lt-eye"
                                          onClick={() => setShowPassword(!showPassword)}
                                        >
                                          {showPassword ? (
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                              <line x1="1" y1="1" x2="23" y2="23"/>
                                            </svg>
                                          ) : (
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                              <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </form>

                                  {/* ── BUTTONS ── */}
                                  <div className="lt-btnrow">
                                    <form
                                      ref={guestFormRef}
                                      method="POST"
                                      action="/player/growid/login/validate"
                                      acceptCharset="UTF-8"
                                      role="form"
                                      autoComplete="off"
                                      onSubmit={handleGuestSubmit}
                                      style={{ flex: 1, display: "flex" }}
                                      className="lt-btn-ghost"
                                    >
                                      <input name="_token" type="hidden" value={token} />
                                      <input name="growId" type="hidden" value="" />
                                      <input name="password" type="hidden" value="" />
                                      <input
                                        className="btn grow-button"
                                        type="submit"
                                        value="Register"
                                        style={{
                                          width: "100%", background: "transparent", border: "none",
                                          color: "inherit", fontFamily: "inherit", fontSize: "inherit",
                                          fontWeight: "inherit", letterSpacing: "inherit",
                                          textTransform: "inherit", cursor: "pointer",
                                        }}
                                      />
                                    </form>

                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        loginFormRef.current?.requestSubmit();
                                      }}
                                      className="lt-btn-main grow-button"
                                    >
                                      Login
                                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                        <polyline points="12 5 19 12 12 19"/>
                                      </svg>
                                    </button>
                                  </div>

                                </div>
                              </div>
                            </div>

                            {/* gold line bottom */}
                            <div className="lt-goldline" />

                            {/* ── FOOTER ── */}
                            <div className="lt-footer">
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
                              <div className="lt-footer-meta">
                                <span className="lt-footer-by">by Test</span>
                                <span className="lt-footer-ver">GTPS // 2022</span>
                              </div>
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
