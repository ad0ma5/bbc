'use strict';

/* App Module */

/* loading app dependencies */
var recipeApp = angular.module('recipeApp', [
	'ngRoute',
	'ngCookies',
	'recipeAppControllers',
	'bw.paging',
	'recipesServices',
	'loginServices',
	'starServices',
	'registerServices'
]);
/* main routing */
recipeApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginCtrl'
		}).
		when('/register', {
			templateUrl: 'partials/register.html',
			controller: 'registerCtrl'
		}).
		when('/recipes', {
			templateUrl: 'partials/recipe-list.html',
			controller: 'recipeListCtrl'
		}).
		when('/recipes/:recipeId', {
			templateUrl: 'partials/recipe-detail.html',
			controller: 'recipeDetailCtrl'
		}).
		when('/404', {
			templateUrl: 'partials/no-content.html'				
		}).
		otherwise({
			redirectTo: '/recipes'
		});
	}
]);
