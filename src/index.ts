import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";
// import { PromptTemplate } from "langchain/prompts";
import { APIChain } from "langchain/chains";

dotenv.config();

// const model = new OpenAI({
//   modelName: "gpt-3.5-turbo",
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const res = await model.call(
//   "What's a good idea for an application to build with GPT-3?"
// );

// const model = new OpenAI({ temperature: 0 });
// const prompt = PromptTemplate.fromTemplate(
//   "What is a good name for a company that makes {product}?"
// );
// const chainA = new LLMChain({ llm: model, prompt });

// // The result is an object with a `text` property.
// const resA = await chainA.call({ product: "colorful socks" });
// console.log({ resA });

// This APIDoc is based off of a postman mock server that returns a JSON object mocked from Spirit airlines
const alohaAirlinesDOCS = `BASE URL: https://eb771015-7a14-4440-bfa9-badff2d772f7.mock.pstmn.io

API Documentation
The API endpoint /pnr123 accepts no further parameters and responds with a JSON object containing the following properties:

Variable Type Description
recordLocator, string, the record locator or "PNR" or booking reference for the passenger's trip. This is the unique identifier for the passenger's trip.
passengers, string array, returns a list of passengers on the booking including their first and last names
firstname, string, the first name of the passenger
journeys, string array, returns a list of journey specific details of the passenger's trip. Includes information like departure, arrival and segments and passenger data
departureTime, date, the departure time for the passenger's trip
departureAirportCode, string, the departure airport code for the passenger's trip
departureAirportName, string, the departure airport name for the passenger's trip
arrivalTime, date, the arrival time for the passenger's trip
arrivalAirportCode, string, the arrival airport code for the passenger's trip
arrivalAirportName, string, the arrival airport name for the passenger's trip
`;

const OPEN_METEO_DOCS = `BASE URL: https://api.open-meteo.com/

API Documentation
The API endpoint /v1/forecast accepts a geographical coordinate, a list of weather variables and responds with a JSON hourly weather forecast for 7 days. Time always starts at 0:00 today and contains 168 hours. All URL parameters are listed below:

Parameter	Format	Required	Default	Description
latitude, longitude	Floating point	Yes		Geographical WGS84 coordinate of the location
hourly	String array	No		A list of weather variables which should be returned. Values can be comma separated, or multiple &hourly= parameter in the URL can be used.
daily	String array	No		A list of daily weather variable aggregations which should be returned. Values can be comma separated, or multiple &daily= parameter in the URL can be used. If daily weather variables are specified, parameter timezone is required.
current_weather	Bool	No	false	Include current weather conditions in the JSON output.
temperature_unit	String	No	celsius	If fahrenheit is set, all temperature values are converted to Fahrenheit.
windspeed_unit	String	No	kmh	Other wind speed speed units: ms, mph and kn
precipitation_unit	String	No	mm	Other precipitation amount units: inch
timeformat	String	No	iso8601	If format unixtime is selected, all time values are returned in UNIX epoch time in seconds. Please note that all timestamp are in GMT+0! For daily values with unix timestamps, please apply utc_offset_seconds again to get the correct date.
timezone	String	No	GMT	If timezone is set, all timestamps are returned as local-time and data is returned starting at 00:00 local-time. Any time zone name from the time zone database is supported. If auto is set as a time zone, the coordinates will be automatically resolved to the local time zone.
past_days	Integer (0-2)	No	0	If past_days is set, yesterday or the day before yesterday data are also returned.
start_date
end_date	String (yyyy-mm-dd)	No		The time interval to get weather data. A day must be specified as an ISO8601 date (e.g. 2022-06-30).
models	String array	No	auto	Manually select one or more weather models. Per default, the best suitable weather models will be combined.

Variable	Valid time	Unit	Description
temperature_2m	Instant	°C (°F)	Air temperature at 2 meters above ground
snowfall	Preceding hour sum	cm (inch)	Snowfall amount of the preceding hour in centimeters. For the water equivalent in millimeter, divide by 7. E.g. 7 cm snow = 10 mm precipitation water equivalent
rain	Preceding hour sum	mm (inch)	Rain from large scale weather systems of the preceding hour in millimeter
showers	Preceding hour sum	mm (inch)	Showers from convective precipitation in millimeters from the preceding hour
weathercode	Instant	WMO code	Weather condition as a numeric code. Follow WMO weather interpretation codes. See table below for details.
snow_depth	Instant	meters	Snow depth on the ground
freezinglevel_height	Instant	meters	Altitude above sea level of the 0°C level
visibility	Instant	meters	Viewing distance in meters. Influenced by low clouds, humidity and aerosols. Maximum visibility is approximately 24 km.`;

const headers = { Authorization: "Bearer hello" };
console.log(OPEN_METEO_DOCS.length);
// export async function run() {
const model = new OpenAI({ modelName: "text-davinci-003" });
const chain = APIChain.fromLLMAndAPIDocs(model, alohaAirlinesDOCS, { headers });

const res = await chain.call({
  question: "When did the passenger arrive and what is their name?",
});
console.log({ res });
// }
