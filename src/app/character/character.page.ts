import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as objects from '../Helpers/Objects'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  character: objects.Character
  favorited = false
  favButton = document.getElementById("favoritebutton")
  constructor(private router: Router, private route:ActivatedRoute, private tc: ToastController) { }

  ngOnInit() {
    this.favButton = document.getElementById("favoritebutton")
    var x = ""
    this.route.params.subscribe(
      param => {
        x = param[0]
      }
    )
    this.character = JSON.parse(x)
    this.favorited = false
    console.log(this.character)
    this.checkIfFavorited()
    this.updateButton()


  }

  nav() {
    this.router.navigate(["/location", this.character.homeland])
  }
  async saveToast() {
    const toast = await this.tc.create({
      message: `Character saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      position: "top"
    })
    toast.present()
  }
  async removeToast() {
    const toast = await this.tc.create({
      message: `Character removed from your favorites!`,
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
    favorites = JSON.parse(localStorage.getItem("favCharacters"))
    favorites.forEach(character => {
      if(JSON.stringify(character) == JSON.stringify(this.character))
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
    favorites = JSON.parse(localStorage.getItem("favCharacters"))
    
    if(this.favorited)
    {
      this.removeToast()

      favorites.splice(favorites.indexOf(this.character),1)
      localStorage.setItem("favCharacters",JSON.stringify(favorites))
    }
    else
    {
      this.saveToast()

      favorites.push(this.character)
      localStorage.setItem("favCharacters",JSON.stringify(favorites))
    }
    
    this.favorited = !this.favorited
    this.updateButton()
    console.log(favorites)
  }

}
