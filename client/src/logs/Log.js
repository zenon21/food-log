import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';

import * as logActions from './logRedux';

import CenteredBox from 'shared/CenteredBox';
import { DateContainer } from './LogContainer';
import LogErrMsg from './LogErrMsg';
import Servings from './Servings';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  currentLog: state.log.currentLog,
  errors: state.log.errors,
  loading: state.log.loading,
});

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.today = new Date();
  }

  /**
   * Async helper function to get log for today. If none exists,
   * create one.
   *
   * @param {Date() Object} date
   */
  fetchOrCreateLog = async (date) => {
    const ISODate = date.toISOString();

    await this.props.getLog(ISODate);

    //If log not found
    if (this.props.errors === 404) {
      this.props.createLog(ISODate);
    }
  };

  componentDidMount() {
    this.fetchOrCreateLog(this.today);
  }

  render() {
    if (!this.props.currentLog) {
      return <div />;
    }

    if (this.props.errors) {
      console.log('err: ', this.props.errors);
      return (
        <div>
          <LogErrMsg />
        </div>
      );
    }

    return (
      <CenteredBox>
        <DateContainer>{dateFormat(this.today, 'd mmmm yyyy')}</DateContainer>
        <Servings
          field="veg_count"
          goals={this.props.currentUser.vegetable_goals}
          completed={this.props.currentLog.veg_count}
        />
        <Servings
          field="fruit_count"
          goals={this.props.currentUser.fruit_goals}
          completed={this.props.currentLog.fruit_count}
        />
        <Servings
          field="protein_count"
          goals={this.props.currentUser.protein_goals}
          completed={this.props.currentLog.protein_count}
        />
        <Servings
          field="grain_count"
          goals={this.props.currentUser.grain_goals}
          completed={this.props.currentLog.grain_count}
        />
      </CenteredBox>
    );
  }
}

export default connect(mapStateToProps, logActions)(Log);