import React from 'react';

const SliderInput = ({ label, value, min, max, onChange }) => {
    return (
        <div className="flex-1">
            <p className="my-0 py-0">{label} :</p>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="h-0.5 w-36 mb-4"
            />
            <span className="text-sm ml-2">{value} Km</span>
        </div>
    );
};

export default SliderInput;
