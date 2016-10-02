/**
 *
 */

"use strict";
window.CodeCafe = window.CodeCafe || angular.module("CodeCafe", []);

CodeCafe.controller("FetchController", ['$http', 'dbService',
function($http, dbService) {

	var self = this;
	self.fetchSubmissionForPage = function(page) {

		console.debug("Fetching Submission for page" + page);

		var searchRequest = {
			url : CodeCafe.API_URL,
			method : 'GET',
			timeout : 10000,
			params : {
				'type' : 'json',
				'query' : 'list_submissions',
				'page' : page
			}
		};

		self.searchCompleted = false;
		$http(searchRequest).then(function(data) {
			console.debug("Fetching Submission for page" + page+ "sucessful");
			self.processSubmissionList(data.data);
		}, function(a, b, c) {
			self.searchCompleted = true;
			console.error("Error occured when fetching Submission page" + page);
		});
	};

	self.processSubmissionList = function(data) {

		if (data && data.websites) {
			self.searchCompleted = true;
			self.submissionList = data.websites;
			
			self.submissionList.forEach(function(submission) {
				dbService.storeSubmission(submission);
			});
			
			

		} else {
			console.error("Data recieved in incorrect format");
		}

	};
	
	
	self.fetchSubmissionList = function() {
		//self.currentPage = 1;
		for(var i=1; i < 57 ; i++) {
			self.fetchSubmissionForPage(i);
		}
	};
	
	self.fetchSubmissionList();

}]);
