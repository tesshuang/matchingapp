import React, { Component } from 'react';

class MTry extends Component {
    constructor(props){
        super(props);
        
        this.state={
            mvalue:"",
            nvalue:"",
            ifClick: false,
            value:'',
            myid:0,
            inputstyle:{
                backgroundColor:"red"
            }
        }
        this.ChangeText = this.ChangeText.bind(this);
        this.ClearAll = this.ClearAll.bind(this);
    }
    
    ChangeText(ltext, num){
        if(num ==1){
           this.setState({
            mvalue: ltext
            }); 
        } else if(num == 2){
           this.setState({
            nvalue: ltext
            }); 
        }
        
    }
    
    
    ClearAll(num){
        if(num == 1){
            this.setState({ 
            mvalue: '' 
        });
        }
        if(num == 2){
            this.setState({ 
            nvalue: '' 
        });
        }
        
        
    }
    
/*    clickOn(){
        this.setState({
            ifClick:
        })
    }*/
    

    render() {
        console.log(this.state.value);
        return (
          <div >
            <textarea value={this.state.mvalue} onChange={(evt)=>{this.ChangeText(evt.target.value, 1)}}></textarea>
            <button onClick={this.ClearAll.bind(this, 1)}>Clear all</button>
            <textarea value={this.state.nvalue} onChange={(evt)=>{this.ChangeText(evt.target.value, 2)}}></textarea>
            <button onClick={this.ClearAll.bind(this, 2)}>Clear all</button>
            <div className="boxStyle">

                </div>
                <input type="number" placeholder="pls type your number"/>
          </div>
        );
    }
}

export default MTry;
