 var activeSlideNo=0;

 $(function() {
    $('.home_fwd').click(function(event){
        if (!$('.home_holder').is(':animated')){
       
           if (  parseInt( $('.home_holder').css('marginLeft') ) > -2 *  $('.home_slide').width() ){
            $('.home_holder').stop().animate(
                {'margin-left':"-="+$('.home_slide').width()}, 1000);
                activeSlideNo+=1;

        }
}
    console.log($('.home_slide').width() );
    console.log($('.home_holder').css('marginLeft')  );
        event.preventDefault();
    });

     $('.home_back').click(function(event){
        if (!$('.home_holder').is(':animated')){
            if (  parseInt( $('.home_holder').css('marginLeft') ) < 0 ){
                $('.home_holder').stop().animate(
                    {'margin-left':"+="+$('.home_slide').width()}, 1000);
                activeSlideNo-=1;
            }
            event.preventDefault();
         }
    });
});


 $(window).resize(function() {
//stavi nA višekratnik najblizeg 
$('.home_holder').css({ marginLeft : -activeSlideNo* $('.home_slide').width()});
                   

});