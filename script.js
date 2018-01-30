'use strict';

let turnOn = '';
let turnOff = '';
chrome.storage.sync.get({
	setHours_turnOn: '19:30',
	setHours_turnOff: '07:30'
}, function(items) {
	turnOn = items.setHours_turnOn;
	turnOff = items.setHours_turnOff;
	checkTime();
	setInterval(checkTime, 1 * 60 * 1000);
});
chrome.storage.onChanged.addListener(function(changes) {
	for (let key in changes) {
		switch (key) {
			case 'setHours_turnOn':
				turnOn = changes[key].newValue;
				break;
			case 'setHours_turnOff':
				turnOff = changes[key].newValue;
				break;
		}
	}
});

const nightMode = {
	get() {
		return (Cookies.get('night_mode') == undefined ? false : true);
	},
	set(opts) {
		switch(opts) {
			case 'on': {
				Cookies.set('night_mode', 1, {domain: '.twitter.com'});
				break;
			}
			case 'off': {
				Cookies.remove('night_mode', {domain: '.twitter.com'});
				break;
			}
		}
	}
}

function checkTime() {
	let time = moment();
	let moment_turnOn = moment(turnOn, 'HH:mm').set({'y': time.get('y'), 'M': time.get('M'), 'D': time.get('D')});;
	let moment_turnOff = moment(turnOff, 'HH:mm').set({'y': time.get('y'), 'M': time.get('M'), 'D': time.get('D')});;

	if (time.isBetween(moment_turnOn, moment(moment_turnOn).endOf('day')) || time.isBetween(moment(moment_turnOff).startOf('day'), moment_turnOff)) {
		if (!nightMode.get()) nightMode.set('on');
	} else {
		if (nightMode.get()) nightMode.set('off');
	}
}
