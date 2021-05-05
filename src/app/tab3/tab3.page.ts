import { Component } from '@angular/core';
import {Router} from '@angular/router';
import * as generator from '../Helpers/Generators'
import * as objects from '../Helpers/Objects'
import * as defaultTheme from '../Lists/adventure-default/adventure-default.json'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  locations : objects.Location[] = []
  constructor(private tc: ToastController, private router: Router, private gen: generator.Generators) {}

  print(blah)
  {
    console.log(blah)
  }

  doRefresh(event) {
    console.log(event);
    this.testPopulatePage()
    event.target.complete()
  }

  viewFavs()
  {
    var str = ["location"]
    this.router.navigate(["/favorites", str])
  }

  viewSettings()
  {
    this.router.navigate(["/settings"])
  }
  
  ngOnInit() {
    console.log("test")
    if(this.gen.theme == undefined || this.gen.theme == null)
      this.save()
    this.testPopulatePage()
  }

  async presentToast() {
    const toast = await this.tc.create({
      message: `Location saved to your favorites!`,
      duration: 2000,
      color: "dark",
      cssClass: 'toast',
      
    })
    toast.present()
  }

  nav(character) {
    
    this.router.navigate(["/location", character])
  }

  save()
  {
    localStorage.setItem("theme", JSON.stringify(defaultTheme))
    this.gen.theme = defaultTheme
  }
  testGenerate()
  {
    var x = this.gen.generateLocation()
    this.locations = []
  }

  testPopulatePage()
  {
    this.locations = []
    for(var i = 0; i < 10; i++)
    {
      this.locations.push(this.gen.generateLocation())
    }
  }
  
  trashlocation(location)
  {
    console.log("whee")

    console.log(this.locations.splice(this.locations.indexOf(location),1))
    this.locations.push(this.gen.generateLocation())
  }

  testLog()
  {
    console.log("button pressed")
  }

  favorite(location)
  {
    var favlocations = JSON.parse(localStorage.getItem("favLocations"))
    if(favlocations == undefined || favlocations == null)
    {
      favlocations = []
    }
    favlocations.push(location)
    localStorage.setItem("favLocations",JSON.stringify(favlocations))

    console.log(favlocations)
    this.presentToast()
    this.trashlocation(location)
  }
  
}
