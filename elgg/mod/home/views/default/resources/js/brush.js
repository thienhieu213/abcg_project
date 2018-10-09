//var value = null;
/*
$('#brush-1').click(function(){
    $('#brushTable tr td').css('border','1px solid white');
    $('#brush-1').css('border','1px solid black');
    value = $('#brush-1').attr('value');
})
$('#brush-2').click(function(){
    $('#brushTable tr td').css('border','1px solid white');
    $('#brush-2').css('border','1px solid black');
    value = $('#brush-2').attr('value');
})
$('#brush-3').click(function(){
    $('#brushTable tr td').css('border','1px solid white');
    $('#brush-3').css('border','1px solid black');
    value = $('#brush-3').attr('value');
})
*/
var brushSelect = function(draw){
    this.draw = draw;
    this.lineWidth = 7;

    this.onMouseClick = function(){
        this.draw.lineWidth = this.lineWidth;
    }
}