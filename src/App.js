import React, { Component } from 'react';
import './App.css';
import MControl from './comp/MControlforTest';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state ={
            matching:{}
            
        }
        
        this.pushMatching = this.pushMatching.bind(this);
        
    }
    pushMatching(data){
        var temp = this.state.matching;
        temp.push(data);
        
        this.setState({
            matching:temp
        });
        
        console.log(temp);
    }

    render() {
        var comp = <MControl 
            pushMatching={this.pushMatching}
            />;
        return (
          <div className="App">
            {comp}
          </div>
        );
    }
}

export default App;
