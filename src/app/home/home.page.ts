import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';

class GameScene extends Phaser.Scene{
  constructor(config){
    super(config);
  }

  preload(){

  }

  create(){

  }

  update(){

  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type:Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade'
      },
      parent: 'game',
      scene: GameScene
    };
  }

  ngOnInit(): void{
    this.phaserGame = new Phaser.Game(this.config);
  }

}
