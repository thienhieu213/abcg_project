var pencilSelect = function(draw, color, lineWidth){
    this.draw = draw;
    this.color = color;
    this.lineWidth = lineWidth;

    this.onMouseClick = function(){
        this.draw.color = this.color;
        this.draw.lineWidth = this.lineWidth;
    }
}