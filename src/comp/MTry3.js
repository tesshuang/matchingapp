import React, { Component } from 'react';
import txtData from './data.json';

class MTry3 extends Component {
    constructor(props){
        super(props);
        
        this.state={
            text1:txtData.txt1.toLowerCase(),
            text2:txtData.txt2.toLowerCase(),
            usrscore:10
        }
        
        this.GetAll = this.GetAll.bind(this);
        this.matchLength = this.matchLength.bind(this);
        this.matchData = this.matchData.bind(this);
        this.checkSection = this.checkSection.bind(this);
        this.comparisonRate = this.comparisonRate.bind(this);
        this.ChangeText = this.ChangeText.bind(this);
        this.ChangeText2 = this.ChangeText2.bind(this);
    }
    
    ChangeText(evt){
           this.setState({
            text1: evt.target.value
            }); 
    }
    
    ChangeText2(evt){    
           this.setState({
            text2: evt.target.value
            }); 
    }
    
    GetAll(){
        this.checkSection();
    }
    
    checkSection(){
        var score3 = this.state.usrscore;
        console.log(this.state.usrscore);
        
        if(this.state.text1.indexOf('objective') !== -1 || this.state.text1.indexOf('summary') !== -1){
           console.log(score3); 
        }else{
            score3 -= 1;
        }
        
        if(this.state.text1.indexOf('education') === -1){
            score3 -= 1;
        }
        
        if(this.state.text1.indexOf('skills') === -1){
            score3 -= 1;
        }
        
        console.log(score3);

        this.matchLength(score3);
    }
    
    matchLength(score){
        var checkwords = this.state.text1.trim();
        var wordcount = checkwords.split(" ").length;
        var score1 = score;
        
        console.log(score1, wordcount);
        if( wordcount >=500 && wordcount <=700){
            console.log(score1);
        } else{
            score1 -= 1;
        }
        
        this.matchData(score1);
        
    }
    
    matchData(score){
        var score2 = score;
        var myphone = "203-434-6339";
        var mphone = new RegExp('^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$');
        var nphone = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');
        var memail = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}');
        var myemail = "mark.mccowan@example.com";
        var maddress = new RegExp('[0-9]{2,6}[ ]?[a-zA-Z]{3,9}[ ]?[a-zA-Z]{3,9}');
        var myaddress = "144 Cheshire Road, Norwalk, CT 06854";

        var match1 = this.state.text1.match(nphone);
        
        console.log(match1, memail.test(myemail), maddress.test(myaddress), nphone.test(myphone));
        console.log(nphone.test(this.state.text1));
        
        if(nphone.test(this.state.text1) && memail.test(this.state.text1) && maddress.test(this.state.text1)){
            console.log(score2);
        }else{
            score2 -= 1;
        }
        
        this.setState({
            usrscore:score2
        });
        console.log(score2);
    }
    
    comparisonRate(){
        
    }
    
    
    render() {
        
        console.log(this.state.usrscore);
        return (
          <div >
            <textarea value={txtData.txt1} onChange={this.ChangeText}></textarea>
            <textarea value={txtData.txt2} onChange={this.ChangeText2}></textarea>
            <br/>
            <button onClick={this.GetAll}>Get a score</button>
          </div>
            
        );
    }
}

export default MTry3;
