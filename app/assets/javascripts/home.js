var activeSlideNo = 0;    // keep track of the current slide nb
var lastSlideNo = 0;      // number of slides
var fg_slides = ["txt", "steve", "ppl", "job", "kitchen", "none", "hart"];

function slide(direction){
    if ($('.holder').is(':animated'))  return;            //do not animate it an animation is already in motion

    if ( direction > 0 && activeSlideNo == 0 ) return;    //do not animate backwards if at beginning
    if ( direction < 0 && activeSlideNo == lastSlideNo) return;    //do not animate forward if at the end     
    
    (direction > 0) ? slide_left() : slide_right();
}


function slide_left(){
    activeSlideNo -= 1;                         //keep track of the current slide nb
    animateLeft( $("#fg_holder, #txt_holder" ), showText );
    
    if (fg_slides[activeSlideNo] == "txt"){
        animateLeft( $("#middle_holder" ), null);
        animateLeft( $("#fg_holder, #txt_holder" ),showText);
    }
    else if (fg_slides[activeSlideNo] == "none"){
        animateLeft(  $("#bckg_holder" ), null );
    }
}

function slide_right(){
    activeSlideNo += 1;                         //keep track of the current slide nb
    if (fg_slides[activeSlideNo] == "steve"){
        animateRight( $("#middle_holder" ), null);
        animateRight( $("#fg_holder, #txt_holder" ), showText);
    }
    else if (fg_slides[activeSlideNo] == "kitchen"){
        $('#fg_kitchen').css('visibility', 'hidden');
        animateRight( $("#fg_holder, #txt_holder" ), animateKitchenCustom);
    }
    else if (fg_slides[activeSlideNo] == "hart"){
        animateRight( $("#bckg_holder" ), null);
        animateRight( $("#fg_holder, #txt_holder" ), showText);
    }
    else {
        animateRight( $("#fg_holder, #txt_holder" ), showText);
    }
}


function animateLeft(holders, callbackFun){
    hideNextText();
    holders.stop().animate(             //animate!
            {'margin-left': "+=" + $('.slide').width()}, 2000, function(){
                if (typeof callbackFun == 'function')
                    callbackFun();
    });
}

function animateRight(holders, callbackFun){
    hidePreviousText();
    holders.stop().animate(             //animate!
            {'margin-left': "-=" + $('.slide').width()}, 2000, function(){
                if (typeof callbackFun == 'function')
                    callbackFun();
    });
}

function showText(){
     $('#txt_'+fg_slides[activeSlideNo]).animate({opacity: 1.0}, 1000);
}

function hidePreviousText(){
    $('#txt_'+fg_slides[activeSlideNo-1]).stop().animate({opacity: 0.0}, 500);
}
function hideNextText(){
    $('#txt_'+fg_slides[activeSlideNo+1]).stop().animate({opacity: 0.0}, 500);
}

function animateKitchenCustom(holders, callbackFun){
    $("#fg_holder, #txt_holder").stop().animate(             //animate!
        {'margin-left': "-=" + 0.3*  $('.slide').width()}, 10, function(){
         $('#fg_kitchen').css('visibility', 'visible');
        
         $("#fg_holder, #txt_holder").stop().animate(
             { marginLeft : -1 * activeSlideNo * $('.slide').width() +"px"},1000, function(){
                showText();
        });
    });
}


function recalibrate_margins(){
    $('.shower').stop().animate({
            height: $(window).height() - $('.shower').offset().top +"px"},
            function() { // Animation complete. 
        }); 

    $("#fg_holder, #txt_holder").css({ marginLeft : -1 * activeSlideNo * $('.slide').width()});  

    if (activeSlideNo >= 6) //fg_slides[6:] =  [ "hart"];
        $('#bckg_holder').css({ marginLeft : -1 * $('.slide').width()});  
    else
        $('#bckg_holder').css({ marginLeft : 0}); 

    if (activeSlideNo > 0) 
        $('#middle_holder').css({ marginLeft : -1 * $('.slide').width()}); 
    else 
        $('#middle_holder').css({ marginLeft : 0});    
}


$(document).on('page:change',function()  {
    $.event.special.swipe.scrollSupressionThreshold = '100';   // More than this horizontal displacement, and we will suppress scrolling.
    $.event.special.swipe.durationThreshold = '400';           // More time than this, and it isn't a swipe.
    $.event.special.swipe.horizontalDistanceThreshold ='10';   // Swipe horizontal displacement must be more than this.
    $.event.special.swipe.verticalDistanceThreshold = '200';   //Swipe vertical displacement must be less than this.
 
    if ($('.shower').length > 0) {  // if .shower exists, then we're on the home page
        lastSlideNo = $('#fg_holder').children().length - 1;
        
        $('.shower').on('mousewheel', function(event) { //desktop
            slide(event.deltaY);
        });

        $('.shower').on('swiperight', function(event) { //mobile
            slide(1);
        }); 
        $('.shower').on('swipeleft', function(event) {  //mobile
            slide(-1);
        }); 
    }

});

//on resize, recalibrate margin to point to desired (current) slide
$(window).resize(function() {
    if ($('.shower').length > 0) 
        recalibrate_margins();
});
