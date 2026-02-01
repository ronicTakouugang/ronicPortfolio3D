import React from 'react'
import {counterItems} from "../constants/index.js";
import CountUp from 'react-countup';

const AnimatedCounter = () => {
    return (
        <div id="counter" className="padding-x xl:mt-10 mt-20 pb-20 max-w-7xl mx-auto">
            <div className="grid-4-cols">
                {counterItems.map((item, index)=>(
                    <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-zinc-900 transition-colors duration-300">
                        <div className="counter-number text-white text-5xl font-bold mb-3">
                            <CountUp start={0} end={item.value} duration={2} separator="," suffix={item.suffix}/>
                        </div>
                        <div className="text-white-50 text-lg">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default AnimatedCounter
