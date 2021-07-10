import React from "react";
import solve from "../logic/solve";

export default class Content extends React.Component {
    constructor(){
        super();
        this.state = {invalid: []};
    }
    get = () => {
        var board = [];
        const raw = document.querySelectorAll("input");
        if(this.state.invalid.length !== 0){
            alert("please fix the invalids");
            return;
        }
        for(var i = 0;i < 9;i++){
            board[i] = [];
            for(var j = 0;j < 9;j++){
                board[i][j] = raw[i * 9 + j].value === "" ? 0 : parseInt(raw[i * 9 + j].value);
            }
        }
        const res = solve(board);
        if(res === -1){
            alert("This suudoku isn't solveable.");
        }
        else{
            for(var i = 0;i < 9;i++){
                for(var j = 0;j < 9;j++){
                    raw[i][j].value = res[i][j];
                }
            }
            alert("done!!");
        }
    }
    changeval = (e) => {
        var tar = e.target;
        console.log(tar.id)
        var row = parseInt(tar.id[0]),col = parseInt(tar.id[1]),after = tar.value;
        console.log(row,col);
        var pl = row * 9 + col;
        console.log(row,col,after,pl);
        if(after === "" || ("123456789".includes(after) && after.length === 1)){
            var cur = this.state.invalid.filter((n) => n !== pl);
            this.setState({invalid: cur});
        }
        else{
            var cur = this.state.invalid;
            if(!cur.includes(pl))cur.push(pl);
            this.setState({invalid: cur});
        }
    }
    render(){
        var view = [];
        console.log(this.state.invalid)
        for(var i = 0;i < this.state.invalid.length;i++){
            view.push(<li>Element row { Math.floor(this.state.invalid[i] / 9) } col { this.state.invalid[i] % 9 } is invalid.</li>);
        }

        var bv = [];
        for(var i = 0;i < 9;i++){
            var cur = [];
            for(var j = 0;j < 9;j++){
                var id = i.toString() + j.toString();
                cur.push(<td><input id={id} onChange={this.changeval.bind(this)} /></td>)
            }
            bv.push(<tr>{cur}</tr>);
        }

        return (
            <div id="wrapper">
                <div id="board">
                    <table cellPadding="0px" cellSpacing="0px" border="0px">
                        <tbody>
                            { bv }
                        </tbody>
                    </table>
                    <button onClick={this.get}>solve it!</button>
                </div>

                <p>
                    <ul>
                        { view }
                    </ul>
                </p>

                <p>
                    This is a suudoku solver.Please type in the numbers and press "solve it!".
                </p>
            </div>
        );
    }
}