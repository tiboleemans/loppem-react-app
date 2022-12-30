import React from "react";
import Countdown from "react-countdown";

const CountDownBanner = () => {
    const renderer = ({days, hours, minutes, seconds}) => {
        // Render a countdown
        return (
            <div className="flex max-w-400 flex-wrap mb-2">
                <div className="text-center mr-8">
                    <div className="m-0 text-28">{days}</div>
                    <div className="m-0">dagen</div>
                </div>
                <div className="text-center mr-8">
                    <div className="m-0 text-28">{hours}</div>
                    <div className="m-0">uren</div>
                </div>
                <div className="text-center mr-8">
                    <div className="m-0 text-28">{minutes}</div>
                    <div className="m-0">minuten</div>
                </div>
                <div className="text-center">
                    <div className="m-0 text-28">{seconds}</div>
                    <div className="m-0">seconden</div>
                </div>
            </div>
        );
    };
    return <Countdown date={'2023-07-02T11:00:00'} renderer={renderer}/>;
}
export default CountDownBanner;