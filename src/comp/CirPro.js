import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

class ChangingProgressbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          currentPercentageIndex: 0,
        };
    }

    componentDidMount() {
        setTimeout(() => {
          this.setState({
            currentPercentageIndex: (this.state.currentPercentageIndex + 1) % this.props.percentages.length
          });
        }, 0);
    }

    render() {
        return <CircularProgressbar {...this.props} percentage={this.props.percentages[this.state.currentPercentageIndex]} />;
    }
}
ChangingProgressbar.defaultProps = {
  interval: 1000,
}


class CirPro extends Component {
    constructor(props){
        super(props);
        
    }
/*<button onClick={(e)=>{
                this.setState({
                    progress:75
                })
            }}>Test</button>*/
/*    componentDidMount(){
        this.refs.apple.scrollIntoView({
           behavior: "smooth", 
           block: "end", 
           inline: "nearest"}); 
    }*/
    render() {
        
       return (
          <div >
           
            <div className="percentbox">
                <CircularProgressbar 
                    className={'CircularProgressbar-path'}
                    percentage={this.props.progress} 
                    strokeWidth={8}
                />

            </div>    
          </div>
            
        );
    }
}

export default CirPro;
