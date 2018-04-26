import React, { Component } from 'react';
/*import Scroll from 'react-scroll'; 
import {scroller} from 'react-scroll';*/
import './MCon.css';
import txtData from './data.json';
import MResultDis from './MResultDis';
import Selector from './Selector';
/*import '../beavver-matching.css';
import '../style.css';*/

/*
let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;
let scroll     = Scroll.animateScroll;
let scrollSpy  = Scroll.scrollSpy;*/

class MControl extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            showResult:false,
            text1:"",
            text2:"",
            arrSlist: [],
            arrHlist: [],
            softarr:[],
            hardarr:[],
            softobj:{},
            hardobj:{},
            usrskills:[],
            usrscore:5,
            usrscore2:5,
            progress:0,
            bvalue:"",
            msg1:"",
            msg2:"",
            msg3:"",
            msg4:"",
            msg5:"",
            de1:0,
            de2:0
        };
        this.denominator1 = 0;
        this.denominator2 = 0;
        this.numerator1 = 0;
        this.numerator2 = 0;
        
        this.textChange = this.textChange.bind(this);
        this.matchJob = this.matchJob.bind(this);
        this.matchResume = this.matchResume.bind(this);
        this.matchingFunc = this.matchingFunc.bind(this);
        this.displayResult = this.displayResult.bind(this);
        this.checkSection = this.checkSection.bind(this);
        this.matchLength = this.matchLength.bind(this);
        this.matchingScore = this.matchingScore.bind(this);
        this.matchData = this.matchData.bind(this);
        this.comparisonRate = this.comparisonRate.bind(this);
        this.fetchCourse = this.fetchCourse.bind(this);
        this.clearText = this.clearText.bind(this);
        this.fetchWords = this.fetchWords.bind(this);
        this.checkData = this.checkData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    checkData(){
        //check if both textarea is not empty
        
        // check if resume box contains valid data, not random text
        
        //well-checked, fetchword and matching
    }
    
    fetchWords(){
        
        var fd = new FormData();
        fd.append("keywords", this.state.bvalue);
        
        fetch("http://beavver.taliawalkey.ca/array.php",{
            method:"POST",
            body:fd
        }).then((resp)=>{
            return resp.json();
        }).then((localSoft)=>{
            console.log(localSoft);
            var softSkills = localSoft['soft'].map((obj,i)=>{
                obj.name = obj.name.toLowerCase();
              return obj.name;
            });
            
            var hardSkills = localSoft['hard'].map((obj,i)=>{
                obj.name = obj.name.toLowerCase();
              return obj.name;
            });

            
            this.setState({
                arrSlist:softSkills,
                arrHlist:hardSkills
            });
            
            console.log(localSoft, softSkills, hardSkills);
            this.matchJob(1); 
            this.matchJob(2); 
        });
    }
    
    displayResult(){
        var bool = true;
        if(this.state.bvalue !== ''){
            if(this.state.text1 !== '' && this.state.text2 !== ''){
               this.setState({
                showResult: bool
            }); 
              this.fetchWords();
            }else{
                alert("Please paste your resume or job description.");
            }
            
            
        }else{
            alert("Please select your job title.");
        }
        
        
    }
    
    clearText(num){
        
        if(num == 1){ 
           this.setState({
            text1:""
        }); 
        } else if(num == 2){
            this.setState({
            text2:""
        })
        }
        console.log(this.state.text1);
    }
    
    textChange(mtext, num){
        
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
            newobj={},
            localde;

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

                localde = narr.length;
            } /*else {
                alert("Please paste your resume and job description.");
            }*/

        }
        if(type == 1){
            var deno1 = (localde)?localde:0;
            this.denominator1 = (localde)?localde:0;
            this.setState({
                de1:deno1
            });
        }
        else if(type ==2){
            var deno2 = (localde)?localde:0;
            this.denominator2 = (localde)?localde:0;
            this.setState({
                de2:deno2
            });
        }
        
        this.setState({
            softarr:firstarr,
            hardtarr:secarr
        });
        console.log(narr, newobj, localde);
        
        this.matchResume(narr, newobj, type);
    }
    
    matchResume(arr, obj,type){
        var parastr = this.state.text1;    
        var counter;
        var narr = arr,
            newobj = obj,
            missingarr = [],
            localnu=0;

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
                localnu = missingarr.length;
            }
        }
        if(type ==1){
            if(this.denominator1 !== 0){
                this.numerator1 = this.denominator1 - localnu;
            }else{
                this.numerator1 = 0;
            }
        }
        else if(type ==2){
            if(this.denominator2 !== 0){
                this.numerator2 = this.denominator2 - localnu;
            }else{
                this.numerator2 = 0;
            }
            
        }
        /*this.setState({
            usrskills:missingarr
        });*/
        console.log(missingarr, localnu);
        if(missingarr.length > 0){
            this.fetchCourse(missingarr);
        }
        
        this.comparisonRate();
    }
    
    comparisonRate(){
        console.log(this.numerator1, this.numerator2,this.denominator1, this.denominator2);
        var num = this.numerator1 + this.numerator2;
        var den = this.state.de1 + this.state.de2;
        console.log(den);
        if(this.denominator1 === 0){
            this.denominator1 = 1;
            

            var rate1 = (this.numerator1/ this.denominator1) *2.5;
            var rate2 = (this.numerator2/ this.denominator2) *2.5;
        } else if(this.denominator2 === 0){
            this.denominator2 = 1;
            

            var rate1 = (this.numerator1/ this.denominator1) *2.5;
            var rate2 = (this.numerator2/ this.denominator2) *2.5;
            
        }else{
            

            var rate1 = (this.numerator1/ this.denominator1) *2.5;
            var rate2 = (this.numerator2/ this.denominator2) *2.5;
        }
        
        var rate = rate1 +rate2;
        
        this.setState({
            usrscore2:rate,
            msg1:"Your keywords comparison rate is "+num+" out of "+den+"."
        })
        
        var grade = (this.state.usrscore + this.state.usrscore2)*10;
        var finalgrade = Math.round(grade);
        console.log(grade, finalgrade);
        
        this.setState({
            progress:finalgrade
        })
        console.log(num, den, rate);
    }
    
    matchingFunc(){
/*        this.refs.hello.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});*/
        this.displayResult();
        this.matchingScore();
        
    }
    
    fetchCourse(missing){
        var fd = new FormData();
        for(var i=0; i<missing.length; i++){
            fd.append("missingskill[]", missing[i]);
        }
        
        fetch("http://beavver.taliawalkey.ca/courses.php",{
            method:"POST",
            body:fd
        }).then((resp)=>{
            return resp.json();
        }).then((usrcourses)=>{
            
            this.setState({
                usrskills:usrcourses,
                
            });
            
            console.log(usrcourses);
        });
        
    }
    
    
    matchingScore(){
        this.checkSection();
    }
    
    checkSection(){
        var score3 = this.state.usrscore;
        console.log(this.state.usrscore);
        if(this.state.text1.indexOf('objective') !== -1 || this.state.text1.indexOf('summary') !== -1){
           console.log(score3); 
        }else{
            score3 -= 1;
            this.setState({
                msg2:"Your resume does not contain section about Objective or Summary."
            });
        }
        
        if(this.state.text1.indexOf('education') === -1){
            score3 -= 1;
            this.setState({
                msg4:"Your resume does not contain section about Education."
            });
        }
        
        if(this.state.text1.indexOf('skills') === -1){
            score3 -= 1;
            this.setState({
                msg5:"Your resume does not contain section about Skills."
            });
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
            this.setState({
                msg3:"Your resume's word length is either less than 500 or more than 700."
            });
        }
        console.log(score1);
        this.matchData(score1);
    }
    
    matchData(score){
        var score2 = score;
        var myphone = "203-434-6339";
        var mphone = new RegExp('^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{4}$');
        var nphone = new RegExp('[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}');
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
    
    handleChange(value){
        if(value === null){
            this.setState({ 
            bvalue:"" });
        }else{
           this.setState({ 
            bvalue:value.value }); 
        }
        
    } 
    
    render() {
        
        var comp = null;
        if(this.state.showResult){    
                comp = <MResultDis 
                        resultsoft={this.state.softobj} 
                        resultshard ={this.state.hardobj}
                        missingskill={this.state.usrskills}
                        progress={this.state.progress}
                        msg1={this.state.msg1}
                        msg2={this.state.msg2}
                        msg3={this.state.msg3}
                        msg4={this.state.msg4}
                        msg5={this.state.msg5}/>
                  
        }
        return (
            <div>
        <section>
            <div className="container">
                        <p id="title">Let's Get Started</p>
                        <p id="desc">Increase your chance in landing an interview in two steps. Just paste your resume on the <br/>left sections and the job description on the right box. Then, we can make a match!</p>
                        <label className="mlabel">Job Title</label>
                          <div className="boxStyle">
                                <Selector handleChange={this.handleChange}
                                        bvalue={this.state.bvalue}/>
                            </div>
                        <div id="mrow" className="row">
                        <div className="col">
                           <ul>
                               <li className="step">PASTE YOUR RESUME</li>
                           </ul>
                          
                          <label className="mlabel">&nbsp;</label>
                          <textarea 
                                className="jinput" 
                                placeholder="Paste your resume here"
                                spellCheck="true"
                                value={this.state.text1}
                                onChange={(event)=>{this.textChange(event.target.value.toLowerCase(), 1)}}></textarea>

                          <br/>
                          <button className="clear" onClick={this.clearText.bind(this,1)}>Clear resume</button>
                      </div>

                       <div className="col">
                           <ul>
                               <li className="step">PASTE YOUR JOB DESCRIPTION</li>
                           </ul>
                          
                          <label className="mlabel">&nbsp;</label>
                          <textarea 
                                className="jinput" 
                                placeholder="Paste the job title with the full job description text-excluding the &quot About Company &quot section" 
                                spellCheck="true"
                                value={this.state.text2}
                                onChange={(event)=>{this.textChange(event.target.value.toLowerCase(), 2)}}></textarea>

                          <br/>

                          <button className="clear" onClick={this.clearText.bind(this,2)}>Clear job description</button>
                      </div>
                      </div>
                        <button className="msubmit" onClick={this.matchingFunc}>
                            MAKE A MATCH
                        </button>
                        <br/>

                    </div>
            </section>
              {comp} 
          </div>
        );
    }
}

export default MControl;