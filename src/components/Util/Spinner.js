'use strict';

import React from 'react';
import RingLoader from "react-spinners/RingLoader";


const Spinner = () => {
	return (
		<div className="d-flex justify-content-center">
			<RingLoader
				size={150}
				color={"#00ccff"}
				loading={true}
		/>
	</div>
	);
};

export default Spinner;
