import './styles/styles.css';

import { EventEmitter } from './components/base/Events.ts'
import { ToDoModel } from './components/ToDoModel.ts';
import { Api } from './components/base/Api.ts';
import { ToDoApi } from './components/ToDoApi.ts';
import { Page } from './components/Page.ts';
import { cloneTemplate } from './utils/utils.ts';
import { Item } from './components/Item.ts';
import { Form } from './components/Form.ts';


const api = new Api('https://jsonplaceholder.typicode.com/');
const events = new EventEmitter();
const todoApi = new ToDoApi(api);
const todoModel = new ToDoModel(events);
const page = new Page(document.querySelector('.page__content') as HTMLElement);
const form = new Form(document.querySelector('.todos__form') as HTMLElement, events);

const itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;

todoApi.getTasks()
  .then((items) => {
    todoModel.setItems(items);
  })
  .catch(error => console.error(error));

events.on('items:changed', () => {
  const itemsHTMLArray = todoModel.getItems().map(item => new Item(cloneTemplate(itemTemplate), events).render(item));

  page.render({
    toDoList: itemsHTMLArray,
    tasksTotal: todoModel.getItemsCount(),
    tasksRemain: todoModel.getNotCompletedItemsCount(),
  });
});

events.on('item:delete', ({ id }: { id: number }) => {
  todoModel.deleteItem(id);
});

events.on('item:copy', ({ id }: { id: number }) => {
  const { title } = todoModel.getItem(id);

  todoApi.addTask({ title, completed: false })
    .then(item => todoModel.addItem(item))
    .catch(error => console.error(error));
});

events.on('item:check', ({ id }: { id: number }) => {
  todoModel.checkItem(id);
});

events.on('form:submit', ({ value }: { value: string}) => {
  todoApi.addTask({ title: value, completed: false })
    .then(item => todoModel.addItem(item))
    .catch(error => console.error(error));
});
