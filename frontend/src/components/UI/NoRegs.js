import React from 'react';
import { Toast, ToastBody } from 'reactstrap';

const NoRegs = () => {
	return (
		<div className="p-3 my-2 rounded">
			<Toast>
				<ToastBody>No hay registros</ToastBody>
			</Toast>
		</div>
	);
};

export default NoRegs;
