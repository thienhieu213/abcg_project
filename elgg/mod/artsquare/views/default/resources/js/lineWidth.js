var value = null;
$('#lineWidth-1').click(function(){
    $('#lineWidthTable tr td').css('border','1px solid white');
    $('#lineWidth-1').css('border','1px solid black');
    value = $('#lineWidth-1').attr('value');
})
$('#lineWidth-3').click(function(){
    $('#lineWidthTable tr td').css('border','1px solid white');
    $('#lineWidth-3').css('border','1px solid black');
    value = $('#lineWidth-3').attr('value');
})
$('#lineWidth-7').click(function(){
    $('#lineWidthTable tr td').css('border','1px solid white');
    $('#lineWidth-7').css('border','1px solid black');
    value = $('#lineWidth-7').attr('value');
})
$('#lineWidth-11').click(function(){
    $('#lineWidthTable tr td').css('border','1px solid white');
    $('#lineWidth-11').css('border','1px solid black');
    value = $('#lineWidth-11').attr('value');
})
$('#lineWidth-19').click(function(){
    $('#lineWidthTable tr td').css('border','1px solid white');
    $('#lineWidth-19').css('border','1px solid black');
    value = $('#lineWidth-19').attr('value');
})
var lineWidthSelect = function(draw){
    this.draw = draw;
    this.lineWidth = value;

    this.onMouseClick = function(){
        this.draw.lineWidth = this.lineWidth;
    }
}