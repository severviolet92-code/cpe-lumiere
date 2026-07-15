/* CPE Lumière — interactions légères, sans dépendance externe. */

(function () {
  "use strict";

  /* Navigation mobile ------------------------------------------------------ */
  const bascule = document.querySelector(".nav__bascule");
  const nav = document.getElementById("navigation-principale");

  if (bascule && nav) {
    bascule.addEventListener("click", function () {
      const ouvert = nav.classList.toggle("est-ouvert");
      bascule.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });

    nav.addEventListener("click", function (evenement) {
      if (evenement.target.tagName === "A") {
        nav.classList.remove("est-ouvert");
        bascule.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Année courante dans le pied de page ------------------------------------ */
  const annee = document.getElementById("annee-courante");
  if (annee) {
    annee.textContent = String(new Date().getFullYear());
  }

  /* Apparition en douceur des sections ------------------------------------- */
  const elements = document.querySelectorAll(".apparait");
  if ("IntersectionObserver" in window && elements.length > 0) {
    const observateur = new IntersectionObserver(
      function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            entree.target.classList.add("est-visible");
            observateur.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach(function (element) {
      observateur.observe(element);
    });
  } else {
    elements.forEach(function (element) {
      element.classList.add("est-visible");
    });
  }

  /* Formulaire de contact (démonstration, aucun envoi réel) ---------------- */
  const formulaire = document.getElementById("formulaire-contact");
  const confirmation = document.getElementById("confirmation-contact");

  if (formulaire && confirmation) {
    formulaire.addEventListener("submit", function (evenement) {
      evenement.preventDefault();
      formulaire.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
    });
  }
})();
