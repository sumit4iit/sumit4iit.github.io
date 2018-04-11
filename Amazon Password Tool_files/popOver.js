$(document).ready(function(){
	P.when("A", "a-popover", "ready").execute(function (A, popover) {
	  	var $ = A.$;
	  	$(document).delegate("#popOverLink", "click", function(event){
			popover.get($("#popOverAction")).lock().show();
	        event.preventDefault();          
	  	});	    
	});
});