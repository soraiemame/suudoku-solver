import React from "react";
import Board from "./Board";

export default class Content extends React.Component {
    constructor(){
        super();
        this.state = {invalid: []};
    }
    changeval = (row,col,after) => {
        var pl = row * 9 + col;
        if(after !== "" || ("123456789".includes(after) && after.lenth === 1)){
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
        for(var invalid in this.state.invalid){
            view.push(<li>Element row { invalid / 9 } col { invalid % 9 } is invalid.</li>);
        }
        return (
            <div id="wrapper">
                <Board changeval={this.changeval} />
                <p>
                    <ul>
                        { view }
                    </ul>
                </p>

                <button>solve it!</button>
                <p>
                    This is a suudoku solver.Please type in the numbers and press "solve it!".
                </p>
            </div>
        );
    }
}