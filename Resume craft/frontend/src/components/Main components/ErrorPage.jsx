import React from "react";

export default function ErrorPage() {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>500</h1>
        <p style={styles.text}>Server is down or not responding.</p>
        <a href="/" style={styles.link}>Go Back Home</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f2f2f2",
    textAlign: "center",
  },
  box: {
    background: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "60px",
    margin: 0,
    color: "#ff4444",
  },
  text: {
    margin: "10px 0 20px",
    fontSize: "18px",
    color: "#555",
  },
  link: {
    textDecoration: "none",
    background: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
  },
};
