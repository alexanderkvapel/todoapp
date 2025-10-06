import { ITaskItem } from "../types";
import { Api } from "./base/Api";


const endpoint = '/todos';


/**
 * Позволяет взаимодействовать с данными с сервера
 */
export class ToDoApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Получить все дела с сервера
   * @returns {Promise<ITaskItem[]>} Промис с массивом дел
   */
  getTasks() : Promise<ITaskItem[]> {
    return this.api.get<ITaskItem[]>(endpoint);
  }

  /**
   * Добавить дело на сервер
   * @param {Partial<ITaskItem>} item данные дела
   * @returns {Promise<ITaskItem>} 
   */
  addTask(item: Partial<ITaskItem>): Promise<ITaskItem> {
    return this.api.post(endpoint, item);
  }

  /**
   * Удалить дело с сервера
   * @param {Partial<ITaskItem>} item данные дела
   * @returns {Promise<ITaskItem>} 
   */
  deleteTask(item: Partial<ITaskItem>): Promise<ITaskItem> {
    return this.api.post<ITaskItem>(endpoint, item, 'DELETE');
  }

  /**
   * Редактировать дело на сервере
   * @param {Partial<ITaskItem>} item данные дела
   * @returns {Promise<ITaskItem>} 
   */
  editTask(item: Partial<ITaskItem>): Promise<ITaskItem> {
    return this.api.post<ITaskItem>(endpoint, item, 'PATCH');
  }
}