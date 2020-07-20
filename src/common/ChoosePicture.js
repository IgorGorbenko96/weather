import rainy from '../assets/images/wallpaper/rain.jpg';
import cloudy from '../assets/images/wallpaper/cloudy.jpg';
import fewClouds from '../assets/images/wallpaper/cloudy_sky.jpg';
import sunny from '../assets/images/wallpaper/sunny.jpg';

export const weatherPicture = (type) => {
    switch (type) {
        case 'проливной дождь':
            return rainy;
        case 'сильный дождь':
            return rainy;
        case 'дождь':
            return rainy;
        case 'гроза с небольшим дождём':
            return rainy;
        case 'небольшой проливной дождь':
            return rainy
        case 'гроза':
            return rainy;
        case 'небольшой дождь':
            return rainy;
        case 'пасмурно':
            return cloudy;
        case 'небольшая морось':
            return cloudy;
        case 'переменная облачность':
            return fewClouds;
        case 'облачно с прояснениями':
            return fewClouds;
        case 'небольшая облачность':
            return fewClouds;
        default:
            return sunny
    }
}
