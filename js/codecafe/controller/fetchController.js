/**
 *
 */

"use strict";
window.CodeCafe = window.CodeCafe || angular.module("CodeCafe", []);

CodeCafe.controller("FetchController", ['$http',
function($http) {

	var self = this;
	self.fetchSubmissionList = function() {

		console.debug("Fetching website list");
		
		var searchRequest = {
			url:CodeCafe.API_URL,
			method: 'GET',
			timeout : 10000,
			params : {
				'type' : 'json',
				'query' : 'list_submissions',
				'page': 2
			}
		};
		
		self.searchCompleted = false;
		$http(searchRequest).then(function(data) {
			self.processSubmissionList(data.data);
		},function(a, b, c) {
			self.searchCompleted = true;
			console.error("Error occured when fetching website list", a, b, c);
		});
	};

	self.processSubmissionList = function(data) {

		console.debug("Website list loaded successfully");
		if (data && data.websites) {
			self.searchCompleted = true;
			self.submissionList = data.websites;

		} else {
			console.error("Data recieved in incorrect format");
		}

	};

	self.fetchSubmissionList();

}]); 