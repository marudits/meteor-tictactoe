import { Template } from 'meteor/templating';

// api : Boards
// import { Boards } from '../../api/boards.js';

// ui : components
import '../components/board.js';
import '../components/buttonInit.js';

// ui : pages
import './main.html';

Template.body.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});