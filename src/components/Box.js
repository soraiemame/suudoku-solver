import React from "react";

export default class Box extends React.Component {
    handle = (e) => {
        const s = e.target.value;
        this.props.changeval(this.props.row,this.props.col,s);
    }
    render(){
        return (
            <input onChange={this.handle.bind(this)} />
        );
    }
}