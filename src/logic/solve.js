export default function solve(board){
    console.log(board)
    function check(){
        for(var i = 0;i < 9;i++){
            var cnt = [0,0,0,0,0,0,0,0,0];
            for(var j = 0;j < 9;j++){
                if(board[i][j] !== 0)cnt[board[i][j] - 1]++;
            }
            for(var j = 0;j < 9;j++)if(cnt[j] > 1)return false;
        }
        for(var i = 0;i < 9;i++){
            var cnt = [0,0,0,0,0,0,0,0,0];
            for(var j = 0;j < 9;j++){
                if(board[j][i] !== 0)cnt[board[j][i] - 1]++;
            }
            for(var j = 0;j < 9;j++)if(cnt[j] > 1)return false;
        }
        for(var i = 0;i < 9;i += 3){
            for(var j = 0;j < 9;j += 3){
                var cnt = [0,0,0,0,0,0,0,0,0];
                for(var x = 0;x < 3;x++){
                    for(var y = 0;y < 3;y++){
                        if(board[i + x][j + y] !== 0)
                        cnt[board[i + x][j + y] - 1]++;
                    }
                }
                for(var k = 0;k < 9;k++)if(cnt[k] > 1)return false;
            }
        }
        return true;
    }
    function rec(row,col){
        if(row === 9)return true;
        else if(col === 9)return rec(row + 1,0);
        else if(board[row][col] !== 0)return rec(row,col + 1);
        for(var i = 1;i <= 9;i++){
            board[row][col] = i;
            if(check()){
                if(rec(row,col + 1))return true;
            }
        }
        board[row][col] = 0;
        return false;
    }
    if(rec(0,0)){
        return board;
    }
    else{
        return -1;
    }
}