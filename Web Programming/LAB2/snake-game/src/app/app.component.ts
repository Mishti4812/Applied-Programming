import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, HostListener, ApplicationRef} from '@angular/core';
import { detectChanges } from '@angular/core/src/render3';
import { Observable, interval, Subscription } from 'rxjs';


// position represents head
class snake {
  public curposition = {row:0,col:0};
  public lastposition = {row:0,col:0};
 public children = [];
  constructor(position,children){
    this.curposition.row = position.row;
    this.curposition.col = position.col;
    this.children = children;
  }
  getlength(){
    return this.children.length;
  }
  getPosition(){
    var obj = JSON.parse(JSON.stringify(this.curposition));
    return obj;
  }
  getLastPosition(){
    var obj = JSON.parse(JSON.stringify(this.lastposition));
    return obj;
  }
  setPosition(pos){
    var obj = JSON.parse(JSON.stringify(pos));
    this.curposition = obj;

  }
  setLastPosition(pos){
    var obj = JSON.parse(JSON.stringify(pos));
    this.lastposition = obj;

  }
}
class child {
  id = 1;
  //row,col
  curposition = {row:0,col:0};
  lastposition = {row:0,col:0};
  parent_id = null;

  getPosition(){
    var obj = JSON.parse(JSON.stringify(this.curposition));
    return obj;
  }
  getLastPosition(){
    var obj = JSON.parse(JSON.stringify(this.lastposition));
    return obj;
  }
  setPosition(pos){
    var obj = JSON.parse(JSON.stringify(pos));
    this.curposition = obj;

  }
  setLastPosition(pos){
    var obj = JSON.parse(JSON.stringify(pos));
    this.lastposition = obj;

  }
}
var TimerID;
var direction = 'UP';
var snakehead = new snake({row:20,col:15},[]);
var foodposition = {row:7,col:21};
var gameboard = [[{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:-1},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:2},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
  [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}]];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'(document.keydown)':'changeDirection($event)'}
})

export class AppComponent{
   public title = 'Snake Game';
   public score = 0;
   public topscore = 0;
    public appref;
    public gb;
    constructor(app: ApplicationRef) {
        this.appref = app;
    }
  //'rows'/'cols' #0-9
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.changeDirection(event);
  }
changeDirection(event: KeyboardEvent){
  // Left arrow <

  if (event.keyCode.toString() == "37"){
    direction = "LEFT";
  }
  // Up arrow ^
  else if (event.keyCode.toString() == "38") {
    direction = "UP";
  }
  // Right arrow >
  else if (event.keyCode.toString() == "39") {
   direction = "RIGHT";
  }
  // Down arrow v
  else if (event.keyCode.toString() == "40") {
   direction = "DOWN";
  }
  else{return;}
}

public setScore(num: number) {
    this.score = num;
}
public getScore(){
    return this.score;
}

