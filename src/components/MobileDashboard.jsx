import React, { useState } from "react";
import CoordCard from "./CoordCard";

/* ═══════════════════════════════════════════════
   MOBILE DASHBOARD
   - Bottom navigation (Lokasi / Cari / Tambah)
   - Floating Action Button (+)
   - Bottom-sheet modals
   - Cards with expandable ⋯ actions
   - Full-screen single column
═══════════════════════════════════════════════ */
export default function MobileDashboard({ coords, onAdd, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("home"); // "home" | "search"
  const [search, setSearch] = useState("");

  const filtered = coords.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      `${c.lat}`.includes(search) ||
      `${c.lng}`.includes(search)
  );

  const displayList = activeTab === "search" ? filtered : coords;

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-primary)",
      paddingBottom: "calc(64px + env(safe-area-inset-bottom))",
    }}>
      {/* ─── TOP HEADER ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,14,26,0.97)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
        paddingTop: "env(safe-area-inset-top)",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: "linear-gradient(135deg,#4f8ef7,#7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, boxShadow: "0 3px 12px rgba(79,142,247,0.45)",
              flexShrink: 0,
            }}>📍</div>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.4px", lineHeight: 1 }}>
              Maps<span style={{ color: "var(--accent)" }}>Tracker</span>
            </span>
          </div>

          {/* Count pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="pulse-dot" />
            <span style={{
              background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)",
              color: "#93bbfc", borderRadius: 20, padding: "4px 12px",
              fontSize: 12, fontWeight: 700,
            }}>
              {coords.length} lokasi
            </span>
          </div>
        </div>

        {/* Search bar (only on search tab) */}
        {activeTab === "search" && (
          <div style={{ padding: "0 16px 14px" }}>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                color: "var(--text-muted)", pointerEvents: "none", fontSize: 16,
              }}>🔍</span>
              <input
                className="input"
                type="search"
                placeholder="Cari nama atau koordinat..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 40, fontSize: 15 }}
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main style={{ flex: 1, padding: "16px 14px 8px" }}>

        {/* Section title */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{
            fontSize: 22, fontWeight: 800,
            background: "linear-gradient(135deg,#f0f4ff,#93bbfc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}>
            {activeTab === "search" ? `Hasil: ${filtered.length}` : "Semua Lokasi"}
          </h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.4 }}>
            {activeTab === "search"
              ? "Ketuk kartu untuk buka Google Maps"
              : "Ketuk ⋯ pada kartu untuk lihat aksi"}
          </p>
        </div>

        {/* Empty: no coords at all */}
        {coords.length === 0 && (
          <div style={{
            textAlign: "center", padding: "52px 20px 56px",
            background: "var(--bg-card)", border: "1px dashed var(--border)",
            borderRadius: 20, marginTop: 4,
          }}>
            <div style={{ fontSize: 56, marginBottom: 14 }}>🗺️</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Belum ada lokasi</h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 22, lineHeight: 1.5 }}>
              Ketuk tombol <strong style={{ color: "var(--accent)" }}>+</strong> di bawah<br/>untuk menambah koordinat pertamamu
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.15)",
              borderRadius: 20, padding: "8px 18px", fontSize: 13, color: "var(--accent)",
            }}>
              <span style={{ fontSize: 18 }}>👇</span> Ketuk + di bawah
            </div>
          </div>
        )}

        {/* Empty: search has no results */}
        {activeTab === "search" && coords.length > 0 && filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "50px 20px",
            background: "var(--bg-card)", border: "1px dashed var(--border)",
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.5 }}>
              Tidak ada hasil untuk{" "}
              <strong style={{ color: "var(--text-secondary)" }}>"{search}"</strong>
            </p>
          </div>
        )}

        {/* Card list */}
        {displayList.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {displayList.map((coord, i) => (
              <CoordCard
                key={coord.id}
                coord={coord}
                index={i}
                onEdit={onEdit}
                onDelete={onDelete}
                isMobile={true}
              />
            ))}
            {/* Extra spacer so last card isn't hidden behind FAB */}
            <div style={{ height: 10 }} />
          </div>
        )}
      </main>

      {/* ─── FAB ─── */}
      <button
        onClick={onAdd}
        aria-label="Tambah koordinat"
        style={{
          position: "fixed",
          bottom: "calc(72px + env(safe-area-inset-bottom))",
          right: 18,
          width: 56, height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#4f8ef7,#7c3aed)",
          border: "none",
          color: "#fff", fontSize: 28,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(79,142,247,0.55), 0 2px 8px rgba(0,0,0,0.4)",
          cursor: "pointer", zIndex: 200,
          transition: "transform 0.15s, box-shadow 0.15s",
          WebkitTapHighlightColor: "transparent",
        }}
        onPointerDown={e => e.currentTarget.style.transform = "scale(0.88)"}
        onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
        onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        +
      </button>

      {/* ─── BOTTOM NAV ─── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(10,14,26,0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: "env(safe-area-inset-bottom)",
        zIndex: 100,
        height: "calc(64px + env(safe-area-inset-bottom))",
      }}>
        {[
          { id: "home",   icon: "📍", label: "Lokasi" },
          { id: "search", icon: "🔍", label: "Cari" },
          { id: "add",    icon: "➕", label: "Tambah" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => tab.id === "add" ? onAdd() : setActiveTab(tab.id)}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3,
              paddingTop: 10, paddingBottom: 6,
              paddingLeft: 20, paddingRight: 20,
              border: "none", background: "none",
              color: (activeTab === tab.id && tab.id !== "add")
                ? "var(--accent)"
                : tab.id === "add" ? "var(--text-secondary)" : "var(--text-muted)",
              fontSize: 10, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              WebkitTapHighlightColor: "transparent",
              transition: "color 0.2s",
              flex: 1,
              minHeight: 64,
            }}
          >
            <span style={{
              fontSize: 22,
              filter: (activeTab === tab.id && tab.id !== "add")
                ? "drop-shadow(0 0 6px rgba(79,142,247,0.7))"
                : "none",
              transition: "filter 0.2s, transform 0.15s",
              transform: tab.id === "add" ? "scale(0.9)" : "scale(1)",
            }}>
              {tab.icon}
            </span>
            <span style={{ letterSpacing: "0.03em", lineHeight: 1 }}>{tab.label}</span>
            {/* Active indicator dot */}
            {activeTab === tab.id && tab.id !== "add" && (
              <div style={{
                width: 4, height: 4, borderRadius: "50%",
                background: "var(--accent)",
                marginTop: 2,
              }} />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
