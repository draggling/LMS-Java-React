import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	attemptLogin,
	handleCloseCheckoutModal,
	handleCloseReturnModal,
	logoutBorrower,
	processCheckout,
	processReturn,
	returnToBranchSelect,
	selectBranchForCheckout,
	startCheckout,
	startReturn,
} from '../borrowerActions';
import { BORROWER_PORT } from '../../constants/connections';
import {
	BORROWER_BACK_TO_BRANCH_SELECT,
	BORROWER_CHECKOUT_PENDING,
	BORROWER_CHECKOUT_FAILURE,
	BORROWER_CHECKOUT_SUCCESSFUL,
	BORROWER_CLOSE_CHECKOUT_MODAL,
	BORROWER_CLOSE_RETURN_MODAL,
	BORROWER_DASHBOARD_READ_BOOKS_FAILED,
	BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL,
	BORROWER_DASHBOARD_SELECT_BRANCH,
	BORROWER_LOGIN_PENDING,
	BORROWER_LOGIN_FAILURE,
	BORROWER_LOGIN_SUCCESSFUL,
	BORROWER_LOGOUT,
	BORROWER_READ_ACTIVE_LOANS_FAILED,
	BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL,
	BORROWER_READ_ALL_BRANCHES_FAILED,
	BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
	BORROWER_START_CHECKOUT,
	BORROWER_START_RETURN,
	BORROWER_RETURN_PENDING,
	BORROWER_RETURN_FAILURE,
	BORROWER_RETURN_SUCCESSFUL,
} from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

const testBook = {
	bookId: 1,
	title: 'A Test for the ages',
	publisher: {
		publisherAddress: '121 Publisher St',
		publisherId: 10,
		publisherName: 'Tester Publishing',
		publisherPhone: '410-555-5555',
	},
};
const testBorrower = {
	borrowerAddress: '555 Household Ln',
	borrowerCardNo: 11,
	borrowerName: 'Johnny Test',
	borrowerPhone: '555-555-5555',
};

const testBranches = [
	{
		branchAddress: '123 Test Ave ',
		branchId: 1,
		branchName: '1st Branch',
	},
	{
		branchAddress: '123 Test Blvd ',
		branchId: 2,
		branchName: '2nd Branch',
	},
];

const testBooks = [
	{
		bookId: 1,
		title: 'Anton Reiser',
		authors: [{ authorId: 2, authorName: 'Samuel Richardson' }],
		genres: [{ genreId: 2, genreName: 'Epistolary' }],
		publisher: {
			publisherAddress: '2180 South McDowell Blvd Petaluma',
			publisherId: 3,
			publisherName: 'Houghton Mifflin Harcourt',
			publisherPhone: '427811',
		},
	},
	{
		bookId: 5,
		title: 'Quartet',
		authors: [{ authorId: 5, authorName: 'Jean Rhys' }],
		genres: [{ genreId: 5, genreName: 'Autobiographical Fiction' }],
		publisher: {
			publisherAddress: '195 Broadway New York ',
			publisherId: 4,
			publisherName: 'HarperCollins Publishers',
			publisherPhone: '186450',
		},
	},
	{
		bookId: 10,
		title: 'Frankenstein',
		authors: [{ authorId: 10, authorName: 'Mary Shelley' }],
		genres: [
			{ genreId: 10, genreName: 'Gothic' },
			{ genreId: 11, genreName: 'Horror' },
		],
		publisher: {
			publisherAddress: '400 Bennett Cerf Drive Westminster',
			publisherId: 7,
			publisherName: 'Signet Books',
			publisherPhone: '987654',
		},
	},
	{
		bookId: 11,
		title: 'The Circle',
		authors: [{ authorId: 11, authorName: 'Dave Eggers' }],
		genres: [{ genreId: 6, genreName: 'Science Fiction' }],
		publisher: {
			publisherAddress: '1745 Broadway New York',
			publisherId: 8,
			publisherName: 'Knopf',
			publisherPhone: '8452457',
		},
	},
	{
		bookId: 19,
		title: 'The Litigators',
		authors: [{ authorId: 19, authorName: 'John Grisham' }],
		genres: [{ genreId: 20, genreName: 'Legal Thriller' }],
		publisher: {
			publisherAddress: '1745 Broadway New York',
			publisherId: 14,
			publisherName: 'Doubleday',
			publisherPhone: '824654',
		},
	},
];

