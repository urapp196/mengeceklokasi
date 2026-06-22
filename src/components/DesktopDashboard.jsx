import React, { useState } from "react";
import CoordCard from "./CoordCard";

/* ═══════════════════════════════════════════════
   DESKTOP DASHBOARD
   - Left sidebar with stats & quick actions
   - Right main panel with search + card grid
   - Sticky navbar with logo + save indicator
   - Cards show action buttons on hover (no ⋯)
   - Two-column layout (sidebar + content)
═══════════════════════════════════════════════ */
export default function DesktopDashboard({ coords, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest" | "name"

  const filtered = coords
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        `${c.lat}`.includes(search) ||
        `${c.lng}`.includes(search)
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt); // newest
    });

  // Stats
  const totalLocations = coords.length;
  const latestCoord = coords[0];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ─── NAVBAR ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,14,26,0.90)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 32px",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg,#4f8ef7,#7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: "0 4px 14px rgba(79,142,247,0.4)",
            }}>📍</div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.4px" }}>
              Maps<span style={{ color: "var(--accent)" }}>Tracker</span>
            </span>
            <span style={{
              fontSize: 11, color: "var(--text-muted)", fontWeight: 500,
              borderLeft: "1px solid var(--border)", paddingLeft: 12, marginLeft: 4,
            }}>
              Desktop
            </span>
          </div>

          {/* Center: search */}
          <div style={{ flex: 1, maxWidth: 400, position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "var(--text-muted)", pointerEvents: "none", fontSize: 15,
            }}>🔍</span>
            <input
              className="input"
              type="text"
              placeholder="Cari nama, latitude, atau longitude..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 38, height: 40, fontSize: 14 }}
            />
          </div>

          {/* Right: save indicator + add */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)",
              borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "var(--success)",
            }}>
              <div className="pulse-dot" />
              <span>Auto-save saat keluar</span>
            </div>
            <button
              className="btn btn-primary"
              onClick={onAdd}
              style={{ padding: "9px 20px", gap: 8 }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
              Tambah Koordinat
            </button>
          </div>
        </div>
      </header>

      {/* ─── BODY: SIDEBAR + CONTENT ─── */}
      <div style={{
        flex: 1,
        maxWidth: 1200,
        width: "100%",
        margin: "0 auto",
        padding: "28px 32px",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 28,
        alignItems: "start",
      }}>
        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 92 }}>
          {/* App info card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(79,142,247,0.12), rgba(124,58,237,0.08))",
            border: "1px solid rgba(79,142,247,0.2)",
            borderRadius: 16, padding: "20px",
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🗺️</div>
            <h2 style={{
              fontSize: 15, fontWeight: 800,
              background: "linear-gradient(135deg,#f0f4ff,#93bbfc)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 6,
            }}>
              Koordinat Tracker
            </h2>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Simpan lokasi favoritmu dan buka langsung di Google Maps dengan satu klik.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 16, padding: "18px",
          }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
              Statistik
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Total Lokasi", value: totalLocations, icon: "📍", color: "#4f8ef7" },
                { label: "Hasil Filter", value: filtered.length, icon: "🔍", color: "#10b981" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.label}</span>
                  </div>
                  <span style={{
                    fontWeight: 800, fontSize: 18, color: s.color,
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest entry */}
          {latestCoord && (
            <div style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "18px",
            }}>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                Terbaru
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "linear-gradient(135deg,#4f8ef7,#7c3aed)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                }}>📍</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {latestCoord.name}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "monospace", marginTop: 2 }}>
                    {latestCoord.lat.toFixed(4)}, {latestCoord.lng.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick add */}
          <button
            className="btn btn-primary"
            onClick={onAdd}
            style={{ justifyContent: "center", padding: "12px", width: "100%", borderRadius: 12 }}
          >
            <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
            Tambah Koordinat Baru
          </button>

          {/* Tips */}
          <div style={{
            background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: 12, padding: "14px",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24", marginBottom: 8 }}>💡 Tips</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "Klik kartu untuk buka Maps",
                "Hover kartu untuk lihat aksi",
                "Data disimpan saat tutup tab",
              ].map((tip, i) => (
                <li key={i} style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 6 }}>
                  <span style={{ color: "var(--warning)", flexShrink: 0 }}>›</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ── RIGHT CONTENT ── */}
        <main style={{ minWidth: 0 }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 16 }}>
            <div>
              <h1 style={{
                fontSize: 24, fontWeight: 800,
                background: "linear-gradient(135deg,#f0f4ff,#93bbfc)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}>
                {search ? `Hasil Pencarian` : "Semua Lokasi"}
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>
                {search
                  ? `${filtered.length} lokasi ditemukan untuk "${search}"`
                  : `${coords.length} lokasi tersimpan — hover kartu untuk aksi`}
              </p>
            </div>

            {/* Sort */}
            {coords.length > 1 && (
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  color: "var(--text-secondary)", borderRadius: 8,
                  padding: "7px 12px", fontSize: 13, cursor: "pointer",
                  fontFamily: "inherit", outline: "none",
                  flexShrink: 0,
                }}
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="name">Nama A–Z</option>
              </select>
            )}
          </div>

          {/* Empty: no coords */}
          {coords.length === 0 && (
            <div style={{
              textAlign: "center", padding: "80px 40px",
              background: "var(--bg-card)", border: "2px dashed var(--border)",
              borderRadius: 20,
            }}>
              <div style={{ fontSize: 60, marginBottom: 18 }}>🗺️</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Belum ada koordinat</h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, maxWidth: 380, margin: "0 auto 28px" }}>
                Tambahkan koordinat lokasi favoritmu. Klik satu kali untuk langsung membuka Google Maps.
              </p>
              <button className="btn btn-primary" onClick={onAdd} style={{ padding: "12px 28px" }}>
                <span style={{ fontSize: 20 }}>+</span> Tambah Koordinat Pertama
              </button>
            </div>
          )}

          {/* Empty: no search results */}
          {coords.length > 0 && filtered.length === 0 && (
            <div style={{
              textAlign: "center", padding: "60px 40px",
              background: "var(--bg-card)", border: "1px dashed var(--border)", borderRadius: 20,
            }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
              <p style={{ color: "var(--text-muted)", fontSize: 15 }}>
                Tidak ada hasil untuk <strong style={{ color: "var(--text-secondary)" }}>"{search}"</strong>
              </p>
            </div>
          )}

          {/* Card grid */}
          {filtered.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((coord, i) => (
                <CoordCard
                  key={coord.id}
                  coord={coord}
                  index={i}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isMobile={false}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "16px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, color: "var(--text-muted)",
        maxWidth: 1200, width: "100%", margin: "0 auto",
      }}>
        <span>Maps Tracker — Data tersimpan di browser saat menutup tab</span>
        <span>{coords.length} koordinat tersimpan</span>
      </footer>
    </div>
  );
}
