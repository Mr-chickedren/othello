var canvas = document.getElementById("Canvas")
var ctx = canvas.getContext("2d");

const cellnum = 8;
const cellsize = 50
const linewid = 2;

const Color = {
    deep_black: "rgb(0,0,0)",
    black:      "rgb(20,20,20)",
    white:      "rgb(250,250,250)",
    green:      "rgb(0,150,0)",
    red:        "rgb(150,50,50)",
    blue:       "rgb(50,100,150)"
};

const Stone = {
    none:   0,
    white:  1,
    black:  -1
};

const CellCond = {
    none:   0,
    canput:    1,
    put: 2
}

//cell no class
class Cell{
    set_condition(_condition){
        this.condition = _condition;
    }
    set_board_condition(_bcondition){
        this.bcondition = _bcondition;
    }
    set_size(_size){
        this.size = _size;
    }

    disp(x,y){
        
        ctx.beginPath();
        ctx.fillStyle = Color.deep_black;
        ctx.fillRect(x, y, this.size, this.size);

        //cell color
        var style = Color.green;
        switch(this.bcondition){
            case CellCond.none:
                style = Color.green;
                ctx.fillStyle = style;
                break;
            case CellCond.canput:
                style = Color.red;
                ctx.fillStyle = style;
                break;
            case CellCond.put:
                style = Color.blue;
                ctx.fillStyle = style;
                break;
        }

        ctx.fillRect(x+linewid, y+linewid, this.size-linewid*2,this.size-linewid*2);
        ctx.stroke();
        
        //stone color
        var cirle = new Path2D();
        cirle.arc(x+(this.size/2),y+(this.size/2),18,0,2*Math.PI);
        switch(this.condition){
            case Stone.none:
                ctx.fillStyle = style; break;
            case Stone.white:
                ctx.fillStyle = Color.white; break;
            case Stone.black:
                ctx.fillStyle = Color.black; break;
        }
        ctx.fill(cirle)
    }
}

//init
var cells = new Array(cellnum);
for(var i=0; i<cellnum; i++){
    cells[i] = Array(cellnum);
    for(var j=0; j<cellnum; j++){
        cells[i][j] = new Cell();
        cells[i][j].set_size(cellsize);
        cells[i][j].set_condition(0);
        cells[i][j].set_board_condition(0);
    }
}

//set stone
cells[3][3].set_condition(1);
cells[3][4].set_condition(-1);
cells[4][3].set_condition(-1);
cells[4][4].set_condition(1);
//test
cells[1][1].set_board_condition(1);
cells[2][2].set_board_condition(2);

//timer
var time = 0;
const log = function(){
    console.log(time);
    time++;
};
const timer = setInterval(log,1000);
clearInterval(timer);

//disp
const dispp = function(){
    for(var i=0;i<cellnum;i++){
        for(var j=0;j<cellnum;j++){
            cells[i][j].disp(i * cells[i][j].size ,j * cells[i][j].size);
        }
    }
}
dispp();

//click process
var c = 1;
canvas.onclick = function(event){
    var x = event.pageX - 8;
    var y = event.pageY - 8;

    var i = Math.floor(x / cellsize);
    var j = Math.floor(y / cellsize);
    
    if(i<cellnum && j<cellnum && !(cells[i][j].condition)){
        cells[i][j].set_condition(c);
        dispp();
        c *= -1;
    }

}


