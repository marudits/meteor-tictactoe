import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api : Boards
import { Boards } from '../../api/boards.js';

// ui : components
import '../components/board.js';

// ui : pages
import './board.html';

Template.layoutBoard.onCreated(() => {
  Meteor.subscribe('boards');
})

Template.layoutBoard.helpers({
    canJoinGame() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));
        
        if (board) {
            return board.player1 !== Meteor.userId() && board.player2 === null;
        }
    },
    isLoggedIn() {
        return Meteor.userId()
    },
    isPlayerInGame() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));
        
        if (board) {
            return board.player1 === Meteor.userId() || board.player2 === Meteor.userId();
        }
    },
    playerInfo() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));

        return {
            player1Id : board.player1,
            player1DisplayName: Meteor.userId() === board.player1 ? `You` : Meteor.user().username,
            player2Id : board.player2,
            player2DisplayName: Meteor.userId() === board.player2 ? `You` : Meteor.user().username
        }
    },
    status() {
        const board = Boards.findOne(FlowRouter.getParam('board_id'));

        if (board) {
            return board.status;
        }
    },
    statusText(status) {
        const board = Boards.findOne(FlowRouter.getParam('board_id')),
            currentUser = Meteor.userId();

        switch (status) {
        case 'initialize':
            return `Game is started. ${currentUser === board.player1 ? `Now is Your` : `Opponent`} Turn`;
        case 'turn_player_1':
            return `${currentUser === board.player1 ? `Your` : `Opponent`} Turn`;
        case 'turn_player_2':
            return `${currentUser === board.player2 ? `Your` : `Opponent`} Turn`;
        case 'win_player_1':
            return currentUser === board.player1 ? `Congratulations! You has won the match!` : `Sorry! You have lost the match`;
        case 'win_player_2':
            return currentUser === board.player2 ? `Congratulations! You has won the match!` : `Sorry! You have lost the match`;
        default:
            return status;    
        }
    }
});

Template.layoutBoard.events({
  'click .action-join'() {
    Meteor.call('boards.join', FlowRouter.getParam('board_id'))
  }
})