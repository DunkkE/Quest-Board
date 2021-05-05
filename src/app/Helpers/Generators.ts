import {Character, Creature, Item, Location, Quest} from './Objects'
import {Injectable} from '@angular/core'
import * as blah from '../Lists/adventure-default/adventure-default.json'
@Injectable ({
  providedIn: "root",
})
export class Generators {
  selectedRaces: [string]
  theme: any
  testString = "test111"
  filters = []
  constructor() {
    this.theme = JSON.parse(localStorage.getItem("theme"))
    console.log(this.theme)
    if(this.theme.default != undefined)
    {
      console.log(this.theme.default)
      console.log("above")
      this.theme = this.theme.default
    }

    console.log(this.theme)
    this.getFilters()
  }


  onChangeTheme() {
    this.theme = JSON.parse(localStorage.getItem("theme"))
  }

  removeSubstring(initString: string, indexStart: number, indexEnd: number): string
  {
    
    var retString = (initString.substring(0,indexStart) + (initString.substring(indexEnd)))
    /*console.log("initial string:" + initString)
    console.log("index of the removal: " + indexStart + " - " + indexEnd)
    console.log("being removed: " + initString.substring(indexStart,indexEnd))
    console.log("result of removal:"+initString.substring(0, indexStart))
    console.log("remaining string: " + retString)*/
    return retString
  }
  injectSubstring(initString: string, substring: string, index: number): string {

    //console.log(initString.substring(0,index) + " --- " + substring + " --- " + initString.substring(index))
    var retString = initString.substring(0,index) + substring + initString.substring(index)
    return retString
  }

