// /src/js/detail-page.js
(async function init() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch("./src/principles.json");
    if (!res.ok)
      throw new Error(`JSON konnte nicht geladen werden (${res.status})`);

    const data = await res.json();
    const principles = data.principles || [];

    const principle = principles.find((p) => p.id === id) || principles[0];

    if (!principle) {
      renderNotFound();
      return;
    }

    // Titel der Seite (Browser Tab)
    document.title = principle.principleTitle;

    // Textfelder einsetzen (als Text, sicher)
    setText("problem-kicker", principle.problemKicker);
    setText("principle-title", principle.principleTitle);
    setText("principle-intro", principle.principleIntro);
    setText("effect-text", principle.effectText);
    setText("devices-text", principle.devicesText);

    setText("ds-material-text", principle.designSystems?.material);
    setText("ds-carbon-text", principle.designSystems?.carbon);
    setText("ds-apple-text", principle.designSystems?.apple);

    // Beispiele: erstmal als Text/HTML (du kannst später Interaktionen per JS rendern)
    renderDemo("example-bad", principle.exampleBad);
    renderDemo("example-good", principle.exampleGood);

    // Nutzergruppen rendern (Cards/Spalten)
    renderUserGroups("user-groups", principle.userGroups);
  } catch (err) {
    console.error(err);
    renderError("Beim Laden der Inhalte ist ein Fehler aufgetreten.");
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value ?? "";
  }

  function renderDemo(containerId, demoKey) {
    const mount = document.getElementById(containerId);
    if (!mount) return;

    // Container leeren
    mount.innerHTML = "";

    // Wenn noch kein Beispiel definiert ist
    if (!demoKey || demoKey === "TBD") {
      mount.innerHTML = `<p class="demo-note">Beispiel folgt.</p>`;
      return;
    }

    // Demo-Funktion aus demos.js holen
    const demoFunction = window.DEMOS?.[demoKey];

    if (typeof demoFunction !== "function") {
      mount.innerHTML = `<p class="demo-note">Demo nicht gefunden: ${demoKey}</p>`;
      return;
    }

    // Demo rendern
    demoFunction(mount);
  }

  function renderUserGroups(containerId, groups = []) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    (groups || []).forEach((g) => {
      const col = document.createElement("div");

      const h4 = document.createElement("h4");
      h4.textContent = g.title || "";

      const p = document.createElement("p");
      p.textContent = g.text || "";

      col.appendChild(h4);
      col.appendChild(p);
      container.appendChild(col);
    });
  }

  function renderNotFound() {
    document.body.innerHTML =
      "<h1>Prinzip nicht gefunden</h1><p>Bitte zurück zur Übersicht.</p>";
  }

  function renderError(msg) {
    document.body.innerHTML = `<h1>Fehler</h1><p>${msg}</p>`;
  }
})();
