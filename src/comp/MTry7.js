import React, { Component } from 'react';
import CirPro from './CirPro';


class MTry7 extends Component {
    constructor (props){
      super(props);
        this.state = {
            toggle:false
        }
        this.viewMore = this.viewMore.bind(this);
        //this.scrollToDiv = this.scrollToDiv.bind(this);
  }

    viewMore(){
        var bool=true;
        this.setState({
            toggle:bool
        });
        
       /*this.refs.apple.scrollIntoView({
           behavior: "smooth", 
           block: "end", 
           inline: "nearest"});   
        console.log(bool);*/
    }
    
    scrollToDiv(){
        
    }
    
    /*
        working script
        function -> this.refs.apple.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); 
        return ->
        <div className="blank" ref="apple">Hello Scroll</div>
    */
    render() {
        
        var comp = null;
        if(this.state.toggle == true){
            comp = <CirPro />
        }else{
            comp = <div className="blank">More Stuff</div>
        }
                
        return (
          <div >
             <div className="blank">Hello Scroll</div>
            <div>
                <button onClick={this.viewMore}>
                Click me
                </button>
            </div>
            {comp}
            
          </div>
            
        );
    }
}

export default MTry7;
