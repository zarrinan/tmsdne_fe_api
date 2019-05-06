import React from 'react'

export default function Report(props) {

  let chartUrl = props.url.substring(6)

  return(
      <div>
      <div>
        </div>
        <iframe className='chart-iframe' title='Financial Data Chart' width="800" height="600" frameBorder="0" scrolling="yes" src={chartUrl}></iframe>
        <p className='report'>{props.report}</p>
      </div>
    )
}



