var turnOn = '';
var turnOff = '';
chrome.storage.sync.get({
	setHours_turnOn: '19:30',
	setHours_turnOff: '07:30'
}, function(items) {
	turnOn = items.setHours_turnOn;
	turnOff = items.setHours_turnOff;
	checkTime();
	setInterval(checkTime, 2 * 60 * 1000);
});
// chrome.storage.onChanged.addListener(function(changes, areaName) {
// 	turnOn = changes.
// });

function toggleNightMode() {
	document.getElementsByClassName('nightmode-toggle')[0].click();
}

function checkTime() {
	var time = moment();
	var current = Object.values(document.getElementsByClassName('js-nightmode-icon')[0].classList).indexOf('Icon--crescentFilled');
	moment_turnOn = moment(turnOn, 'HH:mm').set({'y': time.get('y'), 'M': time.get('M'), 'D': time.get('D')});
	moment_turnOff = moment(turnOff, 'HH:mm').set({'y': time.get('y'), 'M': time.get('M'), 'D': time.get('D')});

	if (time.isBetween(moment_turnOn, moment_turnOff, 'hour', '[]')) {
		console.log(1);
		if (current == -1) {
			toggleNightMode();
		}
	} else {
		console.log(2);
		if (current > -1) {
			toggleNightMode();
		}
	}
}
