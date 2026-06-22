import React, { useState } from "react";
import CoordCard from "./CoordCard";
import AddCoordModal from "./AddCoordModal";
import EditCoordModal from "./EditCoordModal";
import ConfirmModal from "./ConfirmModal";
import { useIsMobile } from "../hooks/useIsMobile";
import MobileDashboard from "./MobileDashboard";
import DesktopDashboard from "./DesktopDashboard";

export default function Dashboard({ coords, setCoords, showToast }) {
  const isMobile = useIsMobile();
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function handleAdd({ name, lat, lng }) {
    const newCoord = {
      id: Date.now().toString(),
      name, lat, lng,
      createdAt: new Date().toISOString(),
    };
    setCoords((prev) => [newCoord, ...prev]);
    setShowAdd(false);
    showToast(`✓ "${name}" berhasil ditambahkan!`, "success");
  }

  function handleEdit({ id, name, lat, lng }) {
    setCoords((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name, lat, lng } : c))
    );
    setEditTarget(null);
    showToast(`✓ "${name}" berhasil diperbarui!`, "success");
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setCoords((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    showToast(`"${deleteTarget.name}" dihapus.`, "info");
    setDeleteTarget(null);
  }

  const sharedProps = {
    coords,
    onAdd: () => setShowAdd(true),
    onEdit: setEditTarget,
    onDelete: setDeleteTarget,
  };

  return (
    <>
      {isMobile
        ? <MobileDashboard {...sharedProps} />
        : <DesktopDashboard {...sharedProps} />
      }

      {showAdd && <AddCoordModal onAdd={handleAdd} onClose={() => setShowAdd(false)} />}
      {editTarget && (
        <EditCoordModal coord={editTarget} onSave={handleEdit} onClose={() => setEditTarget(null)} />
      )}
      {deleteTarget && (
        <ConfirmModal
          title="Hapus Koordinat?"
          message={`Lokasi "${deleteTarget.name}" akan dihapus permanen.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
