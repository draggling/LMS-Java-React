import {
	READ_PUBLISHERS_SUCCESSFUL,
	READ_PUBLISHERS_PENDING,
	READ_PUBLISHERS_FAILURE,
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

export default function publisherReducer(state = {}, action) {
	switch (action.type) {
		case READ_PUBLISHERS_PENDING:
			return {
				...state,
				requestInfo: { ...state.requestInfo, readPending: true },
			};
		case READ_PUBLISHERS_FAILURE:
			return {
				...state,
				requestInfo: {
					...state.requestInfo,
					readFailed: true,
					readPending: false,
				},
			};
		case READ_PUBLISHERS_SUCCESSFUL:
			return {
				...state,
				publisherData: {
					publishers: action.data,
				},
				requestInfo: {
					...state.requestInfo,
					readFailed: false,
					readSuccessful: true,
					readPending: false,
				},
			};
		case DELETE_PUBLISHER_REQUEST:
			return {
				...state,
				publisherData: {
					...state.publisherData,
				},
				requestInfo: {
					...state.requestInfo,
					deleting: true,
					deleteFailed: false,
					deleteSuccess: false,
				},
			};
		case DELETE_PUBLISHER_FAILURE:
			return {
				...state,
				publisherData: {
					...state.publisherData,
				},
				requestInfo: {
					...state.requestInfo,
					deleteFailed: true,
					deleting: false,
				},
			};
		case DELETE_PUBLISHER_SUCCESSFUL: {
			const newPublishers = state.publisherData.publishers.filter(
				(publisher) => {
					return publisher.publisherId != action.deletedId;
				}
			);
			return {
				...state,
				publisherData: {
					...state.publisherData,
					publishers: newPublishers,
				},
				requestInfo: {
					...state.requestInfo,
					deleteSuccess: true,
					deleting: false,
				},
			};
		}
		case UPDATE_PUBLISHER_REQUEST:
			return {
				...state,
				publisherData: {
					...state.publisherData,
				},
				requestInfo: {
					...state.requestInfo,
					updating: true,
					updateFailed: false,
					updateSuccess: false,
				},
			};
		case UPDATE_PUBLISHER_FAILURE:
			return {
				...state,
				publisherData: {
					...state.publisherData,
				},
				requestInfo: {
					...state.requestInfo,
					updateFailed: true,
					updating: false,
				},
			};
		case UPDATE_PUBLISHER_SUCCESSFUL: {
			if (state.publisherData.readPending) {
				/* Not needed if we continue to use toggle instead of handle refresh*/
				return {
					...state,
					publisherData: {
						...state.publisherData,
					},
					requestInfo: {
						...state.requestInfo,
						//updatedSuccess: true,
						//updating: false,
					},
				};
			} else {
				let updatedPublishers = state.publisherData.publishers.map(
					(publisher) =>
						action.updatedPublisher.publisherId ===
						publisher.publisherId
							? action.updatedPublisher
							: publisher
				);
				return {
					...state,
					publisherData: {
						...state.publisherData,
						publishers: updatedPublishers,
					},
					requestInfo: {
						...state.requestInfo,
						updateSuccess: true,
						updating: false,
					},
				};
			}
		}
		case CREATE_PUBLISHER_REQUEST:
			return {
				...state,
				publisherData: {
					...state.publisherData,
				},
				requestInfo: {
					...state.requestInfo,
					creating: true,
					createFailed: false,
					createSuccess: false,
				},
			};
		case CREATE_PUBLISHER_FAILURE:
			return {
				...state,
				publisherData: {
					...state.publisherData,
				},
				requestInfo: {
					...state.requestInfo,
					createFailed: true,
					creating: false,
				},
			};
		case CREATE_PUBLISHER_SUCCESSFUL: {
			let updatedPublisherArray = [
				...state.publisherData.publishers,
				action.createdPublisher,
			];
			return {
				...state,
				publisherData: {
					...state.publisherData,
					publishers: updatedPublisherArray,
				},
				requestInfo: {
					...state.requestInfo,
					createSuccess: true,
					creating: false,
				},
			};
		}
		default:
			return state;
	}
}
