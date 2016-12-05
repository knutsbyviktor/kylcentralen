app.directive("kylcentralenFullScreenElement", ['$log', '$location', '$window', '$timeout', function ($log, $location, $window, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $attr, $elem) {
            var innerHeight = 0, foo;
            
             $scope.$on('$routeChangeSuccess', function () {
                 $timeout(function() {
                    
                 }, 500);
                 
                 resizeElem(); 
             });
            
            angular.element($window).on('resize', function(){
                $scope.$apply(function() {
                    resizeElem();
                });                
            });
            
            angular.element(document).ready(function () {
                resizeElem();
            });
            
            $scope.$watch(function () {
                return $window.innerHeight;
            }, function (value) {
                innerHeight = value;
                resizeElem();
            });
            
            function resizeElem(){
                if($window.innerWidth >= 768) {
                    $timeout(function () {
                        var headerHeight = angular.element(document).find("header")[0].clientHeight;
                        var footerHeight = angular.element(document).find("footer")[0].clientHeight;

//                        console.log(innerHeight + " - " + "(" + headerHeight + " + " + footerHeight + ")");

                        var ngView = angular.element(document.querySelector('#ng-view'));
                        
                        var elemHeight = innerHeight - (headerHeight + footerHeight + 3);///+3 is the last divider
//                        alert(elemHeight)
                        console.log(ngView[0].clientHeight)
                        console.log("elemHeight: " + elemHeight)
                        if(ngView[0].clientHeight < elemHeight) {
                            ngView.css("height", elemHeight + "px");
                        }
                    }, 300);
                } else {
                    $timeout(function () {
                        var ngView = angular.element(document.querySelector('#ng-view'));
                        ngView.css('height', null);
                    }, 100);
                }
            }
        }
    };
}]);
