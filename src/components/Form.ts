import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component"
import { EventEmitter } from "./base/Events";


interface IForm {
  value: string,
  buttonText: string,
  errorText: string,
}

/**
 * Хранит элементы формы добавления нового дела
 */
export class Form extends Component<IForm> {
  protected inputFieldElement: HTMLInputElement;
  protected submitButtonElement: HTMLButtonElement;
  protected errorMessageElement: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this.inputFieldElement = ensureElement('.todos__input', this.container) as HTMLInputElement;
    this.submitButtonElement = ensureElement('.todos__submit-btn', this.container) as HTMLButtonElement;
    this.errorMessageElement = ensureElement('.todos__error-message') as HTMLElement;

    this.container.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this.inputFieldElement.value.length === 0) {
        this.displayError = true;
      } else {
        this.events.emit('form:submit', { value: this.inputFieldElement.value });
        this.displayError = false;
      }

      this.value = "";
    })
  }

  /**
   * Устанавливает текст в инпут
   * @param {string} value текст инпута
   */
  set value(value: string) {
    this.inputFieldElement.value = value.trim();
  }

  /**
   * Устанавливает текст кнопки
   * @param {string} value текст кнопки
   */
  set buttonText(value: string) {
    this.setText(this.submitButtonElement, value.trim());
  }

  /**
   * Устанавливает и снимает текст ошибки
   * @param {string} value true - установить, false - снять
   */
  set displayError(value: boolean) {
    this.toggleClass(this.errorMessageElement, 'visually-hidden', !value)
  }
}