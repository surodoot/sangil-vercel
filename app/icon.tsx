import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1F3A",
          border: "1px solid rgba(201,169,110,0.5)",
          borderRadius: 6,
          color: "#F9F7F2",
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        SE
      </div>
    ),
    size,
  );
}
