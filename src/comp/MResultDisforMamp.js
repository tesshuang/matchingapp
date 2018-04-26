import React, { Component } from 'react';
import './MCon.css';
import CirPro from './CirPro';

class MResultDis extends Component {
    constructor(props){
        super(props);
        this.state={
            course:""
        }
        
        this.saveToDB = this.saveToDB.bind(this);
    }
    
    
    componentDidMount(){
        this.refs.apple.scrollIntoView({
           behavior: "smooth", 
           block: "nearest", 
           inline: "nearest"}); 
    }
    
    saveToDB(i){
        var fd = new FormData();
        fd.append("course", this.props.missingskill[i].id);
        
        fetch("http://localhost:8888/beavver.taliawalkey.ca/savecourses.php",{
            method:"POST",
            body:fd,
            credentials:"same-origin"
        });
        
    }
    
    render() {
      var soft = [];
      var hard = [];
      var missarr = [];


      for(var i in this.props.resultsoft){
          var comp = (
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{this.props.resultsoft[i].restimes}</td>
                        <td>{this.props.resultsoft[i].jobtimes}</td>
                    </tr>
          )
        soft.push(comp);
      };

      for(var i in this.props.resultshard){
          var comp = (
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{this.props.resultshard[i].restimes}</td>
                        <td>{this.props.resultshard[i].jobtimes}</td>
                    </tr>
          )
        hard.push(comp);
      }

      for(var i=0; i<this.props.missingskill.length; i++){
          var comp = (
              <tr key={i}>
                        <td>{this.props.missingskill[i].crse_numb}</td>
                        <td>{this.props.missingskill[i].crse_name}</td>
                        <td><a href={this.props.missingskill[i].crse_url} target="_blank">View More ></a><br/><button className="msave" onClick={this.saveToDB.bind(this,i)}>Save</button></td>
                    </tr>
          )
          missarr.push(comp);
      }
        console.log(this.props.missingskill);
    return (
        
        <div >
            <section className="rsection" ref="apple">
             <br/>
            <div className="container" >
                <div id="percentage">
                    <div className="mprogress" id="mprogress" >
                        <h2 className="mrate">Matching Result</h2>
                        <p className="rtitle"><b>Your matching rate</b></p>
                        <CirPro progress={this.props.progress}/>
                    </div>
                </div>
                <br/><br/>
                <div className="resultcontainer">
                  <div className="resultbox">
                      <p className="rtitle"><b>Comparison</b></p>
                    <p className="usernote">The following number is the occurence times of keywords in your resume and job description.</p>
                        <table id="mTable">
                            <caption className="rtitle">Soft Skills</caption>
                            <thead>
                               <tr>
                                <th>Keywords</th>
                                <th>Resume</th>
                                <th>Job Description</th>
                                </tr> 
                            </thead>
                            <tbody>
                                {soft}
                            </tbody>
                        </table>
                        <br/><br/>
                        <table id="mTable" className="newTable">
                                <caption className="rtitle">Hard Skills</caption>
                            <thead>
                               <tr>
                                <th>Keywords</th>
                                <th>Resume</th>
                                <th>Job Description</th>
                                </tr> 
                            </thead>
                            <tbody>
                                {hard}
                            </tbody>
                        </table>
                  </div>

                  <div className="resultbox">
                        <p className="rtitle"><b>Need to improve</b></p>
                        <div className="suggestbox">
                            <p className="usernote">{this.props.msg1}</p>
                            <p className="usernote">{this.props.msg2}</p>
                            <p className="usernote">{this.props.msg3}</p>
                            <p className="usernote">{this.props.msg4}</p>
                            <p className="usernote">{this.props.msg5}</p>
                        </div>
                        
                  </div>


                  <div className="resultbox">
                      <p className="rtitle"><b>Course Recommendation</b></p>
                     <p className="usernote">Click on Save to store your selected courses in your account.</p>    
                      <div id="courseRec">
                        <table id="mTable">
                            <thead>
                               <tr>
                                <th>Course Number</th>
                                <th>Course Name</th>
                                <th>Course URl</th>

                                </tr> 
                            </thead>
                            <tbody>
                                {missarr}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    
                  </div>

              </div>
            </div>
        </section>

      </div>
    );
    }
}

export default MResultDis;