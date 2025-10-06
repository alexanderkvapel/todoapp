import { ITaskItem } from '../types/index.ts';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component.ts';
import { EventEmitter } from './base/Events.ts';

/**
 * Хранит элементы конкретного дела и работает с ними
 */
export class Item extends Component<ITaskItem> {
  protected identificator: number = 0;
  protected titleElement: HTMLElement;
  protected deleteButtonElement: HTMLButtonElement;
  protected copyButtonElement: HTMLButtonElement;
  protected checkBoxElement: HTMLButtonElement;
  
  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    // Устанавливаем компоненты элемента списка дела
    this.titleElement = ensureElement('.todo-item__text', this.container);
    this.deleteButtonElement = ensureElement('.todo-item__del', this.container) as HTMLButtonElement;
    this.copyButtonElement = ensureElement('.todo-item__copy', this.container) as HTMLButtonElement;
    this.checkBoxElement = ensureElement('.todo-item__flag-off', this.container) as HTMLButtonElement;

    // Навешиваем обработчики событий
    this.deleteButtonElement.addEventListener('click', () => this.events.emit('item:delete', { id: this.identificator }));
    this.copyButtonElement.addEventListener('click', () => this.events.emit('item:copy', { id: this.identificator }));
    this.checkBoxElement.addEventListener('click', () => this.events.emit('item:check', { id: this.identificator }));
  }

  /**
   * Установить наименование дела
   * @param {string} value наименование дела
   */
  set title(value: string) {
    this.setText(this.titleElement, value);
  }

  /**
   * Изменить статус выполнения дела
   * @param {boolean} value статус выполнености дела
   */
  set completed(value: boolean) {
    this.toggleClass(this.checkBoxElement, 'todo-item__flag-on', value);
    this.toggleClass(this.checkBoxElement, 'todo-item__flag-off', !value);
  }

  /**
   * Установить идентификатор дела
   * @param {number} value идентификатор дела
   */
  set id(value: number) {
    this.identificator = value;
  }
}