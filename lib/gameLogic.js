export function convertFieldIdToRowCol(fieldId) {
    let index = fieldId.split('-');

    return { row: index[0], col: index[1] };
}

export function hasWinner(board) {
    let { length } = board;

    return false;
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