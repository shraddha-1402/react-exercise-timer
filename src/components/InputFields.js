import React from 'react';
import '../App.css';

const InputFields = ({name, handleChange, placeholder, className }) => {
	return (
		<React.Fragment>
			<input
				name= {name}
				onChange= {handleChange}
				placeholder= {placeholder}
				className= {className}
				autocomplete="off"
		/>
			{/* <div className="input-fields">
				<div className="input-time">
						<input
								name="displayMins"
								onChange={handleChange}
								placeholder="First Timer"
								className="input"
								autocomplete="off"
						/>
						<input
								name="minsOri2"
								onChange={handleChange}
								placeholder="Second Timer"
								className="input"
								autocomplete="off"
						/>
				</div>
				<div>
					<input
							name="times"
							onChange={handleChange}
							placeholder="Laps"
							className="input"
							autocomplete="off"
					/>
				</div>
			</div> */}
		</React.Fragment>
	);
};

export default InputFields;