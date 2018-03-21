import React from 'react';
import ReactDom from 'react-dom';

class Clock extends React.Component{
constructor(props){
    super(props);
    this.state = {
    date: new Date()
    }
}
render(){
    return(
    <div>
        <p>{this.state.date.toLocaleTimeString()}</p>
    </div>
    );
}

}
export default Clock;