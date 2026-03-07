document.addEventListener("DOMContentLoaded", () => {
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && menuClose && mobileMenu) {
  function openMenu() {
    mobileMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    menuClose.focus();
  }

  function closeMenu() {
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    menuToggle.focus();
  }

  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      closeMenu();
    }
  });
}
});