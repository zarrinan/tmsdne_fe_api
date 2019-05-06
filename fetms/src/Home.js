import React from 'react'
import axios from 'axios'
import Report from './Report'
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import moment from 'moment'
import { BounceLoader } from 'react-spinners';
import { css } from '@emotion/core';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(DefaultTheme);

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-top: 100px;
`;

export default class Home extends React.Component {

    constructor(props) {
    super(props)

    this.state = {
      date: null,
      focused: null,
      report: '',
      url: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  toISODateString(date){
    const month = date.getMonth()+1 <10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
    const day = date.getDate()+1 <10 ? `0${date.getDate()}` : `${date.getDate()}`
    let fullDate = `${date.getFullYear()}-${month}-${day}`;
    let momentdate = moment(fullDate)
    return momentdate
  }


  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  }


  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({
      loading: true
    })
    axios.post('https://tmsdne-env.b4ppni5hrp.us-east-2.elasticbeanstalk.com/', {
      date: this.state.date
    })
    .then(res => {
      this.setState({
          report: res.data.report,
          url: res.data.url,
          loading: false
      })
    }).catch(error => {
      console.log(error)
    })

  }

  render() {
    let data;
    if (this.state.loading) {
      data =
      <div>
      <p className='loader'>The market summary is being prepared now, it might take up to 30 seconds...</p>
      <BounceLoader css={override}
          sizeUnit={"px"}
          size={150}
          color={'green'}
          loading={this.state.loading}/>
      </div>
    }
    else {
      data =  <Report report={this.state.report} url={this.state.url}/>

    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <SingleDatePicker
                date={this.state.date}
                onDateChange={
                  date => this.setState({date: this.toISODateString(date._d)})}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                id={Date().now}
                numberOfMonths={1}
                disableScroll={true}
                isOutsideRange={() => false}
            />
           <input type="submit" value="select" className="form-submit-button"/>
        </form>
        <div className='main-container'>
          <h1 className='page-header'>This Market Summary Does Not Exist</h1>
          {data}
        </div>
      </div>
    )
  }
}


