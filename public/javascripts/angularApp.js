const app = angular.module('flapperNews', ['ui.router']);
import router from '../routes/index'

app.factory('posts', [function(){
    const o = {
        posts: router.get('/posts')
    };
    return o;
}]);

app.controller('MainCtrl', 
    ['$scope', 'posts', function($scope, posts) {
        $scope.test = 'Hello world!';
        $scope.posts = posts.posts;
        $scope.addPost = function() {
            if (!$scope.title || $scope.title === '') { return; }
            $scope.posts.push({
                title: $scope.title, 
                link: $scope.link, 
                upvotes: 1000,
                comments: []
                });
            $scope.title = "";
            $scope.link = "";
          };
        $scope.upVote = function(post) {
            post.upvotes += 1
        }
    }]
);

app.controller('PostsCtrl',
    ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
        $scope.post = posts.posts[$stateParams.id];
        $scope.addComment = function(){
            if($scope.body === '') { return; }
            $scope.post.comments.push({
              body: $scope.body,
              author: 'user',
              upvotes: 0
            });
            $scope.body = '';
          };
        $scope.upVote = function(comment) {
            comment.upvotes += 1
        }
    }]
);

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
    
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
        })
        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });
    
      $urlRouterProvider.otherwise('home');
    }
]);