const testLoans = [
	{
		key: {
			bookId: testBooks[1].bookId,
			branchId: testBranches[0].branchId,
			cardNo: testBorrower.borrowerCardNo,
		},
		book: testBooks[1],
		branch: testBranches[0],
		borrower: testBorrower,
		dateOut: '2021-02-18',
		dueDate: '2021-06-17',
		dateIn: null,
	},
	{
		key: {
			bookId: testBooks[2].bookId,
			branchId: testBranches[0].branchId,
			cardNo: testBorrower.borrowerCardNo,
		},
		book: testBooks[2],
		branch: testBranches[0],
		borrower: testBorrower,
		dateOut: '2021-02-18',
		dueDate: '2021-06-17',
		dateIn: null,
	},
	{
		key: {
			bookId: testBooks[4].bookId,
			branchId: testBranches[0].branchId,
			cardNo: testBorrower.borrowerCardNo,
		},
		book: testBooks[4],
		branch: testBranches[0],
		borrower: testBorrower,
		dateOut: '2021-02-18',
		dueDate: '2021-06-17',
		dateIn: null,
	},
];
const weekInMilliseconds = 604800000;

describe('borrowerAction.attemptLogin', () => {
	test('successfulLogin', () => {
		const mockResponse = { data: testBorrower };
		const mockReponseBranches = {
			data: testBranches,
		};
		axios.get
			.mockResolvedValueOnce(mockResponse)
			.mockResolvedValueOnce(mockReponseBranches);

		const store = mockStore({
			borrowerDashboardInfo: null,
			loggedInBorrower: null,
			requestInfo: null,
		});

		const expectedActions = [
			{
				type: BORROWER_LOGIN_PENDING,
			},
			{
				type: BORROWER_LOGIN_SUCCESSFUL,
				data: testBorrower,
			},
			{
				type: BORROWER_START_CHECKOUT,
			},
			{
				type: BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
				data: testBranches,
			},
		];

		return store.dispatch(attemptLogin(11)).then(() => {
			//return of async actions
			expect(store.getActions()).toEqual(expectedActions);

			expect(axios.get).toHaveBeenCalledWith(
				`${BORROWER_PORT}borrower/getBorrowerById/11`
			);
			expect(axios.get).toHaveBeenLastCalledWith(
				`${BORROWER_PORT}borrower/getLibraryBranchesWithAvailableBooks`
			);
		});
	});

	test("unsuccessful login (cardNo isn't in DB)", () => {
		const errorMessage = 'The requested DB action could not be performed.';
		const rejectedValue = new Error(errorMessage);

		axios.get.mockRejectedValueOnce(rejectedValue);

		const store = mockStore({
			borrowerDashboardInfo: null,
			loggedInBorrower: null,
			requestInfo: null,
		});

		const expectedActions = [
			{
				type: BORROWER_LOGIN_PENDING,
			},
			{
				type: BORROWER_LOGIN_FAILURE,
				error: rejectedValue,
			},
		];

		return store.dispatch(attemptLogin(-1)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);

			expect(axios.get).toHaveBeenCalledWith(
				`${BORROWER_PORT}borrower/getBorrowerById/-1`
			);
		});
	});
});

