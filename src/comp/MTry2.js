import React, { Component } from 'react';

class MTry extends Component {
    constructor(props){
        super(props);
        
        this.state={
            mvalue:"",
            nvalue:"",
            ifClick: false
        }
        this.ChangeText = this.ChangeText.bind(this);
        this.ClearAll = this.ClearAll.bind(this);
        this.ChangeText2 = this.ChangeText2.bind(this);
        this.ClearAll2 = this.ClearAll2.bind(this);
    }
    
    ChangeText(evt){
        var ltext = evt.target.value;
           this.setState({
            mvalue: ltext
            }); 
        
        console.log(ltext);
    }
    
    ChangeText2(evt){
        var ltext = evt.target.value;
           this.setState({
            nvalue: ltext
            }); 
        
        console.log(ltext);
    }
    ClearAll(){
        this.setState({ 
            mvalue: '' 
        });
        console.log(this.state.mvalue);
    }
    ClearAll2(){
        this.setState({ 
            nvalue: '' 
        });
        console.log(this.state.nvalue);
    }
/*    clickOn(){
        this.setState({
            ifClick:
        })
    }*/
    render() {
        
        return (
          <div >
            <textarea value={this.state.mvalue} onChange={this.ChangeText}></textarea>
            <button onClick={this.ClearAll}>Clear all</button>
            <textarea value={this.state.nvalue} onChange={this.ChangeText2}></textarea>
            <button onClick={this.ClearAll2}>Clear all</button>
          </div>
        );
    }
}

export default MTry;
