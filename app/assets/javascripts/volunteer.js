function changePath(path, startElem, endElem) {
    var path = path ;
    var svgContainer= $("#svgContainer");
    var svg   = $("#svg1");
    var navOffset  =  $(".navigation_box").css("display") == "none"?
                         0 : $(".navigation_box").height();

    var logoOffset =  $(".logo img").css("display") == "none"? 
                        0 : $(".logo img").height() - ($("#container").offset().top );


    startCoord = startElem.offset();
    console.log( startCoord.top)
    endCoord   = endElem.offset();
    svgLeft = svgContainer.offset().left;
    
    startX = startCoord.left - svgLeft + startElem.width()/2;
    startY = startCoord.top - navOffset + logoOffset;

    endX = endCoord.left - svgLeft + endElem.width()/2;
    endY = endCoord.top  ;

    drawPath(svg, path, startX, startY, endX, endY);
 }

 function drawPath(svg, path, startX, startY, endX, endY){

    //console.log("delta x: " + (startX-endX));
    // console.log("delta y: " + (startY-endY));
    // console.log("70/delta x " + (70.0/(startX-endX)));
    // console.log("70/delta y " + (70.0/(startY-endY)));
    // console.log((startY +100) + "  " + (startY+ Math.abs(endY-startY)*0.15));
    
    var deltaY= Math.abs(endY-startY)*0.15;
    var deltaX= Math.abs(endX-startX)*0.15;
    delta = deltaY < deltaX ? deltaY : deltaX
    svg.attr("height", endY);
    svg.attr("width", (endX + delta) );


    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 0" + (startX+delta) + " " + (startY+delta*2) +
                    " H" + (endX-delta) + 
                    " A" + delta + " " +  delta + " 0 0 1" + endX + " " + (startY+delta*3) +
                    " V" + endY );
     }
   

$(document).on('page:change',function() {
  $("#svgContainer").css("display", "block");
   changePath($("#path1"), $("#div1"), $("#div2") );
   changePath($("#path2"), $("#div3"), $("#div2") );

});

$(window).bind('resizeEnd', function() {
   changePath($("#path1"), $("#div1"), $("#div2") );
   changePath($("#path2"), $("#div3"), $("#div2") );
        
    //do something, window hasn't changed size in 500ms
});

$(window).resize(function () {
   changePath($("#path1"), $("#div1"), $("#div2") );
   changePath($("#path2"), $("#div3"), $("#div2") );
   
});