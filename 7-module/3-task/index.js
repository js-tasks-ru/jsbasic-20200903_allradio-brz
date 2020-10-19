import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render(steps, value);
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
  }

  render(steps, value) {
    let divSlider = createElement('<div class="slider"></div>');
    divSlider.addEventListener("click", () => {
      this.valueSlider = this.getValueSlider(event, steps);
      this.setValueSlider(this.valueSlider, steps);
    });
    let innerHtml = `<div class="slider__thumb" style="left: 50%;">
                      <span class="slider__value">2</span>
                    </div>`;
    let divSliderThumb = createElement(innerHtml);
    divSlider.append(divSliderThumb);

    let divSliderProgress = createElement(
      '<div class="slider__progress" style="width: 50%;"></div>'
    );
    divSlider.append(divSliderProgress);

    let divSliderSteps = createElement('<div class="slider__steps"></div>');

    for (let i = 0; i < steps; i++) {
      let span = createElement("<span></span>");
      if (i == value) {
        span.classList.add("slider__step-active");
      }
      divSliderSteps.append(span);
    }
    divSlider.append(divSliderSteps);

    return divSlider;
  }

  getValueSlider(event, steps) {
    let slider = document.querySelector(".slider");
    if (event.currentTarget == slider) {
      let domRectSlider = slider.getBoundingClientRect();
      let widthSlider = domRectSlider.width;
      let leftSlider = domRectSlider.left;
      let widthStep = widthSlider / (steps - 1);
      let coordsClickX = event.clientX - leftSlider;
      let valueSlider = Math.round(coordsClickX / widthStep);

      return valueSlider;
    }
  }

  setValueSlider(valueSlider, steps) {
    let slider = this.elem;

    let divSliderValue = slider.querySelector(".slider__value");
    divSliderValue.innerText = valueSlider;

    let activeStep = slider.querySelector(".slider__step-active");
    activeStep.classList.remove("slider__step-active");

    let nodeSliderSteps = slider.querySelector(".slider__steps");
    let span = nodeSliderSteps.childNodes[valueSlider];
    span.classList.add("slider__step-active");

    let leftPercents = valueSlider * (100 / (steps - 1));

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    let eventSliderChange = new CustomEvent("slider-change", {
      detail: valueSlider,
      bubbles: true,
    });

    slider.dispatchEvent(eventSliderChange);
  }
}
