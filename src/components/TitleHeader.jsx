import React from 'react'

const TitleHeader = ({title, sub, icon: Icon}) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="hero-badge flex items-center gap-2">
                {Icon && <Icon className="size-4 shrink-0" />}
                <p>{sub}</p>
            </div>
            <div className="font-semibold md:text-5xl text-3xl text-center">
                {title}
            </div>
        </div>
    )
}
export default TitleHeader
