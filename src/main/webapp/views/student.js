define([ 'app', 'jquery', 'underscore', 'backbone', 'Handlebars', 'flot',
		'text!templates/student.template', 'text!templates/graph.template',
		'text!templates/timer.template', '../timer', '../flotGraph',
		'flotTime', 'bootstrap' ], function(App, $, _, Backbone, Handlebars,
		flot, studentTemplate, graphTemplate, timerTemplate) {

	_studentTemplate = Handlebars.compile(studentTemplate);
	_graphTemplate = Handlebars.compile(graphTemplate);
	_timerTemplate = Handlebars.compile(timerTemplate);

	var marketYear = 0;
	var marketInterval;
	var clientId;

	var StudentView = Backbone.View.extend({
		el : $('#loginModal'),
		render : function(email) {
			$('#loginModal').html(_studentTemplate({
				email : email
			}));
			$('#graph').html(_graphTemplate());
			
			var clientData = "email=" + email;
			var ajax = $.ajax({
				type : "GET",
				url : "http://localhost:8080/client",
				data: clientData,
				dataType : "html",
				success : function(data) {
					if(data) clientId = data;
				}
			});
			
			//took out flot chart for now
			
			// make get requests to the server until Market is opened
			if (marketYear == 0) marketInterval = setInterval(checkMarketState, 900);
			
			$('#marketBuyBtn').on("click", function(event) {
				event.preventDefault();
				var data = {};
				data["orderType"] = 1;
				data["amount"] = $('#size').val();
				data["price"] = -1;
				data["time"] = new Date().getTime();
				data["fulfilled"] = 0;
				// status 0 -> OK, 10 -> cancelled
				data["status"] = 0;
				data["client"] = clientId;
				
				var ajax = $.ajax({
					type : "POST",
					url : "http://localhost:8080/order",
					data : JSON.stringify(data),
					dataType : "json",
					success : function(data) {
						console.log(data);
					}
				});
			});
			
			
		}
	});

	function checkMarketState() {
		var ajax = $.ajax({
			type : "GET",
			url : "http://localhost:8080/admin",
			dataType : "json",
			success : function(data) {
				if (data["year"] > 0){
					marketYear = data["year"];
					clearInterval(marketInterval);
					timer(data["duration"], '#studentTimer');
				}
			}
		});
	}

	return StudentView;

});
