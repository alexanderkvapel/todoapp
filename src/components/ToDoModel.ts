import { ITaskItem } from '../types/index.ts';
import { EventEmitter } from "./base/Events";

/**
 * Отвечает за хранение списка дел и работы с ним
 */
export class ToDoModel {
  // Массив дел
  protected items: ITaskItem[] = [];

  constructor(protected events: EventEmitter) {}

  /**
   * Сохранение массива дел
   * @param items массив дел
   */
  setItems(items: ITaskItem[]): void {
    this.items = items;
    this.events.emit('items:changed');
  }

  /**
   * Добавление нового дела
   * @param {ITaskItem} item дело для добавления
   */
  addItem(item: ITaskItem): void {
    this.items.unshift(item);
    this.events.emit('items:changed');
  }

  /**
   * Удаление дела
   * @param {number} id ID дела для удаления
   */
  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.events.emit('items:changed');
  }

  /**
   * Получение дела по ID
   * @param {number} id ID дела для получения
   * @returns {ITaskItem} дело
   */
  getItem(id: number): ITaskItem {
    const item = this.items.find(item => item.id === id);
  
    if (!item) {
      throw new Error(`Дело с id=${id} не найдено`);
    }

    return item;
  }

  /**
   * Получение всех дел
   * @returns {ITaskItem[]} массив дел
   */
  getItems(): ITaskItem[] {
    return this.items;
  }

  /**
   * Отметка дела как выполненное
   * @param {number} id ID дела для отметки
   */
  checkItem(id: number): void {
    const item = this.getItem(id);
    
    if (item) {
      item.completed = !item.completed;
    }
    this.events.emit('items:changed');
  }

  /**
   * Получение количества дел
   * @returns {number} количество дел
   */
  getItemsCount(): number {
    return this.items.length;
  }

  /**
   * Получение количества невыполненных дел
   * @returns {number} количество невыполненных дел
   */
  getNotCompletedItemsCount(): number {
    return this.items.filter(item => !item.completed).length;
  }

  isCompleted(id: number): boolean {
    const item = this.items.find(item => item.id === id);

    if (item) return item.completed;
    else throw new Error(`Не найдено дело с id=${id}`);
  }
}