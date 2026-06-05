(function () {
  function setupFaq() {
    var faqList = document.querySelector("[data-faq-list]");

    if (!faqList || faqList.dataset.faqReady === "true") {
      return;
    }

    faqList.dataset.faqReady = "true";

    faqList.addEventListener("click", function (event) {
      var button = event.target.closest("[data-faq-toggle]");

      if (!button || !faqList.contains(button)) {
        return;
      }

      var answerId = button.getAttribute("aria-controls");
      var answer = answerId ? document.getElementById(answerId) : null;
      var icon = button.querySelector("[aria-hidden='true']");
      var isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));

      if (answer) {
        answer.hidden = isOpen;
      }

      if (icon) {
        icon.textContent = isOpen ? "+" : "-";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFaq);
  } else {
    setupFaq();
  }
})();
