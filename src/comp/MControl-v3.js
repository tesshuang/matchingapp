import React, { Component } from 'react';
import './MCon.css';
import txtData from './data.json';
import MResultDis from './MResultDis';


class MControl extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            showResult:false,
            jobTitle:"",
            text1:txtData.txt1.toLowerCase(),
            text2:txtData.txt2.toLowerCase(),
            arrSlist: [],
            arrHlist: [],
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
        this.fetchCourse = this.fetchCourse.bind(this);
        this.clearText = this.clearText.bind(this);
        this.checkJob = this.checkJob.bind(this);
        this.getKeywords = this.getKeywords.bind(this);
        
    }
    getKeywords(){
        
    }
    componentDidMount(){
        fetch("http://beavver.taliawalkey.ca/array.php", {
            method:"GET"
        }).then((resp)=>{
            return resp.json();
        }).then((localSoft)=>{
            
            var softSkills = localSoft.map((obj,i)=>{
              return obj.soft_skills;
            });
            
            var hardSkills = localSoft.map((obj,i)=>{
              return obj.hard_skills;
            });
            

            this.setState({
                arrSlist:softSkills,
                arrHlist:hardSkills
            });
            
            console.log(localSoft, softSkills, hardSkills);
        })
    }
    
    displayResult(){
        var bool = true;
        if(this.state.softobj != null || this.state.hardobj != null){
            this.setState({
                showResult: bool
            });
        }
        
    }
    
    clearText(num){
        
        if(num == 1){ 
           this.setState({
            text3:""
        }); 
        } else if(num == 2){
            this.setState({
            text4:""
        })
        }
        console.log(this.state.text3)
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
    
    checkJob(evt){
        this.setState({
            jobTitle:evt.target.value
        })
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
        
        /*this.setState({
            usrskills:missingarr
        });*/
        console.log(missingarr);
        if(missingarr.length > 0){
            this.fetchCourse(missingarr);
        }
        
    }
    
    matchingFunc(){
        this.matchJob(1); 
        this.matchJob(2); 
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
                usrskills:usrcourses
            });
            
            console.log(usrcourses);
        })
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
    
    
    
    render() {
        console.log(this.state.jobTitle);
        var comp = null;
        if(this.state.showResult){
            comp = <MResultDis 
            resultsoft={this.state.softobj} 
            resultshard ={this.state.hardobj}
            missingskill={this.state.usrskills}/>
        }

        return (
            <div>
        <section>
            <div className="container">
                        <p id="title">Let's Get Started</p>
                        <p id="desc">Increase your chance in landing an interview in two steps. Just paste your resume on the <br/>left sections and the job description on the right box. Then, we can make a match!</p>
                        <div id="mrow" className="row">
                        <div className="col">
                           <ul>
                               <li className="step">PASTE YOUR RESUME</li>
                           </ul>
                          <label className="mlabel">Job Title</label>
                          <input className="rinput"/>
                          <label className="mlabel">&nbsp;</label>
                          <textarea 
                                className="jinput" 
                                placeholder="Paste your resume here"
                                value={txtData.txt1}
                                spellCheck="true"
                                onChange={this.textChange.bind(this,1)}></textarea>

                          <br/>
                          <button className="clear" onClick={this.clearText.bind(1)}>Clear resume</button>
                      </div>

                       <div className="col">
                           <ul>
                               <li className="step">PASTE YOUR JOB DESCRIPTION</li>
                           </ul>
                          <label className="mlabel">Job Title</label>
                          <input className="rinput" onChange={this.checkJob}/>
                          <label className="mlabel">&nbsp;</label>
                          <textarea 
                                className="jinput" 
                                placeholder="Paste the job title with the full job description text-excluding the &quot About Company &quot section" 
                                value={txtData.txt2}
                                spellCheck="true"
                                onChange={this.textChange.bind(this,2)}></textarea>

                          <br/>

                          <button className="clear" onClick={this.clearText.bind(2)}>Clear job description</button>
                      </div>
                      </div>
                        <button className="msubmit" onClick={this.matchingFunc}>MAKE A MATCH</button>
                        <br/>

                    </div>
            </section>

            {comp}
          </div>
        );
    }
}

export default MControl;