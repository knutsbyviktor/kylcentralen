app.directive("kylcentralenFullScreenElement", ['$log', '$location', '$window', '$timeout', function ($log, $location, $window, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $attr, $elem) {
            var innerHeight = 0;
            
             $scope.$on('$routeChangeSuccess', function () {
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

                        var ngView = angular.element(document.querySelector('#main-content'));
                        
                        var elemHeight = innerHeight - (headerHeight + footerHeight);
//                        alert(elemHeight)
                        if(ngView[0].clientHeight < elemHeight) {
                            ngView.css("height", elemHeight + "px");
                        }
                    }, 100);
                }
            }
        }
    };
}]);
