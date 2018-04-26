import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



class Selector extends Component {
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    
    handleChange(value){
        this.props.handleChange(value);
        
    }

    render() {

        return (
          <div >
            <Select
                name="form-field-name"
                value={this.props.bvalue}
                onChange={this.handleChange}
                options={[
                  { value: 'graphic designer', label: 'Graphic Designer', clearableValue:true },
                  { value: 'frontend web developer', label: 'Front End Developer' , clearableValue:true},
                  { value: 'backend web developer', label: 'Back End Developer', clearableValue:true },
                  { value: 'digital marketer', label: 'Digital Marketer', clearableValue:true },
                  { value: 'UI Designer', label: 'UI Designer', clearableValue:true },
                  { value: 'UX designer', label: 'UX Designer', clearableValue:true },
                  { value: 'Project Manager', label: 'Project Manager', clearableValue:true },
                  { value: 'accoutant', label: 'Accountant', clearableValue:true },
                  { value: 'Sales representatives', label: 'Sales Representatives', clearableValue:true },
                  { value: 'Business analyst', label: 'Business Analyst', clearableValue:true },
                  { value: 'teller', label: 'Bank Teller', clearableValue:true },
                  { value: 'trader', label: 'Trader', clearableValue:true },
                  { value: 'Marketing Financial Analyst', label: 'Marketing Financial Analyst', clearableValue:true },
                  { value: 'Tax manager', label: 'Tax Manager', clearableValue:true },
                  { value: 'Human resources manager', label: 'Human Resources Manager', clearableValue:true },
                  { value: 'Insurance agent', label: 'Insurance Agent', clearableValue:true }
                ]}
                placeholder= {'Please select your job title'}
                className={"myselect"}

              />

          </div>
            
        );
    }
}

export default Selector;
