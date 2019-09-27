import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// lib
import { convertFieldIdToRowCol, hasWinner, isValidMove, setField } from '../../lib/gameLogic.js';

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
            isPlayer1Turn: true,
            status: 'initialize',
            player1: Meteor.userId(),
            player1Username: Meteor.user().username,
            player2: null
        });

        return newBoard;
    },
    'boards.find'(boardId) {
        return Boards.findOne(boardId)
    },
    'boards.join'(boardId) {
        Boards.update(boardId, { $set: { player2: Meteor.userId(), player2Username: Meteor.user().username } })
    },
    'boards.setField'(boardId, fieldId) {
        const game = Boards.findOne(boardId);
        
        let { board, isPlayer1Turn, _id } = game;
        
        const index = convertFieldIdToRowCol(fieldId);

        if (isValidMove(JSON.parse(board), index.row, index.col)) {
            const newBoard = setField(JSON.parse(board), index.row, index.col, isPlayer1Turn ? 1 : 2);

            let status = isPlayer1Turn ? `turn_player_2` : `turn_player_1`;

            let winner = hasWinner(newBoard.board);

            if (winner.status) {
                status = `win_player_${winner.player}`
            }

            const data = { 
                board: JSON.stringify(newBoard.board), 
                isPlayer1Turn: !isPlayer1Turn,
                status 
            }

            Boards.update(_id, { $set: data })
        }
        
    }
})