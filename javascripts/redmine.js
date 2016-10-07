var app = angular.module('redmineApp', []).filter('getAge', function() {
    return function(input) {
        input =   moment(input, "YYYY-MM-DD").locale('pt').fromNow();
        return input;
    };
});
app.
  filter('renderHTML', function($sce) {
    return function(text) {
      return  $sce.trustAsHtml(text);
    };
  }
);
app.controller('redmineCtrl', function($http) {
    var redmine = this;
	$http.get('http://redmine.totvs.sa/projects.json?limit=100&key=6238e68b435b359330c88115a0339f0d03142f61&status=1').
    success(function(data) {
        redmine.projetos = data.projects;
		angular.forEach(redmine.projetos, function(projeto) {
        $http.get('http://redmine.totvs.sa/projects/'+projeto.identifier+'/issues.json?limit=100&key=6238e68b435b359330c88115a0339f0d03142f61&status_id=open').
		 success(function(data) {
			 var issues = [] ;
			 angular.forEach(data.issues, function(issue) {
				 if(issue.due_date!=null
				 &&getAtrasado(issue.due_date))
				 {
					issues.push(issue);
				 }
							                              });
			redmine.projetos[projeto.identifier] = issues;
				});
		 
					});
		
						});
	
	function getAtrasado(input) {
        return moment(input, "YYYY-MM-DD").locale('pt').isBefore(moment());
    }
	
  });
  
  app.controller('redmineCtrl2', function($http) {
    var redmine = this;
	$http.get('http://redmine2.totvs.sa/projects.json?limit=100&key=96f218cb4296ea18b2f9f7289debe8dc2d13875b&status=1').
    success(function(data) {
        redmine.projetos = data.projects;
		angular.forEach(redmine.projetos, function(projeto) {
        $http.get('http://redmine2.totvs.sa/projects/'+projeto.identifier+'/issues.json?limit=100&key=96f218cb4296ea18b2f9f7289debe8dc2d13875b&status_id=open').
		 success(function(data) {
			 var issues = [] ;
			 angular.forEach(data.issues, function(issue) {
				 if(issue.due_date!=null
				 &&getAtrasado(issue.due_date))
				 {
					issues.push(issue);
				 }
							                              });
			redmine.projetos[projeto.identifier] = issues;
				});
		 
					});
		
						});
	
	function getAtrasado(input) {
        return moment(input, "YYYY-MM-DD").locale('pt').isBefore(moment());
    }

   });
