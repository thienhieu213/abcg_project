var eraserSelect = function(draw, color, lineWidth){
    this.draw = draw;
    this.color = color;
   // this.x = 2;
   // this.y = 160;
   // this.width = 25;
   // this.height = 25;
    this.lineWidth = lineWidth;

   // this.show = function(){
        //cho một ô màu để khách hàng click vào lựa chọn
      //  this.draw.context.fillStyle = this.color;
     //   this.draw.context.fillRect(this.x,this.y,this.width,this.height);
   // }
    this.onMouseClick = function(){
        this.draw.color = this.color;
        this.draw.lineWidth = this.lineWidth;
    }
}