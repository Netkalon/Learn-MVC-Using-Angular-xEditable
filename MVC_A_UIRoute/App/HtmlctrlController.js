angular.module('XEdit')
        .controller('htmlctrlController', htmlctrlController);

function htmlctrlController($scope, editableOptions, editableThemes, $filter, $http) {
    var vm = this;

    editableOptions.theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-success"><span class="fa fa-check"></span></button>';
    editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">' +
                                     '<span class="fa fa-times text-muted"></span>' +
                                   '</button>';


    vm.htmlctrl = {
        email: 'email@example.com',
        tel: '123-45-67',
        number: 29,
        range: 10,
        url: 'http://example.com',
        search: 'blabla',
        date:new Date(),
        color: '#6a4415',
        desc: 'Click and edit the details. '
    };

    vm.htmlctrl2 = {
        status: 2
    };

    vm.statuses = [
      { value: 1, text: 'status1' },
      { value: 2, text: 'status2' },
      { value: 3, text: 'status3' },
      { value: 4, text: 'status4' }
    ];

    vm.showStatus = function () {
        var selected = $filter('filter')(vm.statuses, { value: vm.htmlctrl2.status });
        return (vm.htmlctrl.status && selected.length) ? selected[0].text : 'Not set';
    };

    // select remote
    // ----------------------------------- 

    vm.htmlctrl3 = {
        id: 4,
        text: 'admin' 
    };

    vm.groups = [];

    vm.loadGroups = function () {
        return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function (data) {
            vm.groups = data;
        });
    };

    $scope.$watch('htmlctrl3.id', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            var selected = $filter('filter')(vm.groups, { id: vm.htmlctrl3.id });
            vm.htmlctrl3.text = selected.length ? selected[0].text : null;
        }
    });


}

