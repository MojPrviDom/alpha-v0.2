var activeSlideNo = 0;    // keep track of the current slide nb
var lastSlideNo = 0;      // number of slides
var fg_slides = ["steve", "ppl", "job", "kitchen", "none", "hart"];

function slide(direction){
    if ($('.holder').is(':animated'))  return;            //do not animate it an animation is already in motion

    if ( direction > 0 && activeSlideNo == 0 ) return;    //do not animate backwards if at beginning
    if ( direction < 0 && activeSlideNo == lastSlideNo) return;    //do not animate forward if at the end     
    
    (direction > 0) ? slide_left(): slide_right();
}


function slide_left(){
    activeSlideNo -= 1;                         //keep track of the current slide nb
    $('#fg_holder').stop().animate(             //animate!
                {'margin-left': "+=" + $('.slide').width()}, 1000);
    
    if (fg_slides[activeSlideNo] == "kitchen"){
        $('#bckg_holder').stop().animate(       //animate!
                {'margin-left': "+=" + $('.slide').width()}, 1000);
    }

}


function slide_right(){
    activeSlideNo += 1;                         //keep track of the current slide nb
    $('#fg_holder').stop().animate(             //animate!
                {'margin-left': "-=" + $('.slide').width()}, 1000);

   if (fg_slides[activeSlideNo] == "none"){
        $('#bckg_holder').stop().animate(       //animate!
                {'margin-left': "-=" + $('.slide').width()}, 1000);
    }
}




$(document).on('page:change',function()  {
  lastSlideNo = $('#fg_holder').children().length - 1;
   $('#fg_shower').on('mousewheel', function(event) {
    slide(event.deltaY);
    }); 
});

//on resize, recalibrate margin to point to desired (current) slide
$(window).resize(function() {
    $('.holder').css({ marginLeft : -1 * activeSlideNo * $('.slide').width()});    
    $('.holder_demonstr').css({ marginLeft : -1 * activeSlideNo * $('.slide').width() -3});             
});
