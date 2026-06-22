import React from "react";

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal" style={{ textAlign: "center" }}>
        {/* Icon */}
        <div style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, margin: "0 auto 16px",
        }}>
          🗑️
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{title}</h2>
        <p style={{
          fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6,
          marginBottom: 24, maxWidth: 300, margin: "0 auto 24px",
        }}>
          {message}
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            style={{ flex: 1, justifyContent: "center", padding: "13px" }}
          >
            Batal
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            style={{ flex: 1, justifyContent: "center", padding: "13px", fontWeight: 700 }}
          >
            🗑️ Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
