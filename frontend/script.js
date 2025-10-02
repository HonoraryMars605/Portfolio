const API_URL = "http://localhost:3000/api/progetti";

async function caricaProgetti() {
    const res = await fetch(API_URL);
    const progetti = await res.json();
    const container = document.getElementById("listaProgetti");
    container.innerHTML = "";

    progetti.forEach(p => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
      <h3>${p.titolo}</h3>
      <p>${p.descrizione}</p>
      ${p.link ? `<a href="${p.link}" target="_blank">Vai al progetto</a>` : ''}
      <p><strong>Tecnologie:</strong> ${p.tech || 'N/A'}</p>
      <button onclick="rimuovi(${p.id})">Elimina</button>
    `;
        container.appendChild(card);
    });
}

document.getElementById("formProgetto").addEventListener("submit", async e => {
    e.preventDefault();
    const titolo = document.getElementById("titolo").value;
    const descrizione = document.getElementById("descrizione").value;
    const link = document.getElementById("link").value;
    const tech = document.getElementById("tech").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titolo, descrizione, link, tech })
    });

    e.target.reset();
    caricaProgetti();
});

async function rimuovi(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    caricaProgetti();
}

// Carica i progetti appena si apre la pagina
caricaProgetti();
