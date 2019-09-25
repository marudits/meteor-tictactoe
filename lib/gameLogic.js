export function convertFieldIdToRowCol(fieldId) {
    let index = fieldId.split('-');

    return { row: index[0], col: index[1] };
}

export function hasWinner(board) {
    const horizontallyWin = isHorizontallyWin(board)

    if (horizontallyWin.status) {
        return horizontallyWin;
    }

    return { status: false, player: null }
}

function summarizeFields(fields) {
    let summary = {};

    for (let item of fields) {
        if (summary[item]) {
            summary[item]++;
        } else {
            summary[item] = 1;
        }
    }

    return summary;
}

function isVerticallyWin(board) {

}

function isHorizontallyWin(board) {
    for (let i = 0; i < board.length; i++) {
        
        if (summarizeFields(board[i])[1] === board.length) {
            return { status: true, player: 1 }
        }

        if (summarizeFields(board[i])[2] === board.length) {
            return { status: true, player: 2 }
        }
    }

    return { status: false, player: null }
}

function isDiagonallyWin() {

}

export function isValidMove(board, row, col) {
    // check valid row
    if (typeof board[row] === 'undefined') {
        return false;
    }

    // check valid field
    if (typeof board[row][col] === 'undefined') {
        return false;
    }

    // is empty
    if (board[row][col] !== null) {
        return false;
    }

    return true;
}

export function setField(board, row, col, item) {
    if (typeof board[row][col] !== 'undefined') {
        if (board[row][col] === null) {
            board[row][col] = item;

            return { status: true, board };
        }
    }

    return { status: false, board };
}