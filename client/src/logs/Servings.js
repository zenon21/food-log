import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as logActions from './logRedux';

import Checkbox from './Checkbox';

const ServingsContainer = styled.div``;

const mapStateToProps = (state) => ({
  currentLog: state.log.currentLog,
});

class Servings extends React.Component {
  handleChange = (event) => {
    //increment completed count
    if (event.target.checked) {
      this.props.updateLog(
        this.props.currentLog.log_date,
        this.props.field,
        this.props.completed + 1
      );
      console.log(this.props.completed + 1);
    }
    //decrement completed count
    else {
      this.props.updateLog(
        this.props.currentLog.log_date,
        this.props.field,
        this.props.completed - 1
      );
      console.log(this.props.completed - 1);
    }
  };

  render() {
    const boxes = [];
    for (let i = 0; i < this.props.goals; i++) {
      let key = i.toString();

      //default checked, enabled
      if (i < this.props.completed - 1) {
        boxes.push(<Checkbox key={key} checked={true} readOnly={true} />);
      }
      //default checked; enabled
      else if (i === this.props.completed - 1) {
        boxes.push(
          <Checkbox
            key={key}
            defaultChecked={true}
            onChange={this.handleChange}
          />
        );
      }
      //default unchecked; enabled
      else if (i === this.props.completed) {
        boxes.push(
          <Checkbox
            key={key}
            defaultChecked={false}
            onChange={this.handleChange}
          />
        );
      }
      //else unchecked & disabled
      else {
        boxes.push(<Checkbox key={key} checked={false} readOnly={true} />);
      }
    }

    return <ServingsContainer>{boxes}</ServingsContainer>;
  }
}

export default connect(mapStateToProps, logActions)(Servings);
