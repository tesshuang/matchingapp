import React, { Component } from 'react';
import Scroll from 'react-scroll'; 
import {scroller} from 'react-scroll';
import MTry5 from './MTry5';

let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;
let scroll     = Scroll.animateScroll;
let scrollSpy  = Scroll.scrollSpy;

class MTry6 extends Component {
    constructor (props){
      super(props);
        this.state = {
            toggle:false
        }
      /*this.scrollToTop = this.scrollToTop.bind(this);*/
        this.viewMore = this.viewMore.bind(this);
  }

  /*componentDidMount() {

    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });

  }
*/
    
/*  scrollToTop() {
    scroll.scrollToTop();
  }*/


   /*componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
    }*/
    
    viewMore(){
        var bool=true;
        this.setState({
            toggle:bool
        });
        console.log(bool);
    }
    render() {
        var comp = null;
        if(this.state.toggle == false){
            comp = <div className="blank">One Stuff</div>
        }else{
            comp = <div className="blank">More Stuff</div>
        }
        
        var scroller = Scroll.scroller;
        scroller.scrollTo('myScrollToElement', {
          duration: 1500,
          delay: 100,
          smooth: true,
          containerId: 'ContainerElementID',
          offset: 50
        });
        
        return (
          <div >
             <div className="blank">Hello Scroll</div>
            <div>
                <button onClick={this.viewMore}>
                <Link activeClass="active" className="test5" to="myScrollToElement" spy={true} smooth={true} duration={500} >Text 5 </Link>
                </button>
            </div>
            {comp}
        <Element name="myScrollToElement" className="element">
          test 5
        </Element>
            <div className="blank">Hello Scroll</div>
            {comp}
          </div>
            
        );
    }
}

export default MTry6;
