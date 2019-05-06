import React from 'react'

export default function Report(props) {

  let chartUrl = props.url.substring(6)
  let report = props.report
  let trimmed = report.split('.')
  trimmed.pop()
  let postReport = trimmed.join()+'.'

  return(
      <div>
      <div>
        </div>
        <iframe className='chart-iframe' title='Financial Data Chart' width="800" height="600" frameBorder="0" scrolling="yes" src={chartUrl}></iframe>
        <p className='report'>{postReport}</p>
      </div>
    )
}



