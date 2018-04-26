import React, { Component } from 'react';

class ViewLess extends Component {
    constructor (props){
        super(props);
        
        this.ViewCourses = this.ViewCourses.bind(this);
    }
    ViewCourses(){
        this.props.ChangeMore();
    }
    render() {
        var missarr = [];
        
        var showcourse = this.props.missingskill.slice(0,8);
          for(var i=0; i< showcourse.length; i++){
          
              var comp = (
                  <tr key={i}>
                            <td>{showcourse[i].crse_numb}</td>
                            <td>{showcourse[i].crse_name}</td>
                            <td><a href={showcourse[i].crse_url} target="_blank">View More ></a></td>
                        </tr>
              )
              missarr.push(comp);
          }
        return (
            <div >
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
                    <br/>
                    <button className="viewm" onClick={this.ViewCourses}>View All Recommended Courses</button>
                </div>
            </div>
            
        );
    }
}

export default ViewLess;
