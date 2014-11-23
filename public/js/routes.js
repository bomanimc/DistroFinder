var distroModule = angular.module('distrofinder', ['ngRoute',]);

distroModule.config(function($routeProvider){
	$routeProvider.
		when('/', 
            {templateUrl:'partials/home.html', controller: homeControl}).
		when('/search', 
            {templateUrl:'partials/search.html', controller: searchControl}).
		otherwise({redirectTo: '/'});
});

