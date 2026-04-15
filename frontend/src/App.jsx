import { useState } from "react";

function App() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const handleRun = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://mariam.app.n8n.cloud/webhook/email");
      const data = await res.json();

      let formatted = [];

      if (Array.isArray(data)) {
        formatted = data.map(item => item.json ?? item);
      } else if (data) {
        formatted = [data];
      }

      setEmails(formatted);

    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'appel API");
    } finally {
      setLoading(false);
    }
  };

  const filteredEmails = emails
    .filter(email => {
      if (filterCategory !== "all" && email.category !== filterCategory) {
        return false;
      }
      if (filterStatus !== "all" && email.status !== filterStatus) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
  if (sortOrder === "asc") {
    return new Date(a.date) - new Date(b.date);
  } else if (sortOrder === "desc") {
    return new Date(b.date) - new Date(a.date);
  } else {
    return 0;
  }
});

  return (
    <div style={{
      fontFamily: "Arial",
      padding: "30px",
      background: "#f5f7fa",
      minHeight: "100vh"
    }}>
      <h1 style={{ marginBottom: "20px" }}>Email Automation</h1>

      <button
        onClick={handleRun}
        style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "50px",
          marginBottom: "20px"
        }}
      >
        {loading ? "Traitement..." : "Lancer traitement"}
      </button>

      {}
      <div style={{
        marginBottom: "20px",
        display: "flex",
        gap: "10px"
      }}>
        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">Toutes catégories</option>
          <option value="commercial">Commercial</option>
          <option value="support">Support</option>
          <option value="autre">Autre</option>
        </select>

        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">Tous statuts</option>
          <option value="répondu">Répondu</option>
          <option value="ignoré">Ignoré</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">Pas de tri</option>
          <option value="desc">Date décroissante</option>
          <option value="asc">Date croissante</option>
        </select>
      </div>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={th}>Date</th>
              <th style={th}>From</th>
              <th style={th}>Subject</th>
              <th style={th}>Category</th>
              <th style={th}>Status</th>
              <th style={th}>Reply</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmails.map((e, i) => (
              <tr key={i}>
                <td style={td}>{e.date}</td>
                <td style={td}>{e.from}</td>
                <td style={td}>{e.subject}</td>
                <td style={td}>{e.category}</td>
                <td style={{
                  ...td,
                  color: e.status === "répondu" ? "green" : "gray",
                  fontWeight: "bold"
                }}>
                  {e.status}
                </td>
                <td style={td}>{e.reply}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmails.length === 0 && !loading && (
          <p style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#888"
          }}>
            Aucun email traité
          </p>
        )}
      </div>
    </div>
  );
}

const th = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #ddd"
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee"
};

export default App;