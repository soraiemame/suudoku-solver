import React from "react";
import Box from "./Box";

export default class Board extends React.Component {
    board = [];
    constructor(){
        super();
        for(var i = 0;i < 9;i++){
            this.board[i] = [];
            for(var j = 0;j < 9;j++)this.board[i][j] = 0;
        }
    }
    changeval = (row,col,after) => {
        console.log(row,col,after);
        this.props.changeval(row,col,after);
    }
    render(){
        var view = [];
        for(var i = 0;i < 9;i++){
            var cur = [];
            for(var j = 0;j < 9;j++){
                cur.push(<td><Box changeval={this.changeval} row={i} col={j} /></td>);
            }
            view.push(<tr>{cur}</tr>);
        }
        return (
            <div id="board">
                <table cellPadding="0px" cellSpacing="0px" border="0px">
                    <tbody>
                        { view }
                    </tbody>
                </table>
            </div>
        );
    }
}