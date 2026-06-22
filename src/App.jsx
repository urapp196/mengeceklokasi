import React, { useState, useEffect, useCallback, useRef } from "react";
import Dashboard from "./components/Dashboard";
import Toast from "./components/Toast";

const STORAGE_KEY = "maps_tracker_coords";

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

  // Keep ref in sync so beforeunload always has latest data
  useEffect(() => {
    coordsRef.current = coords;
  }, [coords]);

  // Save to localStorage ONLY when user leaves the page
  useEffect(() => {
    function handleBeforeUnload() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(coordsRef.current));
      } catch (e) {
        console.error("Gagal menyimpan:", e);
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
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
