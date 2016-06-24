// declare a module
require('angular');
var indigo = angular.module('indigo', [require('angular-resource')]);



indigo.controller('programsController', function ($http, $scope, $resource) {

	var Program = $resource('https://api.teal.cool/programs/:shortname',
	   {shortname:'@shortname'});

	var OrgProgram = $resource('https://api.teal.cool/organizations/wjrh');

	$scope.programs = OrgProgram.query();

	$scope.setCurrentProgram = function(program){
		$scope.currentProgram = program;
	}

	$scope.getImgurThumbnail = function(image){
		if (image == null){
			//image is null, return a grey image
			return "https://placeholdit.imgix.net/~text?&w=90&h=90";
		}
		else if (image.indexOf("imgur") < 0 ){
			//this is not an imgur image return the original
			return image;
		} else {
			var indexOfDot = image.lastIndexOf(".");
			return image.substring(0, indexOfDot) + "s" + image.substring(indexOfDot);
		}
	}



});