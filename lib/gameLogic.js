export function convertFieldIdToRowCol(fieldId) {
    let index = fieldId.split('-');

    return { row: index[0], col: index[1] };
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