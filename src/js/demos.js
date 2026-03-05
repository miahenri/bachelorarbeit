// /src/js/demos.js

window.DEMOS = {
  "redundant-buttons-bad": (container) => {
    container.innerHTML = `
      <button class="demo-btn bad">
        Klick mich
      </button>
    `;
  },

  "redundant-buttons-good": (container) => {

    container.innerHTML = `
      <button class="demo-btn good" id="good-save-btn">
        <span class="text">Klick mich</span>
        <span class="icon" aria-hidden="true">✓</span>
      </button>
    `;

    const saveBtn = container.querySelector("#good-save-btn");

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        saveBtn.classList.add("saved");

        const text = saveBtn.querySelector(".text");
        text.textContent = "Geklickt";
      });
    }

  }
};
