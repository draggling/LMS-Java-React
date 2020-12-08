'use strict';
import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
const Spinner = (...key) => {
	let content = '';
	key && typeof (key[0] === 'number' || key[0] === 'string')
		?(content = (
				<div className="d-flex justify-content-center" key={key}>
					<RingLoader size={150} color={'#00ccff'} loading={true} />
				</div>
		))
		: (content = (
				<div className="d-flex justify-content-center">
					<RingLoader size={150} color={'#00ccff'} loading={true} />
				</div>
			));
	return content;
};
export default Spinner;
