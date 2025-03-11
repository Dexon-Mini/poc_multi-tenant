export default function LayoutB({ children }) {
  return (
    <div style={{ margin: "1rem" }}>
      <header style={{ borderBottom: "1px solid #ccc" }}>
        <h3>Top Header</h3>
      </header>
      <main style={{ padding: "1rem" }}>{children}</main>
      <footer style={{ borderTop: "1px solid #ccc", marginTop: "1rem" }}>
        <small>Footer</small>
      </footer>
    </div>
  );
}
