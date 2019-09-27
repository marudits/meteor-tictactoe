import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api
import { Boards } from '../../api/boards';

// lib
import { convertFieldIdToRowCol, hasWinner, isGameEnded, isValidMove, isYourTurn } from '../../../lib/gameLogic.js';

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
        
        let { board, isPlayer1Turn, player1, player2 } = game;

        if (!player2) {
            alert(`Waiting your opponent to join. Invite now by share this board : \n${window.location.href}`);
            return;
        }

        if (isGameEnded(JSON.parse(board))) {
            alert(`Game has ended`);
            return;
        }

        if (!isYourTurn(Meteor.userId(), player1, isPlayer1Turn)) {
            alert('Keep calm! It is not your turn yet.');
            return;
        }

        if (!hasWinner(JSON.parse(board)).status) {
            const index = convertFieldIdToRowCol(e.target.id);

            if (isValidMove(JSON.parse(board)), index.row, index.col) {
                Meteor.call('boards.setField', boardId, e.target.id);
            }
        }   
    }
})