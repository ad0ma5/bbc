'use strict';

/* Controllers  */

/* controllers module */
var recipeAppControllers = angular.module('recipeAppControllers', []);

/****************** main recipe list controller ************/
recipeAppControllers.controller('recipeListCtrl', ['$scope','$cookies', '$location', 'Recipe','Star','Login', 
	function($scope,$cookies, $location, Recipe, Star,Login) {
		// init view default data
		$scope.orderProp = 'age';
		$scope.limit = "10";
		$scope.currentPage = 1;
		$scope.selectStared = 'all';
		
		// loading recipe data
		$scope.recipes = Recipe.query();		// load from service
		$scope.recipes_backup = $scope.recipes;	// save backup to be able to load back after star filtering
		//console.log('data got',$scope.recipes);
		
		//user resolution
		var current_user = {"username":'n',"password":'n'};	// init user if no data available
		var user_data = $cookies.get('user');				// try loading user data from cookies
		var loaded_user ='';								// to parse cookies data if present
		if(user_data)
			loaded_user = JSON.parse(user_data);
		if(loaded_user.username)
			current_user = loaded_user;
		//console.log('cookies',current_user);
		var user = {};
		user.login = current_user.username;
		user.pass = current_user.password;
		$scope.status = Login.query(user);					// confirm user data at service
		//console.log('Login data got',$scope.status,$scope.status.msg);
		
		//starred recipes
		$scope.stars = Star.query({"login":current_user.username});	// load from service
		
		/*********** starAction *********/
		/* to star/unstar recipe */
		$scope.starAction = function(id){
			//console.log('starAction trigered',id); 
			if($scope.stars[id] == 1)		// if recipe has star
				$scope.stars = Star.unstar({"recipeId":id,"login":$scope.status.username});
			else
				$scope.stars = Star.star({"recipeId":id,"login":$scope.status.username});
		};
		
		/*********** logoutAction *********/
		$scope.logoutAction = function(){
			//console.log('logoutAction trigered'); 
			// clean all user data
			$cookies.remove('user');
			$cookies.put('user','');
			$scope.status = {};
			$scope.status.msg = "logged out";		
			$scope.orderProp = 'age';
			$scope.limit = "3";
			$scope.currentPage = 1;
			$scope.selectStared = 'all';
			$scope.recipes = $scope.recipes_backup;
			$scope.query = "";
		};
		$scope.changePage = function(param, page){
			console.log('changePage trigered',param,page); 
			$scope.currentPage = page;
			
			
		};
		
		/*********** filterStarsAction *********/
		$scope.filterStarsAction = function(selectStared){
			if(selectStared === 'all'){					// if show all
				$scope.recipes = $scope.recipes_backup;	// load from backup
			}else{
				$scope.recipes_backup = $scope.recipes;	// backup before filtering just in case
				var filtered_recipes = [];
				for (var i = 0; i < $scope.recipes.length; i++){
					if($scope.stars[$scope.recipes[i].id] === "1")	// if recipe is in the starred list and marked as starred
						filtered_recipes.push($scope.recipes[i]);	// select recipe to starred list
				}			
				$scope.recipes = filtered_recipes;		// return filtered recipes
			}
			//console.log('filterStarsAction trigered',filtered_recipes);
		};	
	}
]);

/****************** recipe detail controller ************/
recipeAppControllers.controller('recipeDetailCtrl', ['$scope', '$routeParams', 'Recipe', 
	function($scope, $routeParams, Recipe) {
		var data = Recipe.query({recipeId: $routeParams.recipeId});  
		$scope.recipe = data;
	}
]);

/************** loginCtrl **********/
recipeAppControllers.controller('loginCtrl', ['$scope',  '$routeParams', 'Login', '$location',
	function($scope, $routeParams, Login, $location) {
		$scope.status = '';
		/*********** loginAction **********/
		$scope.loginAction = function(){
			var user = {};
			user.login = $scope.user.login;
			user.pass = $scope.user.pass;
			$scope.status = Login.query(user);
			//console.log('loginCtrl trigered',$scope.status); 
		};	
	}
]);

/************** registerCtrl ******************/
recipeAppControllers.controller('registerCtrl', ['$scope',  '$routeParams', 'Login', 'Register', '$location',
	function($scope, $routeParams, Login, Register, $location) {
		$scope.status = '';
		/*********** registerAction **********/
		$scope.registerAction = function(){
			var user = {};
			user.login = $scope.user.login;
			user.pass = $scope.user.pass;
			user.name = $scope.user.name;			
			$scope.status = Register.query(user);
			//console.log('registerAction trigered',$scope.status);
		};
		//console.log('registerCtrl trigered');
	}
]);
