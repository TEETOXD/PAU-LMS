import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useFontSize } from './FontSizeContext';
import { useTheme } from './ThemeContext';
import lightLogo from './assets/Approved Standard Logo.png';
import darkLogo from './assets/Approved Standard Logo - Dark.png';

const C = {
  navy: "#1a2a5e", navyDark: "#111d45", gold: "#c8a84b",
  blue1: "#3b9edb", blue2: "#7bbce8", pink: "#e05c8a",
  teal: "#4ec9c9", yellow: "#f0b429", gray: "#f2f2ef",
  border: "#e0e0d8", text: "#333", muted: "#888",
  green: "#27ae60", white: "#fff",
};

// ─── Shared week template — exact same content as ISM 402 Production Management
const SHARED_WEEKS: Week[] = [
  { id: 1,  period: "10 March - 16 March",  items: [{ name: "Course Outline", type: "doc", done: true }, { name: "Week One Lectures", type: "pdf", done: true }] },
  { id: 2,  period: "17 March - 23 March",  items: [{ name: "Week Two Lectures", type: "pdf", done: true }, { name: "My book", type: "book", done: true }] },
  { id: 3,  period: "24 March - 30 March",  items: [{ name: "Week Three Lectures", type: "pdf", done: true }] },
  { id: 4,  period: "31 March - 6 April",   items: [{ name: "Week Four Lectures", type: "pdf", done: true }] },
  { id: 5,  period: "7 April - 13 April",   items: [{ name: "Week Five Lectures", type: "pdf", done: true }] },
  { id: 6,  period: "14 April - 20 April",  items: [{ name: "Week Six Lectures", type: "pdf", done: true }] },
  { id: 7,  period: "21 April - 27 April",  items: [{ name: "Week Seven Lectures", type: "pdf", done: true }] },
  { id: 8,  period: "28 April - 4 May",     items: [{ name: "Week Eight Lectures", type: "pdf", done: true }] },
  { id: 9,  period: "5 May - 11 May",       items: [{ name: "Week Nine Lectures", type: "pdf", done: true }] },
  { id: 10, period: "12 May - 18 May",      items: [{ name: "Week Ten Lectures", type: "pdf", done: true }] },
  { id: 11, period: "19 May - 25 May",      items: [] },
  { id: 12, period: "26 May - 1 June",      items: [] },
  { id: 13, period: "2 June - 8 June",      items: [] },
  { id: 14, period: "9 June - 15 June",     items: [] },
  { id: 15, period: "16 June - 22 June",    items: [] },
  { id: 16, period: "23 June - 29 June",    items: [] },
  { id: 17, period: "30 June - 6 July",     items: [] },
  { id: 18, period: "7 July - 13 July",     items: [] },
  { id: 19, period: "14 July - 20 July",    items: [] },
  { id: 20, period: "21 July - 27 July",    items: [] },
];

// ─── Course data ──────────────────────────────────────────────────────────────
const COURSES_DATA: Record<string, CourseData> = {
  "ISM 402": { title: "Production Management (TV)", fullTitle: "ISM 402 - Production Management (TV)", semester: "Semester 2", instructor: "Dr. John Smith",    weeks: SHARED_WEEKS },
  "ISM 404": { title: "Professional Ethics",         fullTitle: "ISM 404 - Professional Ethics",         semester: "Semester 2", instructor: "Prof. Jane Doe",    weeks: SHARED_WEEKS },
  "ISM 406": { title: "Digital Rendering",           fullTitle: "ISM 406 - Digital Rendering",           semester: "Semester 2", instructor: "Mr. Ahmed Hassan",  weeks: SHARED_WEEKS },
  "ISM 408": { title: "Project II",                  fullTitle: "ISM 408 - Project II",                  semester: "Semester 2", instructor: "Dr. Mary Johnson",  weeks: SHARED_WEEKS },
  "ISM 413": { title: "Entertainment Media",         fullTitle: "ISM 413 - Entertainment Media",         semester: "Semester 2", instructor: "Prof. Robert Smith", weeks: SHARED_WEEKS },
  "ISM 414": { title: "Computer Security",           fullTitle: "ISM 414 - Computer Security",           semester: "Semester 2", instructor: "Dr. Sarah Williams", weeks: SHARED_WEEKS },
};

