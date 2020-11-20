import axios from 'axios';

import {
	READ_PUBLISHERS_PENDING,
	READ_PUBLISHERS_FAILURE,
	READ_PUBLISHERS_SUCCESSFUL,
	DELETE_PUBLISHER_REQUEST,
	DELETE_PUBLISHER_FAILURE,
	DELETE_PUBLISHER_SUCCESSFUL,
	UPDATE_PUBLISHER_REQUEST,
	UPDATE_PUBLISHER_FAILURE,
	UPDATE_PUBLISHER_SUCCESSFUL,
	CREATE_PUBLISHER_REQUEST,
	CREATE_PUBLISHER_FAILURE,
	CREATE_PUBLISHER_SUCCESSFUL,
} from '../constants/actionTypes';
import { ADMIN_PORT } from '../constants/connections';

export const readPublishers = () => {
	return (dispatch) => {
		dispatch(_readPublisherStarted());
		return axios
			.get(ADMIN_PORT + 'getPublishers')
			.then((res) => {
				dispatch(_readPublisherSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_readPublisherFailed(error));
			});
	};
};

export const deletePublisher = (id) => {
	return (dispatch) => {
		dispatch(_deletePublisherRequest());
		return axios
			.delete(ADMIN_PORT + 'deletePublisher', {
				data: { publisherId: id },
			})
			.then((res) => {
				dispatch(_deletePublisherSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_deletePublisherFailed(error));
			});
	};
};

export const updatePublisher = (
	id,
	publisherName,
	publisherAddress,
	publisherPhone
) => {
	return (dispatch) => {
		dispatch(_updatePublisherRequest());
		return axios
			.put(ADMIN_PORT + 'updatePublisher', {
				publisherId: id,
				publisherName: publisherName,
				publisherAddress: publisherAddress,
				publisherPhone: publisherPhone,
			})
			.then((res) => {
				dispatch(_updatePublisherSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_updatePublisherFailed(error));
			});
	};
};

export const createPublisher = (
	publisherName,
	publisherAddress,
	publisherPhone
) => {
	return (dispatch) => {
		dispatch(_createPublisherRequest());
		return axios
			.post(ADMIN_PORT + 'addPublisher', {
				publisherName: publisherName,
				publisherAddress: publisherAddress,
				publisherPhone: publisherPhone,
			})
			.then((res) => {
				dispatch(_createPublisherSuccess(res));
			})
			.catch((error) => {
				console.log(error);
				dispatch(_createPublisherFailed(error));
			});
	};
};

const _readPublisherSuccess = (res) => {
	return {
		type: READ_PUBLISHERS_SUCCESSFUL,
		data: res.data,
	};
};

const _readPublisherFailed = (error) => {
	return {
		type: READ_PUBLISHERS_FAILURE,
		error,
	};
};

const _readPublisherStarted = () => {
	return {
		type: READ_PUBLISHERS_PENDING,
	};
};

const _deletePublisherRequest = () => {
	return {
		type: DELETE_PUBLISHER_REQUEST,
	};
};

const _deletePublisherSuccess = (res) => {
	return {
		type: DELETE_PUBLISHER_SUCCESSFUL,
		data: res.data,
		deletedId: res.data.publisherId,
	};
};

const _deletePublisherFailed = (error) => {
	return {
		type: DELETE_PUBLISHER_FAILURE,
		error,
	};
};

const _updatePublisherRequest = () => {
	return {
		type: UPDATE_PUBLISHER_REQUEST,
	};
};

const _updatePublisherSuccess = (res) => {
	return {
		type: UPDATE_PUBLISHER_SUCCESSFUL,
		updatedPublisher: res.data,
	};
};

const _updatePublisherFailed = (error) => {
	return {
		type: UPDATE_PUBLISHER_FAILURE,
		error,
	};
};

const _createPublisherRequest = () => {
	return {
		type: CREATE_PUBLISHER_REQUEST,
	};
};

const _createPublisherSuccess = (res) => {
	return {
		type: CREATE_PUBLISHER_SUCCESSFUL,
		createdPublisher: res.data,
	};
};

const _createPublisherFailed = (error) => {
	return {
		type: CREATE_PUBLISHER_FAILURE,
		error,
	};
};
