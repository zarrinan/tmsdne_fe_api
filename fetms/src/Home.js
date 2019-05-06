import React from 'react'
import axios from 'axios'
import Report from './Report'
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(DefaultTheme);

export default class Home extends React.Component {

    constructor(props) {
    super(props)

    this.state = {
      date: null,
      focused: null,
      report: 'S&P 500 Index futures contracts closed 9.10% lower at 17:12:27. The S&P 500 is up $0.17 trillion.',
      url: 'https://plot.ly/~TMSDNE/12'
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  toISODateString(date, ev){
    const month = date.getMonth()+1 <10 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`
    const day = date.getDate()+1 <10 ? `0${date.getDate()}` : `${date.getDate()}`
    const fullDate = `${date.getFullYear()}-${month}-${day}`;
    console.log(fullDate)
    this.setState({
      date: fullDate
    })
  }




  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    });
  }


  handleSubmit(ev) {
    ev.preventDefault();
    axios.post('http://127.0.0.1:5050/', {
      date: this.state.date
    })
    .then(res => {
      console.log(typeof res.data);
      this.setState({
          report: res.data.report,
          url: res.data.url
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <SingleDatePicker
            date={this.state.date}
            onDateChange={date =>
                        this.setState({date: this.toISODateString(date._d)})
                    }
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            id={Date().now}
            numberOfMonths={1}
            disableScroll={true}
            isOutsideRange={() => false}
        />

        <div className='main-container'>
        <h1 className='page-header'>This Market Summary Does Not Exist</h1>

        <Report report={this.state.report} url={this.state.url}/>
      </div>
      </div>
    )
  }
}



// <form className='date-submit'onSubmit={this.handleSubmit} >
      //     <input
      //       className="input-text"
      //       type="text"
      //       name="date"
      //       onChange={this.handleChange}
      //       value={this.state.date}/>
      //     <input type="submit" value="Submit" className="form-submit-button"/>
      //   </form>
