const path = require("path");
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const states = require("./us-states");

const FILENAME_US_STATES_CONFIRMED = "time_series_covid19_confirmed_US.csv";
const FILENAME_US_STATES_DEATHS = "time_series_covid19_deaths_US.csv";

function extractData(path, opt) {
	const csv = fs.readFileSync(path);
	const [headers, ...rows] = parse(csv);
	let [uid, iso2, iso3, code3, fips, admin2, province, country, lat, long, city, ...dates] = headers;
	
	if(opt === 'D') {
		[uid, iso2, iso3, code3, fips, admin2, province, country, lat, long, city, population, ...dates] = headers;
	}
	
	const countList = {};

	const formatDates = dates.map(date => {
		const [month, day] = date.split("/");
		return `${day}-${month}-2020`;
	});

	if(opt === 'D') {
		rows.forEach(([uid, iso2, iso3, code3, fips, admin2, province, country, lat, long, city, population, ...counts]) => {
			if(states.list.indexOf(province) !== -1) {
				countList[province] = countList[province] || {};
				formatDates.forEach((date, i) => {
				  countList[province][date] = countList[province][date] || 0;
				  countList[province][date] += +counts[i];
				});
			}
		});
	} else {
		rows.forEach(([uid, iso2, iso3, code3, fips, admin2, province, country, lat, long, city, ...counts]) => {
			if(states.list.indexOf(province) !== -1) {
				countList[province] = countList[province] || {};
				formatDates.forEach((date, i) => {
				  countList[province][date] = countList[province][date] || 0;
				  countList[province][date] += +counts[i];
				});
			}
		});
	}
	return [countList, formatDates];
}

function updateData(dataPath, outputPath) {
	const [confirmed, dates] = extractData(path.resolve(dataPath, FILENAME_US_STATES_CONFIRMED), 'C');
	const [death] = extractData(path.resolve(dataPath, FILENAME_US_STATES_DEATHS), 'D');
	const states = Object.keys(confirmed);
	const results = {};
		
	states.forEach(state => {
		results[state] = dates.map(date => {
			return {
				date,
				confirmed: confirmed[state][date],
				deaths: death[state][date]
			};
		});
	});
	fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
}

module.exports = {
	execute: updateData
}
