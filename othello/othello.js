var canvas = document.getElementById("Canvas")
var ctx = canvas.getContext("2d");

const cellnum = 8;
const cellsize = canvas.width / cellnum;
const radrate = 38/100;
const linewidrate = 3/100;

const Color = {
    deep_black: "rgb(0,0,0)",
    black:      "rgb(20,20,20)",
    white:      "rgb(250,250,250)",
    green:      "rgb(65,65,65)",
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
    canput: 1,
    put:    2
}

//board's evaluation
const eval = [
    [100, -40, 20,  5,  5, 20, -40, 100],
    [-40, -80, -1, -1, -1, -1, -80, -40],
    [ 20,  -1,  5,  1,  1,  5,  -1,  20],
    [  5,  -1,  1,  0,  0,  1,  -1,   5],
    [  5,  -1,  1,  0,  0,  1,  -1,   5],
    [ 20,  -1,  5,  1,  1,  5,  -1,  20],
    [-40, -80, -1, -1, -1, -1, -80, -40],
    [100, -40, 20,  5,  5, 20, -40, 100],
];

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

        ctx.fillRect(x+linewidrate*cellsize, y+linewidrate*cellsize,
            this.size-linewidrate*cellsize*2,this.size-linewidrate*cellsize*2);
        ctx.stroke();
        
        //stone color
        var cirle = new Path2D();
        cirle.arc(x+(this.size/2),y+(this.size/2),cellsize*radrate,0,2*Math.PI);
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

/*under develop*************************************************************************/

function search_put()
{

}

function random_insert()
{

}

function getRandomInt(min, max)
{        
    min = Math.ceil(min);
    max = Math.floor(max);        
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//game start
function game_start(board)
{
    var turn, x, y, number_of_disc, black, white, empty, end_flag = 0;
    var win_or_lose =0;
    var put = new Array(cellnum);
    for(var i = 0;i < cellnum;i++)
    {
        put[i] = new Array(cellnum);
        for(var j = 0;j < cellnum;j++)
        {
            put[i][j] = 0;
        }
    }

    turn = getRandomInt(0,2);

    while(1)
    {
        black = 0, white = 0, empty = 0;
        number_of_disc = search_put();
        if(turn % 2 == 0)
        {
            if(number_of_disc == 0)
            {
                if(end_flag == 1)break;
                end_flag = 1;
            }
            else
            {
            random_insert();
            end_flag = 0;
            }
        }
        
    }
      
}
game_start();

/***********************************************************************************/

//init
var cells = new Array(cellnum);
for(var i=0; i<cellnum; i++){
    cells[i] = new Array(cellnum);
    for(var j=0; j<cellnum; j++){
        cells[i][j] = new Cell();
        cells[i][j].set_size(cellsize);
        cells[i][j].set_condition(0);
        cells[i][j].set_board_condition(0);
    }
}



//set stone
cells[3][3].set_condition(Stone.white);
cells[3][4].set_condition(Stone.black);
cells[4][3].set_condition(Stone.black);
cells[4][4].set_condition(Stone.white);
//test
cells[1][1].set_board_condition(CellCond.canput);
cells[2][2].set_board_condition(CellCond.put);

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
    var clientRect = this.getBoundingClientRect();
	var positionX = clientRect.left + window.pageXOffset;
	var positionY = clientRect.top + window.pageYOffset;

    var x = event.pageX - positionX;
    var y = event.pageY - positionY;

    var i = Math.floor(x / cellsize);
    var j = Math.floor(y / cellsize);
    
    if(i<cellnum && j<cellnum && !(cells[i][j].condition)){
        cells[i][j].set_condition(c);
        dispp();
        c *= -1;
    }

}


