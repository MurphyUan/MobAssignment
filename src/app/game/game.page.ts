import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene{
  constructor(config){
    super(config);
  }

  obstacles: any;
  player: any;
  clock: any;
  cursors: any;

  preload(){
    this.load.image('sky','assets/Sprites/sky.png');
    this.load.image('ground','assets/Sprites/platform.png');
    this.load.image('star','assets/Sprites/star.png');
    this.load.image('bomb','assets/Sprites/bomb.png');
    this.load.image('pipe','assets/Sprites/Double Pipe.png');
    this.load.spritesheet('dude',
      '/assets/Sprites/dude.png',
      {frameWidth: 32, frameHeight: 48}
    );
  }
  
  create(){
    //Pause Scene
    this.physics.pause();
    //Add Background
    this.add.image(150,250,'sky');
    //Obstacle Group, not affected by gravity
    this.obstacles = this.physics.add.staticGroup();
    //Floor
    this.obstacles.create(150,500,'ground').setScale(2).refreshBody();
    //Player Object
    this.player = this.physics.add.sprite(100,300,'dude');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    //Movement Animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude',{ start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude',{start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    });
    //Watch for collsions between player and obstacle
    this.physics.add.collider(this.player,this.obstacles);
  }

  update(){
    //Input decide where to move character
    this.input.on('pointerdown',()=>{
      this.player.setVelocityY(-300);
    });

    //No Input Make Player Stand Still
    this.input.on('pointerup', ()=>{
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    });
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type:Phaser.AUTO,
      width: 300,
      height: 500,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y:600},
          debug: false
        }
      },
      parent: 'game',
      scene: GameScene
    };
   }

  ngOnInit():void {
    this.phaserGame = new Phaser.Game(this.config);
  }

}
