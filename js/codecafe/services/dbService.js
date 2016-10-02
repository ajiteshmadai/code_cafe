/**
 * @author ajitesh
 */

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
	window.alert("Your browser doesn't support a stable version of IndexedDB.");
} else {

	window.CodeCafe = window.CodeCafe || angular.module("CodeCafe", []);
	window.CodeCafe.factory("dbService", [
	function() {
		var self = this;
		self.db = null;
		
		self.openSubmissionDb = function() {

			var request = window.indexedDB.open("submissionDatabase",4);

			request.onerror = function(event) {
				console.error("error: open database failed");
			};

			request.onsuccess = function(event) {
				self.db = request.result;
				console.debug("success: in open database " + self.db);
			};

			request.onupgradeneeded = function(event) {
				self.db = event.target.result;
				var objectStore = self.db.createObjectStore("submission", {
					keyPath : "id"
				});

				/*
				for (var i in employeeData) {
									objectStore.add(employeeData[i]);
								}*/
				
			};
		};

		self.storeSubmission = function(submission) {

			var transaction = self.db.transaction(["submission"], "readwrite");
			var objectStore = transaction.objectStore("submission");
			var request = objectStore.add(submission);

			request.onsuccess = function(event) {
				console.debug("submission " + submission.id + "has been added to database.");
			};

			request.onerror = function(event) {
				console.error("Unable to add " + submission.id + "reason: " + event.target.error.name + ' ' + event.target.error.message );
			};
		};

		self.readSubmission = function() {

			var request = self.db.transaction([self.SUBMISSION_OBJECT], "readonly").objectStore(self.SUBMISSION_OBJECT).get("00-03");

			request.onerror = function(event) {
				alert("Unable to retrieve daa from database!");
			};

			request.onsuccess = function(event) {
				// Do something with the request.result!
				if (request.result) {
					alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
				} else {
					alert("Kenny couldn't be found in your database!");
				}
			};
		};

		self.openSubmissionDb();

		return self;
	}]);
}

/*

 request.onupgradeneeded = function(event) {
 var db = event.target.result;
 var objectStore = db.createObjectStore("employee", {
 keyPath : "id"
 });

 for (var i in employeeData) {
 objectStore.add(employeeData[i]);
 }
 };
 */

function read() {
	var transaction = db.transaction(["employee"]);
	var objectStore = transaction.objectStore("employee");
	var request = objectStore.get("00-03");

	request.onerror = function(event) {
		alert("Unable to retrieve daa from database!");
	};

	request.onsuccess = function(event) {
		// Do something with the request.result!
		if (request.result) {
			alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
		} else {
			alert("Kenny couldn't be found in your database!");
		}
	};
}

function readAll() {
	var objectStore = db.transaction("employee").objectStore("employee");

	objectStore.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;

		if (cursor) {
			alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
			cursor.continue();
		} else {
			alert("No more entries!");
		}
	};
}

function add() {
	var request = db.transaction(["employee"], "readwrite").objectStore("employee").add({
		id : "00-03",
		name : "Kenny",
		age : 19,
		email : "kenny@planet.org"
	});

	request.onsuccess = function(event) {
		alert("Kenny has been added to your database.");
	};

	request.onerror = function(event) {
		alert("Unable to add data\r\nKenny is aready exist in your database! ");
	}
}

function remove() {
	var request = db.transaction(["employee"], "readwrite").objectStore("employee").delete("00-03");

	request.onsuccess = function(event) {
		alert("Kenny's entry has been removed from your database.");
	};
}
