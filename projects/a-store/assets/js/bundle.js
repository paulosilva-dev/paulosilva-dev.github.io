angular.module('ordersApp', ['ngRoute','ngAnimate']);
angular.module('ordersApp').config(function($routeProvider){
  $routeProvider
    .when('/',
    {
      controller: 'OrdersListController',
      templateUrl: 'app/views/orders.html'
    })
    .when('/customer/:customerID',
    {
      controller: 'customerController',
      templateUrl: 'app/views/customer.html'
    })
    .when('/product/:productID',
    {
      controller: 'productController',
      templateUrl: 'app/views/product.html'
    })
    .when('/customers/',
    {
      controller: 'customersListController',
      templateUrl: 'app/views/customers.html'
    })
    .when('/products/',
    {
      controller: 'productsListController',
      templateUrl: 'app/views/products.html'
    })
    .when('/new-order/',
    {
      controller: 'newOrderController',
      templateUrl: 'app/views/new-order.html'
    })
    .when('/new-customer/',
    {
      controller: 'newCustomerController',
      templateUrl: 'app/views/new-customer.html'
    })
    .when('/new-product/',
    {
      controller: 'newProductController',
      templateUrl: 'app/views/new-product.html'
    })
    .otherwise(
    {
      redirectTo: '/'
    });
});

(function(){
	//
	//	Orders Factory
	//
	var ordersFactory = function(){

		//
		// Would be replaced with an http request on a live app
		//

		var orders = [
	    { orderNo: 1101, productID: 'A45', quantity: 1, customer: 'C101', date: '23-12-2015', sent: true},
	    { orderNo: 1102, productID: 'A32', quantity: 1, customer: 'C102', date: '22-12-2015', sent: true},
	    { orderNo: 1103, productID: 'B12345', quantity: 2, customer: 'C105', date: '13-12-2015', sent: false},
	    { orderNo: 1104, productID: 'E2315', quantity: 3, customer: 'C102', date: '02-12-2015', sent: false},
	    { orderNo: 1105, productID: 'B12345', quantity: 1, customer: 'C104', date: '10-12-2015', sent: false},
	    { orderNo: 1106, productID: 'B14', quantity: 1, customer: 'C101', date: '11-12-2015', sent: true},
	    { orderNo: 1107, productID: 'A45', quantity: 1, customer: 'C104', date: '14-12-2015', sent: true},
	    { orderNo: 1108, productID: 'B12345', quantity: 1, customer: 'C103', date: '20-12-2015', sent: false},
	    { orderNo: 1109, productID: 'B14', quantity: 1, customer: 'C105', date: '21-12-2015', sent: true},
	    { orderNo: 1110, productID: 'B12345', quantity: 1, customer: 'C102', date: '26-12-2015', sent: false}
	  ];
		var nextOrderNo = 1111;
		var factory = {};
		factory.getOrders = function(){
			return orders;
		};
		factory.getOrder = function(id){
			for (var i = 0; i<orders.length; i++){
				if(orders[i].orderNo === id){
					return orders[i];
				}
			}
			return false;
		};

		factory.getNextOrderNo = function(){
			return nextOrderNo;
		};

		factory.addOrder = function (productID, quantity, customerID) {
			var newOrder = {};
			newOrder.orderNo = nextOrderNo;
			nextOrderNo++;
			newOrder.productID = productID;
			newOrder.quantity = quantity;
			newOrder.customer = customerID;
			var today = new Date();
			newOrder.date = today.getDate() + '-'+  (today.getMonth()+1) + '-' + (today.getYear() + 1900);
			newOrder.sent = false;
			orders.push(newOrder);
		};

		return factory;
	};
	angular.module('ordersApp').factory('ordersFactory', ordersFactory);

	//
	//	customers Factory
	//
	var customersFactory = function(){

		//
		// Would be replaced with an http request on a live app
		//
		var nextID = 106;

		var customers = [
			{id: 'C101', name: 'John Doe', address:'132 South Road, Dublin'},
			{id: 'C102', name: 'Jane Lake', address:'14 Middle Road, Dublin'},
			{id: 'C103', name: 'Anna Bella', address:'15A South Lane, Cork'},
			{id: 'C104', name: 'Rick Smith', address:'30 North Road, Dublin'},
			{id: 'C105', name: 'Jake Mick', address:'13 South Lane, Dublin'}
		];

		var factory={};
		factory.getCustomers = function(){
			return customers;
		};
		factory.getCustomer = function(customerid){
			for (var i = 0; i<customers.length; i++){
				if(customers[i].id === customerid){
					return customers[i];
				}
			}
			return false;
		};
		factory.newCustomer = function(name, address){
			var newCust = {};
			newCust.id = 'C'+nextID;
			nextID++;
			newCust.name = name;
			newCust.address = address;
			customers.push(newCust);
		};
		factory.nextID = function(){
			return 'C'+nextID;
		};
		return factory;
	};
	angular.module('ordersApp').factory('customersFactory', customersFactory);

	//
	//	Products Factory
	//
	var productsFactory = function(){

		//
		// Would be replaced with an http request on a live app
		//

		var products = [
			{id: 'A45', name: 'Clock', stock:4},
			{id: 'A32', name: 'Clock', stock:12},
			{id: 'B12345', name: 'Book', stock:2},
			{id: 'B21435', name: 'Book', stock:24},
			{id: 'E2315', name: 'Tablet', stock:62},
			{id: 'B14', name: 'Phone', stock:42}
		];

		var factory={};
		factory.getProducts = function(){
			return products;
		};
		factory.getProduct = function(productid){
			for (var i = 0; i<products.length; i++){
				if(products[i].id === productid){
					return products[i];
				}
			}
			return false;
		};
		factory.newProduct = function(productID, name, stock){
			var newProd = {};
			newProd.id = productID;
			newProd.name = name;
			newProd.stock = stock;
			products.push(newProd);
		};

		factory.addStock = function(product, units){
			product.stock += units;
		};
		return factory;
	};
	angular.module('ordersApp').factory('productsFactory', productsFactory);



}());

