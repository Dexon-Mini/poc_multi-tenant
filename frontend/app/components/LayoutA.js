export default function LayoutA({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <aside style={{ width: "20%", borderRight: "1px solid #ccc" }}>
        {/* Sidebar left */}
        <h4>Sidebar (left)</h4>
      </aside>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
