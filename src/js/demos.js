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
      toggle.textContent = motionOff
        ? "Bewegung einschalten"
        : "Bewegung ausschalten";
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
  },

  "persistent-toast-bad": (container) => {
    container.innerHTML = `
    <div class="toast-demo">
      <button type="button" class="toast-trigger">Datei hochladen</button>
      <div class="toast is-hidden">Datei hochgeladen</div>
    </div>
  `;

    const trigger = container.querySelector(".toast-trigger");
    const toast = container.querySelector(".toast");
    let timeoutId;

    trigger.addEventListener("click", () => {
      toast.classList.remove("is-hidden");

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        toast.classList.add("is-hidden");
      }, 2500);
    });
  },

  "persistent-toast-good": (container) => {
    container.innerHTML = `
  <div class="toast-demo">
    <button type="button" class="toast-trigger">Datei hochladen</button>

    <div class="toast-slot">
      <div class="toast toast-persistent is-hidden">
        <span>Datei hochgeladen</span>
        <button type="button" class="toast-close" aria-label="Meldung schließen">×</button>
      </div>

      <button type="button" class="toast-reopen is-hidden">
        Meldung erneut anzeigen
      </button>
    </div>
  </div>
  `;

    const trigger = container.querySelector(".toast-trigger");
    const toast = container.querySelector(".toast");
    const closeBtn = container.querySelector(".toast-close");
    const reopenBtn = container.querySelector(".toast-reopen");

    function showToast() {
      toast.classList.remove("is-hidden");
      reopenBtn.classList.add("is-hidden");
    }

    function hideToast() {
      toast.classList.add("is-hidden");
      reopenBtn.classList.remove("is-hidden");
    }

    trigger.addEventListener("click", showToast);
    closeBtn.addEventListener("click", hideToast);
    reopenBtn.addEventListener("click", showToast);
  },

  "prioritized-feedback-bad": (container) => {
    container.innerHTML = `
  <div class="like-demo">
    <button type="button" class="like-btn bad">
      <span class="like-icon" aria-hidden="true"></span>
      <span class="like-text">Like</span>
      <span class="like-count">24</span>
    </button>
  </div>
  `;

    const outlineHeart = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.0106 6.00116C6.49992 1.00002 0.999923 8.00002 5.78098 13.0006L12.0106 20L18.2402 13.0006C22.9999 8.00001 17.4999 1.00002 12.0106 6.00116Z"
    stroke="#b0004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

    const filledHeart = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.7491 20.6595L18.9336 13.5617C21.6106 10.6779 21.4927 7.05639 19.6883 4.85653C18.7902 3.7617 17.4815 3.04134 15.9684 3.00173C14.6753 2.96787 13.3163 3.43185 12.0051 4.44439C10.6896 3.43167 9.32733 2.96789 8.03225 3.00172C6.51713 3.04131 5.20686 3.7611 4.30832 4.85653C2.50241 7.05818 2.39278 10.6803 5.07965 13.5625L11.2634 20.6595C11.4521 20.8761 11.7224 21 12.0063 21C12.2901 21 12.5604 20.8761 12.7491 20.6595Z"
    fill="#b0004b stroke="#b0004b"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round""/>
  </svg>
  `;

    const button = container.querySelector(".like-btn");
    const icon = container.querySelector(".like-icon");
    const text = container.querySelector(".like-text");
    const count = container.querySelector(".like-count");

    icon.innerHTML = outlineHeart;

    let liked = false;

    button.addEventListener("click", () => {
      liked = !liked;

      if (liked) {
        icon.innerHTML = filledHeart;
        text.textContent = "Geliked";
        count.textContent = "25";

        button.classList.add("liked");

        button.classList.remove("animate");
        void button.offsetWidth;
        button.classList.add("animate");
      } else {
        icon.innerHTML = outlineHeart;
        text.textContent = "Like";
        count.textContent = "24";

        button.classList.remove("animate", "liked");
      }
    });

    button.addEventListener("animationend", () => {
      if (liked) button.classList.add("liked");
      button.classList.remove("animate");
    });
  },

  "prioritized-feedback-good": (container) => {
    container.innerHTML = `
  <div class="like-demo">
    <button type="button" class="like-btn good">
      <span class="like-icon" aria-hidden="true"></span>
      <span class="like-text">Like</span>
      <span class="like-count">24</span>
    </button>
  </div>
  `;

    const outlineHeart = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.0106 6.00116C6.49992 1.00002 0.999923 8.00002 5.78098 13.0006L12.0106 20L18.2402 13.0006C22.9999 8.00001 17.4999 1.00002 12.0106 6.00116Z"
    stroke="#b0004b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

    const filledHeart = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.7491 20.6595L18.9336 13.5617C21.6106 10.6779 21.4927 7.05639 19.6883 4.85653C18.7902 3.7617 17.4815 3.04134 15.9684 3.00173C14.6753 2.96787 13.3163 3.43185 12.0051 4.44439C10.6896 3.43167 9.32733 2.96789 8.03225 3.00172C6.51713 3.04131 5.20686 3.7611 4.30832 4.85653C2.50241 7.05818 2.39278 10.6803 5.07965 13.5625L11.2634 20.6595C11.4521 20.8761 11.7224 21 12.0063 21C12.2901 21 12.5604 20.8761 12.7491 20.6595Z"
    fill=""#b0004b"/>
  </svg>
  `;

    const button = container.querySelector(".like-btn");
    const icon = container.querySelector(".like-icon");
    const text = container.querySelector(".like-text");
    const count = container.querySelector(".like-count");

    icon.innerHTML = outlineHeart;

    let liked = false;

    button.addEventListener("click", () => {
      liked = !liked;

      if (liked) {
        icon.innerHTML = filledHeart;
        text.textContent = "Geliked";
        count.textContent = "25";

        button.classList.add("liked");
      } else {
        icon.innerHTML = outlineHeart;
        text.textContent = "Like";
        count.textContent = "24";

        button.classList.remove("liked");
      }
    });
  },

  "spatial-dropdown-bad": (container) => {
  container.innerHTML = `
    <div class="spatial-demo bad">
      <button type="button" class="spatial-menu-toggle" aria-expanded="false">
        Menü öffnen
      </button>

      <div class="spatial-stage">
        <div class="spatial-menu" hidden>
          <button type="button" class="spatial-menu-item">Profil</button>
          <button type="button" class="spatial-menu-item">Einstellungen</button>
          <button type="button" class="spatial-menu-item">Abmelden</button>
        </div>

        <div class="spatial-actions">
          <button type="button" class="spatial-action-btn">Aktion 1</button>
          <button type="button" class="spatial-action-btn">Aktion 2</button>
        </div>
      </div>
    </div>
  `;

  const toggle = container.querySelector(".spatial-menu-toggle");
  const menu = container.querySelector(".spatial-menu");
  const demo = container.querySelector(".spatial-demo");

  let open = false;

  toggle.addEventListener("click", () => {
    open = !open;
    menu.hidden = !open;
    demo.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Menü schließen" : "Menü öffnen";
  });
},

"spatial-dropdown-good": (container) => {
  container.innerHTML = `
    <div class="spatial-demo good">
      <button type="button" class="spatial-menu-toggle" aria-expanded="false">
        Menü öffnen
      </button>

      <div class="spatial-stage stable">
        <div class="spatial-menu" hidden>
          <button type="button" class="spatial-menu-item">Profil</button>
          <button type="button" class="spatial-menu-item">Einstellungen</button>
          <button type="button" class="spatial-menu-item">Abmelden</button>
        </div>

        <div class="spatial-actions">
          <button type="button" class="spatial-action-btn">Aktion 1</button>
          <button type="button" class="spatial-action-btn">Aktion 2</button>
        </div>
      </div>
    </div>
  `;

  const toggle = container.querySelector(".spatial-menu-toggle");
  const menu = container.querySelector(".spatial-menu");

  let open = false;

  toggle.addEventListener("click", () => {
    open = !open;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Menü schließen" : "Menü öffnen";
  });
},
};
