var snackbarContainer = document.querySelector('#snackbar');
var saveButton = document.querySelector('#saveButton');

function saveOptions() {
	var setHours_turnOn = document.querySelector('#setHours-turnOn').value;
	var setHours_turnOff = document.querySelector('#setHours-turnOff').value;

	chrome.storage.sync.set({
		setHours_turnOn: setHours_turnOn,
		setHours_turnOff: setHours_turnOff
	}, function() {
		var data = {
			message: chrome.i18n.getMessage('optionsSavedMessage'),
			timeout: 2000
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		setHours_turnOn: '19:30',
		setHours_turnOff: '07:30'
	}, function(items) {
		document.querySelector('#setHours-turnOn').value = items.setHours_turnOn;
		document.querySelector('#setHours-turnOff').value = items.setHours_turnOff;
	})
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#saveButton').addEventListener('click', saveOptions);
