import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as objects from '../Helpers/Objects'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  item: objects.Item
  favorited = false
  favButton = document.getElementById("favoritebutton")
  constructor(private router: Router, private route:ActivatedRoute, private tc: ToastController) { }

  ngOnInit() {
    this.favButton = document.getElementById("favoritebutton")
    this.route.params.subscribe(
      param => {
        this.item = param as objects.Item;
      }
    )
    this.favorited = false
    this.checkIfFavorited()
    this.updateButton()


  }

  async saveToast() {
    const toast = await this.tc.create({
      message: `Item saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      position: "top"
    })
    toast.present()
  }
  async removeToast() {
    const toast = await this.tc.create({
      message: `Item removed from your favorites!`,
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
    favorites = JSON.parse(localStorage.getItem("favItems"))
    favorites.forEach(item => {
      if(JSON.stringify(item) == JSON.stringify(this.item))
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
    favorites = JSON.parse(localStorage.getItem("favItems"))
    
    if(this.favorited)
    {
      this.removeToast()

      favorites.splice(favorites.indexOf(this.item),1)
      localStorage.setItem("favItems",JSON.stringify(favorites))
    }
    else
    {
      this.saveToast()

      favorites.push(this.item)
      localStorage.setItem("favItems",JSON.stringify(favorites))
    }
    
    this.favorited = !this.favorited
    this.updateButton()
    console.log(favorites)
  }

}
