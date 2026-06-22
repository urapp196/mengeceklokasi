import React from "react";

export default function LoginPage({ onLogin, loading }) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: "fixed",
        top: "15%", left: "10%",
        width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        animation: "blobFloat 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed",
        bottom: "10%", right: "10%",
        width: 300, height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
        animation: "blobFloat 10s ease-in-out infinite reverse",
      }} />

      <style>{`
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-card { animation: fadeInUp 0.6s ease forwards; }
        .logo-ring {
          animation: rotateSlow 12s linear infinite;
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="login-card" style={{
        maxWidth: 420,
        width: "100%",
        textAlign: "center",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
          <div style={{
            position: "relative",
            width: 80, height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "rgba(79,142,247,0.6)",
              borderRightColor: "rgba(79,142,247,0.2)",
            }} className="logo-ring" />
            <div style={{
              width: 60, height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4f8ef7 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              boxShadow: "0 8px 32px rgba(79,142,247,0.4)",
            }}>
              📍
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 30,
          fontWeight: 800,
          background: "linear-gradient(135deg, #f0f4ff 0%, #93bbfc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 8,
          letterSpacing: "-0.5px",
        }}>
          Maps Tracker
        </h1>
        <p style={{
          fontSize: 15,
          color: "var(--text-secondary)",
          marginBottom: 40,
          lineHeight: 1.6,
        }}>
          Simpan & kelola koordinat lokasi favoritmu.<br />
          Klik sekali untuk langsung buka Google Maps.
        </p>

        {/* Feature bullets */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "18px 20px",
          marginBottom: 32,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}>
          {[
            { icon: "🗺️", text: "Lacak lokasi via koordinat" },
            { icon: "💾", text: "Simpan dengan nama lokasi" },
            { icon: "🔗", text: "Buka langsung di Google Maps" },
            { icon: "☁️", text: "Data tersimpan di cloud" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 14,
              color: "var(--text-secondary)",
            }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Google Login Button */}
        <button
          className="btn btn-google"
          onClick={onLogin}
          disabled={loading}
          style={{ width: "100%", justifyContent: "center", position: "relative" }}
        >
          {loading ? (
            <div className="spinner" style={{ borderTopColor: "#4f8ef7" }} />
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: 20, height: 20 }}
              />
              <span style={{ fontWeight: 600, color: "#1f2937" }}>
                Masuk dengan Google
              </span>
            </>
          )}
        </button>

        <p style={{
          marginTop: 20,
          fontSize: 12,
          color: "var(--text-muted)",
        }}>
          Hanya akun yang diizinkan dapat mengakses aplikasi ini
        </p>
      </div>
    </div>
  );
}
