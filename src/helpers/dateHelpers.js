export const parseMonth = (string) => {
	var num = parseInt(string);
	switch (num) {
		case 1:
			return 'January';
		case 2:
			return 'February';
		case 3:
			return 'March';
		case 4:
			return 'April';
		case 5:
			return 'May';
		case 6:
			return 'June';
		case 7:
			return 'July';
		case 8:
			return 'August';
		case 9:
			return 'September';
		case 10:
			return 'October';
		case 11:
			return 'November';
		case 12:
			return 'December';
		default:
			return 'ERROR';
	}
};
export const formatDate = (obj) => {
	const concat = (accumulator, currentValue) => accumulator + currentValue;
	//2020-09-14T04:00:00Z
	let array = Array.from(obj);
	//09-14-2020 : 04:00AM
	var am = true;
	if (array.slice(11, 13).reduce(concat) < 12) {
		am = true;
	} else {
		am = false;
	}
	var time = '';
	// Parse hours depending on AM or PM
	if (array.slice(11, 13).reduce(concat) > 12) {
		time =
			array.slice(11, 13).reduce(concat) -
			12 +
			array.slice(13, 16).reduce(concat) +
			(am ? 'AM' : 'PM');
	} else {
		time =
			parseInt(array.slice(11, 13).reduce(concat)) +
			array.slice(13, 16).reduce(concat) +
			(am ? 'AM' : 'PM');
	}
	// Parse Months
	var month = parseMonth(array.slice(5, 7).reduce(concat));
	return (
		month +
		' ' +
		parseInt(array.slice(8, 10).reduce(concat)) +
		', ' +
		array.slice(0, 4).reduce(concat) +
		' ' +
		time
	);
};
