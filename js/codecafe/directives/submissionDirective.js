/**
 * @author ajitesh
 */

window.CodeCafe = window.CodeCafe || angular.module("CodeCafe", []);

CodeCafe.directive("submission", function() {
    return {
        templateUrl : "templates/submission.html"
    };
});

