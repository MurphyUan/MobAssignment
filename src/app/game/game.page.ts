import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import Phaser from 'phaser';
import GameService from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})

export class GamePage implements OnInit {
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  score: integer = 0;
  constructor(private storage: Storage) {
    this.config = {
      type:Phaser.AUTO,//chooses renderer
      width: 300,//window width
      height: 500,//window height
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y:900},//gravity modifier
          debug: false
        }
      },
      parent: 'game',//Place to Display when compiled
      scene: GameService//game.service.ts
    };
   }
  ngOnInit():void {
    this.storage.get("score").then((data) => {this.score = data;}).catch();//Sets u connection between Page File and Game File for scoring
    this.phaserGame = new Phaser.Game(this.config);
  }
}
