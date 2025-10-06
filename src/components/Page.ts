import { ensureElement } from '../utils/utils';
import { Component } from './base/Component.ts';


interface IPage {
  toDoList: HTMLElement[],
  tasksTotal: number,
  tasksRemain: number,
}

/**
 * Хранит элементы страницы и работает с ними
 */
export class Page extends Component<IPage> {
  protected toDosElement: HTMLElement;
  protected tasksCounterElement: HTMLElement;
  protected completedTasksCounterElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.toDosElement = ensureElement('.todos__list', this.container) as HTMLElement;
    this.tasksCounterElement = ensureElement('.todos__total', this.container) as HTMLElement;
    this.completedTasksCounterElement = ensureElement('.todos__remaining', this.container) as HTMLElement;
  }

  /**
   * Устанавливает список дел
   * @param {HTMLElement[]} items массив дел
   */
  set toDoList(items: HTMLElement[]) {
    this.toDosElement.replaceChildren(...items);
  }

  /**
   * Устанавливает общее кол-во дел
   * @param {number} value общее кол-во дел
   */
  set tasksTotal(value: number) {
    this.setText(this.tasksCounterElement, value);
  }

  /**
   * Устанавливает кол-во невыполненных дел
   * @param {number} value кол-во невыполненных дел
   */
  set tasksRemain(value: number) {
    this.setText(this.completedTasksCounterElement, value);
  }
}
