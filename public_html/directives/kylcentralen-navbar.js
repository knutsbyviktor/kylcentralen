app.directive("kylcentralenNavbar", ['$log', '$location', '$window', function($log, $location, $window) {
    return {
        restrict: 'E',
        templateUrl: "./templates/navbar.html",
        link: function($scope, $attr, $elem) {                            
            $scope.isActive = function (viewLocation) { 
                return viewLocation === $location.path();
            };
            
            $scope._toggleNavigation = function() {
                $scope.navigationOpen = !$scope.navigationOpen;
            };
            
            $scope._navigate = function() {
                if($window.innerWidth <= 768) {
                    $scope.navigationOpen = false;
                }
            };
            
            $scope.validateNavigationState = function() {
                if($window.innerWidth >= 768) {
                    $scope.navigationOpen = true;
                } else {
                    $scope.navigationOpen = false;
                }
            };
            
            angular.element($window).on('resize', function(){
                $scope.$apply(function() {
                    $scope.validateNavigationState();
                });                
            });
            
            $scope.validateNavigationState();
        }
    };
}]);
