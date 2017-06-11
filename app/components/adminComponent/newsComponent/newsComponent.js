(function () {
    angular.module('pageModule')
        .component('newsAdmComponent', newsComponentFn());

    function newsComponentFn() {
        return {
            templateUrl: 'components/adminComponent/newsComponent/newsComponent.html',
            controller:  ['newsService', 'newstagsService', '$timeout', '$state', 'FileUploader', newsControllerFn]
        }
    }

    function newsControllerFn(newsService, newstagsService, $timeout, $state, FileUploader) {
        var vm = this;

        vm.messageText = '';
        vm.messageType = '';

        vm.item = {locale: 'RU'};

        vm.uploaderBg = new FileUploader({
            url: '/api/v1/news/background',
            autoUpload: true,
            removeAfterUpload: true
        });

        vm.uploaderBg.onSuccessItem = function (fileItem, response, status, headers) {
            if (response.error) {
                vm.messageType = 'danger';
                vm.messageText = response.error;
                $timeout(function() {
                    vm.messageText = '';
                }, 2000);
            }
            vm.loadElements();
        };

        vm.loadElements = function() {
            newsService.getItems().then(function(response) {
                vm.items = response.data;
                newstagsService.getItems().then(function(response) {
                    vm.tags = response.data;
                    newsService.getTagsLinks().then(function(response) {
                        vm.tagsLinks = response.data;
                        for (var key in vm.items) {
                            vm.items[key].tags = [];
                            for (var tkey in vm.tags) {
                                vm.items[key].tags[tkey] = {tag_template: vm.tags[tkey].tag_template, id: vm.tags[tkey].id, active: 0};
                                for (var lkey in vm.tagsLinks) {
                                    if (vm.tagsLinks[lkey].news_id == vm.items[key].id && vm.tagsLinks[lkey].tag_id == vm.items[key].tags[tkey].id) {
                                        vm.items[key].tags[tkey].active = 1;
                                    }
                                }
                            }
                        }
                        console.log(vm.items);
                    }, function(error) {

                    });
                }, function(error) {

                });

            }, function(error) {

            });

        };

        vm.editItem = function(item) {
            vm.item.news_name = item.news_name;
            vm.item.date = item.date;
            vm.item.locale = item.locale;
            vm.item.news_desc = item.news_desc;
            if (item.id) {
                vm.item.id = item.id;
            }
        };

        vm.saveItem = function() {
            newsService.saveItem(vm.item).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadElements();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.sortItems = function() {
            newsService.sortItems(vm.items).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.changeActive = function(item) {
            newsService.setActive(item).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    vm.loadElements();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.deleteItem = function(id) {
            newsService.deleteItem(id).then(function(response) {
                if (response.data.error) {
                    vm.messageType = 'danger';
                    vm.messageText = 'AdmInvalidOperation';
                } else {
                    vm.messageType = 'success';
                    vm.messageText = 'AdmSuccessOperation';
                    $state.go('app.admin.news');
                    vm.loadElements();
                }
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.changeNewsTags = function(news_id, tag_id, active) {

            newsService.changeTagsLinks(news_id, tag_id, active).then(function(response) {
            }, function(error) {
                vm.messageType = 'danger';
                vm.messageText = 'AdmInvalidOperation';
            });
            $timeout(function() {
                vm.messageText = '';
            }, 2000);
        };

        vm.deleteBackground = function(item) {
            newsService.deleteBackground(item.id).then(function(response) {
                vm.loadElements();
            }, function(error) {

            });
        };

        vm.loadElements();
    }
})();