import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useFontSize } from './FontSizeContext';
import { useTheme } from './ThemeContext';
import lightLogo from './assets/Approved Standard Logo.png';
import darkLogo from './assets/Approved Standard Logo - Dark.png';
import contrastLogo from './assets/Approved Standard Logo - Contrast.png';

const C = {
  navy: "#1a2a5e", navyDark: "#000000", gold: "#CACACA",
};

const TA_GROUPS = [
  ["Profile","Grades","Calendar","Messages","Private files","Reports"],
  ["Settings","Language"],
  ["Log out"],
];

function TADropdown({ themeStyles, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const handleItemClick = (item) => {
    if (item === "Settings") navigate("/");
    if (item === "Log out") window.location.href = "/";
    setOpen(false);
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:"none", border:"none", cursor:"pointer", padding:"0" }}>
        <div style={{ width:"2.125rem", height:"2.125rem", borderRadius:"50%", background: open ? themeStyles.primaryText : C.gold, color: C.navy, border: open ? `2px solid ${themeStyles.primaryText}` : "none", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", fontSize:"0.875rem", fontFamily:"inherit", transition:"all 0.15s" }}>TA</div>
        <span style={{ color: "white", fontSize:"0.75rem" }}>{open ? "▲" : "▾"}</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 0.5rem)", right:0, background: themeStyles.surface, borderRadius:"0.5rem", boxShadow:"0 0.5rem 2rem rgba(0,0,0,0.2)", minWidth:"13rem", zIndex:999, overflow:"hidden" }}>
          <div style={{ background: C.navy, padding:"0.625rem 1rem", display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"0.5rem" }}>
            <div style={{ width:"2.25rem", height:"2.25rem", borderRadius:"50%", background: themeStyles.surface, color: C.navy, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", fontSize:"0.875rem" }}>TA</div>
            <span style={{ color: "white", fontSize:"0.75rem" }}>▲</span>
          </div>
          {TA_GROUPS.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div style={{ height:"0.0625rem", background: themeStyles.border }}/>}
              {group.map(item => (
                <button key={item} onClick={() => handleItemClick(item)} style={{ display:"block", width:"100%", textAlign:"left", padding:"0.75rem 1.25rem", border:"none", background:"none", cursor:"pointer", fontSize:"0.9375rem", color: themeStyles.primaryText, fontFamily:"inherit", transition:"background 0.12s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = themeStyles.hover; e.currentTarget.style.color = themeStyles.primaryText; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = themeStyles.primaryText; }}
                >{item}</button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const NAV_ITEMS = [
  "Home", "Dashboard", "My Courses",
  "Professional Education", "Undergraduate Programmes",
  "Postgraduate Programmes", "CDP"
];

const SIDEBAR_ITEMS = [
  { label: "User account", key: "user_account" },
  { label: "Notifications", key: "notifications" },
  { label: "Badges", key: "badges" },
  { label: "Portfolios", key: "portfolios" },
  { label: "Blogs", key: "blogs" },
];

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6z" stroke="white" strokeWidth="1.5" fill="none"/>
    <path d="M8.5 16.5a1.5 1.5 0 0 0 3 0" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="2" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" fill="none"/>
    <path d="M6 17l4-3h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

function BellDropdown({ themeStyles, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const notifications = [
    { title: "Platform Update", body: "Now available: customize your screen and text controls", action: () => navigate("/display") },
    { title: "ISM 402", body: "AGADA-Mba Margaret has given feedback for assignment CA 3", action: null },
  ];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", display: "flex", alignItems: "center" }}>
        <BellIcon />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", right: 0, background: themeStyles.surface, borderRadius: "0.75rem", boxShadow: "0 0.5rem 2rem rgba(0,0,0,0.18)", minWidth: "20rem", zIndex: 999, overflow: "hidden", border: `1px solid ${themeStyles.border}` }}>
          {notifications.map((n, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: "0.0625rem", background: themeStyles.border }} />}
              <div onClick={() => { if (n.action) { n.action(); setOpen(false); } }}
                style={{ padding: "1rem 1.25rem", cursor: n.action ? "pointer" : "default" }}
                onMouseEnter={e => { if (n.action) e.currentTarget.style.background = themeStyles.hover; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                <div style={{ fontWeight: "700", fontSize: "0.9375rem", color: themeStyles.primaryText, marginBottom: "0.3rem" }}>{n.title}</div>
                <div style={{ fontSize: "0.875rem", color: themeStyles.secondaryText, lineHeight: 1.4 }}>{n.body}</div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${themeStyles.border}` }}>
            <button style={{ width: "100%", padding: "0.875rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.9375rem", color: themeStyles.primaryText, fontFamily: "inherit", textAlign: "center" }}>See all</button>
          </div>
        </div>
      )}
    </div>
  );
}

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="18" height="18" rx="3" fill="white" fillOpacity="0.15"/>
    <path d="M3 3l12 12M15 3L3 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="18" height="18" rx="3" fill="white" fillOpacity="0.15"/>
    <path d="M5 7h2v6H5zM6 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM8 7h2v1s.5-1 2-1c1.5 0 2 1 2 2.5V13h-2v-3c0-.8-.3-1.2-.9-1.2-.7 0-1.1.5-1.1 1.2V13H8V7z" fill="white"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="18" height="18" rx="3" fill="white" fillOpacity="0.15"/>
    <path d="M14 9s0-3-.4-4a1.3 1.3 0 0 0-.9-.9C11.8 4 9 4 9 4s-2.8 0-3.7.1a1.3 1.3 0 0 0-.9.9C4 6 4 9 4 9s0 3 .4 4c.2.5.5.8.9.9C6.2 14 9 14 9 14s2.8 0 3.7-.1c.4-.1.7-.4.9-.9.4-1 .4-4 .4-4z" stroke="white" strokeWidth="1" fill="none"/>
    <path d="M7.5 11V7l3.5 2-3.5 2z" fill="white"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="18" height="18" rx="3" fill="white" fillOpacity="0.15"/>
    <path d="M10 9h2l.5-2H10V5.5C10 5 10.2 5 10.5 5H12V3h-2C8.3 3 8 4.3 8 5.5V7H6v2h2v6h2V9z" fill="white"/>
  </svg>
);


export default function PAUDisplayPage() {
  const [activeSection, setActiveSection] = useState("user_account");
  const navigate = useNavigate();
  const { fontSize, changeFontSize } = useFontSize();
  const { theme, setTheme } = useTheme();

  const themeStyles = theme === 'dark' ? {
    background: "#0F1419",
    surface: "#1A2332",
    headerFooter: "#0E1664",
    primaryText: "#FFFFFF",
    secondaryText: "#9E9E9E",
    border: "#2A3A5E",
    arrow: "#FFFFFF",
    hover: "#2A3A5E",
  } : theme === 'highcontrast' ? {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    headerFooter: "#000000",
    primaryText: "#000000",
    secondaryText: "#444444",
    border: "#000000",
    arrow: "#000000",
    hover: "#E0E0E0",
  } : {
    background: "#F0F0F0",
    surface: "white",
    headerFooter: "#1a2a5e",
    primaryText: "#1a2a5e",
    secondaryText: "#666666",
    border: "#e0e0d8",
    arrow: "#1a2a5e",
    hover: "#e0e0d8",
  };

  const ChevronRight = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polygon points="6,4 18,11 6,18" fill={themeStyles.arrow}/>
    </svg>
  );

  return (
    <div style={{
      fontFamily: "'Century Gothic', 'CenturyGothic', 'AppleGothic', sans-serif",
      minHeight: "100vh",
      background: themeStyles.background,
      color: themeStyles.primaryText,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top bar */}
      <div style={{
        background: themeStyles.headerFooter,
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 2rem",
        fontSize: "0.8125rem",
      }}>
        <div style={{ display: "flex", gap: "1.75rem" }}>
          <span>📞 Call us : (+234) 708 864 1465 &nbsp; (+234) 701 782 5427</span>
          <span>✉ E-mail : admissions@pau.edu.ng</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <BellDropdown themeStyles={themeStyles} navigate={navigate} />
          <ChatIcon />
          <TADropdown themeStyles={themeStyles} navigate={navigate} />
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: themeStyles.surface,
        borderBottom: `0.0625rem solid ${themeStyles.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginRight: "2rem", padding: "0.75rem 0" }}>
          <img 
            src={theme === 'dark' ? darkLogo : theme === 'highcontrast' ? contrastLogo : lightLogo} 
            alt="PAN-ATLANTIC UNIVERSITY"
            style={{ height: "3.25rem", width: "auto" }}
          />
        </div>
        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item} 
              onClick={() => {
                if (item === "Dashboard") {
                  navigate("/dashboard");
                }
              }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "1.125rem 0.75rem", fontSize: "0.84375rem", color: themeStyles.primaryText,
                fontFamily: "inherit", fontWeight: "500", whiteSpace: "nowrap",
                borderBottom: "0.1875rem solid transparent",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = themeStyles.border}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}
            >
              {item}{["Professional Education","Undergraduate Programmes","Postgraduate Programmes","CDP"].includes(item) ? " ▾" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: "13.75rem", minWidth: "11.25rem",
          background: themeStyles.surface,
          borderRight: `0.0625rem solid ${themeStyles.border}`,
          padding: "2rem 0",
        }}>
          <div style={{
            fontWeight: "800", fontSize: "1.375rem", color: themeStyles.primaryText,
            padding: "0 1.5rem 1.5rem",
            letterSpacing: "-0.02em",
          }}>Settings</div>

          {SIDEBAR_ITEMS.map(({ label, key }) => (
            <button key={key}
              onClick={() => {
                if (label === "User account") {
                  navigate("/");
                } else {
                  setActiveSection(key);
                }
              }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.875rem 1.5rem", border: "none", cursor: "pointer",
                background: activeSection === key ? themeStyles.hover : "transparent",
                color: themeStyles.primaryText,
                fontFamily: "inherit",
                fontSize: "0.90625rem",
                fontWeight: activeSection === key ? "700" : "500",
                borderLeft: activeSection === key ? `0.25rem solid ${themeStyles.arrow}` : "0.25rem solid transparent",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (activeSection !== key) e.currentTarget.style.background = themeStyles.hover; }}
              onMouseLeave={e => { if (activeSection !== key) e.currentTarget.style.background = "transparent"; }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "2.25rem 3rem" }}>
          {/* Username */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <div style={{
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              color: themeStyles.primaryText,
              background: theme === 'dark' ? "#000000" : themeStyles.surface,
              boxShadow: "0 0.0625rem 0.25rem rgba(0,0,0,0.06)",
              textAlign: "right",
            }}>
              <div style={{ fontWeight: "700" }}>Username:</div>
              <div>Toluwanimi Adeyemo</div>
            </div>
          </div>

          {/* Breadcrumb title */}
          <div style={{ marginBottom: "2.25rem" }}>
            <h1 style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              fontSize: "1.75rem", fontWeight: "800", color: themeStyles.primaryText,
              margin: "0 0 0.375rem", letterSpacing: "-0.02em",
            }}>
              User account
              <ChevronRight />
              Display
            </h1>
            <p style={{ margin: 0, color: themeStyles.secondaryText, fontSize: "0.875rem" }}>
              Change your theme and font settings
            </p>
          </div>

          {/* Theme section */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: "700", color: themeStyles.primaryText, margin: "0 0 0.375rem" }}>Theme</h2>
            <p style={{ margin: "0 0 1rem", color: themeStyles.secondaryText, fontSize: "0.875rem" }}>Change your UI theme below</p>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              {(["light", "dark", "highcontrast"] as const).map((opt) => (
                <label key={opt} style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  cursor: "pointer", fontSize: "0.9375rem", color: themeStyles.primaryText,
                  fontWeight: theme === opt ? "600" : "400",
                }}>
                  <div onClick={() => setTheme(opt)} style={{
                    width: "1.25rem", height: "1.25rem", borderRadius: "50%",
                    border: `2px solid ${themeStyles.arrow}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    background: themeStyles.surface,
                  }}>
                    {theme === opt && (
                      <div style={{
                        width: "0.625rem", height: "0.625rem", borderRadius: "50%",
                        background: themeStyles.arrow,
                      }} />
                    )}
                  </div>
                  {opt === "light" ? "Light mode" : opt === "dark" ? "Dark mode" : "High contrast"}
                </label>
              ))}
            </div>
          </div>

          {/* Font size section */}
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: "700", color: themeStyles.primaryText, margin: "0 0 0.375rem" }}>Font size</h2>
            <p style={{ margin: "0 0 1rem", color: themeStyles.secondaryText, fontSize: "0.875rem" }}>Change your UI font size below</p>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              {["small", "normal", "large"].map((opt) => (
                <label key={opt} style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  cursor: "pointer", fontSize: "0.9375rem", color: themeStyles.primaryText,
                  fontWeight: fontSize === opt ? "600" : "400",
                }}>
                  <div onClick={() => changeFontSize(opt)} style={{
                    width: "1.25rem", height: "1.25rem", borderRadius: "50%",
                    border: `2px solid ${themeStyles.arrow}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    background: themeStyles.surface,
                  }}>
                    {fontSize === opt && (
                      <div style={{
                        width: "0.625rem", height: "0.625rem", borderRadius: "50%",
                        background: themeStyles.arrow,
                      }} />
                    )}
                  </div>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: themeStyles.headerFooter,
        color: "white",
        padding: "2.25rem 3rem",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1.4fr 1fr",
        gap: "3rem",
        fontSize: "0.8125rem",
      }}>
        {/* Mission */}
        <div>
          <p style={{ margin: "0", color: "#d0cdc5", fontSize: "0.78125rem", fontStyle: "italic", lineHeight: "1.7" }}>
            The Mission Statement of the University is: "to form competent and committed professionals and encourage them to serve with personal initiative and social responsibility the community in which they work, thereby helping to build a better society in Nigeria and Africa at large." This
          </p>
        </div>

        {/* Info */}
        <div>
          <h4 style={{ color: "#ffffff", fontWeight: "700", margin: "0 0 0.875rem", fontSize: "0.9375rem", letterSpacing: "0.04em" }}>Info</h4>
          {["PAU Website", "PAU Servicedesk", "PAU Privacy Policy", "Apply to PAU"].map(link => (
            <div key={link} style={{ marginBottom: "0.5rem" }}>
              <a href="#" style={{ color: "#c0bdb5", textDecoration: "underline", fontSize: "0.8125rem" }}>{link}</a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: "#ffffff", fontWeight: "700", margin: "0 0 0.875rem", fontSize: "0.9375rem", letterSpacing: "0.04em" }}>Contact Us</h4>
          <p style={{ margin: "0 0 0.625rem", color: "#d0cdc5", lineHeight: "1.6" }}>
            Km 52, Lekki-Epe Expressway, Ibeju-Lekki,<br/>PO Box 73688, Lagos, Nigeria
          </p>
          <p style={{ margin: 0, color: "#d0cdc5" }}>
            📞 Phone : (+234) 708 864 1465 (+234) 701 782 5427
          </p>
        </div>

        {/* Follow */}
        <div>
          <h4 style={{ color: "#ffffff", fontWeight: "700", margin: "0 0 0.875rem", fontSize: "0.9375rem", letterSpacing: "0.04em" }}>Follow Us</h4>
          <div style={{ display: "flex", gap: "0.625rem" }}>
            {[XIcon, LinkedInIcon, YouTubeIcon, FacebookIcon].map((Icon, i) => (
              <div key={i} style={{
                width: "2.125rem", height: "2.125rem", borderRadius: "0.25rem",
                border: "0.0625rem solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}>
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}