describe('closeModals', () => {
	test('borrowerActions.handleCloseCheckoutModal', () => {
		const store = mockStore({
			borrowerDashboardInfo: {
				branches: testBranches,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				checkoutPending: false,
				checkoutSuccessful: true,
				checkoutFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_CLOSE_CHECKOUT_MODAL,
			},
		];

		store.dispatch(handleCloseCheckoutModal());
		expect(store.getActions()).toEqual(expectedActions);
	});

	test('borrowerActions.handleCloseReturnModal', () => {
		const store = mockStore({
			borrowerDashboardInfo: {
				branches: testBranches,
				isCheckingOut: false,
				isReturning: true,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				checkoutPending: false,
				checkoutSuccessful: true,
				checkoutFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_CLOSE_RETURN_MODAL,
			},
		];

		store.dispatch(handleCloseReturnModal());
		expect(store.getActions()).toEqual(expectedActions);
	});
});

test('borrowerAction.logoutBorrower', () => {
	const store = mockStore({
		borrowerDashboardInfo: {
			branches: testBranches,
			isCheckingOut: false,
			isReturning: true,
			selectedLoan: null,
		},
		loggedInBorrower: testBorrower,
		requestInfo: {
			checkoutPending: false,
			checkoutSuccessful: false,
			checkoutFailed: false,
		},
	});

	const expectedActions = [
		{
			type: BORROWER_LOGOUT,
		},
	];

	store.dispatch(logoutBorrower());
	expect(store.getActions()).toEqual(expectedActions);
});

describe('borrowerActions.processCheckout', () => {
	test('successful checkout', () => {
		const today = new Date();

		const mockResponse = {
			data: {
				key: {
					bookId: testBook.bookId,
					branchId: testBranches[0].branchId,
					cardNo: testBorrower.borrowerCardNo,
				},
				book: testBook,
				borrower: testBorrower,
				branch: testBranches[0],
				dateOut: today,
				dueDate: today,
				dateIn: null,
			},
		};
		axios.post.mockResolvedValueOnce(mockResponse);

		const store = mockStore({
			borrowerDashboardInfo: {
				branches: testBranches,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				checkoutPending: false,
				checkoutSuccessful: false,
				checkoutFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_CHECKOUT_PENDING,
				selectedBook: testBook,
			},
			{
				type: BORROWER_CHECKOUT_SUCCESSFUL,
				newLoan: mockResponse.data,
			},
		];
		const expectedPostBody = {
			key: {
				bookId: testBook.bookId,
				branchId: testBranches[0].branchId,
				cardNo: testBorrower.borrowerCardNo,
			},
			book: testBook,
			borrower: testBorrower,
			branch: testBranches[0],
			dateOut: null,
			dueDate: null,
			dateIn: null,
		};
		return store
			.dispatch(processCheckout(testBook, testBorrower, testBranches[0]))
			.then(() => {
				//return of async actions
				expect(store.getActions()).toEqual(expectedActions);

				expect(axios.post).toHaveBeenCalledWith(
					`${BORROWER_PORT}borrower/addNewBookLoan`,
					expectedPostBody
				);
			});
	});

	test('failed checkout', () => {
		const errorMessage = 'The requested DB action could not be performed.';
		const rejectedValue = new Error(errorMessage);

		axios.post.mockRejectedValueOnce(rejectedValue);
		const store = mockStore({
			borrowerDashboardInfo: {
				branches: testBranches,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				checkoutPending: false,
				checkoutSuccessful: false,
				checkoutFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_CHECKOUT_PENDING,
				selectedBook: testBook,
			},
			{
				type: BORROWER_CHECKOUT_FAILURE,
				error: rejectedValue,
			},
		];

		const expectedPostBody = {
			key: {
				bookId: testBook.bookId,
				branchId: testBranches[0].branchId,
				cardNo: testBorrower.borrowerCardNo,
			},
			book: testBook,
			borrower: testBorrower,
			branch: testBranches[0],
			dateOut: null,
			dueDate: null,
			dateIn: null,
		};

		return store
			.dispatch(processCheckout(testBook, testBorrower, testBranches[0]))
			.then(() => {
				//return of async actions
				expect(store.getActions()).toEqual(expectedActions);

				expect(axios.post).toHaveBeenCalledWith(
					`${BORROWER_PORT}borrower/addNewBookLoan`,
					expectedPostBody
				);
			});
	});
});

describe('borrowerActions.processReturn', () => {
	test('successful return', () => {
		const today = Date();
		const testLoan = {
			key: {
				bookId: testBook.bookId,
				branchId: testBranches[0].branchId,
				cardNo: testBorrower.borrowerCardNo,
			},
			book: testBook,
			borrower: testBorrower,
			branch: testBranches[0],
			dateOut: today,
			dueDate: today,
			dateIn: null,
		};
		const mockResponse = {
			data: {
				key: {
					bookId: testBook.bookId,
					branchId: testBranches[0].branchId,
					cardNo: testBorrower.borrowerCardNo,
				},
				book: testBook,
				borrower: testBorrower,
				branch: testBranches[0],
				dateOut: today,
				dueDate: today,
				dateIn: today,
			},
		};
		axios.put.mockResolvedValueOnce(mockResponse);

		const store = mockStore({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				returnPending: false,
				returnSuccessful: false,
				returnFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_RETURN_PENDING,
			},
			{
				type: BORROWER_RETURN_SUCCESSFUL,
				loan: mockResponse.data,
			},
		];

		return store.dispatch(processReturn(testLoan)).then(() => {
			//return of async actions
			expect(store.getActions()).toEqual(expectedActions);

			expect(axios.put).toHaveBeenCalledWith(
				`${BORROWER_PORT}borrower/bookLoanReturn`,
				testLoan
			);
		});
	});

	test('failed return', () => {
		const errorMessage = 'The requested DB action could not be performed.';
		const rejectedValue = new Error(errorMessage);

		axios.put.mockRejectedValueOnce(rejectedValue);

		const today = Date();
		const testLoan = {
			key: {
				bookId: testBook.bookId,
				branchId: testBranches[0].branchId,
				cardNo: testBorrower.borrowerCardNo,
			},
			book: testBook,
			borrower: testBorrower,
			branch: testBranches[0],
			dateOut: today,
			dueDate: today,
			dateIn: null,
		};

		const store = mockStore({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				returnPending: false,
				returnSuccessful: false,
				returnFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_RETURN_PENDING,
			},
			{
				type: BORROWER_RETURN_FAILURE,
				error: rejectedValue,
			},
		];

		return store.dispatch(processReturn(testLoan)).then(() => {
			//return of async actions
			expect(store.getActions()).toEqual(expectedActions);

			expect(axios.put).toHaveBeenCalledWith(
				`${BORROWER_PORT}borrower/bookLoanReturn`,
				testLoan
			);
		});
	});
});

test('borrowerActions.returnToBranchSelect', () => {
	const store = mockStore({
		borrowerDashboardInfo: {
			branches: testBranches,
			isCheckingOut: true,
			isReturning: false,
			selectedBranch: testBranches[0],
		},
		loggedInBorrower: testBorrower,
		requestInfo: {
			checkoutPending: false,
			checkoutSuccessful: false,
			checkoutFailed: false,
		},
	});

	const expectedActions = [
		{
			type: BORROWER_BACK_TO_BRANCH_SELECT,
		},
	];

	store.dispatch(returnToBranchSelect());
	expect(store.getActions()).toEqual(expectedActions);
});

describe('borrowerActions.selectBranchForCheckout', () => {
	test('successful get of books', () => {
		const mockResponse = { data: testBooks };

		axios.get.mockResolvedValueOnce(mockResponse);

		const store = mockStore({
			borrowerDashboardInfo: {
				branches: testBranches,
				isCheckingOut: true,
				isReturning: false,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				checkoutPending: false,
				checkoutSuccessful: false,
				checkoutFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_DASHBOARD_SELECT_BRANCH,
				selectedBranch: testBranches[0],
			},
			{
				type: BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL,
				booksAvailable: mockResponse.data,
			},
		];

		return store
			.dispatch(
				selectBranchForCheckout(testBranches[0], testBorrower.borrowerCardNo)
			)
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
				expect(axios.get).toHaveBeenCalledWith(
					`${BORROWER_PORT}borrower/getBooksAvailableFromBranchForBorrower/${testBranches[0].branchId}/${testBorrower.borrowerCardNo}`
				);
			});
	});
	test('failed get of books', () => {
		const errorMessage = 'The requested DB action could not be performed.';
		const rejectedValue = new Error(errorMessage);

		axios.get.mockRejectedValueOnce(rejectedValue);

		const store = mockStore({
			borrowerDashboardInfo: {
				branches: testBranches,
				isCheckingOut: true,
				isReturning: false,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				checkoutPending: false,
				checkoutSuccessful: false,
				checkoutFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_DASHBOARD_SELECT_BRANCH,
				selectedBranch: testBranches[0],
			},
			{
				type: BORROWER_DASHBOARD_READ_BOOKS_FAILED,
				error: rejectedValue,
			},
		];

		return store
			.dispatch(
				selectBranchForCheckout(testBranches[0], testBorrower.borrowerCardNo)
			)
			.then(() => {
				expect(store.getActions()).toEqual(expectedActions);
				expect(axios.get).toHaveBeenCalledWith(
					`${BORROWER_PORT}borrower/getBooksAvailableFromBranchForBorrower/${testBranches[0].branchId}/${testBorrower.borrowerCardNo}`
				);
			});
	});
});

describe('borrowerActions.startCheckout', () => {
	test('successful get branches', () => {
		const mockReponseBranches = {
			data: testBranches,
		};
		axios.get.mockResolvedValueOnce(mockReponseBranches);

		const store = mockStore({
			borrowerDashboardInfo: {
				isCheckingOut: true,
				isReturning: false,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_START_CHECKOUT,
			},
			{
				type: BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
				data: testBranches,
			},
		];

		return store.dispatch(startCheckout()).then(() => {
			//return of async actions
			expect(store.getActions()).toEqual(expectedActions);

			expect(axios.get).toHaveBeenLastCalledWith(
				`${BORROWER_PORT}borrower/getLibraryBranchesWithAvailableBooks`
			);
		});
	});

	test('failed get branches', () => {
		const errorMessage = 'The requested DB action could not be performed.';
		const rejectedValue = new Error(errorMessage);

		axios.get.mockRejectedValueOnce(rejectedValue);

		const store = mockStore({
			borrowerDashboardInfo: {
				isCheckingOut: true,
				isReturning: false,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_START_CHECKOUT,
			},
			{
				type: BORROWER_READ_ALL_BRANCHES_FAILED,
				error: rejectedValue,
			},
		];
		return store.dispatch(startCheckout()).then(() => {
			//return of async actions
			expect(store.getActions()).toEqual(expectedActions);

			expect(axios.get).toHaveBeenLastCalledWith(
				`${BORROWER_PORT}borrower/getLibraryBranchesWithAvailableBooks`
			);
		});
	});
});

describe('borrowerActions.startReturn', () => {
	test('successful get of loans', () => {
		const mockResponse = { data: testLoans };

		axios.get.mockResolvedValueOnce(mockResponse);

		const store = mockStore({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_START_RETURN,
			},
			{
				type: BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL,
				loans: mockResponse.data,
			},
		];

		return store.dispatch(startReturn(testBorrower.borrowerCardNo)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
			expect(axios.get).toHaveBeenCalledWith(
				`${BORROWER_PORT}borrower/getActiveLoansForBorrower/${testBorrower.borrowerCardNo}`
			);
		});
	});

	test('failed get of loans', () => {
		const errorMessage = 'The requested DB action could not be performed.';
		const rejectedValue = new Error(errorMessage);

		axios.get.mockRejectedValueOnce(rejectedValue);

		const store = mockStore({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});

		const expectedActions = [
			{
				type: BORROWER_START_RETURN,
			},
			{
				type: BORROWER_READ_ACTIVE_LOANS_FAILED,
				error: rejectedValue,
			},
		];

		return store.dispatch(startReturn(testBorrower.borrowerCardNo)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
			expect(axios.get).toHaveBeenCalledWith(
				`${BORROWER_PORT}borrower/getActiveLoansForBorrower/${testBorrower.borrowerCardNo}`
			);
		});
	});
});
