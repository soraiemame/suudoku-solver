import React from "react";
import solve from "../logic/solve";

export default class Content extends React.Component {
    constructor(){
        super();
        this.state = {invalid: []};
    }
    get = () => {
        var board = [];
        var raw = document.querySelectorAll("input");
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
            console.log(res)
            console.log(raw);
            for(var i = 0;i < 9;i++){
                for(var j = 0;j < 9;j++){
                    raw[i * 9 + j].value = res[i][j];
                }
            }
            alert("done!!");
        }
    }
    set = () => {
        const str = prompt("Please type in 81 numbers. Blank is 0.");
        console.log(str.length,str.match(/[0-9]/g))
        if(str.length !== 81 || str.match(/[0-9]/g).length !== 81){
            alert("Your input is invalid!!");
            return;
        }
        var raw = document.querySelectorAll("input");
        for(var i = 0;i < 81;i++)raw[i].value = parseInt(str[i]);
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
            view.push(
                <div className="alert alert-danger" role="alert">
                    Element row { Math.floor(this.state.invalid[i] / 9) } col { this.state.invalid[i] % 9 } is invalid.
                </div>
            );
        }

        var bv = [];
        for(var i = 0;i < 9;i++){
            var cur = [];
            for(var j = 0;j < 9;j++){
                var id = i.toString() + j.toString();
                var cls = [];
                if(i % 3 === 0)cls.push("up");
                if(i % 3 === 2)cls.push("down");
                if(j % 3 === 0)cls.push("left");
                if(j % 3 === 2)cls.push("right");
                cur.push(<td><input className={cls.join(" ")} id={id} onChange={this.changeval.bind(this)} /></td>)
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
                </div>
                <button type="button" className="btn btn-primary" onClick={this.get}>solve it!</button>
                <button type="button" className="btn btn-info" onClick={this.set}>input suudoku</button>

                { view }

                <p>
                    This is a simple suudoku solver. Please type in the numbers and press "solve it!".
                </p>
            </div>
        );
    }
}