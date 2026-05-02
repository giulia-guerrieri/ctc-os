import { useState } from "react";

const B = {
  burntUmber: "#732C22",
  leather: "#7E5137",
  matcha: "#8A8D40",
  paperWhite: "#FFF7E1",
  bg: "#F5F3EF",
  cardBg: "#FFFFFF",
  border: "#E8E3DA",
  borderHover: "#D4C9B8",
  text: "#1C1917",
  textMuted: "#9C9690",
  textMid: "#6B6258",
};

const TAG_STYLES = {
  SCHEDULED:   { bg: "#EAF0F8", text: "#2A5A8A", border: "#A0BEDD" },
  TRIGGER:     { bg: "#FDF3E3", text: "#8A5A10", border: "#E8C87A" },
  "ON DEMAND": { bg: "#EEF2E8", text: "#5A6E2A", border: "#C8D8A0" },
  SHARED:      { bg: "#EEF2E8", text: "#5A6E2A", border: "#C8D8A0" },
  RITUAL:      { bg: "#F5EDE8", text: "#7E5137", border: "#D4B8A8" },
  ACQUISITION: { bg: "#732C2212", text: "#732C22", border: "#732C2228" },
  NURTURE:     { bg: "#F5DCE0", text: "#8A3A48", border: "#E0B0B8" },
  DELIVERY:    { bg: "#7E513712", text: "#7E5137", border: "#7E513728" },
  SUCCESS:     { bg: "#EEF2E8", text: "#5A6E2A", border: "#C8D8A0" },
  FINANCE:     { bg: "#EEF0E4", text: "#5A6040", border: "#C4C890" },
  SYSTEMS:     { bg: "#EEF2E8", text: "#5A6E2A", border: "#C8D8A0" },
  AI:          { bg: "#7E513712", text: "#7E5137", border: "#7E513728" },
  PRODUCT:     { bg: "#A0522D12", text: "#A0522D", border: "#A0522D28" },
  HIRING:      { bg: "#E9B0B830", text: "#8A3A48", border: "#E9B0B870" },
};

