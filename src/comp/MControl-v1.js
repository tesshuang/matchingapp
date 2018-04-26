import React, { Component } from 'react';
import './MCon.css';
import txtData from './data.json';
import MResultDis from './MResultDis';

console.log(txtData);


class MControl extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            showResult:false,
            text1:txtData.txt1.toLowerCase(),
            text2:txtData.txt2.toLowerCase(),
            arrSlist: ['collaborate', 'teamwork', 'develop','execute','update','maintain','related','experience'],
            arrHlist: ['graphic', 'design', 'adobe', 'creative', 'indesign', 'illustrator', 'photoshop', 'dreamweaver', 'lightroom', 'html', 'css', 'mailchimp', 'shopify','web','digital', 'typography','newsletter', 'website'],
            softarr:[],
            hardarr:[],
            softobj:{},
            hardobj:{},
            usrskills:[],
            matchoriginal:10,
            usrscore:10
        };

        this.textChange = this.textChange.bind(this);
        this.matchJob = this.matchJob.bind(this);
        this.matchResume = this.matchResume.bind(this);
        this.matchingFunc = this.matchingFunc.bind(this);
        this.displayResult = this.displayResult.bind(this);
        this.matchLength = this.matchLength.bind(this);
        this.matchingScore = this.matchingScore.bind(this);
        this.matchData = this.matchData.bind(this);
    }
    
    displayResult(){
        var bool = true;
        if(this.state.softobj != null || this.state.hardobj != null){
            this.setState({
                showResult: bool
            });
        }
        
    }

    
    textChange(event, num){
        
        var mtext = event.target.value.toLowerCase();
        if(num == 1){ 
           this.setState({
            text1:mtext
        }); 
        } else if(num == 2){
            this.setState({
            text2:mtext
        });
        }
          
    }
    
    matchJob(type){
        var secstr = this.state.text2;
        var counter2;
        var firstarr = [],
            secarr = [],
            arr = [],
            narr = [],
            newobj={};

        if(type == 1){
            arr = this.state.arrSlist;
            narr = firstarr;
            newobj=this.state.softobj;
        } else if(type == 2){
            arr = this.state.arrHlist;
            narr = secarr;
            newobj=this.state.hardobj;
        }

        for(var i=0; i< arr.length; i++){
            var re = new RegExp(arr[i], 'g');
            var matchWord = secstr.match(re);
            
            if(matchWord != null){

                narr.push(matchWord[0]);

                var obj = {
                keyword:arr[i],
                jobtimes:0,
                restimes:0
                };
                newobj[arr[i]] = obj;

                counter2 = matchWord.length;

                newobj[arr[i]].jobtimes = counter2;


            } /*else {
                alert("Please paste your resume and job description.");
            }*/

        }
        
        this.setState({
            softarr:firstarr,
            hardtarr:secarr
            
        });
        console.log(narr, newobj);
        
        this.matchResume(firstarr, newobj);
        this.matchResume(secarr, newobj);
    }
    
    matchResume(arr, obj){
        var parastr = this.state.text1;    
        var counter;
        var narr = arr,
            newobj = obj,
            missingarr = [];

        for (var j=0; j< narr.length; j++){
            var innerRe = new RegExp(narr[j], 'g');
            var innerMatch = parastr.match(innerRe);

            if(innerMatch != null){

                counter = innerMatch.length;

                newobj[narr[j]].restimes = counter;

            } else{
                counter = 0;
                newobj[narr[j]].restimes = counter;
                missingarr.push(narr[j]);
            }
        }
        
        this.setState({
            usrskills:missingarr
        });
        
        //console.log(missingarr);
    }
    
    matchingFunc(){
        this.matchJob(1); 
        this.matchJob(2); 
        this.displayResult();
        this.matchingScore();
        
    }
    
    matchingScore(){
        this.matchLength();
        this.matchData();
    }
    
    matchLength(){
        var checkwords = this.state.text1.trim();
        var wordcount = checkwords.split(" ").length;
        var score1 = 0;
        
        console.log(wordcount);
        if( wordcount >=500 && wordcount <=700){
            score1 = this.state.usrscore;
        } else{
            score1 = this.state.usrscore -1;
        }
        
        this.setState({
            usrscore:score1
        });
        console.log(this.state.usrscore);
    }
    
    matchData(){
        var myphone = "203-434-6339";
        /* \d{3}[- ]?\d{3}[- ]?\d{4} not working in React*/
        var phone = new RegExp('^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$');
        var memail = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}');
        var myemail = "mark.mccowan@example.com";
        var maddress = new RegExp('[0-9]{2,6}[ ]?[a-zA-Z]{3,9}[ ]?[a-zA-Z]{3,9}');
        var myaddress = "144 Cheshire Road, Norwalk, CT 06854"
        console.log(phone.test(myphone), memail.test(myemail), maddress.test(myaddress));
        console.log(phone.test(this.state.text1));
        /*if(phone.test() && )*/
        
    }
    
    matchStructure(){
        
    }
    
    render() {
        var comp = null;
        if(this.state.showResult){
            comp = <MResultDis 
            resultsoft={this.state.softobj} 
            resultshard ={this.state.hardobj}
            missingskill={this.state.usrskills}/>
        }

        return (
          <div>
            <textarea 
            name="matchRBox"
            onChange={this.textChange.bind(this,1)}
            value={txtData.txt1}
            />

            <textarea
            name="matchJBox"
            onChange={this.textChange.bind(this,2)}
            value={txtData.txt2}
            spellCheck="true"
            />

            <br/>
            <button 
                onClick={this.matchingFunc}
            >Match</button>
            {comp}
          </div>
        );
    }
}

export default MControl;