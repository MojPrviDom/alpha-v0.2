var load_navbar = function(){
	$("#nav").ferroMenu({
        position    : "left-top",
        delay       : 50,
        rotation    : 360,
        margin      : 20,
        drag		: false,
        opened		: true
    });	
}

$(document).ready(load_navbar);
$(document).on('page:load', load_navbar);
