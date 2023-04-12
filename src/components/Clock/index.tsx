import React, { useState, useEffect } from 'react';
import styles from './clock.module.scss';
import ClockFace from "./ClockFace";

interface ClockProps {
    timezone: string;
}

const Clock: React.FC<ClockProps> = ({ timezone }) => {
    const [time, setTime] = useState<Date | null>(null);
    const [date, setDate] = useState(new Date());

    const timeApiKey = 'EQYC5HBL0PC7' // this must be in env

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=zone&zone=${timezone}`);
                const data = await response.json();
                const dateTime = new Date(data.formatted);
                setTime(dateTime);
            } catch (error) {
                console.error(error);
            }
        };

        const intervalId = setInterval(() => {
            fetchData();
        },  60000);

        fetchData()
        return () => clearInterval(intervalId);
    }, [timezone]);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setDate(new Date());
    }

    const seconds = date.getSeconds();
    const secondsDegree = (seconds / 60) * 360 + 90;

    const getHourAngle = (): number => {
        if (!time) return 0;
        let hour = time.getHours();
        let minutes = time.getMinutes()
        if (hour > 12) hour -= 12;
        return (hour + minutes/60)*30;
    };

    const getMinuteAngle = (): number => {
        if (!time) return 0;
        return time.getMinutes() * 6;
    };

    const getSecondAngle = (): number => {
        if (!time) return 0;
        return secondsDegree;
    };

    return (
        <div className={styles["clock-container"]}>
            {time && (
                <ClockFace>
                    <div className={styles['content']}>
                        <div
                            className={styles["hour-hand"]}
                            style={{ transform: `rotate(${getHourAngle()}deg)` }}
                        />
                        <div
                            className={styles["minute-hand"]}
                            style={{ transform: `rotate(${getMinuteAngle()}deg)` }}
                        />
                        <div
                            className={styles["second-hand"]}
                            style={{ transform: `rotate(${getSecondAngle()}deg)` }}
                        />
                    </div>
                </ClockFace>
            )}
        </div>
    );
};

export default Clock;
