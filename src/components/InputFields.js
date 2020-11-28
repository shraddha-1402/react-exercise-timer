import React from 'react';
import '../App.css';

const InputFields = ({ handleChange }) => {
    return (
        <React.Fragment>
            <div className="input-fields">
                <div className="input-time">
                    <div>
                        <input
                            name="displayMins"
                            onChange={handleChange}
                            placeholder="First Timer"
                            className="input"
                        />
                    </div>
                    <div>
                        <input
                            name="minsOri2"
                            onChange={handleChange}
                            placeholder="Second Timer"
                            className="input"
                        />
                    </div>
                </div>
                <div>
                    <input
                        name="times"
                        onChange={handleChange}
                        placeholder="Laps"
                        className="input"
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default InputFields;