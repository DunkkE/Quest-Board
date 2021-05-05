import { Component } from '@angular/core';
import * as generator from '../Helpers/Generators'
import * as objects from '../Helpers/Objects'
import * as defaultTheme from '../Lists/adventure-default/adventure-default.json'
import {ToastController} from '@ionic/angular'
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
   characters : objects.Character[] = []
   constructor(private router: Router, private gen: generator.Generators, public tc: ToastController) {
  
  }
  

   ngOnInit() {
    console.log("test")
    if(this.gen.theme == undefined || this.gen.theme == null)
    this.save()
    this.testPopulatePage()
  }

  print(blah)
  {
    console.log(blah)
  }

  viewFavs()
  {
    var str = ["character"]
    this.router.navigate(["/favorites", str])
  }

  doRefresh(event) {
    console.log(event);
    this.testPopulatePage()
    event.target.complete()
  }
  async presentToast() {
    const toast = await this.tc.create({
      message: `Character saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      
    })
    toast.present()
  }
  nav(character) {
    var x = [JSON.stringify(character)]
    this.router.navigate(["/character", x])
  }
  
  viewSettings()
  {
    this.router.navigate(["/settings"])
  }

  save()
  {
    
    localStorage.setItem("theme", JSON.stringify(defaultTheme))
    this.gen.theme = JSON.parse(localStorage.getItem("theme")).default
    console.log(this.gen.theme)
  }
  testGenerate()
  {
    var x = this.gen.generateCharacter()
    this.characters = []
  }

  testPopulatePage()
  {
    this.characters = []
    for(var i = 0; i < 10; i++)
    {
      this.characters.push(this.gen.generateCharacter())
    }
  }
  
  trashCharacter(character)
  {
    console.log("whee")

    console.log(this.characters.splice(this.characters.indexOf(character),1))
    this.characters.push(this.gen.generateCharacter())
  }

  testLog()
  {
    console.log("button pressed")
  }

  favorite(character)
  {
    var favCharacters = JSON.parse(localStorage.getItem("favCharacters"))
    if(favCharacters == undefined || favCharacters == null)
    {
      favCharacters = []
    }
    favCharacters.push(character)
    localStorage.setItem("favCharacters",JSON.stringify(favCharacters))

    console.log(favCharacters)
    this.presentToast()
    this.trashCharacter(character)
  }
}
