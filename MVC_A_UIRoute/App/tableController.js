angular.module('XEdit')
        .controller('tableController', tableController);

function tableController($filter, $http, editableOptions, editableThemes, $q) {
    var vm = this;

    // editable row
    // ----------------------------------- 
    vm.users = [
      { id: 1, name: ' user1', status: 2, group: 4, groupName: 'admin' },
      { id: 2, name: ' user2', status: undefined, group: 3, groupName: 'vip' },
      { id: 3, name: ' user3', status: 2, group: null }
    ];

    vm.statuses = [
      { value: 1, text: 'status1' },
      { value: 2, text: 'status2' },
      { value: 3, text: 'status3' },
      { value: 4, text: 'status4' }
    ];

    vm.groups = [];
    vm.loadGroups = function () {
        return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function (data) {
            vm.groups = data;
        });
    };

    vm.showGroup = function (user) {
        if (user.group && vm.groups.length) {
            var selected = $filter('filter')(vm.groups, { id: user.group });
            return selected.length ? selected[0].text : 'Not set';
        } else {
            return user.groupName || 'Not set';
        }
    };

    vm.showStatus = function (user) {
        var selected = [];
        if (user.status) {
            selected = $filter('filter')(vm.statuses, { value: user.status });
        }
        return selected.length ? selected[0].text : 'Not set';
    };

    vm.checkName = function (data, id) {
        if (id === 2 && data !== '') {
            return 'name 2 should be `Empty`';
        }
    };

    vm.saveUser = function (data, id) {
        angular.extend(data, { id: id });
      
    };

    vm.removeUser = function (index) {
        vm.users.splice(index, 1);
    };

    vm.addUser = function () {
        vm.inserted = {
            id: vm.users.length + 1,
            name: '',
            status: null,
            group: null,
            isNew: true
        };
        vm.users.push(vm.inserted);
    };

    
    vm.saveColumn = function (column) {
        var results = [];
        angular.forEach(vm.users, function (user) {
            alert('Saving column: ' + column);
        });
        return $q.all(results);
    };

   

    vm.filterUser = function (user) {
        return user.isDeleted !== true;
    };
    vm.deleteUser = function (id) {
        var filtered = $filter('filter')(vm.users, { id: id });
        if (filtered.length) {
            filtered[0].isDeleted = true;
        }
    };

    vm.cancel = function () {
        for (var i = vm.users.length; i--;) {
            var user = vm.users[i];
            if (user.isDeleted) {
                delete user.isDeleted;
            }
            if (user.isNew) {
                vm.users.splice(i, 1);
            }
        }
    };

    vm.saveTable = function () {
        var results = [];
        for (var i = vm.users.length; i--;) {
            var user = vm.users[i];
            if (user.isDeleted) {
                vm.users.splice(i, 1);
            }
            // mark as not new 
            if (user.isNew) {
                user.isNew = false;
            }

            alert('Saving Table...');
        }

        return $q.all(results);
    };

}

