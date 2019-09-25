import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api
import { Boards } from '../../api/boards';

// ui : components
import './board.html';

Template.board.onCreated(function boardOnCreated() {
    Meteor.subscribe('boards');
})

Template.board.helpers({
    board() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));

        if (board) {
            return JSON.parse(board.board);
        }
    },
    status() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));

        if (board) {
            return board.status;
        }
    }
})

Template.board.events({
    'click .field'(e) {
        const boardId = FlowRouter.getParam('board_id');
        Meteor.call('boards.setField', boardId, e.target.id);
    }
})