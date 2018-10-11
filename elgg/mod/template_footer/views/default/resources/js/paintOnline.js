
var draw = function(){
    this.canvas = null;
    this.context = null;
    //this.width = 1000; //độ rộng và độ dài của bảng vẽ
    //this.height = 500;
    //this.width = document.body.clientWidth * 0.9;
    this.width = $(window).width() * 0.9;
    this.height = 800;
    this.x = 0; //vị trí của chuột
    this.y = 0;
    this.drawing = false;
    this.allowDraw = false;
    this.eraser = false;
    this.undo = false;
    this.colorTemp = null;
    this.lineWidth = 1; //độ dày của nét vẽ
    this.color = "#000000"; //màu sắc của nét vẽ
    //this.gradient = false;

    this.err = 25;
    //Cài đặt chưc năng cho bảng vẽ
    this.pencilChosen = null;
    this.lineWidthChosen = null;
    this.brushChosen = null;
    this.colorChosen = null;
    this.eraserChosen = null;
 
    //Hết phần cài đặt chức năng
    var canvasSVGContext;
    var undoPoints = [];
    var redoPoints = [];
    var self = this;

    this.init = function(){
       // this.canvas = document.createElement('canvas');
        this.canvas = document.getElementById('myCanvas');
        canvasSVGContext = new CanvasSVG.Deferred();	
        canvasSVGContext.wrapCanvas(self.canvas);
        this.context = this.canvas.getContext('2d');
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.positon = "center";
        //this.canvas.textAlign = "center";
     
        //document.body.appendChild(this.canvas);
        this.drawWhiteBackground();
       // this.drawLine(0,0,100,100,10,"#79CDCD");
        //bắt các sự kiện chuột
        
        this.canvas.addEventListener('mousedown', function(event){
            //click chuột xuống
            self.eventMouseDown(event);        // bởi vì trong hàm này thì this không phải là object của draw nữa nên phải dùng self
        });
        this.canvas.addEventListener('mouseup', function(event){
            //click chuột lên
            self.eventMouseUp(event);     
        });
        this.canvas.addEventListener('mousemove', function(event){
            //di chuyển chuột
            self.eventMouseMove(event);     
        });
        
        
    }

    $('#newpage').click(function(){
        if (self.eraser){
            self.color = self.colorTemp;
            self.eraser = false;
        }
        self.context.clearRect(0,0,self.canvas.width,self.canvas.height); //xóa hết khung vẽ
        undoPoints = [];
        redoPoints = [];
        clearCssAll();
        hideTable();
        $('#newpage img').css('border','2px solid #98F5FF');
        self.allowDraw = false;
    });
    $('#pencil').click(function(){
        if (self.eraser){
            self.color = self.colorTemp;
            self.eraser = false;
        }
        self.pencilChosen = new pencilSelect(self,self.color,1);
        self.pencilChosen.onMouseClick();
        clearCssAll();
        hideTable();
        $('#pencil img').css('border','2px solid #98F5FF');
        self.allowDraw = true;
    });
    $('#lineWidth').click(function(){
        if (self.eraser){
            self.color = self.colorTemp;
            self.eraser = false;
        }
        self.lineWidthChosen = new lineWidthSelect(self);
        self.lineWidthChosen.onMouseClick();
        $('#colorTable').hide();
        $('#brushTable').hide();
        $('#lineWidthTable').toggle();
        clearCssAll();
        $('#lineWidth img').css('border','2px solid #98F5FF');
        self.allowDraw = false;
    });
    $('#brush').click(function(){
        if (self.eraser){
            self.color = self.colorTemp;
            self.eraser = false;
        }
        self.brushChosen = new brushSelect(self);
        self.brushChosen.onMouseClick();
        hideTable();
       // $('#brushTable').toggle();
        clearCssAll();
        $('#brush img').css('border','2px solid #98F5FF');
        //$('#brushTable img').css('border','2px solid white');
        self.allowDraw = true;
    });
    $('#eraser').click(function(){
        self.eraser = true;
        self.colorTemp = self.color;
        self.eraserChosen = new eraserSelect(self,"#ffffff",3);
        self.eraserChosen.onMouseClick();
        clearCssAll();
        hideTable();
        $('#eraser img').css('border','2px solid #98F5FF');
        self.allowDraw = true;
    });
    $('#colorPalette').click(function(){
        self.colorChosen = new colorSelect(self);
        self.colorChosen.onMouseClick();
        $('#lineWidthTable').hide();
        $('#brushTable').hide();
        $('#colorTable').toggle();
        clearCssAll();
        $('#colorPalette img').css('border','2px solid #98F5FF');
        self.allowDraw = false;
    });
    $("#undo").mousedown(function () {
        self.allowDraw = false;
        interval = setInterval(undo, 20);
        clearCssAll();
        hideTable();
        $('#undo img').css('border','2px solid #98F5FF');
    }).mouseup(function () {
        clearInterval(interval);
    });

    $("#redo").mousedown(function () {
        self.allowDraw = false;
        interval = setInterval(redo, 20);
        clearCssAll();
        hideTable();
        $('#redo img').css('border','2px solid #98F5FF');
    }).mouseup(function () {
        clearInterval(interval);
    });
    $('#btnSavePicture').click(function(){
        //self.context.clearRect(0, 0, self.width, self.height);
        //undoDraw();
        //canvasSVGContext = new CanvasSVG.Deferred();	
        //canvasSVGContext.wrapCanvas(self.canvas);
        self.context.clearRect(0,0,self.canvas.width,self.canvas.height);
        undoDraw();
        document.getElementById("showPicture").appendChild(self.context.getSVG());
    })

    function clearCssAll(){
        $('#pencil img').css('border','2px solid #ffffff');
        $('#lineWidth img').css('border','2px solid #ffffff');
        $('#brush img').css('border','2px solid #ffffff');
        $('#eraser img').css('border','2px solid #ffffff');
        $('#colorPalette img').css('border','2px solid #ffffff');
        $('#undo img').css('border','2px solid #ffffff');
        $('#redo img').css('border','2px solid #ffffff');
        $('#newpage img').css('border','2px solid #ffffff');
    }
    function hideTable(){
        $('#colorTable').hide();
        $('#lineWidthTable').hide();
        //$('#brushTable').hide();
    }

    this.eventMouseDown = function(event){
        var posMouse = this.getMousePosition(event);
        this.x = posMouse.x;
        this.y = posMouse.y;
        
        
        if (this.allowDraw){
            if (this.undo){
                redoPoints = [];
                undoPoints[undoPoints.length - 1].mode = "end";
                this.undo = false;
            }
            undoPoints.push({
                x: this.x - this.err, // 50 là do khoảng mình làm cái lề của bảng vẽ
                y: this.y - this.err ,
                size: this.lineWidth,
                color: this.color,
                mode: "begin"
            });
        }
        
        
        //Hết khu vực chức năng
        this.drawing = true; //bấm chuột xuống thì mới bắt đầu vẽ
    }
    this.eventMouseUp = function(event){ 
        this.drawing = false;// click chuột lên thì dừng không vẽ nữa
        if(this.allowDraw){
            var posMouse = this.getMousePosition(event);
            undoPoints.push({
                x: posMouse.x - this.err, // 50 là do khoảng mình làm cái lề của bảng vẽ
                y: posMouse.y -this.err ,
                size: this.lineWidth,
                color: this.color,
                mode: "end"
            });
        }
    }
    this.eventMouseMove = function(event){
        if (this.drawing == true && this.allowDraw == true){
            var newMousePos = this.getMousePosition(event);
            undoPoints.push({
                x: newMousePos.x - this.err, // 50 là do khoảng mình làm cái lề của bảng vẽ
                y: newMousePos.y -this.err,
                size: this.lineWidth,
                color: this.color,
                mode: "draw"
            });
            this.drawLine(this.x-this.err, this.y-this.err, newMousePos.x-this.err, newMousePos.y-this.err,this.lineWidth,this.color);
            //cập nhật lại vị trí của chuột
            this.x = newMousePos.x;
            this.y = newMousePos.y; 
        }
    }

    this.drawWhiteBackground = function(){
        this.context.fillStyle = "#ffffff"; //khung vẽ màu trắng
        this.context.fillRect(800,500,this.width,this.height); //vị trí khung vẽ
    }
    this.getMousePosition = function(){ //lấy vị trí của chuột
        var rect = this.canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
    this.drawLine = function(beginX, beginY, endX, endY, lineWidth, color){
        this.context.beginPath();
        this.context.moveTo(beginX, beginY);
        this.context.lineTo(endX,endY);
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = color;
        this.context.stroke();
    }


    function undoDraw() {

        if (undoPoints.length == 0) {
            return;
        }
    
        self.context.clearRect(0, 0, self.width, self.height);
        
        for (var i = 0; i < undoPoints.length-1; i++) {
    
            var pt1 = undoPoints[i];
            var pt2 = undoPoints[i+1];
            
            if (pt2.mode != "begin"){
                self.drawLine(pt1.x,pt1.y,pt2.x,pt2.y,pt2.size,pt2.color);
            }
            
        }
       // self.context.stroke();
    }
    
    function undo() {
        self.undo = true;
        if (undoPoints.length == 0) {
            return;
        }
        else{
            redoPoints.push(undoPoints.pop()); //xóa phần tử cuối cùng 
            undoDraw();
        }
    }
    function redo(){
        if (redoPoints.length == 0) {
            return;
        }
        else {
            undoPoints.push(redoPoints.pop()); //xóa phần tử đầu tiên 
            undoDraw();
        }
        
    }
}

var drawOnline = new draw();
drawOnline.init();


//Download image
//var canvas = document.querySelector('canvas');

/*
var link = document.createElement('a');
link.innerHTML = 'download image';
link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL();
    link.download = "mypainting.png";
}, false);
document.body.appendChild(link);
*/
// Download bằng jquery
/*
$('#downloadImg').click(function(){
    $('#downloadImg').attr('href',canvas.toDataURL());
    $('#downloadImg').attr('download',"mypainting.jpg");
})
*/

