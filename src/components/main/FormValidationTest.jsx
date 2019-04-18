import React, { Component } from 'react'



const initialState = {
    name: '',
    nameError:''
}
export default class FormValidationTest extends Component {
    
    state = initialState;
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
        }
    }
    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };
    validate = () => {
        let nameError = "";
        // let passwordError = "";

        if (!this.state.name.isNaN()) {
            nameError = "number";
        }
        if (nameError) {
            this.setState({nameError });
            return false;
        }

        return true;
    };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                    <input type="text" className="text" placeholder='name' onChange={this.handleChange}/>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div>
            </div>
                <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
