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
chrome.storage.onChanged.addListener(function(changes) {
	for (key in changes) {
		switch (key) {
			case 'setHours_turnOn':
				turnOn = changes[key].newValue;
			case 'setHours_turnOff':
				turnOff = changes[key].newValue;
		}
	}
});

function toggleNightMode() {
	document.getElementsByClassName('nightmode-toggle')[0].click();
}

function checkTime() {
	console.log(turnOn, turnOff);
	var time = moment();
	var current = Object.values(document.getElementsByClassName('js-nightmode-icon')[0].classList).indexOf('Icon--crescentFilled');
	moment_turnOn = moment(turnOn, 'HH:mm').set({'y': time.get('y'), 'M': time.get('M'), 'D': time.get('D')});
	moment_turnOff = moment(turnOff, 'HH:mm').set({'y': time.get('y'), 'M': time.get('M'), 'D': time.get('D')});

	if (time.isBetween(moment_turnOn, moment_turnOff, 'hour', '[]')) {
		if (current == -1)
			toggleNightMode();
	} else {
		if (current > -1)
			toggleNightMode();
	}
}
