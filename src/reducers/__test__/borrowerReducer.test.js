import borrowerReducer from '../borrowerReducer';
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

const testBorrower = {
	borrowerAddress: '555 Household Ln',
	borrowerCardNo: 11,
	borrowerName: 'Johnny Test',
	borrowerPhone: '555-555-5555',
};

const testBranchesWithBooks = [
	{ branchAddress: 'Boston', branchId: 1, branchName: 'University Library' },
	{ branchAddress: 'Washington DC', branchId: 3, branchName: 'Federal Library' },
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

describe('borrowerReducer Dashboard Tests', () => {
	test('BORROWER_LOGIN_PENDING', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: null,
					loggedInBorrower: null,
					requestInfo: null,
				},
				{ type: BORROWER_LOGIN_PENDING }
			)
		).toEqual({
			borrowerDashboardInfo: null,
			loggedInBorrower: null,
			requestInfo: {
				loginPending: true,
				loginSuccessful: false,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_LOGIN_FAILURE', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: null,
					loggedInBorrower: null,
					requestInfo: {
						loginPending: true,
						loginSuccessful: false,
						loginFailed: false,
					},
				},
				{ type: BORROWER_LOGIN_FAILURE }
			)
		).toEqual({
			borrowerDashboardInfo: null,
			loggedInBorrower: null,
			requestInfo: {
				loginPending: false,
				loginSuccessful: false,
				loginFailed: true,
			},
		});
	});

	test('BORROWER_LOGIN_SUCCESSFUL', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: null,
					loggedInBorrower: null,
					requestInfo: {
						loginPending: true,
						loginSuccessful: false,
						loginFailed: false,
					},
				},
				{ type: BORROWER_LOGIN_SUCCESSFUL, data: testBorrower }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: false,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_LOGOUT', () => {
		expect(
			borrowerReducer(
				{
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
				},
				{ type: BORROWER_LOGOUT }
			)
		).toEqual({
			borrowerDashboardInfo: null,
			loggedInBorrower: null,
			requestInfo: null,
		});
	});

	test('BORROWER_START_CHECKOUT', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: false,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{
					type: BORROWER_START_CHECKOUT,
				}
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: true,
				isReturning: false,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: true,
				branchesSuccessful: false,
				branchesFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_READ_ALL_BRANCHES_FAILED', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: true,
						isReturning: false,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: true,
						branchesSuccessful: false,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_READ_ALL_BRANCHES_FAILED }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: true,
				isReturning: false,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: false,
				branchesFailed: true,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_READ_ALL_BRANCHES_SUCCESSFUL', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: true,
						isReturning: false,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: true,
						branchesSuccessful: false,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{
					type: BORROWER_READ_ALL_BRANCHES_SUCCESSFUL,
					data: testBranchesWithBooks,
				}
			)
		).toEqual({
			borrowerDashboardInfo: {
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_DASHBOARD_SELECT_BRANCH', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{
					type: BORROWER_DASHBOARD_SELECT_BRANCH,
					selectedBranch: testBranches[0],
				}
			)
		).toEqual({
			borrowerDashboardInfo: {
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: true,
				booksSuccessful: false,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_BACK_TO_BRANCH_SELECT', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: true,
						booksSuccessful: false,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_BACK_TO_BRANCH_SELECT }
			)
		).toEqual({
			borrowerDashboardInfo: {
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: false,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: true,
						booksSuccessful: false,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{
					type: BORROWER_DASHBOARD_READ_BOOKS_SUCCESSFUL,
					booksAvailable: testBooks,
				}
			)
		).toEqual({
			borrowerDashboardInfo: {
				books: testBooks,
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: true,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_DASHBOARD_READ_BOOKS_FAILED', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: true,
						booksSuccessful: false,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_DASHBOARD_READ_BOOKS_FAILED }
			)
		).toEqual({
			borrowerDashboardInfo: {
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: false,
				booksFailed: true,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_CHECKOUT_PENDING', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						books: testBooks,
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: false,
						booksSuccessful: true,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_CHECKOUT_PENDING }
			)
		).toEqual({
			borrowerDashboardInfo: {
				books: testBooks,
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: true,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				checkoutPending: true,
				checkoutSuccessful: false,
				checkoutFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_CHECKOUT_FAILURE', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						books: testBooks,
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: false,
						booksSuccessful: true,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_CHECKOUT_FAILURE }
			)
		).toEqual({
			borrowerDashboardInfo: {
				books: testBooks,
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: true,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				checkoutPending: false,
				checkoutSuccessful: false,
				checkoutFailed: true,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_CHECKOUT_SUCCESSFUL', () => {
		const expectedBookListAfterCheckout = testBooks.filter(
			(book) => book.bookId !== 5 //Id of the book in the first loan
		);
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						books: testBooks,
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: false,
						booksSuccessful: true,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_CHECKOUT_SUCCESSFUL, newLoan: testLoans[0] }
			)
		).toEqual({
			borrowerDashboardInfo: {
				books: expectedBookListAfterCheckout,
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				newestLoan: testLoans[0],
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: true,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				checkoutPending: false,
				checkoutSuccessful: true,
				checkoutFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_CLOSE_CHECKOUT_MODAL', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						books: testBooks,
						branches: testBranchesWithBooks,
						isCheckingOut: true,
						isReturning: false,
						newestLoan: testLoans[0],
						selectedBranch: testBranches[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						booksPending: false,
						booksSuccessful: true,
						booksFailed: false,
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						checkoutPending: false,
						checkoutSuccessful: true,
						checkoutFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_CLOSE_CHECKOUT_MODAL }
			)
		).toEqual({
			borrowerDashboardInfo: {
				books: testBooks,
				branches: testBranchesWithBooks,
				isCheckingOut: true,
				isReturning: false,
				newestLoan: null,
				selectedBranch: testBranches[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				booksPending: false,
				booksSuccessful: true,
				booksFailed: false,
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				checkoutPending: false,
				checkoutSuccessful: false,
				checkoutFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_START_RETURN', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: true,
						isReturning: false,
						selectedLoan: testLoans[1],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_START_RETURN }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: true,
				loansSuccessful: false,
				loansFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_READ_ACTIVE_LOANS_FAILED', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: true,
						selectedLoan: null,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loansPending: true,
						loansSuccessful: false,
						loansFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_READ_ACTIVE_LOANS_FAILED }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: false,
				loansSuccessful: false,
				loansFailed: true,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: true,
						selectedLoan: null,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loansPending: true,
						loansSuccessful: false,
						loansFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_READ_ACTIVE_LOANS_SUCCESSFUL, loans: testLoans }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				loans: testLoans,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: false,
				loansSuccessful: true,
				loansFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
			},
		});
	});

	test('BORROWER_RETURN_PENDING', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: true,
						loans: testLoans,
						selectedLoan: null,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loansPending: false,
						loansSuccessful: true,
						loansFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
					},
				},
				{ type: BORROWER_RETURN_PENDING }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				loans: testLoans,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: false,
				loansSuccessful: true,
				loansFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
				returnPending: true,
				returnSuccessful: false,
				returnFailed: false,
			},
		});
	});

	test('BORROWER_RETURN_FAILURE', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: true,
						loans: testLoans,
						selectedLoan: null,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loansPending: false,
						loansSuccessful: true,
						loansFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
						returnPending: true,
						returnSuccessful: false,
						returnFailed: false,
					},
				},
				{ type: BORROWER_RETURN_FAILURE }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				loans: testLoans,
				selectedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: false,
				loansSuccessful: true,
				loansFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
				returnPending: false,
				returnSuccessful: false,
				returnFailed: true,
			},
		});
	});

	test('BORROWER_RETURN_SUCCESSFUL', () => {
		const expectedLoanListAfterReturn = testLoans.filter((loan) => {
			return (
				loan.key.bookId !== testLoans[0].key.bookId ||
				loan.key.branchId !== testLoans[0].key.branchId ||
				loan.key.cardNo !== testLoans[0].key.cardNo
			);
		});
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: true,
						loans: testLoans,
						selectedLoan: null,
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loansPending: false,
						loansSuccessful: true,
						loansFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
						returnPending: true,
						returnSuccessful: false,
						returnFailed: false,
					},
				},
				{ type: BORROWER_RETURN_SUCCESSFUL, loan: testLoans[0] }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				loans: expectedLoanListAfterReturn,
				selectedLoan: null,
				updatedLoan: testLoans[0],
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: false,
				loansSuccessful: true,
				loansFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
				returnPending: false,
				returnSuccessful: true,
				returnFailed: false,
			},
		});
	});

	test('BORROWER_CLOSE_RETURN_MODAL', () => {
		expect(
			borrowerReducer(
				{
					borrowerDashboardInfo: {
						isCheckingOut: false,
						isReturning: true,
						loans: testLoans,
						selectedLoan: null,
						updatedLoan: testLoans[0],
					},
					loggedInBorrower: testBorrower,
					requestInfo: {
						branchesPending: false,
						branchesSuccessful: true,
						branchesFailed: false,
						loansPending: false,
						loansSuccessful: true,
						loansFailed: false,
						loginPending: false,
						loginSuccessful: true,
						loginFailed: false,
						returnPending: false,
						returnSuccessful: true,
						returnFailed: false,
					},
				},
				{ type: BORROWER_CLOSE_RETURN_MODAL }
			)
		).toEqual({
			borrowerDashboardInfo: {
				isCheckingOut: false,
				isReturning: true,
				loans: testLoans,
				selectedLoan: null,
				updatedLoan: null,
			},
			loggedInBorrower: testBorrower,
			requestInfo: {
				branchesPending: false,
				branchesSuccessful: true,
				branchesFailed: false,
				loansPending: false,
				loansSuccessful: true,
				loansFailed: false,
				loginPending: false,
				loginSuccessful: true,
				loginFailed: false,
				returnPending: false,
				returnSuccessful: false,
				returnFailed: false,
			},
		});
	});
});