public checkHighScore(num:number){
    if (this.getScore() > this.topscore){
        this.topscore = num;
    }
}
startGame(){
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = true;
    direction = 'UP';
    snakehead = new snake({row:20,col:15},[]);
    foodposition = {row:7,col:21};
    gameboard = 
    [[{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:-1},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:2},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
      [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}]];
    
    var func = interval(130).subscribe(() => this.nextFrame(func));
    
}
// pass gameboard array to startgame
nextFrame(sub: Subscription){
  var justate = false;
  
  if (direction == "LEFT"){
 
 //set last head to current head position (before making move)
snakehead.setLastPosition(snakehead.getPosition());
 //check if head at top of gameboard, wrap around to bottom (set index to bottom row 9)
 if (snakehead.curposition.col == 0){
    alert("YOU LOSE");
    sub.unsubscribe();
    this.checkHighScore(this.score);
    this.setScore(0);
    return;
   } 
  
 else{
   // moves head left one col
   var temp = snakehead.getPosition();
     temp.col -= 1;
    snakehead.setPosition(temp);
 }
 //alert('last col: ' + snakehead.getLastPosition().col);
 //alert('next col: ' + snakehead.getPosition().col);
// check if head is on food (eats and grows)
if((gameboard[snakehead.curposition.row][snakehead.curposition.col]).text == 2){
    this.setScore(this.score += 5);
    justate = true;
    var newchild = new child();
    if (snakehead.children.length == 0)// first child
    {
      newchild.setPosition(snakehead.getLastPosition());
      
    }
    else{
      newchild.setPosition(snakehead.children[snakehead.children.length - 1].getPosition())
    }
    snakehead.children.push(newchild);
   //gameboard[snakehead.curposition.row][snakehead.curposition.col].text = -1;
   
  }
   
  if (!justate){
  for (var j=0;j<snakehead.children.length;j++){
      //alert('child ' + j);
   if (j>0){
      snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
      snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
    }
    else{
      snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
      snakehead.children[j].setPosition(snakehead.getLastPosition()); 
    }
  }
  }
  //did eat
  else{
      // leave last element alone, has position already set to last child (everyone else shift forward)
      for (var j=0;j<snakehead.children.length -1 ;j++){
          if (j>0){
              snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
              snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
           }
           else{
             snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
             snakehead.children[j].setPosition(snakehead.getLastPosition()); 
           }
         }
  }
  //check if collison
  for (var i = 0;i< snakehead.children.length;i++)
  
  {
    // check if new head position collides with any of the children == lose game/death
    if (snakehead.getPosition().row == snakehead.children[i].getPosition().row &&  snakehead.getPosition().col == snakehead.children[i].getPosition().col){
  
      //alert('index :' + i);
     // alert(snakehead.lastposition.row + " " + snakehead.lastposition.col + " (LASTHEAD)");
    // alert('head: ' + snakehead.curposition.row + " col "+ snakehead.curposition.col +'\n' + " 'child:' " + snakehead.children[i].curposition.row +  " col " + snakehead.children[i].curposition.col );
    alert("YOU LOSE");
    sub.unsubscribe();
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = false;
    return;
    }
  }
 
  }
  else if (direction == "UP"){
   //set last head to current head position (before making move)
snakehead.setLastPosition(snakehead.getPosition());
//check if head at top of gameboard, wrap around to bottom (set index to bottom row 9)
if (snakehead.curposition.row == 0){
    alert("YOU LOSE");
    sub.unsubscribe();
    this.checkHighScore(this.score);
    this.setScore(0);
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = false;
    return;
  } 
 
else{
  // moves head left one col
  var temp = snakehead.getPosition();
    temp.row -= 1;
   snakehead.setPosition(temp);
}
// check if head is on food (eats and grows)
if((gameboard[snakehead.curposition.row][snakehead.curposition.col]).text == 2){
    justate = true;
    this.setScore(this.score += 5);
    var newchild = new child();
    if (snakehead.children.length == 0)// first child
    {
      newchild.setPosition(snakehead.getLastPosition());
      
    }
    else{
      newchild.setPosition(snakehead.children[snakehead.children.length - 1].getPosition())
    }
    snakehead.children.push(newchild);
   //gameboard[snakehead.curposition.row][snakehead.curposition.col].text = -1;
   
  }
   
  if (!justate){
  for (var j=0;j<snakehead.children.length;j++){
      //alert('child ' + j);
   if (j>0){
      snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
      snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
    }
    else{
      snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
      snakehead.children[j].setPosition(snakehead.getLastPosition()); 
    }
  }
  }
  //did eat
  else{
      // leave last element alone, has position already set to last child (everyone else shift forward)
      for (var j=0;j<snakehead.children.length -1 ;j++){
          if (j>0){
              snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
              snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
           }
           else{
             snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
             snakehead.children[j].setPosition(snakehead.getLastPosition()); 
           }
         }
  }
  //check if collison
  for (var i = 0;i< snakehead.children.length;i++)
  {
    // check if new head position collides with any of the children == lose game/death
    if (snakehead.getPosition().row == snakehead.children[i].getPosition().row &&  snakehead.getPosition().col == snakehead.children[i].getPosition().col){
      //alert('index :' + i);
     // alert(snakehead.lastposition.row + " " + snakehead.lastposition.col + " (LASTHEAD)");
    // alert('head: ' + snakehead.curposition.row + " col "+ snakehead.curposition.col +'\n' + " 'child:' " + snakehead.children[i].curposition.row +  " col " + snakehead.children[i].curposition.col );
    alert("YOU LOSE");
    sub.unsubscribe();
    this.checkHighScore(this.score);
    this.setScore(0);
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = false;
    return;
    }
  }

  }
  else if (direction == "RIGHT"){
//set last head to current head position (before making move)
snakehead.setLastPosition(snakehead.getPosition());
//check if head at far right of gameboard, wrap around to left (set index to first col)
if (snakehead.curposition.col == gameboard[0].length -1){
    alert("YOU LOSE");
    sub.unsubscribe();
    this.checkHighScore(this.score);
    this.setScore(0);
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = false;
    return;
  } 
 
else{
  // moves head right one col
  var temp = snakehead.getPosition();
    temp.col += 1;
   snakehead.setPosition(temp);
}
// check if head is on food (eats and grows)
if((gameboard[snakehead.curposition.row][snakehead.curposition.col]).text == 2){
  justate = true;
  this.setScore(this.score += 5);
  var newchild = new child();
  if (snakehead.children.length == 0)// first child
  {
    newchild.setPosition(snakehead.getLastPosition());
    
  }
  else{
    newchild.setPosition(snakehead.children[snakehead.children.length - 1].getPosition())
  }
  snakehead.children.push(newchild);
 //gameboard[snakehead.curposition.row][snakehead.curposition.col].text = -1;
 
}
 
if (!justate){
for (var j=0;j<snakehead.children.length;j++){
    //alert('child ' + j);
 if (j>0){
    snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
    snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
  }
  else{
    snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
    snakehead.children[j].setPosition(snakehead.getLastPosition()); 
  }
}
}
//did eat
else{
    // leave last element alone, has position already set to last child (everyone else shift forward)
    for (var j=0;j<snakehead.children.length -1 ;j++){
        if (j>0){
            snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
            snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
         }
         else{
           snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
           snakehead.children[j].setPosition(snakehead.getLastPosition()); 
         }
       }
}
//check if collison
for (var i = 0;i< snakehead.children.length;i++)
{
  // check if new head position collides with any of the children == lose game/death
  if (snakehead.getPosition().row == snakehead.children[i].getPosition().row &&  snakehead.getPosition().col == snakehead.children[i].getPosition().col){
    //alert('index :' + i);
   // alert(snakehead.lastposition.row + " " + snakehead.lastposition.col + " (LASTHEAD)");
  // alert('head: ' + snakehead.curposition.row + " col "+ snakehead.curposition.col +'\n' + " 'child:' " + snakehead.children[i].curposition.row +  " col " + snakehead.children[i].curposition.col );
  alert("YOU LOSE");
  sub.unsubscribe();
  this.checkHighScore(this.score);
  this.setScore(0);
  var btn =<HTMLInputElement> document.getElementById('playbutton');
  btn.disabled = false;
  return;
  }
}
  }
  else if (direction == "DOWN"){
   //set last head to current head position (before making move)
snakehead.setLastPosition(snakehead.getPosition());
//check if head at top of gameboard, wrap around to bottom (set index to bottom row 9)
if (snakehead.curposition.row == gameboard.length-1){
    alert("YOU LOSE");
    sub.unsubscribe();
    this.checkHighScore(this.score);
    this.setScore(0);
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = false;
    return;
  } 
 
else{
  // moves head left one col
  var temp = snakehead.getPosition();
    temp.row += 1;
   snakehead.setPosition(temp);
}
// check if head is on food (eats and grows)
if((gameboard[snakehead.curposition.row][snakehead.curposition.col]).text == 2){
    justate = true;
    this.setScore(this.score += 5);
    var newchild = new child();
    if (snakehead.children.length == 0)// first child
    {
      newchild.setPosition(snakehead.getLastPosition());
      
    }
    else{
      newchild.setPosition(snakehead.children[snakehead.children.length - 1].getPosition())
    }
    snakehead.children.push(newchild);
   //gameboard[snakehead.curposition.row][snakehead.curposition.col].text = -1;
   
  }
   
  if (!justate){
  for (var j=0;j<snakehead.children.length;j++){
      //alert('child ' + j);
   if (j>0){
      snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
      snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
    }
    else{
      snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
      snakehead.children[j].setPosition(snakehead.getLastPosition()); 
    }
  }
  }
  //did eat
  else{
      // leave last element alone, has position already set to last child (everyone else shift forward)
      for (var j=0;j<snakehead.children.length -1 ;j++){
          if (j>0){
              snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
              snakehead.children[j].setPosition(snakehead.children[j-1].getLastPosition());
           }
           else{
             snakehead.children[j].setLastPosition(snakehead.children[j].getPosition());
             snakehead.children[j].setPosition(snakehead.getLastPosition()); 
           }
         }
  }
  //check if collison
  for (var i = 0;i< snakehead.children.length;i++)
  {
    // check if new head position collides with any of the children == lose game/death
    if (snakehead.getPosition().row == snakehead.children[i].getPosition().row &&  snakehead.getPosition().col == snakehead.children[i].getPosition().col){
      //alert('index :' + i);
     // alert(snakehead.lastposition.row + " " + snakehead.lastposition.col + " (LASTHEAD)");
    // alert('head: ' + snakehead.curposition.row + " col "+ snakehead.curposition.col +'\n' + " 'child:' " + snakehead.children[i].curposition.row +  " col " + snakehead.children[i].curposition.col );
    alert("YOU LOSE");
    sub.unsubscribe();
    this.checkHighScore(this.score);
    this.setScore(0);
    var btn =<HTMLInputElement> document.getElementById('playbutton');
    btn.disabled = false;
    return;
    }
  }

  }
  
  // BUILD MAP 
  gameboard = [[{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}],
    [{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0},{text:0}]];
    if (justate) {
      gameboard[foodposition.row][foodposition.col].text = 0;
      var newcol = Math.floor((Math.random() * 29));
      var newrow = Math.floor((Math.random() * 29));
      gameboard[newrow][newcol].text = 2;
      foodposition.row = newrow;
      foodposition.col = newcol;
    }
    else {
      gameboard[foodposition.row][foodposition.col].text = 2;
    }
    (gameboard[snakehead.curposition.row][snakehead.curposition.col]).text = -1;
  for (var i=0;i<snakehead.children.length;i++){
    gameboard[(snakehead.children[i].curposition.row)][(snakehead.children[i].curposition.col)].text = 1;
  }
  
  // HTML builder bcuz angular suxks
  var htmlstring = "";
  for (i=0;i<gameboard.length;i++){
    htmlstring += "<tr>";
    for(j=0;j<gameboard[i].length;j++){
      if (gameboard[i][j].text == 0){
        htmlstring += "<td class='bg'></td>";
      }
     else if (gameboard[i][j].text == -1){
      htmlstring += "<td class='head'></td>";
      }
     else if (gameboard[i][j].text == 1){
      htmlstring += "<td class='child'></td>";
      }
     else if (gameboard[i][j].text == 2){
      htmlstring += "<td class = 'food'></td>";
      }
      
    }
    htmlstring += "</tr>"
  }
  //document.getElementById('gameboardcontainer').innerHTML = "<table>" + htmlstring + '</table>';
  this.gb = gameboard;
}
ngOnInit(){
this.startGame();
}
customTrackBy(index: number, obj: any): any {
	return obj.text;
}
}
