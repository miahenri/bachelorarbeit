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
  },

  "equivalent-tooltip-bad": (container) => {
    container.innerHTML = `
      <div class="tooltip-wrapper bad">
    <button class="tooltip-btn">
      Info
    </button>
    <span class="tooltip">
      Zusätzliche Information
    </span>
  </div>
    `;
  },

    "equivalent-tooltip-good": (container) => {
    container.innerHTML = `
        <div class="tooltip-wrapper good">
    <button class="tooltip-btn">
      Info
    </button>
    <span class="tooltip">
      Zusätzliche Information
    </span>
  </div>
    `;
  },

"motion-feedback-bad": (container) => {
  container.innerHTML = `
    <div class="motion-demo">
      <label for="bad-email">E-Mail</label>
      <input
        id="bad-email"
        class="motion-input"
        type="email"
        value="max.mustermann@"
      />
      <button type="button" class="motion-submit">Absenden</button>
    </div>
  `;

  const input = container.querySelector(".motion-input");
  const button = container.querySelector(".motion-submit");

  button.addEventListener("click", () => {
    input.classList.remove("shake", "error");
    void input.offsetWidth;
    input.classList.add("error", "shake");
  });
},

"motion-feedback-good": (container) => {
  container.innerHTML = `
    <div class="motion-demo">

      <label for="good-email">E-Mail</label>
      <input
        id="good-email"
        class="motion-input"
        type="email"
        value="max.mustermann@"
        aria-describedby="good-email-error"
      />

      <p id="good-email-error" class="motion-error-text" hidden>
        Ungültige Eingabe: Bitte geben Sie eine gültige E-Mail-Adresse ein.
      </p>

      <button type="button" class="motion-submit">Absenden</button>

      <button type="button" class="motion-toggle" aria-pressed="false">
        Bewegung ausschalten
      </button>
    </div>
  `;

  const wrapper = container.querySelector(".motion-demo");
  const input = container.querySelector(".motion-input");
  const button = container.querySelector(".motion-submit");
  const toggle = container.querySelector(".motion-toggle");
  const errorText = container.querySelector(".motion-error-text");

  let motionOff = false;

  toggle.addEventListener("click", () => {
    motionOff = !motionOff;
    wrapper.classList.toggle("reduced-motion", motionOff);
    toggle.setAttribute("aria-pressed", String(motionOff));
    toggle.textContent = motionOff ? "Bewegung einschalten" : "Bewegung ausschalten";
  });

  button.addEventListener("click", () => {
    input.classList.remove("shake");
    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");
    errorText.hidden = false;

    if (!motionOff) {
      void input.offsetWidth;
      input.classList.add("shake");
    }
  });
}
};
