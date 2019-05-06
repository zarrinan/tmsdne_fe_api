def get_chart_url(day, api_key):
    '''Generates a plotly chart and returns its url
       Day in format "YYYY-MM-DD"

       Parameters: Day, Plotly API key
       Returns: Plotly chart url'''

    import pandas as pd
    import numpy as np
    import datetime

    from pandas_datareader import data as pdr
    import fix_yahoo_finance as yf

    import plotly
    plotly.tools.set_credentials_file(username='TMSDNE', api_key=api_key)

    import plotly.plotly as py
    import plotly.graph_objs as go

    # Convert day string into a year, month, and day integers
    year, month, dday = int(day[:4]), int(day[5:7]), int(day[-2:])

    start_sp = datetime.datetime(year-3, 1, 1)
    end_sp = datetime.datetime(year, month, dday)

    # Scrape the data from yahoo finance
    yf.pdr_override()

    # Convert data into pandas dataframe
    sp500 = pdr.get_data_yahoo('^GSPC',
                               start_sp,
                               end_sp)
    sp500.reset_index(inplace=True)

    url = build_chart_one(sp500,day)
    url2 = build_chart_two(sp500, day)
    url3 = build_chart_three(sp500, day)

    return url, url2, url3


def build_chart_one(df,day):

    import plotly.graph_objs as go
    import plotly.plotly as py

    # Build a plotly chart object
    trace = go.Ohlc(x=df['Date'],
                open=df['Open'],
                high=df['High'],
                low=df['Low'],
                close=df['Close'])
    data = [trace]

    layout = {
    'title': 'Stock Prices',
    'yaxis': {'title': 'Stock Price'},
    }

    fig = dict(data=data, layout=layout)

    # Save the chart in plotly account
    chart = py.iplot(fig, filename='sp500_chart_'+day)

    #Get the chart's url
    url = chart.resource

    return url

def build_chart_two(df, day):
    import plotly.graph_objs as go
    import plotly.plotly as py

    trace2 = go.Ohlc(x=df['Date'],
                open=df['Open'],
                high=df['High'],
                low=df['Low'],
                close=df['Close'],
                increasing=dict(line=dict(color= '#17BECF')),
                decreasing=dict(line=dict(color= '#7F7F7F')))

    layout2 = {
        'title': 'Stock Prices',
        'yaxis': {'title': 'Stock Price'},
        'shapes': [{
            'x0': '2016-12-09', 'x1': '2016-12-09',
            'y0': 0, 'y1': 1, 'xref': 'x', 'yref': 'paper',
            'line': {'color': 'rgb(30,30,30)', 'width': 1}
        }],
        'annotations': [{
            'x': '2016-12-09', 'y': 0.05, 'xref': 'x', 'yref': 'paper',
            'showarrow': False, 'xanchor': 'left',
            'text': 'Increase Period Begins'
        }]
    }

    data2 = [trace2]
    fig2 = dict(data=data2, layout=layout2)

    # Save the chart in plotly account
    chart2 = py.iplot(fig2, filename='sp500_chart2_'+day)

    #Get the chart's url
    url2 = chart2.resource

    return url2
def build_chart_three(df, day):

    import plotly.graph_objs as go
    import plotly.plotly as py
    import datetime

    # Convert day string into a year, month, and day integers
    year, month = int(day[:4]), int(day[5:7])

    dates = [datetime.datetime(year-3, month, 1),
         datetime.datetime(year-2, month, 1),
         datetime.datetime(year-1, month, 1),
         datetime.datetime(year, month, 1)]


    trace3 = go.Ohlc(x=dates,
                    open=df['Open'],
                    high=df['High'],
                    low=df['Low'],
                    close=df['Close'])

    layout3 = {
        'title': 'Monthly Stock Prices',
        'yaxis': {'title': 'Stock Price'},
    }

    data3 = [trace3]
    fig3 = dict(data=data3, layout=layout3)

    # Save the chart in plotly account
    chart3 = py.iplot(fig3, filename='sp500_chart4-')

    #Get the chart's url
    url3 = chart3.resource

    return url3
