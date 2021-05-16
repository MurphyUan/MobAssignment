import { Injectable, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class GameService extends Phaser.Scene implements OnInit {
  constructor(config, private storage: Storage) {
    super(config);
  }
  obstacles: any;
  player: any;
  timedEvent: any;
  obstacle: any;
  obstacleToBeDeleted: any;
  deleteZone: any;
  gameActive: boolean;
  text: any;
  score: integer;
  scores: any[] = [{name: "Overlord", score:"50"}];

  preload() {
    this.load.image('sky', 'assets/Sprites/sky.png');
    this.load.image('ground', 'assets/Sprites/platform.png');
    this.load.image('star', 'assets/Sprites/star.png');
    this.load.image('bomb', 'assets/Sprites/bomb.png');
    this.load.image('pipe', 'assets/Sprites/Pipe.png');
    this.load.image('button', 'assets/icon/playButton.png');
    this.load.spritesheet('dude',
      '/assets/Sprites/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    //Add Background
    this.score = -1;
    this.add.image(150, 250, 'sky');
    this.gameActive = true;

    //Obstacle Group, not affected by gravity / Floor
    this.obstacles = this.physics.add.staticGroup();
    this.obstacles.create(150, 500, 'ground').setScale(2).refreshBody();

    //Off Screen Pipe
    this.deleteZone = this.physics.add.sprite(-100, 250, 'pipe').setScale(2).refreshBody();
    this.deleteZone.body.setAllowGravity(false);

    //Player Object
    this.player = this.physics.add.sprite(100, 300, 'dude');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    //Movement Animation / Pose
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 8 }),
      frameRate: 10
    });

    //Watch for collsions between player and floor
    this.physics.add.collider(this.player, this.obstacles);
    this.player.anims.play('right');

    //Spawn Pipes every 'delay' milliseconds
    this.timedEvent = this.time.addEvent({
      delay: 1500, callback: function () {
        this.obstacle = this.physics.add.sprite(350, Phaser.Math.Between(150, 450) + 200, 'pipe').refreshBody();
        this.obstacle.body.setAllowGravity(false);
        //this.physics.add.overlap(this.player,this.obstacle, this.gameOver);
        this.obstacle.setVelocityX(-150);
        this.score++;
      }, callbackScope: this, loop: true
    });
  }

  update() {
    //Input decide where to move character
    if (this.gameActive) {//If the game is running/ player has not collided with pipe
      this.input.on('pointerdown', () => {//On click or tap move player vertically
        this.player.setVelocityY(-400);
      });
    }
  }

  startGame(button) {
    button.off('clicked', this.startGame);
    button.input.enabled = false;
    button.setVisible(false);
  }

  gameOver() {
    this.gameActive = false;
    this.text.setText("Game Over, You Scored: " + this.score);
  }

  ngOnInit():void {
    this.storage.get("score").then((data) => {this.score = data;}).catch();//Sets u connection between Page File and Game File for scoring
  }
  //Game hates when this is called
  displayScore(){
    this.storage.set("score", this.score);//Set score equal to current score
  }
}
