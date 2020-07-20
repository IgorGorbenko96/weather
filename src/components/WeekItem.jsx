import React from 'react';
import '../App.css';
import { weatherPic } from '../common/ChooseIcon';
import { timeConverter, getWeekDay } from '../common/TimeConverter';

const WeekItem = ({ min, max, description, date, selected }) => {

    const currentDay = new Date(timeConverter(date));


    return (
        <div className="week__item">
            <div className={selected ? "week__item_selected" : "week__item_hover"}></div>
            <p className="item__day">{getWeekDay(currentDay)} {currentDay.getDate()}</p>
            <div className="item__icon">
                <img src={weatherPic(description)} alt="icon" />
            </div>
            <div className="item__temperature">
                <p>{Math.round(max)}°</p>
                <p>{Math.round(min)}°</p>
            </div>
            <p className="item__sky">{description}</p>
        </div>
    )
}

export default WeekItem;