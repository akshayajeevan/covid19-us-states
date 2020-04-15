Transforms the data for US states from [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19) into a json file. Available at [https://akshayajeevan.github.io/covid19-us-states/timeseries.json](https://akshayajeevan.github.io/covid19-us-states/timeseries.json). Updated three times a day using GitHub Actions.

The json contains the number of Coronavirus confirmed and deaths cases for all US states and every day since 2020-1-22:

```
{
  "Alabama": [
    {
      "date": "22-1-2020",
      "confirmed": 0,
      "deaths": 0
    },
    {
      "date": "23-1-2020",
      "confirmed": 0,
      "deaths": 0
    },
    ...
  ],
  ...
}
```

For example, if you want to use it from a web site:

```js
fetch("https://akshayajeevan.github.io/covid19-us-states/timeseries.json")
  .then(response => response.json())
  .then(data => {
    data["Alabama"].forEach(({ date, confirmed, deaths }) =>
      console.log(`${date} active cases: ${confirmed - deaths}`)
    );
  })
```
## Projects

Using this api for my personal project :chart_with_upwards_trend: - [Check here](https://my-app.akshayajeevan.now.sh/)

## License

The code from this repo is MIT licensed.  
The data is under [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19/) terms of use.

