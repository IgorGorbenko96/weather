import React from 'react';
import './CleanStyles.css';
import './App.css';
import Axios from 'axios';
import WeekItem from './components/WeekItem';
import search from './assets/images/search.png';
import { weatherPicture } from './common/ChoosePicture';
import Preloader from './common/Preloader';
import TemperatureGraph from './components/TemperatureGraph';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      weather: null,
      temperature: null,
      temperatureChanged: false,
      value: '',
      error: false,
      selected: false,
    };
  }

  componentDidMount() {
    Axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=d57ea1b06c1447e198277afd5bb84d0e').then(response => { // получение местоположения
      Axios.get(`http://api.geonames.org/search?q=${response.data.city}&type=json&maxRows=1&lang=ru&username=igoryan_96`).then(response => { // получение города по местоположению
        this.setState({ city: response.data.geonames[0] });
      })
    })

  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.city !== this.state.city)
      Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.city.lat}&lon=${this.state.city.lng}&lang=ru&units=metric&&exclude=minutely&appid=da25e02e4bebf131c8a8aa094f237515`).then(response => { // получение погоды по координатам города
        this.setState({ weather: response.data });
        this.setState({ temperature: Math.round(response.data.current.temp) }); // установка погоды и температуры
      })
  }

  convertToCelcius() { // перевод температуры в значение по цельсия
    this.setState({ temperature: Math.round(this.state.temperature - 273.15) });
    this.setState({ temperatureChanged: false })
  }

  convertToKelvin() { // перевод температуры в значение по кельвина
    this.setState({ temperature: Math.round(this.state.temperature + 273.15) });
    this.setState({ temperatureChanged: true })
  }

  onHandleSubmit(e) {
    e.preventDefault(); // отмена перезагрузки страницы по отправке формы
    Axios.get(`http://api.geonames.org/search?q=${this.state.value}&type=json&maxRows=1&lang=ru&username=igoryan_96`).then(response => { // запрос погоды по введённому названию
      if (response.data.geonames[0]) {
        this.setState({ city: response.data.geonames[0] });
        this.setState({ error: false })
      } else {
        this.setState({ error: true }) // установка значения ошибки
      }
    })
    this.setState({ value: '' }) // обнуление поля ввода
  }

  render() {

    return (
      <div className="app__wrapper">
        <div className="app">
          <header className="app__header">
            <form className="header__search" onSubmit={(e) => this.onHandleSubmit(e)}>
              {this.state.error
                ? <div className="search__notFound">
                  <p>Город не найден</p>
                </div>
                : null}
              <input type="text" placeholder="Enter city name" onChange={(e) => this.setState({ value: e.target.value })} value={this.state.value} />
              <button type="submit"><img src={search} alt="icon" /></button>
            </form >
          </header>
          {this.state.weather && this.state.temperature // проверка все ли данные получены
            ? <main>
              <div className="weather__picture">
                <img src={weatherPicture(this.state.weather.current.weather[0].description)} alt="pic" />
              </div>
              <div className="main__weather">
                <h2>{this.state.city.name}, {this.state.city.countryName}</h2>
                <div className="weather__temperature">
                  <p className="temperature__number">{this.state.temperature}°</p>
                  <div className="temperature__degree">
                    <button onClick={this.convertToCelcius.bind(this)} disabled={this.state.temperatureChanged ? false : true} className={this.state.temperatureChanged ? 'temperature__degree_active' : null}>C</button>
                    <button onClick={this.convertToKelvin.bind(this)} disabled={this.state.temperatureChanged ? true : false} className={this.state.temperatureChanged ? null : 'temperature__degree_active'}>K</button>
                  </div>
                </div>
                <h2>{this.state.weather.current.weather[0].description}</h2>
                <div className="weather__details">
                  <p className="weather__item">Чувствуется как {Math.round(this.state.weather.current.feels_like)}°</p>
                  <p className="weather__item">Ветер {this.state.weather.current.wind_speed} км/ч</p>
                  <p className="weather__item">Давление {Math.round(this.state.weather.current.pressure / 1.333)}</p>
                  <p className="weather__item">Видимость {Math.round(this.state.weather.current.visibility / 1000)} км</p>
                  <p className="weather__item">Влажность {this.state.weather.current.humidity}%</p>
                  <p className="weather__item">Точка росы {this.state.weather.current.dew_point}</p>
                </div>
              </div>
              <div className="weaher__week">
                {this.state.weather.daily.map(day => <WeekItem key={day.dt} max={day.temp.max} min={day.temp.min} description={day.weather[0].description} date={day.dt} selected={this.state.selected} />)}
              </div>
              <div className="weather__hourly">
                <div className="hourly__head">
                  <h2>Hourly Today</h2>
                </div>
                <div className="hourly__graph">
                  <TemperatureGraph dailyTime={this.state.weather.hourly} />
                </div>
              </div>
            </main>
            : <Preloader />
          }
        </div>
      </div>
    )
  }
}


export default App;
