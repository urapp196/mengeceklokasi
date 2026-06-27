import React, { useState, useEffect, useCallback, useRef } from "react";
import Dashboard from "./components/Dashboard";
import Toast from "./components/Toast";

const STORAGE_KEY = "maps_tracker_coords";

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Gagal menyimpan:", e);
  }
}

export default function App() {
  const [coords, setCoords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);
  const coordsRef = useRef(coords);

  // Keep ref in sync so event listeners always have latest data
  useEffect(() => {
    coordsRef.current = coords;
  }, [coords]);

  // ✅ Simpan SETIAP KALI coords berubah — penting untuk mobile
  useEffect(() => {
    saveToStorage(coords);
  }, [coords]);

  // ✅ Cadangan: simpan saat tab disembunyikan (mobile switch app, dll)
  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "hidden") {
        saveToStorage(coordsRef.current);
      }
    }
    // pagehide lebih andal dari beforeunload di iOS Safari
    function handlePageHide() {
      saveToStorage(coordsRef.current);
    }
    function handleBeforeUnload() {
      saveToStorage(coordsRef.current);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  return (
    <>
      <Dashboard coords={coords} setCoords={setCoords} showToast={showToast} />
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
