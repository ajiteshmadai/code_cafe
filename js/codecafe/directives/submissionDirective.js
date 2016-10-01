/**
 * @author ajitesh
 */

window.CodeCafe = window.CodeCafe || angular.module("CodeCafe", []);

CodeCafe.directive("submission", function() {
    return {
        template : "templates/submission.html"
    };
});

