function toggleText() {
  const btn = document.querySelector(".toggle-text-button");
  const textBlock = document.querySelector("#text");

  btn.addEventListener("click", () => {
    textBlock.hasAttribute("hidden")
      ? textBlock.removeAttribute("hidden")
      : textBlock.setAttribute("hidden", true);
  });
}
