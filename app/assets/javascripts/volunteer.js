//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x){
    return (x < 0) ? -1 : 1;
}
function absolute(x){
    return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY){

    var stroke =  parseFloat(path.attr("stroke-width")) + 10;
    // check if the svg is big enough to draw the path, if not, set heigh/width
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance  (arbitrary choice, could have been the other way around)
    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }

    // hardcoded, mediaquery-like rendering of path4 when screen <440px;
    if( $(window).width() <=440 && path.attr("id") == "path4"){
         path.attr("d",  "M"  + startX + " " + startY +
                        " V" + (startY + delta) +
                        " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + (startX - delta*signum(deltaX)) + " " + (startY + 2*delta) +
                        " H" + (startX - 2*delta*signum(deltaX)) + 
                        " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX - 3*delta*signum(deltaX)) + " " + (startY + 3*delta) +
                        " V" + (endY-4*delta) +
                        " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX - 2*delta*signum(deltaX)) + " " + (endY- 3*delta) +
                        " H" + (endX-delta*signum(deltaX))+ 
                        " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + (endX) + " " + (endY- 2*delta) +
                        " V" + endY );
    }else{
        // draw tha pipe-like path
        // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
        path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                    " H" + (endX - delta*signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                    " V" + endY );
    }
}


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
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
 }


function connectAll(){
    // reset svg each time 
    $("#svg1").attr("height", "0");
    $("#svg1").attr("width", "0");
    // connect all the paths you want!
    connectElements($("#path1"), $("#volont_info"),     $("#volont_uvjeren"));
    connectElements($("#path2"), $("#volont_info"),     $("#volont_nebas")  );
    connectElements($("#path3"), $("#volont_nebas"),    $("#volont_nebrini"));
    connectElements($("#path4"), $("#volont_uvjeren"),  $("#volont_javi")   );
    connectElements($("#path5"), $("#volont_nebrini"),  $("#volont_javi")   );
}


//this will draw the svg path if we navigate to the volunteer page from another page within our site
$(document).on('page:change',function() {
    connectAll();      // drawAll paths
});


//this will draw the svg path if we navigate directly to the volunteer page from somewhere else other than our site
$(window).load(function() {
    connectAll();      // drawAll paths
});


//pretty self-explanatory, re-draws paths each time window is resized
$(window).resize(function () {
   connectAll();      // drawAll paths  
});