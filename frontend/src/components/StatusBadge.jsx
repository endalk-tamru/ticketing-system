import React from "react";
import statusTags from "../constants/statusTags";

export default function StatusBadge({ status }) {
  const statusObj = Object.values(statusTags).find(
    (obj) => obj.label === status
  );

  return (
    <div
      style={{
        margin: "0 auto",
        textAlign: "center",
        borderRadius: "30px",
        width: "130px",
        padding: "0.2rem 0.5rem",
        background: statusObj?.bgColor || "#212429",
        color: statusObj?.color || "#ffffff",
      }}
    >
      {status}
    </div>
  );
}
