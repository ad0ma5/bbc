'use strict';

/* Service Module */

/************ Recipe service *******************/
var recipesServices = angular.module('recipesServices', ['ngResource']);

recipesServices.factory('Recipe', ['$resource',
	function($resource){
		//console.log('Recipe service trigered',$resource);	  
		return $resource('Recipe/:recipeId.json', {}, {
			query: {method:'GET', params:{recipeId:'recipes'}, isArray:true}
		});
	}
]);
  
/************ Login service *******************/
var loginServices = angular.module('loginServices', ['ngResource', 'ngCookies']);

loginServices.factory('Login', ['$resource','$cookies',
	function($resource, $cookies){
		//console.log('Login service trigered',$resource);	  
		return $resource('../login/:login/:pass/', {}, {
			query: {method:'GET'}
		});
	}
]);

/************ Register service *******************/
var registerServices = angular.module('registerServices', ['ngResource', 'ngCookies']);

registerServices.factory('Register', ['$resource','$cookies',
	function($resource, $cookies){
		console.log('register service trigered',$resource);	  
		return $resource('../register/:login/:pass/:name', {}, {
			query: {method:'GET'}
		});
	}
]);

/************ Star service *******************/
var starServices = angular.module('starServices', ['ngResource']);

starServices.factory('Star', ['$resource',
	function($resource){
		//console.log('Star service trigered',$resource);	  
		return $resource('../star/:recipeId/:action/:login', {}, {
			query:  {method:'GET'},
			unstar: {method:'GET', params:{action:'del'}},
			star:  {method:'GET', params:{action:'add'}}
		});
	}
]);
  
 
