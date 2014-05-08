 var activeSlideNo=0;

var slide_home = function(btn){
    //do not animate it an animation is already in motion
    if ($('.home_holder').is(':animated'))  return;


    var btn_bck = false;
    var btn_fwd = false;
    // check if passed as arg the back button of the forward button, else do return;
    if (btn.className =="arrow home_back" || btn >0)      btn_bck = true;
    else if (btn.className =="arrow home_fwd" || btn <0)  btn_fwd = true;
    else return;

    //do not animate forward if end is reached
    //if the number of slides ever changes, CHANGE it here also!, current number of slides = 3;
    if ( activeSlideNo == 2 && btn_fwd)      return;
    //do not animate backwards if at beginning
    else if ( activeSlideNo == 0 && btn_bck) return;
    
    //if fwd clicked, slide to the left, hence the "-=" margin, also keep track of slide nbr.
    if(btn_fwd){
        var operation = "-=";
        activeSlideNo +=1;
    }
    //if bckwrd clicked, slide to the right, hence the "+=" margin, also keep track of slide nbr.
    else if (btn_bck){
        var operation = "+=";
        activeSlideNo -=1;
    }    

    //animate!
    $('.home_holder').stop().animate(
                {'margin-left':operation+$('.home_slide').width()}, 1000);

 }

// get the weel's in motion for the home slider
// $( document ).ready(function() {
//   $('.home_back, .home_fwd').click(function(event){ slide_home(this); } );
// });

$(document).on('page:change',function()  {
  $('.home_back, .home_fwd').click(function(event){ slide_home(this); } );
  $('.home_holder').on('mousewheel', function(event) {
    slide_home(event.deltaY);
    }); 
});

//on resize, recalibrate margin to point to desired (current) slide
$(window).resize(function() {
    $('.home_holder').css({ marginLeft : -1 * activeSlideNo * $('.home_slide').width()});             
});
