import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api
import { Boards } from '../../api/boards';

// lib
import { convertFieldIdToRowCol, hasWinner, isValidMove } from '../../../lib/gameLogic.js';

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
    item(board, row, col) {
        return `${board[row][col]}`
    },
})

Template.board.events({
    'click .field'(e) {
        const boardId = FlowRouter.getParam('board_id');
        const game = Boards.findOne(boardId);
        
        let { board } = game;

        if (!hasWinner(JSON.parse(board)).status) {
            const index = convertFieldIdToRowCol(e.target.id);

            if (isValidMove(JSON.parse(board)), index.row, index.col) {
                Meteor.call('boards.setField', boardId, e.target.id);
            } else {
                alert('Invalid move');
            }
        }   
    }
})