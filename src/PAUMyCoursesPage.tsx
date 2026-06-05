import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useFontSize } from './FontSizeContext';
import lightLogo from './assets/Approved Standard Logo.png';
import darkLogo from './assets/Approved Standard Logo - Dark.png';
import contrastLogo from './assets/Approved Standard Logo - Contrast.png';
import courseimage1 from './assets/Course1.png';
import courseimage2 from './assets/Course2.png';
import courseimage3 from './assets/Course3.png';
import courseimage4 from './assets/Course4.png';
import courseimage5 from './assets/Course5.png';
import courseimage6 from './assets/Course6.png';

const C = {
  navy: "#1a2a5e", navyDark: "#000000", gold: "#CACACA",
  blue1: "#3b9edb", blue2: "#7bbce8", pink: "#e05c8a",
  teal: "#4ec9c9", yellow: "#f0b429", gray: "#f2f2ef",
  border: "#e0e0d8", text: "#333", muted: "#888",
  green: "#27ae60", white: "#fff",
};

const allCourses = [
  { code: "ISM 402", title: "Production Management (TV)", semester: "Semester 2", color: C.blue1,   pattern: "grid",    complete: true, image: courseimage1 },
  { code: "ISM 404", title: "Professional Ethics",        semester: "Semester 2", color: C.pink,    pattern: "circles", complete: true, image: courseimage2 },
  { code: "ISM 406", title: "Digital Rendering",          semester: "Semester 2", color: "#b0bec5", pattern: "rings",   complete: true, image: courseimage3 },
  { code: "ISM 408", title: "Project II",                 semester: "Semester 2", color: C.blue2,   pattern: "plaid",   complete: true, image: courseimage4 },
  { code: "ISM 413", title: "Entertainment Media",        semester: "Semester 2", color: C.yellow,  pattern: "dots",    complete: true, image: courseimage5 },
  { code: "ISM 414", title: "Computer Security",          semester: "Semester 2", color: C.teal,    pattern: "plaid",   complete: true, image: courseimage6 },
];

