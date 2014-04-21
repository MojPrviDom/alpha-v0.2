function connectElements(path, startElem, endElem) {
    //only one svgContainer for this demo
    var svgContainer= $("#svgContainer");
    var svg   = $("#svg1");

    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    svgTop  = svgContainer.offset().top;
    svgLeft = svgContainer.offset().left

    // get (top, left) coordinates for the two elements
    startCoord = startElem.offset();
    endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
 }

 function drawPath(svg, path, startX, startY, endX, endY){

    var stroke =  parseFloat(path.attr("stroke-width")) + 10;
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                  svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    

    var deltaY = (endY - startY) * 0.15;
    var deltaX = (endX - startX) * 0.15;
    // for further calculations which ever is the shortest distance  (arbitrary choice, could have been the other way around)
    var delta  =  deltaY < Math.abs(deltaX) ? deltaY : Math.abs(deltaX)

    
    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0;
    var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }

    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX+delta * Math.sign(deltaX)) + " " + (startY+delta*2) +
                    " H" + (endX-delta* Math.sign(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY+delta*3) +
                    " V" + endY );
}


$(document).on('page:change',function() {
    // display the svg
    $("#svgContainer").css("display", "block");
    // connect all the paths you want!

    connectElements($("#path1"), $("#volont_info"),     $("#volont_uvjeren"));
    connectElements($("#path2"), $("#volont_info"),     $("#volont_nebas")  );
    connectElements($("#path3"), $("#volont_nebas"),    $("#volont_nebrini"));
    connectElements($("#path4"), $("#volont_uvjeren"),  $("#volont_javi")   );
    connectElements($("#path5"), $("#volont_nebrini"),  $("#volont_javi")   );





    //test
    connectElements($("#try1"), $("#teal"), $("#orange"));
    connectElements($("#try2"), $("#red"),  $("#orange"));
    connectElements($("#try3"), $("#teal"), $("#green") );
    connectElements($("#try4"), $("#red"),  $("#green") );

});

$(window).resize(function () {
    connectElements($("#path1"), $("#volont_info"),     $("#volont_uvjeren"));
    connectElements($("#path2"), $("#volont_info"),     $("#volont_nebas")  );
    connectElements($("#path3"), $("#volont_nebas"),    $("#volont_nebrini"));
    connectElements($("#path4"), $("#volont_uvjeren"),  $("#volont_javi")   );
    connectElements($("#path5"), $("#volont_nebrini"),  $("#volont_javi")   );


    connectElements($("#try1"), $("#teal"), $("#orange"));
    connectElements($("#try2"), $("#red"),  $("#orange"));
    connectElements($("#try3"), $("#teal"), $("#green") );
    connectElements($("#try4"), $("#red"),  $("#green") ); 
});