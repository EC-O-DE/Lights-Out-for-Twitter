window.mdc.autoInit();
const MDCSnackbar = mdc.snackbar.MDCSnackbar;
const MDCSnackbarFoundation = mdc.snackbar.MDCSnackbarFoundation;
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const dataObj = {
	message: chrome.i18n.getMessage('optionsSavedMessage'),
};

var snackbarContainer = document.querySelector('#snackbar');
var saveButton = document.querySelector('#saveButton');

function saveOptions() {
	var setHours_turnOn = document.querySelector('#static-turnOn').value;
	var setHours_turnOff = document.querySelector('#static-turnOff').value;

	chrome.storage.sync.set({
		setHours_turnOn: setHours_turnOn,
		setHours_turnOff: setHours_turnOff
	}, function() {
		snackbar.show(dataObj);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		setHours_turnOn: '19:30',
		setHours_turnOff: '07:30'
	}, function(items) {
		document.querySelector('#static-turnOn').value = items.setHours_turnOn;
		document.querySelector('#static-turnOff').value = items.setHours_turnOff;
	})
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#saveButton').addEventListener('click', saveOptions);
