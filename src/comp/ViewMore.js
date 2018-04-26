import React, { Component } from 'react';

class ViewMore extends Component {
    constructor (props){
      super(props);

  }

    
    render() {
        var missarr = [];
        
        for(var i=0; i<this.props.missingskill.length; i++){
          
              var comp = (
                  <tr key={i}>
                            <td>{this.props.missingskill[i].crse_numb}</td>
                            <td>{this.props.missingskill[i].crse_name}</td>
                            <td><a href={this.props.missingskill[i].crse_url} target="_blank">View More ></a></td>
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
                </div>
            </div>
            
        );
    }
}

export default ViewMore;
