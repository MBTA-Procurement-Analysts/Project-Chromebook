(function () {
    angular
	.module('Chrubix')
        .controller('helloController', helloController)

    function helloController(getterService, $routeParams){
	var model = this;
	model.inputParams = $routeParams

	console.log(this.inputParams)
	this.REQJSON = {
	    'Ship_To': model.inputParams['b']
	}
    }
})();
