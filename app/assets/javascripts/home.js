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
                {'margin-left': "+=" + $('.slide').width()}, 2000);
    
    if (fg_slides[activeSlideNo] == "kitchen"){
        $('#bckg_holder').stop().animate(       //animate!
                {'margin-left': "+=" + $('.slide').width()}, 2000);
    }

}


function slide_right(){
    activeSlideNo += 1;                         //keep track of the current slide nb

    if (fg_slides[activeSlideNo] == "kitchen"){
        $('#fg_kitchen').css('visibility', 'hidden');
        $('#fg_holder, #txt_holder').stop().animate(             //animate!
                {'margin-left': "-=" +1.5*  $('.slide').width()}, 1000, function(){
                  $('#fg_kitchen').css('visibility', 'visible');
                
                 $('#fg_holder, #txt_holder').stop().animate(
                     { marginLeft : -1 * activeSlideNo * $('.slide').width() +"px"},1000, function(){
                  $('#txt_'+fg_slides[activeSlideNo]).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
                });
        });
        
    }else {
        $("#fg_holder, #txt_holder").stop().animate(             //animate!
                {'margin-left': "-=" + $('.slide').width()}, 2000, function(){
                  $('#txt_'+fg_slides[activeSlideNo]).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
                });
    }


    if (fg_slides[activeSlideNo] == "none"){
        $('#bckg_holder').stop().animate(       //animate!
                {'margin-left': "-=" + $('.slide').width()}, 2000);
    }
}



function recalibrate_margins(){
    $('.shower').animate({
            height: $(window).height() - $('.shower').offset().top +"px"
        }, function() { // When clicked navigation bar slides down or up
            // Animation complete. 
            $('#fg_holder').css({ marginLeft : -1 * activeSlideNo * $('.slide').width()});  

            if (activeSlideNo >=4) //fg_slides[4:] =  ["none", "hart"];
                $('#bckg_holder').css({ marginLeft : -1 * $('.slide').width()});    
        });

   
}

$(document).on('page:change',function()  {

  lastSlideNo = $('#fg_holder').children().length - 1;
   $('.shower').on('mousewheel', function(event) {
    slide(event.deltaY);
    }); 

});

//on resize, recalibrate margin to point to desired (current) slide
$(window).resize(function() {
    recalibrate_margins();
   
});
