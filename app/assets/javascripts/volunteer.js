function changeDimensions() {
    var path1 = $("#path1");
    var svgContainer= $("#svgContainer");
    var svg   = $("#svg1");
    var navOffset  =  $(".navigation_box").css("display")=="none"? 0 : $(".navigation_box").height();
    var logoOffset =  $(".logo img").css("display")=="none"? 0 :
                         $(".logo img").height() - ($("#container").offset().top );


    startCoord = $("#div1").offset();
    endCoord   = $("#div2").offset();
    svgLeft = svgContainer.offset().left;
    
    startX = startCoord.left -svgLeft + $("#div1").width()/2;
    startY = startCoord.top -navOffset +logoOffset;

    endX = endCoord.left -svgLeft + $("#div2").width()/2;
    endY = endCoord.top - $("#div2").height()-navOffset +logoOffset;

    svg.attr("height", endY+50);
    svg.attr("width", endX+50);

    //path1.attr("d", "m"+startX+" "+startY+" l"+ endX + " " + endY);

    path1.attr("d", "M"  + startX + " " + startY +
                    " H" + (endX-70) + 
                    " A" + "70 70 0 0 1" + endX + " " + (startY+70) +
                    " V" + endY );

    
    }

$( document ).ready(function() {
  changeDimensions();
  $("#svgContainer").css("display", "block");


});

$(window).resize(function() {
    changeDimensions();             
});

