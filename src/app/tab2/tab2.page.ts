import { Component } from '@angular/core';
import {Router} from '@angular/router';
import * as generator from '../Helpers/Generators'
import * as objects from '../Helpers/Objects'
import * as defaultTheme from '../Lists/adventure-default/adventure-default.json'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  creatures : objects.Creature[] = []
  refresh = document.getElementById('refresh')
  constructor(private router: Router, private gen: generator.Generators, public tc: ToastController) {
  
  }
  
  ngOnInit() {
    if(this.gen.theme == undefined || this.gen.theme == null)
      this.save()
    console.log("test")
    this.testPopulatePage()
  }

  viewFavs()
  {
    var str = ["creature"]
    this.router.navigate(["/favorites", str])
  }

  doRefresh(event) {
    console.log(event);
    this.testPopulatePage()
    event.target.complete()
  }

  async presentToast() {
    const toast = await this.tc.create({
      message: `Creature saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      
    })
    toast.present()
  }

  print(blah)
  {
    console.log(blah)
  }
  nav(creature) {
    this.router.navigate(["/creature", creature])
  }

  viewSettings()
  {
    this.router.navigate(["/settings"])
  }
  
  save()
  {
    localStorage.setItem("theme", JSON.stringify(defaultTheme))
    console.log(localStorage.getItem("theme"));
  }
  testGenerate()
  {
    var x = this.gen.generateCreature()
    this.creatures = []
    localStorage.setItem("favCreatures",JSON.stringify(this.creatures))
  }

  testPopulatePage()
  {
    
    this.creatures = []
    for(var i = 0; i < 10; i++)
    {
      this.creatures.push(this.gen.generateCreature())
    }
     //this.refresh.complete()
    console.log("asynced")
  }
  
  trashCreature(creature)
  {
    console.log("whee")

    console.log(this.creatures.splice(this.creatures.indexOf(creature),1))
    this.creatures.push(this.gen.generateCreature())
  }

  testLog()
  {
    console.log("button pressed")
  }

  favorite(creature)
  {
    var favCreatures = JSON.parse(localStorage.getItem("favCreatures"))
    if(favCreatures == undefined || favCreatures == null)
    {
      favCreatures = []
    }
    favCreatures.push(creature)
    localStorage.setItem("favCreatures",JSON.stringify(favCreatures))

    console.log(favCreatures)
    this.presentToast()
    this.trashCreature(creature)
  }
}
