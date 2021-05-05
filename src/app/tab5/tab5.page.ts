import { Component } from '@angular/core';
import {Router} from '@angular/router';
import * as generator from '../Helpers/Generators'
import * as objects from '../Helpers/Objects'
import * as defaultTheme from '../Lists/adventure-default/adventure-default.json'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  quests : objects.Quest[] = []
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
    var str = ["quest"]
    this.router.navigate(["/favorites", str])
  }

  doRefresh(event) {
    console.log(event);
    this.testPopulatePage()
    event.target.complete()
  }

  async presentToast() {
    const toast = await this.tc.create({
      message: `Quest saved to your favorites!`,
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
  nav(quest) {
    this.router.navigate(["/quest", quest])
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
    var x = this.gen.generateQuest()
    this.quests = []
    localStorage.setItem("favQuests",JSON.stringify(this.quests))
  }

  testPopulatePage()
  {
    
    this.quests = []
    for(var i = 0; i < 10; i++)
    {
      this.quests.push(this.gen.generateQuest())
    }
     //this.refresh.complete()
    console.log("asynced")
  }
  
  trashQuest(quest)
  {
    console.log("whee")

    console.log(this.quests.splice(this.quests.indexOf(quest),1))
    this.quests.push(this.gen.generateQuest())
  }

  testLog()
  {
    console.log("button pressed")
  }

  favorite(quest)
  {
    var favQuests = JSON.parse(localStorage.getItem("favQuests"))
    if(favQuests == undefined || favQuests == null)
    {
      favQuests = []
    }
    favQuests.push(quest)
    localStorage.setItem("favQuests",JSON.stringify(favQuests))

    console.log(favQuests)
    this.presentToast()
    this.trashQuest(quest)
  }
}