const BellIcon = () => (
  <svg width="1.25rem" height="1.25rem" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6z" stroke="white" strokeWidth="1.5" fill="none"/>
    <path d="M8.5 16.5a1.5 1.5 0 0 0 3 0" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="1.25rem" height="1.25rem" viewBox="0 0 20 20" fill="none">
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
                style={{ padding: "1rem 1.25rem", cursor: n.action ? "pointer" : "default", transition: "background 0.12s" }}
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

function CourseCard({ course, themeStyles, navigate }) {
  const [hov, setHov] = useState(false);
  const hc = themeStyles.headerFooter === "#000000" && themeStyles.background === "#FFFFFF";
  const completeColor = hc ? "#000000" : C.green;
  return (
    <div
      onClick={() => navigate(`/course/${course.code}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: themeStyles.surface, borderRadius: "0.5rem", border: `1px solid ${themeStyles.border}`,
        overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.15s, transform 0.15s",
        boxShadow: hov ? "0 0.25rem 0.75rem rgba(0,0,0,0.13)" : "0 0.0625rem 0.25rem rgba(0,0,0,0.07)",
        transform: hov ? "translateY(-0.1rem)" : "none",
      }}
    >
      <div style={{ height: "8rem", position: "relative", overflow: "hidden" }}>
        <img src={course.image} alt={course.code} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ padding: "0.6rem 0.75rem 0.5rem" }}>
        <div style={{ fontSize: "0.82rem", fontWeight: "600", color: themeStyles.primaryText, lineHeight: 1.3 }}>
          {course.code} - {course.title}
        </div>
        <div style={{ fontSize: "0.75rem", color: themeStyles.secondaryText, marginTop: "0.2rem" }}>{course.semester}</div>
        {course.complete !== undefined && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: completeColor, fontWeight: "600" }}>100% complete</span>
            <span style={{ fontSize: "1rem", color: themeStyles.secondaryText, cursor: "pointer" }}>⋮</span>
          </div>
        )}
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

export default function PAUMyCoursesPage() {
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { fontSize } = useFontSize();

  const themeStyles = theme === 'dark' ? {
    background: "#0F1419",
    surface: "#1A2332",
    headerFooter: "#0E1664",
    primaryText: "#FFFFFF",
    secondaryText: "#9E9E9E",
    border: "#2A3A5E",
    arrow: "#FFFFFF",
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

  const dark = theme === 'dark';
  const hc = theme === 'highcontrast';
  const CC = {
    headBg:     hc ? "#FFFFFF" : dark ? "#1A2332" : "#EAEAEA",
    bodyBg:     hc ? "#FFFFFF" : dark ? "#27354A" : "#DFDFDF",
    border:     hc ? "#000000" : dark ? "#3E4C62" : "#B2B2B2",
    headingText: hc ? "#000000" : dark ? "#FFFFFF" : "#1A2A5E",
  };

  const filtered = allCourses.filter(c =>
    `${c.code} ${c.title}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: themeStyles.background, fontSize: `${fontSize}px`, fontFamily: "inherit" }}>

      {/* Top bar */}
      <div style={{ background: themeStyles.headerFooter, color: "white", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.5rem 2rem", fontSize:"0.8125rem" }}>
        <div style={{ display:"flex", gap:"1.75rem" }}>
          <span>📞 Call us : (+234) 708 864 1465 &nbsp; (+234) 701 782 5427</span>
          <span>✉ E-mail : admissions@pau.edu.ng</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <BellDropdown themeStyles={themeStyles} navigate={navigate} />
          <ChatIcon />
          <TADropdown themeStyles={themeStyles} navigate={navigate} />
          <span style={{ fontSize:"0.8125rem" }}>Edit Mode</span>
          <div onClick={() => setEditMode(e => !e)} style={{ width:"2.5rem", height:"1.375rem", borderRadius:"0.6875rem", background: editMode ? C.blue1 : "#555", position:"relative", cursor:"pointer", transition:"background 0.2s" }}>
            <div style={{ position:"absolute", top:"0.125rem", left: editMode ? "1.25rem" : "0.125rem", width:"1.125rem", height:"1.125rem", borderRadius:"50%", background: "white", transition:"left 0.2s" }}/>
          </div>
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

      {/* Page content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
        <div style={{ width: "62rem", maxWidth: "100%", margin: "0 auto" }}>

          {/* Course Overview card */}
          <div style={{ borderRadius: "0.5rem", border: `1px solid ${CC.border}`, overflow: "hidden" }}>
            <div style={{ background: CC.headBg, padding: "0.875rem 1.25rem", borderBottom: `1px solid ${CC.border}` }}>
              <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: "700", color: CC.headingText }}>Course Overview</h2>
            </div>
            <div style={{ background: CC.bodyBg, padding: "1.125rem 1.25rem" }}>
              {/* Filters */}
              <div style={{ display: "flex", gap: "0.625rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <select style={{ fontSize: "0.8125rem", padding: "0.375rem 0.625rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.25rem", fontFamily: "inherit", color: themeStyles.primaryText, background: themeStyles.surface }}>
                  <option>All</option>
                </select>
                <input
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ fontSize: "0.8125rem", padding: "0.375rem 0.75rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.25rem", fontFamily: "inherit", flex: "1", minWidth: "7.5rem", outline: "none", background: themeStyles.surface, color: themeStyles.primaryText }}
                />
                <select style={{ fontSize: "0.8125rem", padding: "0.375rem 0.625rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.25rem", fontFamily: "inherit", color: themeStyles.primaryText, background: themeStyles.surface }}>
                  <option>Sort by course name</option>
                  <option>Sort by last accessed</option>
                </select>
                <select style={{ fontSize: "0.8125rem", padding: "0.375rem 0.625rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.25rem", fontFamily: "inherit", color: themeStyles.primaryText, background: themeStyles.surface }}>
                  <option>Card</option>
                  <option>List</option>
                </select>
              </div>

              {/* Course grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }}>
                {filtered.map(c => <CourseCard key={c.code} course={c} themeStyles={themeStyles} navigate={navigate} />)}
              </div>

              {/* Show control */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", fontSize: "0.8125rem", color: themeStyles.primaryText }}>
                <span>Show</span>
                <select style={{ fontSize: "0.8125rem", padding: "0.25rem 0.5rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.25rem", fontFamily: "inherit", color: themeStyles.primaryText, background: themeStyles.surface }}>
                  <option>All</option><option>6</option>
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Help button */}
      <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100 }}>
        <button style={{ width:"3rem", height:"3rem", borderRadius:"50%", background: themeStyles.helpButton, color: "white", border:"none", fontSize:"1.25rem", fontWeight:"700", cursor:"pointer", boxShadow:"0 0.25rem 0.75rem rgba(0,0,0,0.25)" }}>?</button>
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