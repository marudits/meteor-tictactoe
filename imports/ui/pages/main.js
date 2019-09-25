import { Template } from 'meteor/templating';

// api : Boards
import { Boards } from '../../api/boards.js';

// ui : components
import '../components/board.js';
import '../components/buttonInit.js';

// ui : pages
import './main.html';

Template.body.helpers({
  status() {
    const board = Boards.findOne(FlowRouter.getParam('board_id'));

    if (board) {
        return board.status;
    }
  }
});