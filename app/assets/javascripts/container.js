function adjustContainerHeight(){

    var min_height = $(window).height() - 
    	               $(".footer").outerHeight() - 
    	               $(".navigation_logo").outerHeight();
    
    if (min_height)
    	$("#container").css('minHeight', min_height+"px");
}


$(document).on('page:change',function() {
    adjustContainerHeight();      
});


$(window).load(function() {
   adjustContainerHeight();      
});


$(window).resize(function () {
   adjustContainerHeight();   
});