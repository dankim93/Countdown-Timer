import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/inputActions';


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: "",
      error: ""
    };
    this.update = this.update.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.addInputs(this.state);

    setInterval(() => {
      if (this.props.startTime >= this.currentTime()){ //show seconds until start
        if (this.isValidInputs(this.currentTime(), this.props.startTime)) {
          this.setState({seconds: this.convertToSeconds(this.currentTime(), this.props.startTime) });
        }
      } else { //show seconds until end
        if (this.isValidInputs(this.currentTime(), this.props.endTime)) {
          this.setState({seconds: this.convertToSeconds(this.currentTime(), this.props.endTime) });
        }
      }
    }, 1000);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  isValidInputs(start, end) {
    let pattern = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
    if(start > end || end < this.currentTime()) {
      return false;
    } else if (!pattern.test(start) || !pattern.test(end)) {
      return false;
    }
    return true;
  }


  currentTime() {
    let time = new Date();
    let hour = (time.getHours() > 9)? time.getHours().toString() : "0" + time.getHours().toString()
    let minute = (time.getMinutes() > 9)? time.getMinutes().toString() : "0" + time.getMinutes().toString()
    let second = (time.getSeconds() > 9)? time.getSeconds().toString() : "0" + time.getSeconds().toString()

    return hour + ':' + minute + ':' + second;
  }

  convertToSeconds(start, end) {
    console.log('start',start);
    console.log('end',end);
    let endSeconds = parseInt(end[6] + end[7]);
    endSeconds += (end[0] + end[1]) * 3600;
    endSeconds += (end[3] + end[4]) * 60;
    let startSeconds = parseInt(start[6] + start[7]);
    startSeconds += (start[0] + start[1]) * 3600;
    startSeconds += (start[3] + start[4]) * 60;
    console.log('seconds',endSeconds - startSeconds);
    return endSeconds - startSeconds;
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.isValidInputs(this.state.startTime, this.state.endTime)) {
      this.setState({error: ""});
    } else {
      this.setState({error: "Invalid Inputs"});
    }
    this.props.addInputs(this.state);
  }

  render() {
    let output = "";
    let header = "";
    if (this.props.startTime !== "") {
      if (this.state.error !== "") {
        header = "Status: Error";
        output = this.state.error;
      } else if (this.currentTime() < this.props.startTime){
        header = "Status: Waiting until count starts"
        output = this.state.seconds;
      } else {
        header = "Status: Countdown started"
        output = this.state.seconds;
      }

    }

    return(
      <div>
        <span>Countdown</span>
        <br/>

        <form onSubmit={(e) => this.handleSubmit(e)}>
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
          <button type="submit" className="big-button">Start Countdown</button>
        </form>


        <div className='output'>
          <p>{header}</p>
          <p>{output}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    startTime: state.input.startTime,
    endTime: state.input.endTime
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...actions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
