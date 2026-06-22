import React, { useState } from "react";

export default function EditCoordModal({ coord, onSave, onClose }) {
  const [name, setName] = useState(coord.name);
  const [coords, setCoords] = useState(`${coord.lat}, ${coord.lng}`);
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
    onSave({ id: coord.id, name: name.trim(), lat: parsed.lat, lng: parsed.lng });
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
            }}>✏️</div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Edit Koordinat</h2>
              <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>Ubah nama atau koordinat</p>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "var(--text-muted)",
            cursor: "pointer", fontSize: 22, lineHeight: 1, padding: "4px 8px", fontFamily: "inherit",
          }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Nama Lokasi
            </label>
            <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} autoFocus />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Koordinat (Lat, Lng)
            </label>
            <input className="input" type="text" value={coords} onChange={e => setCoords(e.target.value)} inputMode="decimal" />
            <p style={{ marginTop: 5, fontSize: 11, color: "var(--text-muted)" }}>Format: latitude, longitude</p>
          </div>

          {error && (
            <div style={{
              background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "var(--danger)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ flex: 1, justifyContent: "center", padding: "12px" }}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: "center", padding: "12px" }}>
              ✓ Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