interface CourseItem { name: string; type: string; done: boolean; }
interface Week { id: number; period: string; items: CourseItem[]; }
interface CourseData { title: string; fullTitle: string; semester: string; instructor: string; weeks: Week[]; }

interface ThemeStyles {
  background: string; surface: string; headerFooter: string;
  primaryText: string; secondaryText: string; border: string;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const DocIcon = ({ color = C.navy }: { color?: string }) => (
  <svg width="17" height="19" viewBox="0 0 17 19" fill="none" style={{ flexShrink: 0 }}>
    <path d="M2 2C2 1.45 2.45 1 3 1H10L15 6V17C15 17.55 14.55 18 14 18H3C2.45 18 2 17.55 2 17V2Z" fill={color} fillOpacity="0.13" stroke={color} strokeWidth="1.2"/>
    <path d="M10 1V6H15" stroke={color} strokeWidth="1.2" fill="none"/>
    <line x1="4.5" y1="9"  x2="12.5" y2="9"  stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="4.5" y1="12" x2="12.5" y2="12" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="4.5" y1="15" x2="9"    y2="15" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);
const BookIcon = ({ color = C.navy }: { color?: string }) => (
  <svg width="19" height="17" viewBox="0 0 19 17" fill="none" style={{ flexShrink: 0 }}>
    <path d="M1 1.5C1 1.22 1.22 1 1.5 1H8C8.28 1 8.5 1.22 8.5 1.5V15.5C8.5 15.78 8.28 16 8 16H2C1.45 16 1 15.55 1 15V1.5Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.2"/>
    <path d="M8.5 2C8.5 1.45 8.95 1 9.5 1H16.5C17.05 1 17.5 1.45 17.5 2V15C17.5 15.55 17.05 16 16.5 16H9.5C8.95 16 8.5 15.55 8.5 15V2Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.2"/>
    <line x1="8.5" y1="1" x2="8.5" y2="16" stroke={color} strokeWidth="1.2"/>
  </svg>
);
const UrlIcon = ({ color = C.navy }: { color?: string }) => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9.5" cy="9.5" r="8.5" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.07"/>
    <path d="M2.5 9.5 Q9.5 4 16.5 9.5 Q9.5 15 2.5 9.5Z" stroke={color} strokeWidth="1.1" fill="none"/>
    <line x1="9.5" y1="1" x2="9.5" y2="18" stroke={color} strokeWidth="1.1"/>
    <line x1="1" y1="9.5" x2="18" y2="9.5" stroke={color} strokeWidth="1.1"/>
  </svg>
);
const MegaphoneIcon = ({ color = C.navy }: { color?: string }) => (
  <svg width="19" height="17" viewBox="0 0 19 17" fill="none" style={{ flexShrink: 0 }}>
    <path d="M2 5.5H5.5L13.5 1.5V15.5L5.5 11.5H2V5.5Z" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.1" strokeLinejoin="round"/>
    <path d="M5.5 11.5V15" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M15.5 4.5C17 6 17 11 15.5 12.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
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

function ItemIcon({ type, color }: { type: string; color: string }) {
  if (type === "book") return <BookIcon color={color} />;
  if (type === "url")  return <UrlIcon color={color} />;
  return <DocIcon color={color} />;
}

// ─── TA Dropdown (matches Dashboard exactly) ──────────────────────────────────
const TA_GROUPS = [
  ["Profile", "Grades", "Calendar", "Messages", "Private files", "Reports"],
  ["Settings", "Language"],
  ["Log out"],
];

function TADropdown({ themeStyles, navigate }: { themeStyles: ThemeStyles; navigate: ReturnType<typeof useNavigate> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const handleItemClick = (item: string) => {
    if (item === "Settings") navigate("/");
    if (item === "Log out") window.location.href = "/";
    setOpen(false);
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}>
        <div style={{ width: "2.125rem", height: "2.125rem", borderRadius: "50%", background: open ? themeStyles.primaryText : C.gold, color: C.navy, border: open ? `2px solid ${themeStyles.primaryText}` : "none", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.875rem", fontFamily: "inherit", transition: "all 0.15s" }}>TA</div>
        <span style={{ color: "white", fontSize: "0.75rem" }}>{open ? "▲" : "▾"}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", right: 0, background: themeStyles.surface, borderRadius: "0.5rem", boxShadow: "0 0.5rem 2rem rgba(0,0,0,0.2)", border: `2px solid #7c4dff`, minWidth: "13rem", zIndex: 999, overflow: "hidden" }}>
          <div style={{ background: C.navy, padding: "0.625rem 1rem", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: themeStyles.surface, color: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.875rem" }}>TA</div>
            <span style={{ color: "white", fontSize: "0.75rem" }}>▲</span>
          </div>
          {TA_GROUPS.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div style={{ height: "0.0625rem", background: themeStyles.border }} />}
              {group.map(item => (
                <button key={item} onClick={() => handleItemClick(item)}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "0.75rem 1.25rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.9375rem", color: themeStyles.primaryText, fontFamily: "inherit", transition: "background 0.12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = themeStyles.border}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>{item}</button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Collapsible Week Row ─────────────────────────────────────────────────────
function CollapsibleWeek({ week, themeStyles, isExpanded, onToggle }: { week: Week; themeStyles: ThemeStyles; isExpanded: boolean; onToggle: () => void }) {
  const iconColor = themeStyles.primaryText === "#FFFFFF" ? C.blue2 : C.navy;
  return (
    <div style={{ marginBottom: "0.375rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.375rem", overflow: "hidden" }}>
      <button onClick={onToggle}
        style={{ width: "100%", padding: "0.7rem 1rem", background: themeStyles.surface, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", fontWeight: 600, color: themeStyles.primaryText, textAlign: "left", fontFamily: "inherit" }}
        onMouseEnter={e => (e.currentTarget.style.background = themeStyles.border)}
        onMouseLeave={e => (e.currentTarget.style.background = themeStyles.surface)}>
        <span style={{ fontSize: "0.65rem", color: themeStyles.secondaryText, width: "0.75rem", flexShrink: 0, display: "inline-block" }}>
          {isExpanded ? "▼" : "▶"}
        </span>
        {week.period}
      </button>
      {isExpanded && week.items.length > 0 && (
        <div style={{ background: themeStyles.background, borderTop: `1px solid ${themeStyles.border}` }}>
          {week.items.map((item, idx) => (
            <div key={idx}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 1rem 0.65rem 2.25rem", borderBottom: idx < week.items.length - 1 ? `1px solid ${themeStyles.border}` : "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(26,42,94,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <ItemIcon type={item.type} color={iconColor} />
              <span style={{ flex: 1, color: iconColor, fontSize: "0.875rem" }}>{item.name}</span>
              {item.done && (
                <span style={{ background: "#d4edda", color: "#276749", padding: "0.18rem 0.55rem", borderRadius: "0.2rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>✓ Done</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CoursePage() {
  const { courseCode } = useParams<{ courseCode: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState("course");
  // All week IDs 0–20 expanded by default
  const allIds = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(allIds);
  const [generalExpanded, setGeneralExpanded] = useState(true);
  const [collapseAllToggle, setCollapseAllToggle] = useState(false);

  const courseData: CourseData = COURSES_DATA[courseCode || "ISM 402"] || COURSES_DATA["ISM 402"];

  const themeStyles: ThemeStyles = theme === "dark" ? {
    background: "#0F1419", surface: "#1A2332", headerFooter: "#0E1664",
    primaryText: "#FFFFFF", secondaryText: "#9E9E9E", border: "#2A3A5E",
  } : {
    background: "#F0F0F0", surface: "#ffffff", headerFooter: "#1a2a5e",
    primaryText: "#1a2a5e", secondaryText: "#666666", border: "#e0e0d8",
  };

  const toggleWeek = (id: number) => {
    const next = new Set(expandedWeeks);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedWeeks(next);
  };

  const handleCollapseAll = () => {
    if (collapseAllToggle) {
      setExpandedWeeks(new Set([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]));
      setGeneralExpanded(true);
      setCollapseAllToggle(false);
    } else {
      setExpandedWeeks(new Set());
      setGeneralExpanded(false);
      setCollapseAllToggle(true);
    }
  };

  const TABS = ["Course", "Participants", "Grades", "Competencies", "More"];
  const NAV_ITEMS = ["Home", "Dashboard", "My Courses", "Professional Education ▾", "Undergraduate Programmes ▾", "More ▾"];

  return (
    <div style={{ fontFamily: "'Century Gothic', 'CenturyGothic', 'AppleGothic', sans-serif", minHeight: "100vh", background: themeStyles.background, color: themeStyles.primaryText, display: "flex", flexDirection: "column" }}>

      {/* ── Top contact bar ── */}
      <div style={{ 
        background: themeStyles.headerFooter, 
        color: "white", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "0.5rem 2rem", 
        fontSize: "0.8125rem" }}>
        <div style={{ display: "flex", gap: "1.75rem" }}>
          <span>📞 Call us : (+234) 708 864 1465 &nbsp; (+234) 701 782 5427</span>
          <span>✉ E-mail : admissions@pau.edu.ng</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <BellIcon />
            <ChatIcon />
            <div style={{
                width: "2.125rem", height: "2.125rem", borderRadius: "50%",
                background: "#cacaca", color: "#1a2a5e",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: "bold", fontSize: "0.875rem",
            }}>TA</div>
            <span style={{ color: "white", fontSize: "0.75rem" }}>▾</span>
        </div>
      </div>

      {/* ── Flex row wrapper — mirrors Dashboard structure ── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* ── Nav bar ── */}
          <div style={{ background: themeStyles.surface, borderBottom: `0.0625rem solid ${themeStyles.border}`, display: "flex", alignItems: "center", padding: "0 2rem", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginRight: "2rem", padding: "0.75rem 0" }}>
              <img 
                src={theme === 'dark' ? darkLogo : lightLogo} 
                alt="PAN-ATLANTIC UNIVERSITY"
                style={{ height: "3.25rem", width: "auto" }}
              />
            </div>
            {NAV_ITEMS.map(item => (
              <button key={item}
                onClick={() => { if (item === "Home") navigate("/"); if (item === "Dashboard") navigate("/dashboard"); if (item === "My Courses") navigate("/dashboard"); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "1.125rem 0.75rem", fontSize: "0.84375rem", color: themeStyles.primaryText, fontFamily: "inherit", fontWeight: "500", whiteSpace: "nowrap", borderBottom: "0.1875rem solid transparent", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderBottomColor = themeStyles.border}
                onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                {item}
              </button>
            ))}
          </div>

          {/* ── Scrollable content area ── */}
          <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "2rem 6rem 4rem" }}>

        {/* Course title */}
        <h1 style={{ fontSize: "1.625rem", fontWeight: 800, margin: "0 0 1rem", color: themeStyles.primaryText }}>
          {courseData.fullTitle}
        </h1>

        {/* Tab bar */}
        <div style={{ display: "flex", borderBottom: `1px solid ${themeStyles.border}`, marginBottom: "1.5rem" }}>
          {TABS.map(tab => {
            const active = activeTab === tab.toLowerCase();
            return (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())}
                style={{ background: "none", border: "none", borderBottom: active ? `0.1875rem solid ${themeStyles.primaryText}` : "0.1875rem solid transparent", cursor: "pointer", padding: "0.75rem 1.25rem", fontSize: "0.875rem", fontWeight: active ? 700 : 500, color: active ? themeStyles.primaryText : themeStyles.secondaryText, fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap", marginBottom: "-1px" }}>
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── Course tab ── */}
        {activeTab === "course" && (
          <div>
            {/* General section */}
            <div style={{ marginBottom: "0.375rem", border: `1px solid ${themeStyles.border}`, borderRadius: "0.375rem", overflow: "hidden" }}>
              <button onClick={() => setGeneralExpanded(v => !v)}
                style={{ width: "100%", padding: "0.7rem 1rem", background: themeStyles.surface, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.9rem", fontWeight: 700, color: themeStyles.primaryText, fontFamily: "inherit" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "0.65rem", color: themeStyles.secondaryText, width: "0.75rem" }}>{generalExpanded ? "▼" : "▶"}</span>
                  General
                </div>
                <span onClick={e => { e.stopPropagation(); handleCollapseAll(); }}
                  style={{ color: themeStyles.secondaryText, fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", padding: "0.15rem 0.4rem", borderRadius: "0.2rem" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  {collapseAllToggle ? "Expand all" : "Collapse all"}
                </span>
              </button>
              {generalExpanded && (
                <div style={{ background: themeStyles.background, borderTop: `1px solid ${themeStyles.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 1rem 0.65rem 2.25rem", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(26,42,94,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <MegaphoneIcon color={themeStyles.primaryText === "#FFFFFF" ? C.blue2 : C.navy} />
                    <span style={{ color: themeStyles.primaryText === "#FFFFFF" ? C.blue2 : C.navy, fontSize: "0.875rem" }}>Announcements</span>
                  </div>
                </div>
              )}
            </div>

            {/* Week sections — all expanded by default */}
            {courseData.weeks.map(week => (
              <CollapsibleWeek
                key={week.id}
                week={week}
                themeStyles={themeStyles}
                isExpanded={expandedWeeks.has(week.id)}
                onToggle={() => toggleWeek(week.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "participants"  && <div style={{ color: themeStyles.secondaryText, padding: "2rem 0" }}><p>Participants coming soon...</p></div>}
        {activeTab === "grades"        && <div style={{ color: themeStyles.secondaryText, padding: "2rem 0" }}><p>Grades coming soon...</p></div>}
        {activeTab === "competencies"  && <div style={{ color: themeStyles.secondaryText, padding: "2rem 0" }}><p>Competencies coming soon...</p></div>}
        {activeTab === "more"          && <div style={{ color: themeStyles.secondaryText, padding: "2rem 0" }}><p>More options coming soon...</p></div>}
      </div>{/* end inner padding div */}

      {/* ── Footer ── */}
      <footer style={{ background: themeStyles.headerFooter, color: "white", padding: "2.25rem 3rem", display: "grid", gridTemplateColumns: "1.6fr 1fr 1.4fr 1fr", gap: "3rem", fontSize: "0.8125rem" }}>
        <div>
          <p style={{ margin: 0, color: "#c8c5bc", lineHeight: "1.7", fontStyle: "italic", fontSize: "0.78125rem" }}>
            The Mission Statement of the University is: "to form competent and committed professionals and encourage them to serve with personal initiative and social responsibility the community in which they work, thereby helping to build a better society in Nigeria and Africa at large." This dream encapsulates the purpose of the University.
          </p>
        </div>
        <div>
          <h4 style={{ color: "#ffffff", fontWeight: "700", margin: "0 0 0.875rem", fontSize: "0.9375rem" }}>Info</h4>
          {["PAU Website", "PAU Servicedesk", "PAU Privacy Policy", "Apply to PAU"].map(l => (
            <div key={l} style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#c0bdb5", textDecoration: "underline", fontSize: "0.8125rem" }}>{l}</a></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: "#ffffff", fontWeight: "700", margin: "0 0 0.875rem", fontSize: "0.9375rem" }}>Contact Us</h4>
          <p style={{ margin: "0 0 0.625rem", color: "#d0cdc5", lineHeight: "1.6" }}>Km 52, Lekki-Epe Expressway, Ibeju-Lekki,<br/>PO Box 73688, Lagos, Nigeria</p>
          <p style={{ margin: "0 0 0.375rem", color: "#d0cdc5" }}>📞 Phone : (+234) 708 864 1465 (+234) 701 782 5427</p>
          <p style={{ margin: 0, color: "#d0cdc5" }}>✉ Email : admissions@pau.edu.ng</p>
        </div>
        <div>
          <h4 style={{ color: "#ffffff", fontWeight: "700", margin: "0 0 0.875rem", fontSize: "0.9375rem" }}>Follow Us</h4>
          <div style={{ display: "flex", gap: "0.625rem" }}>
            {["𝕏", "in", "▶", "f"].map((icon, i) => (
              <div key={i} style={{ width: "2.125rem", height: "2.125rem", borderRadius: "0.25rem", border: "0.0625rem solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.875rem", color: "white" }}>{icon}</div>
            ))}
          </div>
        </div>
      </footer>
      <div style={{ background: C.navyDark, color: "#888", textAlign: "center", padding: "0.75rem", fontSize: "0.78125rem", borderTop: "0.0625rem solid rgba(255,255,255,0.07)" }}>
        Copyright © 2026 – Developed by PAU ICT and Toluwanimi Adeyemo. Powered by Moodle
      </div>
      </div>{/* end overflowY scroll div */}
        </div>{/* end flex column */}
      </div>{/* end flex row */}
    </div>
  );
}