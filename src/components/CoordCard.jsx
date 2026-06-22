import React, { useState } from "react";

const CARD_COLORS = [
  ["#4f8ef7", "#7c3aed"],
  ["#0ea5e9", "#4f8ef7"],
  ["#10b981", "#0ea5e9"],
  ["#f59e0b", "#f97316"],
  ["#ec4899", "#7c3aed"],
  ["#8b5cf6", "#ec4899"],
];

export default function CoordCard({ coord, onEdit, onDelete, index, isMobile }) {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false); // mobile only
  const [hovered, setHovered] = useState(false);         // desktop only

  const [c1, c2] = CARD_COLORS[index % CARD_COLORS.length];
  const mapsUrl = `https://www.google.com/maps?q=${coord.lat},${coord.lng}`;

  function openMaps(e) {
    e?.stopPropagation();
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  }

  function copyCoords(e) {
    e?.stopPropagation();
    navigator.clipboard.writeText(`${coord.lat}, ${coord.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const dateStr = coord.createdAt
    ? new Date(coord.createdAt).toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric",
      })
    : null;

  /* ─────────────────────────────
     MOBILE CARD — expandable ⋯
  ───────────────────────────── */
  if (isMobile) {
    return (
      <div
        className="card coord-item"
        style={{ padding: "14px 14px", position: "relative", overflow: "hidden",
          animationDelay: `${index * 0.04}s`, cursor: "pointer" }}
        onClick={openMaps}
      >
        {/* Accent bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(180deg,${c1},${c2})`, borderRadius: "0 2px 2px 0",
        }} />
        {/* BG glow */}
        <div style={{
          position: "absolute", right: -10, top: -10, width: 80, height: 80, borderRadius: "50%",
          background: `radial-gradient(circle,${c1}10 0%,transparent 70%)`, pointerEvents: "none",
        }} />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, flex: 1, minWidth: 0 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 11, flexShrink: 0,
              background: `linear-gradient(135deg,${c1},${c2})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 19, boxShadow: `0 4px 12px ${c1}50`,
            }}>📍</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                  {coord.name}
                </h3>
                <span className="badge badge-blue" style={{ flexShrink: 0 }}>Maps</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", fontFamily: "monospace", display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ color: "var(--text-muted)", fontSize: 9 }}>LAT</span>
                <span style={{ fontWeight: 600 }}>{coord.lat.toFixed(5)}</span>
                <span style={{ color: "var(--border)" }}>|</span>
                <span style={{ color: "var(--text-muted)", fontSize: 9 }}>LNG</span>
                <span style={{ fontWeight: 600 }}>{coord.lng.toFixed(5)}</span>
              </div>
              {dateStr && <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{dateStr}</div>}
            </div>
          </div>

          {/* ⋯ toggle */}
          <button
            onClick={e => { e.stopPropagation(); setShowActions(v => !v); }}
            style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              border: "1px solid var(--border)", background: showActions ? "rgba(79,142,247,0.1)" : "var(--bg-card)",
              color: showActions ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 900, fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            {showActions ? "×" : "⋯"}
          </button>
        </div>

        {/* Expandable actions */}
        {showActions && (
          <div onClick={e => e.stopPropagation()} style={{
            marginTop: 12, display: "flex", gap: 8,
            paddingTop: 12, borderTop: "1px solid var(--border)",
            animation: "itemIn 0.18s ease",
          }}>
            <button onClick={openMaps} style={{
              flex: 1, padding: "9px 8px", borderRadius: 9, border: "none",
              background: `linear-gradient(135deg,${c1},${c2})`,
              color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              boxShadow: `0 3px 10px ${c1}40`, fontFamily: "inherit",
            }}>🗺️ Buka Maps</button>

            <button onClick={copyCoords} style={{
              padding: "9px 12px", borderRadius: 9,
              border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "var(--border)"}`,
              background: copied ? "rgba(52,211,153,0.1)" : "var(--bg-card)",
              color: copied ? "var(--success)" : "var(--text-muted)",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{copied ? "✓ Tersalin" : "⎘ Salin"}</button>

            <button onClick={e => { e.stopPropagation(); onEdit(coord); setShowActions(false); }} style={{
              width: 38, height: 38, borderRadius: 9,
              border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)",
              color: "#f59e0b", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontFamily: "inherit",
            }} aria-label="Edit">✏️</button>

            <button onClick={e => { e.stopPropagation(); onDelete(coord); setShowActions(false); }} style={{
              width: 38, height: 38, borderRadius: 9,
              border: "1px solid rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)",
              color: "var(--danger)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, fontFamily: "inherit",
            }} aria-label="Hapus">🗑️</button>
          </div>
        )}

        {/* Tap hint */}
        {!showActions && (
          <div style={{
            position: "absolute", bottom: 8, right: 50,
            fontSize: 9, color: "var(--text-muted)", opacity: 0.45, pointerEvents: "none",
          }}>Ketuk untuk buka Maps ↗</div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────
     DESKTOP CARD — hover actions
  ───────────────────────────── */
  return (
    <div
      className="card coord-item"
      style={{
        padding: "18px 20px",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${index * 0.04}s`,
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        borderColor: hovered ? "var(--border-hover)" : "var(--border)",
        boxShadow: hovered ? `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${c1}30` : "none",
      }}
      onClick={openMaps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: `linear-gradient(180deg,${c1},${c2})`, borderRadius: "0 2px 2px 0",
      }} />
      {/* BG glow on hover */}
      <div style={{
        position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle,${c1}${hovered ? "18" : "08"} 0%,transparent 70%)`,
        pointerEvents: "none", transition: "all 0.3s",
      }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        {/* Left: icon + info */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
            background: `linear-gradient(135deg,${c1},${c2})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: `0 4px 14px ${c1}${hovered ? "60" : "35"}`,
            transition: "box-shadow 0.25s",
          }}>📍</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <h3 style={{
                fontSize: 15, fontWeight: 700, color: "var(--text-primary)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
              }}>{coord.name}</h3>
              <span className="badge badge-blue">Maps ↗</span>
            </div>
            <div style={{
              fontSize: 13, color: "var(--text-secondary)", fontFamily: "monospace",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ color: "var(--text-muted)", fontSize: 10 }}>LAT</span>
              <span style={{ fontWeight: 600 }}>{coord.lat.toFixed(6)}</span>
              <span style={{ color: "var(--border)", margin: "0 2px" }}>|</span>
              <span style={{ color: "var(--text-muted)", fontSize: 10 }}>LNG</span>
              <span style={{ fontWeight: 600 }}>{coord.lng.toFixed(6)}</span>
            </div>
            {dateStr && (
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{dateStr}</div>
            )}
          </div>
        </div>

        {/* Right: action buttons (visible on hover) */}
        <div
          style={{
            display: "flex", gap: 8, flexShrink: 0,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(10px)",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onClick={e => e.stopPropagation()}
        >
          <button title="Salin koordinat" onClick={copyCoords} style={{
            height: 36, padding: "0 14px", borderRadius: 8,
            border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "var(--border)"}`,
            background: copied ? "rgba(52,211,153,0.1)" : "var(--bg-card)",
            color: copied ? "var(--success)" : "var(--text-muted)",
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 5,
            fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap",
          }}>{copied ? "✓ Tersalin" : "⎘ Salin"}</button>

          <button title="Edit" onClick={e => { e.stopPropagation(); onEdit(coord); }} style={{
            width: 36, height: 36, borderRadius: 8,
            border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)",
            color: "#f59e0b", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontFamily: "inherit",
          }}>✏️</button>

          <button title="Hapus" onClick={e => { e.stopPropagation(); onDelete(coord); }} style={{
            width: 36, height: 36, borderRadius: 8,
            border: "1px solid rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)",
            color: "var(--danger)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, fontFamily: "inherit",
          }}>🗑️</button>
        </div>
      </div>

      {/* "Click to open Maps" hint bottom-right */}
      {!hovered && (
        <div style={{
          position: "absolute", bottom: 10, right: 18,
          fontSize: 10, color: "var(--text-muted)", opacity: 0.45, pointerEvents: "none",
          display: "flex", alignItems: "center", gap: 4,
        }}>Klik untuk buka Maps ↗</div>
      )}
    </div>
  );
}
