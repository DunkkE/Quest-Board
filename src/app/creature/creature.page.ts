import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as objects from '../Helpers/Objects'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-creature',
  templateUrl: './creature.page.html',
  styleUrls: ['./creature.page.scss'],
})
export class CreaturePage implements OnInit {
  creature: objects.Creature
  favorited = false
  favButton = document.getElementById("favoritebutton")
  constructor(private router: Router, private route:ActivatedRoute, private tc: ToastController) { }

  ngOnInit() {
    this.favButton = document.getElementById("favoritebutton")
    this.route.params.subscribe(
      param => {
        this.creature = param as objects.Creature;
      }
    )
    this.favorited = false
    this.checkIfFavorited()
    this.updateButton()


  }

  async saveToast() {
    const toast = await this.tc.create({
      message: `Creature saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      position: "top"
    })
    toast.present()
  }
  async removeToast() {
    const toast = await this.tc.create({
      message: `Creature removed from your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      position: "top"

    })
    toast.present()
  }



  checkIfFavorited()
  {
    var favorites = []
    favorites = JSON.parse(localStorage.getItem("favCreatures"))
    favorites.forEach(creature => {
      if(JSON.stringify(creature) == JSON.stringify(this.creature))
      {
        console.log("found it")
        this.favorited = true
        return
      }
      
    })
  }

  updateButton()
  {
    if(this.favorited)
    {
      console.log("favorited")
      this.favButton.innerText = "Remove From Favorites"
    }
    else
    {
      console.log("not favorited")
      this.favButton.innerText = "Add To Favorites"
    }
  }

  addToFavorites()
  {
    var favorites = []
    favorites = JSON.parse(localStorage.getItem("favCreatures"))
    
    if(this.favorited)
    {
      this.removeToast()

      favorites.splice(favorites.indexOf(this.creature),1)
      localStorage.setItem("favCreatures",JSON.stringify(favorites))
    }
    else
    {
      this.saveToast()

      favorites.push(this.creature)
      localStorage.setItem("favCreatures",JSON.stringify(favorites))
    }
    
    this.favorited = !this.favorited
    this.updateButton()
    console.log(favorites)
  }

}
