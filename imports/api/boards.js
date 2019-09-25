import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// lib
import { convertFieldIdToRowCol, hasWinner, setField } from '../../lib/gameLogic.js';

export const Boards = new Mongo.Collection('boards');

if (Meteor.isServer) {
    Meteor.publish('boards', function boardsPublications() {
        return Boards.find({})
    });
}

Meteor.methods({
    'boards.init'(length = 3) {
        const newBoard = Boards.insert({
            createdAt: new Date(),
            board: JSON.stringify(new Array(length).fill(new Array(length).fill(null))),
            is_player_1_turn: true,
            status: 'initialize'
        });

        return newBoard;
    },
    'boards.find'(boardId) {
        return Boards.findOne(boardId)
    },
    'boards.reset'(boardId) {
        const currentGame = Boards.findOne(boardId);
    },
    'boards.setField'(boardId, fieldId) {
        const game = Boards.findOne(boardId);
        
        let { board, is_player_1_turn, _id } = game;
        
        const index = convertFieldIdToRowCol(fieldId);
        const newBoard = setField(JSON.parse(board), index.row, index.col, is_player_1_turn ? 1 : 2);

        let status = is_player_1_turn ? `turn_player_2` : `turn_player_1`;

        const data = { 
            board: JSON.stringify(newBoard.board), 
            is_player_1_turn: !is_player_1_turn,
            status 
        }

        Boards.update(_id, { $set: data })
    }
})