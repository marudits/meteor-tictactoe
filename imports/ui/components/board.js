import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api
import { Boards } from '../../api/boards';

// lib
import { convertFieldIdToRowCol, isValidMove } from '../../../lib/gameLogic.js';

// ui : components
import './board.html';

Template.board.onCreated(function boardOnCreated() {
    Meteor.subscribe('boards', FlowRouter.getParam('board_id'));
})

Template.board.helpers({
    board() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));

        if (board) {
            return JSON.parse(board.board);
        }
    },
    item(board, row, col) {
        return `${board[row][col]}`
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
        const game = Boards.findOne(boardId);
        
        let { board, is_player_1_turn, _id } = game;
        
        const index = convertFieldIdToRowCol(e.target.id);

        if (isValidMove(JSON.parse(board)), index.row, index.col) {
            Meteor.call('boards.setField', boardId, e.target.id);
        } else {
            alert('Invalid move');
        }
        
    }
})