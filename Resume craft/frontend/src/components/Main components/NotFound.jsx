export default function NotFound() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f2f2f2",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "60px", margin: 0, color: "#ff4444" }}>404</h1>
        <p style={{ margin: "10px 0 20px", fontSize: "18px", color: "#555" }}>
          Sorry, page not found!
        </p>

        <a
          href="/"
          style={{
            textDecoration: "none",
            background: "#007bff",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            display: "inline-block",
          }}
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
