import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api : Boards
import { Boards } from '../../api/boards.js';

// ui : components
import '../components/board.js';
import '../components/buttonInit.js';

// ui : pages
import './main.html';

Template.body.helpers({
  canSeeBoard() {
    const board = Boards.findOne(FlowRouter.getParam('board_id'));
    
    if (board) {
      return Meteor.userId() && (board.player1 === Meteor.userId() || board.player2 === Meteor.userId())
    }
  },
  isLoggedIn() {
    const board = Boards.findOne(FlowRouter.getParam('board_id'));
    return Meteor.userId()
  },
  isPlayerInGame() {
    const board = Boards.findOne(FlowRouter.getParam('board_id'));
    
    if (board) {
      return board.player1 === Meteor.userId() || board.player2 === Meteor.userId();
    }
  },
  status() {
    const board = Boards.findOne(FlowRouter.getParam('board_id'));

    if (board) {
      return board.status;
    }
  },
  statusText(status) {
    switch (status) {
      case 'initialize':
        return `Game is started. Player 1 Turn`;
      case 'turn_player_1':
        return `Player 1 Turn`;
      case 'turn_player_2':
        return `Player 2 Turn`;
      case 'win_player_1':
        return `Congratulations! Player 1 has won the match!`
      case 'win_player_2':
        return `Congratulations! Player 2 has won the match!`
      default:
        return status;    
    }
  }
});