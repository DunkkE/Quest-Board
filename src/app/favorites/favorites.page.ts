import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as objects from '../Helpers/Objects'
import {ToastController} from '@ionic/angular'
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  type: any
  button: any
  favorites : any[]
  constructor(private router: Router, private route:ActivatedRoute, private tc: ToastController) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.type= param[0];
      }
    )
    var m = "abc"
    m = m[0].toUpperCase() + m.substring(1)
    this.genFavorites()
  }

  async presentToast() {
    var message = this.type
    message = message[0].toUpperCase() + message.substring(1)
    const toast = await this.tc.create({
      message: `${message} removed from your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast'
    })
    toast.present()
  }

  genFavorites()
  {
    var storageVar = ""
    switch(this.type)
    {
      case "creature":
        storageVar = "favCreatures"
        this.button = document.getElementById("creatbutt")
        break;
      case "character":
        storageVar = "favCharacters"
        this.button = document.getElementById("charbutt")
        break;
      case "location":
        storageVar = "favLocations"
        this.button = document.getElementById("locbutt")
        break;
      case "quest":
        storageVar = "favQuests"
        this.button = document.getElementById("questbutt")
        break;
      case "item":
        storageVar = "favItems"
        this.button = document.getElementById("itembutt")
        break;

    }
    this.button.color="primary"
    this.favorites = []
    this.favorites = JSON.parse(localStorage.getItem(storageVar))
    console.log(this.favorites)
  }
  load(toLoad) {
      this.type = toLoad
      this.button.color="dark"
    this.genFavorites()

    this.button.color="primary"

  }

  remove(item)
  {
    var storageVar
    switch(this.type)
    {
      case "creature":
        storageVar = "favCreatures"
        break;
      case "character":
        storageVar = "favCharacters"
        break;
      case "location":
        storageVar = "favLocations"
        break;
      case "quest":
        storageVar = "favQuests"
        break;
      case "item":
        storageVar = "favItems"
        break;

    }

    this.favorites.forEach(fav => {
      if(JSON.stringify(fav) == JSON.stringify(item))
      {
        this.favorites.splice(this.favorites.indexOf(fav),1)
      }
    })
    localStorage.setItem(storageVar,JSON.stringify(this.favorites))
    this.presentToast()
  }



}
