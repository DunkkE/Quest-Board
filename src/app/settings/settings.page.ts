import { Component } from '@angular/core';
import * as generator from '../Helpers/Generators'
import * as objects from '../Helpers/Objects'
import * as defaultTheme from '../Lists/adventure-default/adventure-default.json'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(private gen: generator.Generators) { }

  ngOnInit() {
  }

  submit()
  {
    var input = document.getElementById("textInput")

    this.gen.theme = JSON.parse(input.textContent)

    console.log(this.gen.theme)

    localStorage.setItem("theme", input.textContent)
  }

  test()
  {
    console.log("testing")
    this.gen.resetFilter(0)
  }

}