  parseGeneratorString(parseableString: string) : any[]
  {
    
    let parenRegex = /\([^\(\\]+\)/g
    let brackRegex = /\[[^\[\\]+\]/g
    let percenRegex = /%\d{1}[^\\]%(\([^\(\\]+\)|\[[^\\\%]+\])/g
    let orRegex = /(?<!\\)\|/g
    var x
    // Scan for %XX%
    var percentArray = []
    while(x = percenRegex.exec(parseableString)) {
      percentArray.push(x)

    }


    for(var i = 0; i < percentArray.length; i++)
    {
      var match = percentArray[i]
      var value = Number.parseFloat(match[0].substring(1,3))/100
      if(Math.random() < value)
      {
        for(var j = i+1; j < percentArray.length; j++)
        {
          percentArray[j]["index"] -= 4
        }
        parseableString = this.removeSubstring(parseableString,match["index"],(match["index"] + 4))
        //parseableString = this.injectSubstring(parseableString, match[0].substring(4), match["index"])

        
      }
      else
      {
        for(var j = i+1; j < percentArray.length; j++)
        {
          percentArray[j]["index"] -= match[0].length
        }
        parseableString = this.removeSubstring(parseableString,match["index"],(match["index"] + match[0].length))
        
        
      }
    }

    // Scan for () - regex \([^\(\\]+\)
    
    var replaceArray = []
    
    while(x = parenRegex.exec(parseableString)) {
      replaceArray.push(x)
      
      
    }   
    // Scan for | within ()
    
    for(let i = 0; i < replaceArray.length; i++)
    {
      

      let ret = replaceArray[i][0].substring(1,replaceArray[i][0].length-1).split(orRegex)
      if(ret.length > 1)
      {

        let chosenString = ret[this.generateRandom(ret.length)]
        let toRemove = replaceArray[i][0].length -ret.length
        toRemove+= 1
        toRemove -= chosenString.length
        let end = replaceArray[i]["index"] + replaceArray[i][0].length
        replaceArray[i][0] = "(" + chosenString + ")"

        // Replace the original choices with the chosen string, update all the indices
          let removedString = this.removeSubstring(parseableString,replaceArray[i]["index"],end)
          parseableString = this.injectSubstring(removedString,replaceArray[i][0],replaceArray[i]["index"])
        for(let j = i+1; j < replaceArray.length; j++)
        {
          replaceArray[j]["index"] -= toRemove

        }
        

      }
      
    }
    
    var tempArr = (JSON.parse(JSON.stringify(replaceArray)))


     // Scan for []
     var brackArray = []

     while(x = brackRegex.exec(parseableString)) {
       brackArray.push(x)
     }

    // Scan for | within [], finish them up and place inside.
    for(let i = 0; i < brackArray.length; i++)
    {
      

      let ret = brackArray[i][0].substring(1,brackArray[i][0].length-1).split(orRegex)
      let toRemove = 0
      if(ret.length > 1 )
      {


        let chosenString = ret[this.generateRandom(ret.length)]


        toRemove = brackArray[i][0].length - chosenString.length


        let end = brackArray[i]["index"] + brackArray[i][0].length
        let removedString = this.removeSubstring(parseableString,brackArray[i]["index"],end)
        parseableString = this.injectSubstring(removedString, chosenString, brackArray[i]["index"])
        
      }
      else {
        let chosenString = ret[0]
        toRemove = 2
        let end = brackArray[i]["index"] + brackArray[i][0].length
        let removedString = this.removeSubstring(parseableString,brackArray[i]["index"],end)
        parseableString = this.injectSubstring(removedString, chosenString, brackArray[i]["index"])
        
      }

      for(let j = i+1; j < brackArray.length; j++)
        {
          brackArray[j]["index"] -= toRemove
        }
      
    }
    //Refill the replaceArray, regex would be faster than the other way.

    replaceArray = []

    while(x = parenRegex.exec(parseableString)) {
      replaceArray.push(x)
    }
    for(let i = 0; i < replaceArray.length; i++)
    {
      
      //console.log(returnedObjects[0][0])
      let ret = replaceArray[i][0].substring(1,replaceArray[i][0].length-1)
     
        let toRemove = 2
        replaceArray[i][0] = ret

        let end = replaceArray[i]["index"] + replaceArray[i][0].length + 2
        let removedString = this.removeSubstring(parseableString,replaceArray[i]["index"],end)
        parseableString = this.injectSubstring(removedString, replaceArray[i][0], replaceArray[i]["index"])
        for(let j = i+1; j < replaceArray.length; j++)
        {
          replaceArray[j]["index"] -= toRemove
        }
      
      
    }
    




    replaceArray.push(parseableString)


    
   
    return replaceArray
  }

  fillGeneratorString(replaced: any[], thisRef: any): any
  {
    let stringIndex = replaced.length-1
    for(let i = 0; i < stringIndex; i++)
    {
      let split = replaced[i][0].split(".")
      let toRemove = 0;

      let toReplace = ""
      if(split[0] == "this")
      {
        toReplace = thisRef[split[1]]

      }
      else
      {
        let level = this.theme
        

        for(let k = 0; k < split.length; k++)
        {
          
          // Wildcard
          if(split[k] == "*")
          {

            split[k] = Object.keys(level)[this.generateRandom(Object.keys(level).length)]

          }
          else if(split[k] == "this")
          {
            split[k] = thisRef[split[k+1]]
            split.splice(k+1,1)
          }
          else if(split[k] == "structure")
          {
            //TODO execute special code for structure
          }
          //console.log(split[k])
          
          level = level[split[k]]
          //console.log(level)
          //console.log(thisRef)
          console.log(replaced[stringIndex])
        }
        var r  = this.generateRandom(level.length)
        toReplace = level[r]
      }
      
      toRemove = replaced[i][0].length - toReplace.length
        let end = replaced[i][0].length + replaced[i]["index"]
        
        replaced[i][0] = toReplace
        let removedString = this.removeSubstring(replaced[stringIndex],replaced[i]["index"],end)
        replaced[stringIndex] = this.injectSubstring(removedString,toReplace,replaced[i]["index"])
      for(let j = i+1; j < stringIndex; j++)
      {
        replaced[j]["index"] -= toRemove
      }
    }
    return replaced[stringIndex]
  }

  generateRandom(rangeExclusive: number) : number{
    return Math.floor((Math.random()*rangeExclusive))
  }

  generateCharacter(existingChar?: Character) : Character {
    var character: Character = {name: "Bombulo", race: "", description: "", job: "JOB", quirks: [], homeland: null, goal: "a", objectType: "character", alignment: "neutral", adjectiveType: "standard", jobType: "standard"}
    console.log("here is the character")
    console.log(character)
    if(existingChar == undefined)
    {
      var char = this.theme.character

      var race = char.race
      var chosenRace = race[this.generateRandom(race.length)]
      character.race = chosenRace
      //character.alignment = char.job.standard
      var properties = char.raceProperties[chosenRace]
      char.raceProperties
      var nameChoice = this.generateRandom(properties["name-format"].length)
      var nameChoiceString = properties["name-format"][nameChoice]

      character.alignment = char.alignment[this.generateRandom(char.alignment.length)]

      // Select if the character will use the standard jobs or their race's unique jobs, if they have any
      if(properties.uniqueJob && Math.random() < 0.5)
      {
          character.jobType = character.race
      }
      var jobChoices = char.job[character.jobType]
      // Choose jobs based off of the character's alignment
      jobChoices = jobChoices[character.alignment]
      //console.log(jobChoices)
      character.job = jobChoices[this.generateRandom(jobChoices.length)]
      //console.log(character)


      var goalChoiceString = this.parseGeneratorString(char.goal[this.generateRandom(char.goal.length)])
      character.goal = this.fillGeneratorString(goalChoiceString, character)
      //character.race = "Human"
      //nameChoiceString = "(character.name.Human.first-single) %50%[blah |bleh ](character.name.Human.last-single)"
      var toBeReplaced = this.parseGeneratorString(nameChoiceString)
      
      var tempObj = {0:"this.name", "index":0}
      
      character.name = this.fillGeneratorString(toBeReplaced, character)
      //console.log(character)
      toBeReplaced = this.parseGeneratorString(char.description[this.generateRandom(char.description.length)])
      
      character.description = this.fillGeneratorString(toBeReplaced,character)
      character.homeland = this.generateLocation()
      var quirkCountStr = localStorage.getItem("quirkCount")
      if(quirkCountStr == null)
      {
        quirkCountStr = "3"
        localStorage.setItem("quirkCount","3")
      }
      var quirkCountMax = Number.parseInt(quirkCountStr)
      var quirkString;
      var quirkCount = this.generateRandom(quirkCountMax) + 1
      for(var i = 0; i < quirkCount; i++)
      {
        quirkString = char.quirk[this.generateRandom(char.quirk.length)]
        toBeReplaced = this.parseGeneratorString(quirkString)
        character.quirks.push(this.fillGeneratorString(toBeReplaced,character))
      }
      console.log(character)
    }
    else
    {

    }
    return character
  }



  rerollCharacter(character: Character, savedAttributes: [string]) {
    var tempChar : Character

    savedAttributes.forEach(attr => {
      var parameter = attr.toLowerCase()
      tempChar[parameter] = character[parameter]
    })

    console.log(tempChar)
    character = this.generateCharacter(tempChar)

  }

  generateLocation(existingLocation?: Location) : Location {
    var location =  {name:"Test",type:"",quirks:[],objectType:"location",description:""}
    let loc = this.theme.location
    if(existingLocation == undefined)
    {
      location.type = loc.type[this.generateRandom(loc.type.length)]
      var nameStructure = loc.name[location.type].structure
      let toBeReplaced = this.parseGeneratorString(nameStructure)
      location.name = this.fillGeneratorString(toBeReplaced,location)

      var descString = loc.description[location.type][this.generateRandom(loc.description[location.type].length)]
      toBeReplaced = this.parseGeneratorString(descString)
      
      location.description =  this.fillGeneratorString(toBeReplaced,location)
      var quirkString = loc.quirk[location.type][this.generateRandom(loc.quirk[location.type].length)]
      toBeReplaced = this.parseGeneratorString(quirkString)
      location.quirks.push(this.fillGeneratorString(toBeReplaced,location))
    }
    else
    {

    }

    console.log(location)
    return location
  }




  
  rerollLocation(location: Location, savedAttributes: [string]) {
    
  }

  generateQuest(existingQuest?: Quest) : Quest {
    var quest: Quest = {name: "test", type: "test", description: "test", objectType: "quest", location: {name:"",type:"",quirks:[""],objectType:"location",description:""}, quirks:[""]}
    return quest
  }

  
  rerollQuest(quest: Quest, savedAttributes: [string]) {

  }
  generateCreature(existingCreature?: Creature) : Creature
  {
    let cr = this.theme.creature
    var creature: Creature = {name:"",description:"",quirks:[],objectType:"creature"}
    if(existingCreature == undefined)
    {
      //TODO add actual naming to creatures instead of just using type. Comes post-release.
      var creatureType = cr.type[this.generateRandom(cr.type.length)]
      console.log(creatureType)
      creature.name = cr.name[creatureType][this.generateRandom(creatureType.length)]
      var descString = cr.description[this.generateRandom(cr.description.length)]
      let toBeReplaced = this.parseGeneratorString(descString)
      creature.description = this.fillGeneratorString(toBeReplaced,creature)

      var quirkString = cr.quirks[this.generateRandom(cr.quirks.length)]
      toBeReplaced = this.parseGeneratorString(quirkString)
      creature.quirks.push(this.fillGeneratorString(toBeReplaced,creature))
      console.log(creature)
    }

    return creature
  }
  rerollCreature(creature: Creature, savedAttributes: [string]) {

  }

  generateItem(existingItem?: Item) : Item {

    var returnItem: Item = {name: "name", type:undefined, description:"blah", quirks:[], material: undefined, objectType: "item"}
    var it = this.theme.item
    if(existingItem == undefined)
    {
      var typeString = it.type[this.generateRandom(it.type.length)]
      returnItem.type = typeString
      
      returnItem.name = it.name[typeString][this.generateRandom(it.name[typeString].length)]
      var descString = it.description[this.generateRandom(it.description.length)]
      var toBeReplaced = this.parseGeneratorString(descString)
      returnItem.description = this.fillGeneratorString(toBeReplaced,returnItem)

      var quirkString = it.quirk[this.generateRandom(it.quirk.length)]
      toBeReplaced = this.parseGeneratorString(quirkString)
      returnItem.quirks.push(this.fillGeneratorString(toBeReplaced,returnItem))
      console.log(returnItem)

    }
    else
    {
      //TODO make reroll code, not for initial release.
    }

    return returnItem
  }
  rerollItem(item: Item, savedAttributes: [string]) {
    console.log(item)
    var tempItem : Item = {name: undefined, type: undefined, description:undefined, quirks: undefined, material:undefined, objectType: "item"}
    for(var i = 0; i < savedAttributes.length; i++)
    {
     var parameter = savedAttributes[i].toLowerCase()
     tempItem[parameter] = item[parameter]
    }
    
    console.log(tempItem)

    item = this.generateItem(tempItem);
    
    
  }


    //Filtering section

    getFilters()
    {
      this.filters.push(JSON.parse(localStorage.getItem("characterFilter")))
      this.filters.push(JSON.parse(localStorage.getItem("creatureFilter")))
      this.filters.push(JSON.parse(localStorage.getItem("locationFilter")))
      this.filters.push(JSON.parse(localStorage.getItem("itemFilter")))
      this.filters.push(JSON.parse(localStorage.getItem("questFilter")))


      for(var i =0; i < 5; i++)
      {
        var filter = this.filters[i]
        if(filter == null || filter == undefined)
        {
          this.resetFilter(i)
        }
      }
      
    }

   resetFilter(index: number)
   {
     var type = ""
     

     switch(index)
     {
      case 0:
        type = "character"
        break;
      case 1:
        type = "creature"
        break;
      case 2:
        type = "location"
        break;
      case 3:
        type = "item"
        break;
      case 4:
        type = "character"
        break;
      default:
        type = "character"
     }
     
     var storageVar = type + "Filter"
     console.log(this.theme)
     console.log(type)
     var place = this.theme[type].filterable as []
    console.log(place)

    var filterObj : any


    filterObj = 
    {
      "filters": place
      
    }

    for(var i = 0; i < place.length; i++)
    {
      
      var possibilities = this.theme[type][place[i]]
      console.log(possibilities)
      filterObj[place[i]] = possibilities

    }
    localStorage.setItem(storageVar,JSON.stringify(filterObj))
    
    console.log(JSON.parse(localStorage.getItem(storageVar)))
    
  

    
    


   }

  

  

}
