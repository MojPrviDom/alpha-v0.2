$(document).on('page:change',function() {	
	$(".navigation_logo").on('click', function() {	// Big screen navigation bar toogle
		$(".navigation_box").slideToggle( "fast", function() { // When clicked navigation bar slides down or up
			// Animation complete. 
			recalibrate_margins();
		});
	});

	var menu = $('nav ul');						// Small screen navigation bar toogle
	$('#pull').on('click', function() {
		menu.slideToggle('fast');				// When clicked, small navigation bar slides down
	});
});


