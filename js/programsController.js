const {dialog} = require('electron').remote;
const nativeImage = require('electron').nativeImage;

indigo.controller('programsController', function ($http, $scope, $resource) {

	var Program = $resource('https://api.teal.cool/programs/:shortname',{shortname:'@shortname'});
	var OrgProgram = $resource('https://api.teal.cool/organizations/wjrh');
	var  Episode = $resource('https://api.teal.cool/episodes/:id', {id:'@id'}, {'save': {method:'POST', params:{shortname:$scope.currentProgram}}});

	$scope.programs = OrgProgram.query();

	$scope.selectProgram = function(program){

		if ($scope.currentProgram != null){
			//if there is already a program selected
			dialog.showErrorBox("Episode in progress", "A program is already selected. Either end or delete the episode at hand to select an other Program.");
			return;
		}
		var choice = dialog.showMessageBox({
			type: "question",
			title: "New Episode",
			message: 'Would you like to create a new episode of ' + program.name + "?",
			buttons: ["Create", "Don't create"]
		});

		if (choice == 0){
				$scope.currentProgram = program;
			}
	}

	$scope.deleteEpisode = function(){
		var choice = dialog.showMessageBox({
			type: "question",
			title: "Delete Episode",
			message: 'Are you sure you would like to delete this episode?',
			buttons: ["Delete", "Don't delete"]
		});

		if (choice == 0){
				$scope.currentProgram = null;
			}
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