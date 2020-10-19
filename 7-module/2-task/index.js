import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = this.render();
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();

    document.body.removeEventListener("keydown", (e) => {
      if (e.code == "Escape") {
        this.close();
      }
    });
  }

  render() {
    let modal = createElement('<div class="modal"></div>');
    let modalOverlay = createElement('<div class="modal__overlay"></div>');
    modal.append(modalOverlay);
    let modalInner = createElement('<div class="modal__inner"></div>');
    let modalHeader = createElement('<div class="modal__header"></div>');

    let innerHtml = `<button type="button" class="modal__close">
                      <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                    </button>`;
    let button = createElement(innerHtml);
    modalHeader.append(button);

    let modalTitle = createElement('<h3 class="modal__title"></h3>');
    modalHeader.append(modalTitle);
    modalInner.append(modalHeader);

    let modalBody = createElement('<div class="modal__body"></div>');
    modalInner.append(modalBody);

    modal.append(modalInner);

    return modal;
  }
  open() {
    document.body.append(this.elem),
      document.body.classList.add("is-modal-open");

    let button = document.querySelector(".modal__close");
    button.addEventListener("click", () => this.close());

    document.body.addEventListener("keydown", () => {
      if (event.code == "Escape") {
        this.close();
      }
    });
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector(".modal__title");
    modalTitle.innerText = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = node.outerHTML;
  }
}
