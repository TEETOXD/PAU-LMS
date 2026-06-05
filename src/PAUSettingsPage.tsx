import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from "react";
import { useFontSize } from './FontSizeContext';
import { useTheme } from './ThemeContext';
import lightLogo from './assets/Approved Standard Logo.png';
import darkLogo from './assets/Approved Standard Logo - Dark.png';
import contrastLogo from './assets/Approved Standard Logo - Contrast.png';

const C = {
  navy: "#1a2a5e", navyDark: "#000000", gold: "#CACACA",
};

const TA_GROUPS = [
  ["Profile", "Grades", "Calendar", "Messages", "Private files", "Reports"],
  ["Settings", "Language"],
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
    if (item === "Settings") navigate("/settings");
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

const SIDEBAR_ITEMS = [
  { label: "User account", key: "user_account" },
  { label: "Notifications", key: "notifications" },
  { label: "Badges", key: "badges" },
  { label: "Portfolios", key: "portfolios" },
  { label: "Blogs", key: "blogs" },
];

const SETTINGS_OPTIONS = [
  ["Edit profile", "Calendar preferences"],
  ["Change password", "Content bank preferences"],
  ["Preferred language", "Security keys"],
  ["Display", "Message preferences"],
  ["Forum preferences", "Notification prefencences"],
  ["Editor preferences", "Linked logins"],
];

//const ChevronRightIcon = () => (
//  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//    <circle cx="9" cy="9" r="9" fill={themeStyles?.arrow || "#1a2a5e"}/>
//    <path d="M7 5.5L11 9L7 12.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//  </svg>
//);

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

// ===== SETTING BUTTON WITH NAVIGATION =====
function SettingButtonWithNavigation({ label, navigateTo, themeStyles }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onClick={() => navigate(navigateTo)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.625rem",
        cursor: "pointer",
      }}
    >
      {/* Arrow circle — sits OUTSIDE the border box */}
      <div style={{ flexShrink: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill={themeStyles.arrow}/>
          <path d="M11 8.5L17 14L11 19.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Bordered label box */}
      <div style={{
        flex: 1,
        background: hovered ? themeStyles.hover : themeStyles.buttonBg,
        border: `0.0625rem solid ${themeStyles.buttonBorder}`,
        borderRadius: "0.5rem",
        padding: "0.75rem 1rem",
        fontFamily: "'Century Gothic', 'CenturyGothic', 'AppleGothic', sans-serif",
        fontSize: "0.9375rem", color: themeStyles.primaryText,
        fontWeight: "500",
        transition: "background 0.15s",
      }}>
        {label}
      </div>
    </div>
  );
}

// ===== REGULAR SETTING BUTTON =====
function SettingButton({ label, themeStyles }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.625rem",
        cursor: "pointer",
      }}
    >
      {/* Arrow circle — sits OUTSIDE the border box */}
      <div style={{ flexShrink: 0 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill={themeStyles.arrow}/>
          <path d="M11 8.5L17 14L11 19.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* Bordered label box */}
      <div style={{
        flex: 1,
        background: hovered ? themeStyles.hover : themeStyles.buttonBg,
        border: `0.0625rem solid ${themeStyles.buttonBorder}`,
        borderRadius: "0.5rem",
        padding: "0.75rem 1rem",
        fontFamily: "'Century Gothic', 'CenturyGothic', 'AppleGothic', sans-serif",
        fontSize: "0.9375rem", color: themeStyles.primaryText,
        fontWeight: "500",
        transition: "background 0.15s",
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── Responsive Nav ───────────────────────────────────────────────────────────
function ResponsiveNav({ items, activeItem, themeStyles, onNavigate }: {
  items: string[];
  activeItem?: string;
  themeStyles: any;
  onNavigate: (item: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const btns = Array.from(el.querySelectorAll<HTMLButtonElement>('[data-nav-item]'));
      const moreBtnEl = el.querySelector<HTMLButtonElement>('[data-more-btn]');
      const available = el.offsetWidth - (moreBtnEl ? moreBtnEl.offsetWidth + 8 : 80);
      let used = 0;
      let count = 0;
      for (const btn of btns) {
        used += btn.offsetWidth;
        if (used > available) break;
        count++;
      }
      setVisibleCount(count === items.length ? items.length : Math.max(1, count));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [items]);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const btnStyle = (item: string): React.CSSProperties => ({
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '1.125rem 0.75rem', fontSize: '0.84375rem',
    color: themeStyles.primaryText, fontFamily: 'inherit',
    fontWeight: '500', whiteSpace: 'nowrap',
    borderBottom: item === activeItem ? `0.1875rem solid transparent` : '0.1875rem solid transparent',
  });

  const hiddenItems = items.slice(visibleCount);

  return (
    <div ref={containerRef} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, overflow: 'hidden', position: 'relative' }}>
      {items.map((item, i) => (
        <button
          key={item}
          data-nav-item=""
          onClick={() => onNavigate(item)}
          style={{ ...btnStyle(item), visibility: i < visibleCount ? 'visible' : 'hidden', position: i < visibleCount ? 'relative' : 'absolute', pointerEvents: i < visibleCount ? 'auto' : 'none' }}
        >{item}</button>
      ))}
      {hiddenItems.length > 0 && (
        <div ref={moreRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button data-more-btn="" onClick={() => setMoreOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1.125rem 0.75rem', fontSize: '0.84375rem', color: themeStyles.primaryText, fontFamily: 'inherit', fontWeight: '500', whiteSpace: 'nowrap' }}>
            More {moreOpen ? '▲' : '▾'}
          </button>
          {moreOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, background: themeStyles.surface, border: `1px solid ${themeStyles.border}`, borderRadius: '0.375rem', boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,0.15)', zIndex: 999, minWidth: '12rem' }}>
              {hiddenItems.map(item => (
                <button key={item} onClick={() => { onNavigate(item); setMoreOpen(false); }}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.75rem 1.25rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: themeStyles.primaryText, fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = themeStyles.hover; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
                >{item}</button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PAUSettingsPage() {
  const [activeSection, setActiveSection] = useState("user_account");
  const navigate = useNavigate();
  const { fontSize, changeFontSize } = useFontSize();
  const { theme } = useTheme();
  
  const themeStyles = theme === 'dark' ? {
    background: "#0F1419",
    surface: "#1A2332",
    headerFooter: "#0E1664",
    primaryText: "#FFFFFF",
    secondaryText: "#9E9E9E",
    border: "#2A3A5E",
    arrow: "#155DFC",
    hover: "#2A3A5E",
    helpButton: "#155DFC",
    buttonBg: "#0F1419",
    buttonBorder: "#6D88B0",
  } : theme === 'highcontrast' ? {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    headerFooter: "#000000",
    primaryText: "#000000",
    secondaryText: "#444444",
    border: "#000000",
    arrow: "#000000",
    hover: "#E0E0E0",
    helpButton: "#000000",
    buttonBg: "#FFFFFF",
    buttonBorder: "#000000",
  } : {
    background: "#F0F0F0",
    surface: "white",
    headerFooter: "#1a2a5e",
    primaryText: "#1a2a5e",
    secondaryText: "#666666",
    border: "#e0e0d8",
    arrow: "#1a2a5e",
    hover: "#e0e0d8",
    helpButton: "#1a2a5e",
    buttonBg: "#F0F0F0",
    buttonBorder: "#B3B3B3",
  };

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

      {/* Nav bar */}
      <div style={{ background: themeStyles.surface, borderBottom: `0.0625rem solid ${themeStyles.border}`, display: "flex", alignItems: "center", padding: "0 2rem", overflow: "hidden", flexWrap: "nowrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginRight: "2rem", padding: "0.75rem 0" }}>
          <img 
            src={theme === 'dark' ? darkLogo : theme === 'highcontrast' ? contrastLogo : lightLogo} 
            alt="PAN-ATLANTIC UNIVERSITY"
            style={{ height: "3.25rem", width: "auto" }}
          />
        </div>
        <ResponsiveNav
          items={["Home", "Dashboard", "My Courses", "Professional Education ▾", "Undergraduate Programmes ▾", "Postgraduate Programmes ▾", "CDP ▾"]}
          activeItem="Dashboard"
          themeStyles={themeStyles}
          onNavigate={item => {
            if (item === "Dashboard") navigate("/dashboard");
            if (item === "My Courses") navigate("/my-courses");
            if (item === "Home") navigate("/");
          }}
        />
      </div>

      {/* Main content */}
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
              onClick={() => setActiveSection(key)}
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
              onMouseEnter={e => { if (activeSection !== key) { e.currentTarget.style.background = themeStyles.hover; } }}
              onMouseLeave={e => { if (activeSection !== key) { e.currentTarget.style.background = "transparent"; } }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, padding: "2.25rem 3rem" }}>
          {/* Section header + Username side by side */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
            <div>
              <h1 style={{
                fontSize: "1.75rem", fontWeight: "800", color: themeStyles.primaryText,
                margin: "0 0 0.375rem", letterSpacing: "-0.02em",
              }}>User account</h1>
              <p style={{ margin: 0, color: themeStyles.secondaryText, fontSize: "0.875rem" }}>
                Control your e-learning account and all communications
              </p>
            </div>
            <div style={{
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              color: themeStyles.primaryText,
              background: theme === 'dark' ? "#000000" : themeStyles.surface,
              boxShadow: "0 0.0625rem 0.25rem rgba(0,0,0,0.06)",
              textAlign: "right",
              flexShrink: 0,
              marginLeft: "1.5rem",
            }}>
              <div style={{ fontWeight: "700" }}>Username:</div>
              <div>Toluwanimi Adeyemo</div>
            </div>
          </div>

          {/* Options grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.875rem 3rem",
            maxWidth: "52rem",
          }}>
            {SETTINGS_OPTIONS.map(([left, right], rowIdx) => (
              <React.Fragment key={rowIdx}>
                {left === "Display" ? (
                  <SettingButtonWithNavigation label={left} navigateTo="/display" themeStyles={themeStyles} />
                ) : (
                  <SettingButton label={left} themeStyles={themeStyles} />
                )}
                {right === "Display" ? (
                  <SettingButtonWithNavigation label={right} navigateTo="/display" themeStyles={themeStyles} />
                ) : (
                  <SettingButton label={right} themeStyles={themeStyles} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
        <footer style={{ background: themeStyles.headerFooter, color: "white", padding:"2.25rem 3rem", display:"grid", gridTemplateColumns:"1.6fr 1fr 1.4fr 1fr", gap:"3rem", fontSize:"0.8125rem" }}>
          <div>
            <p style={{ margin:0, color:"#c8c5bc", lineHeight:"1.7", fontStyle:"italic", fontSize:"0.78125rem" }}>
              The Mission Statement of the University is: "to form competent and committed professionals and encourage them to serve with personal initiative and social responsibility the community in which they work, thereby helping to build a better society in Nigeria and Africa at large." This dream encapsulates the purpose of the University.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#ffffff", fontWeight:"700", margin:"0 0 0.875rem", fontSize:"0.9375rem" }}>Info</h4>
            {["PAU Website","PAU Servicedesk","PAU Privacy Policy","Apply to PAU"].map(l => (
              <div key={l} style={{ marginBottom:"0.5rem" }}><a href="#" style={{ color:"#c0bdb5", textDecoration:"underline", fontSize:"0.8125rem" }}>{l}</a></div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#ffffff", fontWeight:"700", margin:"0 0 0.875rem", fontSize:"0.9375rem" }}>Contact Us</h4>
            <p style={{ margin:"0 0 0.625rem", color:"#d0cdc5", lineHeight:"1.6" }}>Km 52, Lekki-Epe Expressway, Ibeju-Lekki,<br/>PO Box 73688, Lagos, Nigeria</p>
            <p style={{ margin:"0 0 0.375rem", color:"#d0cdc5" }}>📞 Phone : (+234) 708 864 1465 (+234) 701 782 5427</p>
            <p style={{ margin:0, color:"#d0cdc5" }}>✉ Email : admissions@pau.edu.ng</p>
          </div>
          <div>
            <h4 style={{ color: "#ffffff", fontWeight:"700", margin:"0 0 0.875rem", fontSize:"0.9375rem" }}>Follow Us</h4>
            <div style={{ display:"flex", gap:"0.625rem" }}>
              {["𝕏","in","▶","f"].map((icon,i) => (
                <div key={i} style={{ width:"2.125rem", height:"2.125rem", borderRadius:"0.25rem", border:"0.0625rem solid rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:"0.875rem", color: "white" }}>{icon}</div>
              ))}
            </div>
          </div>
        </footer>
        <div style={{ background: "#000", color:"#fff", textAlign:"center", padding:"0.75rem", fontSize:"0.78125rem", borderTop:"0.0625rem solid rgba(255,255,255,0.07)" }}>
          Copyright © 2026 – Developed by PAU ICT and Toluwanimi Adeyemo. Powered by Moodle
        </div>
    </div>
  );
}