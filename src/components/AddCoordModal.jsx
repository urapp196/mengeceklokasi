import React, { useState } from "react";

export default function AddCoordModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [coords, setCoords] = useState("");
  const [error, setError] = useState("");

  function parseCoords(input) {
    const parts = input.trim().split(/[\s,]+/);
    if (parts.length !== 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    if (lat < -90 || lat > 90) return null;
    if (lng < -180 || lng > 180) return null;
    return { lat, lng };
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Nama lokasi tidak boleh kosong."); return; }
    const parsed = parseCoords(coords);
    if (!parsed) { setError("Format tidak valid. Contoh: -6.2088, 106.8456"); return; }
    onAdd({ name: name.trim(), lat: parsed.lat, lng: parsed.lng });
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
            }}>📍</div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Tambah Koordinat</h2>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>Masukkan koordinat & nama lokasi</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "var(--text-muted)",
            cursor: "pointer", fontSize: 22, lineHeight: 1, padding: "4px 8px",
            borderRadius: 6, fontFamily: "inherit",
          }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Name */}
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Nama Lokasi
            </label>
            <input
              className="input"
              type="text"
              placeholder="Kantor, Rumah, Restoran..."
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
          </div>

          {/* Coordinates */}
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Koordinat (Lat, Lng)
            </label>
            <input
              className="input"
              type="text"
              placeholder="-6.2088, 106.8456"
              value={coords}
              onChange={e => setCoords(e.target.value)}
              inputMode="decimal"
            />
            <p style={{ marginTop: 6, fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
              Format: <strong style={{ color: "var(--text-secondary)", fontFamily: "monospace" }}>latitude, longitude</strong>
              <br />Contoh: <strong style={{ color: "var(--text-secondary)", fontFamily: "monospace" }}>-6.2088, 106.8456</strong>
            </p>
          </div>

          {/* Tip: cara cari koordinat */}
          <div style={{
            background: "rgba(79,142,247,0.07)", border: "1px solid rgba(79,142,247,0.15)",
            borderRadius: 9, padding: "10px 12px", fontSize: 12, color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}>
            💡 <strong>Cara cari koordinat:</strong> Buka Google Maps → tahan lokasi di peta → koordinat muncul di bawah
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "var(--danger)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1, justifyContent: "center", padding: "12px" }}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: "center", padding: "12px" }}>
              💾 Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
