const navLinks = [...document.querySelectorAll(".main-nav a[href^='#']")];
const sections = navLinks
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter((section) => section !== null);

function setActiveLink() {
  const marker = window.scrollY + (window.scrollY < 100 ? 0 : 120);
  const current = sections.reduce(
    (active, section) => section.offsetTop <= marker ? section : active,
    sections[0],
  );

  navLinks.forEach((link) => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink);
setActiveLink();