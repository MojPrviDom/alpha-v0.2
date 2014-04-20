function changePath(path, startElem, endElem) {
    var path = path ;
    var svgContainer= $("#svgContainer");
    var svg   = $("#svg1");
    var navOffset  =  $(".navigation_box").css("display") == "none"?
                         0 : $(".navigation_box").height();

    var logoOffset =  $(".logo img").css("display") == "none"? 
                        0 : $(".logo img").height() - ($("#container").offset().top );


    var paddingVertical = startElem.innerHeight() - startElem.height();
    var startPaddingHorizontal = 0.5*(startElem.innerWidth() - startElem.width());
    var endPaddingHorizontal = 0.5*(endElem.innerWidth() - endElem.width());
    
    startCoord = startElem.offset();
    endCoord   = endElem.offset();
    svgLeft = svgContainer.offset().left;
    
    startX = startCoord.left + startPaddingHorizontal- svgLeft + startElem.width()/2;
    startY = startCoord.top + paddingVertical - navOffset + logoOffset;

    endX = endCoord.left + endPaddingHorizontal- svgLeft + endElem.width()/2;
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
    var deltaX= (endX-startX)*0.15;
    var delta = deltaY < Math.abs(deltaX) ? deltaY : Math.abs(deltaX)
    


    if (svg.attr("height") < endY)              svg.attr("height", endY);
    if (svg.attr("width" ) < (endX + deltaX))    svg.attr("width", (endX + deltaX));
    
    //change arc orientation according to where the divs are positioned
    if (startX >endX) {
        arc1 = 1
        arc2 = 0
    }else {
        arc1 = 0
        arc2 = 1
    }

    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX+delta * Math.sign(deltaX)) + " " + (startY+delta*2) +
                    " H" + (endX-delta* Math.sign(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY+delta*3) +
                    " V" + endY );
     }
   

$(document).on('page:change',function() {
    $("#svgContainer").css("display", "block");
    changePath($("#path1"), $("#div1"), $("#div2") );
    changePath($("#path2"), $("#div3"), $("#div2") );
    changePath($("#path3"), $("#div1"), $("#div4") );
    changePath($("#path4"), $("#div3"), $("#div4") );

});

$(window).bind('resizeEnd', function() {
   changePath($("#path1"), $("#div1"), $("#div2") );
   changePath($("#path2"), $("#div3"), $("#div2") );
   changePath($("#path3"), $("#div1"), $("#div4") );
   changePath($("#path4"), $("#div3"), $("#div4") );

        
    //do something, window hasn't changed size in 500ms
});

$(window).resize(function () {
   changePath($("#path1"), $("#div1"), $("#div2") );
   changePath($("#path2"), $("#div3"), $("#div2") );
   changePath($("#path3"), $("#div1"), $("#div4") );
   changePath($("#path4"), $("#div3"), $("#div4") );  
});