import update from 'immutability-helper';
import axios from 'axios';

let tasks = [
  {
    id: 1,
    text: 'Learn Javascript',
    completed: false,
  },
  {
    id: 2,
    text: 'Learn React',
    completed: false,
  },
  {
    id: 3,
    text: 'Build a React App',
    completed: false,
  },
];
/**
 * Get the list of todo items.
 * @return {Array}
 */
export function getAll() {
  return tasks;
}

export function deleteItemById(itemId) {
  tasks = tasks.filter(task => task.id !== itemId);
}

export function getItemById(itemId) {
  return getAll().find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
  let index = items.findIndex(item => item._id === itemId);

  // Returns a new list of data with updated item.
  return update(items, {
    [index]: {
      completed: { $set: completed },
    },
  });
}

/**
 * A counter to generate a unique id for a todo item.
 * Can remove this logic when the todo is created using backend/database logic.
 * @type {Number}
 */
let todoCounter = 1;

function getNextId() {
  return getAll().length + todoCounter++;
}

/**
 * Adds a new item on the list and returns the new updated list (immutable).
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export const addToList = async (data, token, list) => {
  // let item = Object.assign({
  //     id: getNextId()
  // }, data);

  const res = await axios.post('/tasks', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return list.concat([res.data]);
};