const Tag = ({ label }) => {
  const s = TAG_STYLES[label] || { bg: "#F0EDE8", text: "#6B6258", border: "#E8E3DA" };
  return (
    <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, borderRadius: 20, padding: "2px 9px", fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const SEATS = {
  giulia: {
    id: "giulia", name: "Giulia Guerrieri", role: "Founder & CEO",
    initials: "GG", color: B.burntUmber, reportsTo: null,
    systems: [],
    aiAgents: [
      {
        name: "Virtual Assistant",
        desc: "Manages 5 workflows",
        tag: "SCHEDULED",
        workflows: [
          { name: "End of Week Report",     desc: "Compiles weekly team updates and sends summary to Giulia",  tag: "SCHEDULED" },
          { name: "OOO Management",         desc: "Manages time-off requests, calendar updates, and coverage",  tag: "TRIGGER"   },
          { name: "Monthly Team Survey",    desc: "Sends and compiles monthly team pulse survey",               tag: "SCHEDULED" },
          { name: "Birthdays & Holidays",   desc: "Tracks and announces team birthdays and company holidays",   tag: "SCHEDULED" },
          { name: "New Member Onboarding",  desc: "Runs automated welcome sequence for every new hire",         tag: "TRIGGER"   },
        ]
      },
    ],
    reports: [],
    direct_reports: ["flora", "andrea", "stephanie", "sofiia"],
  },
  flora: {
    id: "flora", name: "Flora", role: "Growth — Marketing & Sales",
    initials: "FL", color: B.burntUmber, reportsTo: "Giulia",
    systems: [
      { name: "Evergreen Front Door",   desc: "VSL → /apply funnel",         tag: "ACQUISITION", url: "#" },
      { name: "Monthly Webinar Engine", desc: "Live conversion event system", tag: "ACQUISITION", url: "#" },
      { name: "Lead Nurture Sequence",  desc: "Email follow-up post opt-in",  tag: "NURTURE",     url: "#" },
    ],
    aiAgents: [
      { name: "Zap: Front Door Lead → /apply",       desc: "Typeform → ClickUp → notification", tag: "TRIGGER"   },
      { name: "Zap: Webinar Registrant → Reminders", desc: "Automated reminder sequence",       tag: "SCHEDULED" },
    ],
    reports: [
      { name: "Weekly Sales & Marketing Summary", desc: "Growth · every Monday",        tag: "RITUAL", url: "#" },
      { name: "End of Week Report",               desc: "Company-wide · every Friday",  tag: "SHARED", url: "#" },
    ],
    direct_reports: ["sweta", "angelina", "melanie"],
  },
  andrea: {
    id: "andrea", name: "Andrea", role: "Client Success & Delivery",
    initials: "AN", color: B.leather, reportsTo: "Giulia",
    systems: [
      { name: "CCA Onboarding",          desc: "Front-end accelerator welcome flow", tag: "DELIVERY", url: "#" },
      { name: "Retention & Ascension",   desc: "RESERVE → CM Boardroom pathway",    tag: "DELIVERY", url: "#" },
      { name: "Client Check-In Cadence", desc: "Weekly touchpoint system",           tag: "SUCCESS",  url: "#" },
    ],
    aiAgents: [
      { name: "Zap: CCA Welcome Sequence", desc: "Triggers on new CCA purchase",      tag: "TRIGGER"   },
      { name: "Progress Tracker",          desc: "Flags at-risk clients before churn", tag: "SCHEDULED" },
    ],
    reports: [
      { name: "CS Activation Report", desc: "Client success · weekly",       tag: "RITUAL", url: "#" },
      { name: "End of Week Report",   desc: "Company-wide · every Friday",   tag: "SHARED", url: "#" },
    ],
    direct_reports: [],
  },
  stephanie: {
    id: "stephanie", name: "Stephanie", role: "Product & CS Systems",
    initials: "SP", color: "#A0522D", reportsTo: "Giulia",
    systems: [
      { name: "CCA v2 Build",  desc: "CCA program rebuild and curriculum",   tag: "PRODUCT", url: "#" },
      { name: "RESERVE Build", desc: "12-month program architecture",        tag: "PRODUCT", url: "#" },
      { name: "CS OS",         desc: "Client success operating system",      tag: "SYSTEMS", url: "#" },
      { name: "CS Hiring",     desc: "Client success team hiring pipeline",  tag: "HIRING",  url: "#" },
    ],
    aiAgents: [
      { name: "Hiring Screener", desc: "Routes CS applicants against role criteria", tag: "TRIGGER" },
    ],
    reports: [
      { name: "Product Build Status", desc: "Product · weekly",              tag: "RITUAL", url: "#" },
      { name: "End of Week Report",   desc: "Company-wide · every Friday",   tag: "SHARED", url: "#" },
    ],
    direct_reports: ["chloe", "melina"],
  },
  sofiia: {
    id: "sofiia", name: "Sofiia", role: "Tech & Systems / AI",
    initials: "SO", color: B.matcha, reportsTo: "Giulia",
    systems: [
      { name: "Zapier Core (Front Door)", desc: "Lead capture automation layer",           tag: "SYSTEMS", url: "#" },
      { name: "Zapier Core (OOO)",        desc: "Ops automation layer",                    tag: "SYSTEMS", url: "#" },
      { name: "AI Stack Management",      desc: "All Claude + automation tools",           tag: "AI",      url: "#" },
    ],
    aiAgents: [
      { name: "Build Status Reporter", desc: "Weekly build queue summary to Giulia", tag: "SCHEDULED" },
      { name: "SOP Architect",         desc: "Turns brain dumps into deploy-ready SOPs", tag: "ON DEMAND" },
    ],
    reports: [
      { name: "Tech & AI Build Report", desc: "Systems · weekly",             tag: "RITUAL", url: "#" },
      { name: "End of Week Report",     desc: "Company-wide · every Friday",  tag: "SHARED", url: "#" },
    ],
    direct_reports: [],
  },
  angelina: {
    id: "angelina", name: "Angelina Rocchio", role: "Closer",
    initials: "AR", color: B.burntUmber, reportsTo: "Flora",
    systems: [], aiAgents: [],
    reports: [{ name: "End of Week Report", desc: "Company-wide · every Friday", tag: "SHARED", url: "#" }],
    direct_reports: [],
  },
  melanie: {
    id: "melanie", name: "Melanie Lennon", role: "Content Creator",
    initials: "ML", color: B.burntUmber, reportsTo: "Flora",
    systems: [], aiAgents: [],
    reports: [{ name: "End of Week Report", desc: "Company-wide · every Friday", tag: "SHARED", url: "#" }],
    direct_reports: [],
  },
  sweta: {
    id: "sweta", name: "Swetashree Badu", role: "Growth Associate",
    initials: "SB", color: B.burntUmber, reportsTo: "Flora",
    systems: [], aiAgents: [],
    reports: [{ name: "End of Week Report", desc: "Company-wide · every Friday", tag: "SHARED", url: "#" }],
    direct_reports: [],
  },
  chloe: {
    id: "chloe", name: "Chloe Murdoch", role: "Expert Coach",
    initials: "CM", color: "#A0522D", reportsTo: "Stephanie",
    systems: [], aiAgents: [],
    reports: [{ name: "End of Week Report", desc: "Company-wide · every Friday", tag: "SHARED", url: "#" }],
    direct_reports: [],
  },
  melina: {
    id: "melina", name: "Melina Hashemi", role: "Expert Coach",
    initials: "MH", color: "#A0522D", reportsTo: "Stephanie",
    systems: [], aiAgents: [],
    reports: [{ name: "End of Week Report", desc: "Company-wide · every Friday", tag: "SHARED", url: "#" }],
    direct_reports: [],
  },
};

const get = (id) => SEATS[id];

// ── TAG ───────────────────────────────────────────────────────────────────────

// ── ITEM ROW ──────────────────────────────────────────────────────────────────
const ItemRow = ({ item, accent }) => {
  const [hov, setHov] = useState(false);
  const clickable = item.url && item.url !== "#";
  const Wrap = clickable ? "a" : "div";
  return (
    <Wrap href={clickable ? item.url : undefined} target={clickable ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "block", textDecoration: "none", background: hov ? "#FAFAF8" : B.cardBg, border: `1px solid ${hov && clickable ? accent + "55" : B.border}`, borderLeft: `3px solid ${accent}`, borderRadius: 8, padding: "10px 12px", transition: "all 0.15s", cursor: clickable ? "pointer" : "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12.5, color: B.text, marginBottom: 2, display: "flex", alignItems: "center", gap: 5 }}>
            {item.name}{clickable && hov && <span style={{ fontSize: 10, opacity: 0.6 }}>↗</span>}
          </div>
          {item.desc && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: B.textMuted, lineHeight: 1.4 }}>{item.desc}</div>}
        </div>
        {item.tag && <Tag label={item.tag} />}
      </div>
    </Wrap>
  );
};

// ── VA CARD with expandable workflows ─────────────────────────────────────────
const VACard = ({ agent, accent }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${B.border}`, borderLeft: `3px solid ${B.matcha}`, borderRadius: 8, overflow: "hidden", background: B.cardBg }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12.5, color: B.text, marginBottom: 2, display: "flex", alignItems: "center", gap: 6 }}>
            {agent.name}
            <span style={{ background: `${B.matcha}15`, color: B.matcha, border: `1px solid ${B.matcha}28`, borderRadius: 20, padding: "1px 7px", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>AI EMPLOYEE</span>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: B.textMuted }}>{agent.workflows.length} workflows</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag label={agent.tag} />
          <span style={{ fontSize: 10, color: B.textMuted }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${B.border}`, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6, background: "#F8F6FF" }}>
          <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: B.matcha, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", paddingBottom: 4, borderBottom: `1px solid ${B.border}`, marginBottom: 2 }}>
            Workflows
          </div>
          {agent.workflows.map((w, i) => {
            const s = TAG_STYLES[w.tag] || {};
            return (
              <div key={i} style={{ background: B.cardBg, border: `1px solid ${B.border}`, borderLeft: `3px solid ${s.text || B.matcha}`, borderRadius: 7, padding: "9px 11px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: B.text, marginBottom: 2 }}>{w.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: B.textMuted, lineHeight: 1.4 }}>{w.desc}</div>
                </div>
                <Tag label={w.tag} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── SEAT CARD ─────────────────────────────────────────────────────────────────
const SeatCard = ({ seat, large, depth = 0 }) => {
  const [hov, setHov]         = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab]           = useState("systems");
  const [reportsOpen, setReportsOpen] = useState(false);

  const hasSystems = seat.systems?.length > 0;
  const hasAI      = seat.aiAgents?.length > 0;
  const hasReports = seat.reports?.length > 0;
  const hasDR      = seat.direct_reports?.length > 0;

  const TAB_LABELS = {
    systems: `${seat.systems?.length || 0} Systems`,
    ai:      `${seat.aiAgents?.length || 0} AI Agents`,
    reports: `${seat.reports?.length || 0} Reports`,
  };

  const directReports = (seat.direct_reports || []).map(get).filter(Boolean);
  const cardWidth = large ? 390 : depth > 0 ? 238 : 265;

  const handleTabClick = (t, e) => {
    e.stopPropagation();
    if (t === "reports" && hasDR) {
      setExpanded(true);
      setTab("reports");
      setReportsOpen(r => tab === "reports" ? !r : true);
    } else {
      if (!expanded) setExpanded(true);
      setTab(t);
      setReportsOpen(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: B.cardBg, border: `1px solid ${expanded ? seat.color + "50" : hov ? B.borderHover : B.border}`, borderRadius: 14, boxShadow: expanded ? `0 8px 32px ${seat.color}15` : hov ? "0 6px 20px rgba(0,0,0,0.09)" : "0 2px 8px rgba(0,0,0,0.05)", transition: "all 0.2s ease", overflow: "hidden", width: cardWidth, flexShrink: 0 }}>

        {/* Header */}
        <div style={{ padding: large ? "22px 22px 16px" : "14px 14px 12px", cursor: "pointer" }} onClick={() => setExpanded(e => !e)}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ width: large ? 52 : depth > 0 ? 34 : 42, height: large ? 52 : depth > 0 ? 34 : 42, borderRadius: "50%", background: `linear-gradient(140deg, ${seat.color} 0%, ${seat.color}BB 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: large ? 15 : depth > 0 ? 10 : 12, color: "#FFF7E1", boxShadow: `0 3px 10px ${seat.color}40`, flexShrink: 0 }}>{seat.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: large ? 16 : depth > 0 ? 13 : 13.5, color: B.text, marginBottom: 2 }}>{seat.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: depth > 0 ? 10.5 : 11, color: B.textMuted }}>{seat.role}</div>
              {/* Reports to label */}
              {seat.reportsTo && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: seat.color, marginTop: 2, display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 9 }}>—</span> Reports to {seat.reportsTo}
                </div>
              )}
            </div>
          </div>

          {/* 3 tab bubbles */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["systems", "ai", "reports"].map((t) => {
              const isActive = expanded && tab === t;
              const isEmpty = (t === "systems" && !hasSystems) || (t === "ai" && !hasAI) || (t === "reports" && !hasReports && !hasDR);
              return (
                <button key={t} onClick={(e) => handleTabClick(t, e)}
                  style={{ background: isActive ? `${seat.color}18` : "#F5F3EF", border: `1px solid ${isActive ? seat.color + "40" : B.border}`, borderRadius: 20, padding: depth > 0 ? "3px 9px" : "4px 12px", fontSize: depth > 0 ? 9.5 : 10.5, fontWeight: isActive ? 600 : 500, color: isActive ? seat.color : B.textMuted, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.15s", opacity: isEmpty ? 0.45 : 1 }}>
                  {TAB_LABELS[t]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expanded panel — not for Reports+hasDR (that renders below) */}
        {expanded && !(tab === "reports" && hasDR) && (
          <div style={{ borderTop: `1px solid ${B.border}` }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${B.border}` }}>
              {["systems", "ai", "reports"].map((t) => {
                const labels = { systems: "Systems", ai: "AI Agents", reports: "Reports" };
                return (
                  <button key={t} onClick={() => { setTab(t); if (t !== "reports") setReportsOpen(false); }}
                    style={{ flex: 1, padding: "9px 6px", background: tab === t ? `${seat.color}08` : "transparent", border: "none", borderBottom: `2px solid ${tab === t ? seat.color : "transparent"}`, fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: tab === t ? seat.color : B.textMuted, cursor: "pointer", transition: "all 0.15s" }}>
                    {labels[t]}
                  </button>
                );
              })}
            </div>
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 7, background: "#FAFAF8" }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: B.textMuted, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", paddingBottom: 5, borderBottom: `1px solid ${B.border}`, marginBottom: 2 }}>
                {seat.name.split(" ")[0]}'s {tab === "systems" ? "Systems" : tab === "ai" ? "AI Agents" : "Reports & Rituals"}
              </div>
              {tab === "systems" && (hasSystems
                ? seat.systems.map((s, i) => <ItemRow key={i} item={s} accent={seat.color} />)
                : <div style={{ fontSize: 11, color: B.textMuted, fontStyle: "italic", padding: "6px 4px" }}>No systems added yet</div>
              )}
              {tab === "ai" && (hasAI
                ? seat.aiAgents.map((a, i) => a.workflows
                    ? <VACard key={i} agent={a} accent={seat.color} />
                    : <ItemRow key={i} item={a} accent={B.matcha} />
                  )
                : <div style={{ fontSize: 11, color: B.textMuted, fontStyle: "italic", padding: "6px 4px" }}>No AI agents yet</div>
              )}
              {tab === "reports" && (hasReports
                ? seat.reports.map((r, i) => <ItemRow key={i} item={r} accent={seat.color} />)
                : <div style={{ fontSize: 11, color: B.textMuted, fontStyle: "italic", padding: "6px 4px" }}>No reports yet</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reports tree — drops below with connector when Reports tab clicked and hasDR */}
      {expanded && tab === "reports" && hasDR && reportsOpen && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ width: 1, height: 24, background: B.border }} />
          <div style={{ position: "relative", width: `min(${directReports.length * (depth > 0 ? 254 : 281)}px, 100vw)` }}>
            <div style={{ position: "absolute", top: 0, left: `${100 / directReports.length / 2}%`, right: `${100 / directReports.length / 2}%`, height: 1, background: B.border }} />
            <div style={{ display: "flex" }}>
              {directReports.map((_, i) => (
                <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 1, height: 24, background: B.border }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
            {directReports.map((child, i) => (
              <div key={child.id} style={{ animation: `fadeUp 0.3s ease ${i * 0.05}s both` }}>
                <SeatCard seat={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── CONNECTORS ────────────────────────────────────────────────────────────────
const VLine = ({ h = 24 }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ width: 1, height: h, background: B.border }} />
  </div>
);

const HConnector = ({ count }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div style={{ position: "relative", width: "min(1200px, calc(100% - 80px))" }}>
      <div style={{ position: "absolute", top: 0, left: `${100 / count / 2}%`, right: `${100 / count / 2}%`, height: 1, background: B.border }} />
      <div style={{ display: "flex" }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ width: 1, height: 24, background: B.border }} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── OS COLUMN ─────────────────────────────────────────────────────────────────
const OSColumn = ({ seat }) => (
  <div style={{ flex: "0 0 220px" }}>
    <div style={{ background: seat.color, borderRadius: "12px 12px 0 0", padding: "14px 14px 12px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 55%)", pointerEvents: "none" }} />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: B.paperWhite, marginBottom: 1 }}>{seat.name.split(" ")[0]}</div>
      <div style={{ fontSize: 10, color: `${B.paperWhite}80`, fontFamily: "'DM Sans', sans-serif" }}>{seat.role}</div>
      <div style={{ position: "absolute", top: 10, right: 10, background: `${B.paperWhite}18`, border: `1px solid ${B.paperWhite}28`, borderRadius: 20, padding: "2px 7px", fontSize: 9, fontWeight: 600, color: `${B.paperWhite}85`, fontFamily: "'DM Sans', sans-serif" }}>{seat.systems?.length || 0}</div>
    </div>
    <div style={{ height: 3, background: `${seat.color}22` }} />
    <div style={{ background: "#F8F6F2", border: `1px solid ${B.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.12em", color: B.textMuted, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", paddingBottom: 4, borderBottom: `1px solid ${B.border}`, marginBottom: 1 }}>Systems</div>
      {seat.systems?.length > 0
        ? seat.systems.map((s, i) => (
            <div key={i} style={{ background: B.cardBg, border: `1px solid ${B.border}`, borderLeft: `3px solid ${seat.color}`, borderRadius: 8, padding: "8px 10px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: B.text, marginBottom: 1 }}>{s.name}</div>
              {s.desc && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, color: B.textMuted }}>{s.desc}</div>}
            </div>
          ))
        : <div style={{ fontSize: 11, color: B.textMuted, fontStyle: "italic", padding: "6px 4px" }}>No systems added yet</div>
      }
    </div>
  </div>
);

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("org");
  const giulia = get("giulia");
  const tier1  = ["flora", "andrea", "stephanie", "sofiia"].map(get);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${B.bg};}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-thumb{background:${B.border};border-radius:3px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>

      <div style={{ minHeight: "100vh", background: B.bg }}>

        {/* NAV */}
        <div style={{ background: B.cardBg, borderBottom: `1px solid ${B.border}`, padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: B.burntUmber, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: B.paperWhite }}>CTC</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13.5, fontWeight: 700, color: B.text, lineHeight: 1.1 }}>Creator to Cashflow</div>
              <div style={{ fontSize: 9, color: B.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Operating System</div>
            </div>
          </div>
          <div style={{ display: "flex", background: B.bg, border: `1px solid ${B.border}`, borderRadius: 8, padding: 3, gap: 2 }}>
            {[["org", "Org Chart"], ["os", "OS Map"]].map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: "5px 16px", borderRadius: 6, border: "none", background: view === v ? B.cardBg : "transparent", boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.08)" : "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: view === v ? 600 : 400, color: view === v ? B.burntUmber : B.textMuted, cursor: "pointer", transition: "all 0.15s" }}>{label}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: B.textMuted, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>CCA → RESERVE → CM Boardroom</div>
        </div>

        {/* ORG CHART */}
        {view === "org" && (
          <div style={{ padding: "48px 40px 60px", animation: "fadeIn 0.25s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: B.text, marginBottom: 8 }}>
                Creator to Cashflow — <em style={{ color: B.burntUmber }}>Org Chart</em>
              </h1>
              <p style={{ fontSize: 13, color: B.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
                Click any card to expand. Click <strong style={{ color: B.burntUmber }}>Reports</strong> to grow the tree below each seat.
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", animation: "fadeUp 0.4s ease both" }}>
              <SeatCard seat={giulia} large />
            </div>

            <VLine h={28} />
            <HConnector count={tier1.length} />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", maxWidth: 1200 }}>
                {tier1.map((s, i) => (
                  <div key={s.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.07}s both` }}>
                    <SeatCard seat={s} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OS MAP */}
        {view === "os" && (
          <div style={{ padding: "48px 40px 60px", animation: "fadeIn 0.25s ease" }}>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: B.text, marginBottom: 6 }}>Operating System Map</h2>
              <p style={{ fontSize: 12, color: B.textMuted }}>One owner per system · Click any system to open its runbook ↗</p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", overflowX: "auto", paddingBottom: 20 }}>
              {[giulia, ...tier1].map((seat, i) => (
                <div key={seat.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.07}s both` }}>
                  <OSColumn seat={seat} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ borderTop: `1px solid ${B.border}`, padding: "14px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: B.cardBg }}>
          <div style={{ fontSize: 11, color: B.textMuted, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>"Simple scales, fancy fails."</div>
          <div style={{ fontSize: 10, color: `${B.textMuted}80`, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Visionaries & Leaders · 2026</div>
        </div>
      </div>
    </>
  );
}
