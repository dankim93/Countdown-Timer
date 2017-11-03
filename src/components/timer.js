import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/inputActions';


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentTime: new Date().toLocaleTimeString(),
      startTime: "",
      endTime: "",
      error: ""
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.addInputs(this.state);
  }

  update(field) {
    console.log(this.state);
    return e => this.setState({
      [field]: e.currentTarget.value
    });

  }

  isValidInputs() {
    if(this.state.startTime > this.state.endTime) {
      return false;
    } else if(this.state.startTime > new Date().toLocaleTimeString()) {
      return false;
    }

    return true;
  }

  convertToSeconds() {
    // let endSeconds = parseInt(this.props.endTime[6] + this.props.endTime[7]);
    // endSeconds += (this.props.endTime[0] + this.props.endTime[1]) * 3600;
    // endSeconds += (this.props.endTime[3] + this.props.endTime[4]) * 60;
    // let startSeconds = parseInt(this.props.startTime[6] + this.props.startTime[7]);
    // startSeconds += (this.props.startTime[0] + this.props.startTime[1]) * 3600;
    // startSeconds += (this.props.startTime[3] + this.props.startTime[4]) * 60;
    // return endSeconds - startSeconds;
  }

  handleSubmit() {
    if (!this.isValidInputs()) {
      this.setState({error: "Invalid Inputs"});
    } else {
      this.setState({error: ""});
    }
    // console.log('state:', this.state);
    this.props.addInputs(this.state);
  }

  render() {
    // console.log(this.convertToSeconds());
    // console.log(this.props);
    let output;
    if (this.props.error != "") {
      output = this.props.error;
    } else if(this.props.isActivate){
      output = this.convertToSeconds();
    } else {
      output = "Waiting for start time";
    }
    console.log('output', output);
    return(
      <div>
          <input type="text"
                  value={this.state.startTime}
                  onChange={this.update("startTime")}
                  className="input"
                  placeholder="hh:mm:ss"/>
          <input type="text"
                  value={this.state.endTime}
                  onChange={this.update("endTime")}
                  className="input"
                  placeholder="hh:mm:ss"/>
          <button onClick={this.handleSubmit}>Start Countdown</button>
        <div className='output'>
          <span>Countdown</span>
          <p>{output}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startTime: state.startTime,
    endTime: state.endTime,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...actions}, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(Timer);
