import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as objects from '../Helpers/Objects'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  location: objects.Location
  favorited = false
  favButton = document.getElementById("favoritebutton")
  constructor(private router: Router, private route:ActivatedRoute, private tc: ToastController) { }

  ngOnInit() {
    this.favButton = document.getElementById("favoritebutton")
    this.route.params.subscribe(
      param => {
        this.location = param as objects.Location;
      }
    )
    this.favorited = false
    this.checkIfFavorited()
    this.updateButton()


  }

  async saveToast() {
    const toast = await this.tc.create({
      message: `Location saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      position: "top"
    })
    toast.present()
  }
  async removeToast() {
    const toast = await this.tc.create({
      message: `Location removed from your favorites!`,
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
    favorites = JSON.parse(localStorage.getItem("favLocations"))
    favorites.forEach(location => {
      if(JSON.stringify(location) == JSON.stringify(this.location))
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
    favorites = JSON.parse(localStorage.getItem("favLocations"))
    
    if(this.favorited)
    {
      this.removeToast()

      favorites.splice(favorites.indexOf(this.location),1)
      localStorage.setItem("favLocations",JSON.stringify(favorites))
    }
    else
    {
      this.saveToast()

      favorites.push(this.location)
      localStorage.setItem("favLocations",JSON.stringify(favorites))
    }
    
    this.favorited = !this.favorited
    this.updateButton()
    console.log(favorites)
  }

}
