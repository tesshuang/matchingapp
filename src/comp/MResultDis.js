import React, { Component } from 'react';
import './MCon.css';
import CirPro from './CirPro';
import ViewLess from './ViewLess';
import ViewMore from './ViewMore';

class MResultDis extends Component {
    constructor(props){
        super(props);
        this.state={
            course:"",
            moreToggle:false
        }
        
        // this.saveToDB = this.saveToDB.bind(this);
        this.ChangeMore = this.ChangeMore.bind(this);
    }
    
    
    componentDidMount(){
        this.refs.apple.scrollIntoView({
           behavior: "smooth", 
           block: "nearest", 
           inline: "nearest"}); 
    }
    
    // saveToDB(i){
    //     var fd = new FormData();
    //     fd.append("course", this.props.missingskill[i].id);
        
    //     fetch("http://beavver.taliawalkey.ca/savecourses.php",{
    //         method:"POST",
    //         body:fd,
    //         credentials:"same-origin"
    //     });
        
    // }
    
    ChangeMore(){
        this.setState({
            moreToggle:true
        })
    }
    
    render() { 
        var soft = [];
        var hard = [];
        
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
      if(this.props.missingskill.length !== 0 ){
          if(this.state.moreToggle === false){
              var courses = <ViewLess missingskill={this.props.missingskill}
                                      ChangeMore={this.ChangeMore}
                                      />
          }else{
             var courses= <ViewMore 
                                    missingskill={this.props.missingskill}/>
          }
      } else{
          var courses = <div>
                            <p>Based on the result, there is no course recommendation.</p>
                        </div>
      } 
           
      
        // console.log(this.props.missingskill);
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
                        {courses}
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