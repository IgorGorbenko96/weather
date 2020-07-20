import sunny from '../assets/images/sunny.png';
import rainy from '../assets/images/rainy.png';
import lightRain from '../assets/images/light_rain.png';
import cloudy from '../assets/images/cloudy.png';
import fewClouds from '../assets/images/cloudy_sun.png';

export const weatherPic = (type) => {
    switch (type) {
        case 'проливной дождь':
            return rainy;
        case 'сильный дождь':
            return rainy;
        case 'дождь':
            return rainy;
        case 'гроза':
            return rainy;
        case 'гроза с небольшим дождём':
            return rainy;
        case 'небольшой дождь':
            return lightRain;
        case 'пасмурно':
            return cloudy;
        case 'переменная облачность':
            return fewClouds;
        case 'облачно с прояснениями':
            return fewClouds;
        default:
            return sunny
    }
}