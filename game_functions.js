
exports.check_game_board = function(game_board){
    let col = check_columns(game_board)
    let row = check_rows(game_board)
    let diagonal = check_diagonals(game_board)
    let cat_game = is_cat(game_board)

    if(col){
        return col === 'x' ? 1 : 2
    }else if(row){
        return row === 'x' ? 1 : 2
    }else if(diagonal){
        return diagonal === 'x' ? 1 : 2
    }else if(cat_game){
        return 'Nobody';
    }else{
        return null;
    }
}


check_columns = function(game_board){
    if (game_board.t1 === game_board.t4 & game_board.t4 === game_board.t7){
        if (game_board.t1 !== ''){
            return game_board.t1
        }
    }else if(game_board.t2 === game_board.t5 & game_board.t5 === game_board.t8){
        if (game_board.t2 !== ''){
            return game_board.t1
        }
    }else if(game_board.t3 === game_board.t6 & game_board.t6 === game_board.t9){
        if (game_board.t3 !== ''){
            return game_board.t3
        }
    }else{
        return null;
    }
}

check_rows = function(game_board){
    if (game_board.t1 === game_board.t2 & game_board.t2 === game_board.t3){
        if (game_board.t1 !== ''){
            return game_board.t2;
        }
    }else if(game_board.t4 === game_board.t5 & game_board.t5 === game_board.t6){
        if (game_board.t4 !== ''){
            return game_board.t4;
        }
    }else if(game_board.t7 == game_board.t8 & game_board.t8 === game_board.t9){
        if (game_board.t7 !== ''){
            return game_board.t7;
        }
    }else{
        return null;
    }
}

check_diagonals = function(game_board){
    if (game_board.t1 === game_board.t5 & game_board.t5 === game_board.t9){
        if (game_board.t1 !== ''){
            return game_board.t1;
        }
    }else if (game_board.t3 === game_board.t5 & game_board.t5 === game_board.t7){
        if (game_board.t3 !== ''){
            return game_board.t3;
        }
    }else{
        return null;
    }
}

is_cat = function(game_board){
    for(keys in game_board){
        if (keys !== 'player_turn'){
            if(game_board[keys] === ''){
                return false;
            }
        }
    }

    return true;
}