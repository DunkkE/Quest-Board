import { Component } from '@angular/core';
import {Router} from '@angular/router';
import * as generator from '../Helpers/Generators'
import * as objects from '../Helpers/Objects'
import * as defaultTheme from '../Lists/adventure-default/adventure-default.json'
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  items : objects.Item[] = []
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
    var str = ["item"]
    this.router.navigate(["/favorites", str])
  }

  doRefresh(event) {
    console.log(event);
    this.testPopulatePage()
    event.target.complete()
  }

  async presentToast() {
    const toast = await this.tc.create({
      message: `item saved to your favorites!`,
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
  nav(item) {
    this.router.navigate(["/item", item])
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
    var x = this.gen.generateItem()
    this.items = []
    localStorage.setItem("favitems",JSON.stringify(this.items))
  }

  testPopulatePage()
  {
    
    this.items = []
    for(var i = 0; i < 10; i++)
    {
      this.items.push(this.gen.generateItem())
    }
     //this.refresh.complete()
    console.log("asynced")
  }
  
  trashitem(item)
  {
    console.log("whee")

    console.log(this.items.splice(this.items.indexOf(item),1))
    this.items.push(this.gen.generateItem())
  }

  testLog()
  {
    console.log("button pressed")
  }

  favorite(item)
  {
    var favitems = JSON.parse(localStorage.getItem("favItems"))
    if(favitems == undefined || favitems == null)
    {
      favitems = []
    }
    favitems.push(item)
    localStorage.setItem("favItems",JSON.stringify(favitems))

    console.log(favitems)
    this.presentToast()
    this.trashitem(item)
  }
}