(function(){
  //
  //  Navigation controller
  //
  var navController = function($scope){
    $scope.menuActive = [true, false, false];
    $scope.menu = function(item){
      $scope.menuActive = [false, false, false];
      $scope.menuActive[item]=true;
    };

  };
  navController.$inject =['$scope'];
  angular.module('ordersApp').controller('navController',navController);

  //
  //  Orders list view controller
  //
  var OrdersListController = function($scope, ordersFactory, customersFactory, productsFactory){

    var getProductName = function(id){
      return productsFactory.getProduct(id).name;
    };
    var getCustomerName = function(id){
      return customersFactory.getCustomer(id).name;
    };

    var orders = ordersFactory.getOrders();
    $scope.ordersVM = [];
    for (var i = 0; i<orders.length; i++){
      var order = {};
      for (var key in orders[i]) {
        if (orders[i].hasOwnProperty(key)) {
          order[key] = orders[i][key];
        }
      }
      order.productName = productsFactory.getProduct(order.productID).name;
      order.customerName = customersFactory.getCustomer(order.customer).name;
      $scope.ordersVM.push(order);
    }
    $scope.sendOrder = function(order){
      ordersFactory.getOrder(order.orderNo).sent = true;
      order.sent=true;
    };
  };
  OrdersListController.$inject = ['$scope', 'ordersFactory', 'customersFactory', 'productsFactory'];
  angular.module('ordersApp').controller('OrdersListController',OrdersListController);

  //
  //  Customer view controller
  //

  var customerController = function($scope, $routeParams, customersFactory){
    $scope.customer = customersFactory.getCustomer($routeParams.customerID);
  };
  customerController.$inject = ['$scope', '$routeParams','customersFactory'];
  angular.module('ordersApp').controller('customerController', customerController);


  //
  //  Product view controller
  //

  var productController = function($scope, $routeParams, productsFactory){
    $scope.product = productsFactory.getProduct($routeParams.productID);
    $scope.newStock = 0;
    $scope.warnings = false;
    $scope.success = false;

    $scope.addStock = function(){
      $scope.warnings = [];
      $scope.success = '';
      var valid = true;
      var newStock = $scope.newStock;
      if (isNaN(parseFloat(newStock)) || !isFinite(newStock) || newStock< 1){
        $scope.warnings.push('You must add 1 or more units.');
        valid = false;
      }
      if (valid){
        productsFactory.addStock($scope.product, newStock);
        $scope.success = newStock+' units added to stock.';
        $scope.newStock = 0;
      }
    };
  };
  productController.$inject = ['$scope', '$routeParams','productsFactory'];
  angular.module('ordersApp').controller('productController', productController);

  //
  //  Customers View Controller
  //
  var customersListController = function($scope, customersFactory){
    $scope.customers = customersFactory.getCustomers();
  };
  customersListController.$inject = ['$scope', 'customersFactory'];
  angular.module('ordersApp').controller('customersListController', customersListController);


  //
  //  Products View Controller
  //
  var productsListController = function($scope, productsFactory){
    $scope.products = productsFactory.getProducts();
  };
  productsListController.$inject = ['$scope', 'productsFactory'];
  angular.module('ordersApp').controller('productsListController', productsListController);

  //
  //  New Order controller
  //

  var newOrderController = function($scope, productsFactory, customersFactory, ordersFactory, $location){
    $scope.orderNo = ordersFactory.getNextOrderNo();
    $scope.products = productsFactory.getProducts();
    $scope.customers = customersFactory.getCustomers();
    $scope.productID = '';
    $scope.quantity = 1;
    $scope.customerID = '';
    $scope.warnings = false;
    $scope.addOrder = function(){
      // validating form:
      $scope.warnings = [];
      var valid = true;
      if(!productsFactory.getProduct($scope.productID)){
        $scope.warnings.push('Please select a valid product.');
        valid = false;
      }
      if (isNaN(parseFloat($scope.quantity)) || !isFinite($scope.quantity) || $scope.quantity< 0 || $scope.quantity>20) {
        $scope.warnings.push('Quantity must be between 1 and 20.');
        valid = false;
      } else if(productsFactory.getProduct($scope.productID).stock<$scope.quantity){
        $scope.warnings.push('We don\'t have that much stock. Currently we have '+ productsFactory.getProduct($scope.productID).stock +' units in stock.');
        valid = false;
      }
      if (!customersFactory.getCustomer($scope.customerID)) {
        $scope.warnings.push('Please select a valid Customer.');
        valid = false;
      }
      if(valid) {
        ordersFactory.addOrder($scope.productID, $scope.quantity, $scope.customerID);
        productsFactory.getProduct($scope.productID).stock-=$scope.quantity;
        $location.path('/');
      }
    };
  };
  newOrderController.$inject = ['$scope', 'productsFactory','customersFactory', 'ordersFactory', '$location'];
  angular.module('ordersApp').controller('newOrderController', newOrderController);

  var newCustomerController = function($scope, customersFactory, $location){
    $scope.id = customersFactory.nextID();
    $scope.name = '';
    $scope.address = '';
    $scope.warnings = false;
    $scope.addCustomer = function(){
      $scope.warnings = [];
      var valid = true;
      var name = $scope.name;
      var address = $scope.address;
      if(name === ''){
        valid = false;
        $scope.warnings.push('Please fill in the Customer\'s name.');
      }
      if(address === ''){
        valid = false;
        $scope.warnings.push('Please fill in the Customer\'s address.');
      }
      if(valid){
        customersFactory.newCustomer(name, address);
        $location.path('/customers/');
      }
    };
  };
  newCustomerController.$inject = ['$scope', 'customersFactory', '$location'];
  angular.module('ordersApp').controller('newCustomerController', newCustomerController);

  var newProductController = function($scope, productsFactory, $location){
    $scope.productID = '';
    $scope.name = '';
    $scope.stock = 1;
    $scope.warnings = false;
    $scope.addProduct = function(){
      $scope.warnings = [];
      var valid = true;
      var productID = $scope.productID;
      var name = $scope.name;
      var stock = $scope.stock;
      if(productID === ''){
        valid = false;
        $scope.warnings.push('Please fill in the Product ID.');
      }
      if(productsFactory.getProduct(productID)){
        valid = false;
        $scope.warnings.push('We already have a product with this ID.');
      }
      if(name === ''){
        valid = false;
        $scope.warnings.push('Please fill in the Product name.');
      }
      if (isNaN(parseFloat(stock)) || !isFinite(stock) || stock< 0){
        $scope.warnings.push('Stock must be 0 or higher.');
        valid = false;
      }

      if(valid){
        productsFactory.newProduct(productID, name, stock);
        $location.path('/products/');
      }

    };
  };
  newProductController.$inject = ['$scope','productsFactory', '$location'];
  angular.module('ordersApp').controller('newProductController', newProductController);

}());
