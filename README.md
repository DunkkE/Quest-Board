# Quest-Board
 
This is Quest Board. An app designed to let users generate a large variety of random content using custom themes. The app is intended for web, iOS, and Android.

Currently, the only way to make use of or test the app is to clone the repo. Once you have done so, navigate to the main directory for the repo and open a command prompt/terminal window. Execute the command ionic serve (optionally, ionic serve -l), and the app should open on your web browser.

Current Features:
- Generate characters
- Generate creatures
- Generate locations
- Generate items
- Favorite any generated content
- Robust custom themes entered via JSON
To Be Implemented:
- Ability to generate from 'structure' categories without being in that category's generator
- Quest generator
- Changes to item and creature structures to allow more robust traits
- User upload/download of custom themes
- Create the themes in-app
- User can filter certain given categories in the app
Possible Implementation Later:
- Grammar detection system (improved grammar for things like plurals)

For custom themes, please see the below format for the strictly "required" information, and look in /Lists/adventure-default for an example.


{
    "name": string,
    "author": string,
    "description": string,
    "character": {
        "race": string[],
        "alignment": string[],
        "raceProperties": {
            "<given-race>": {
                "name-format": string[],
                "uniqueadjective": bool,
                "uniqueJob": bool
            }, ...
        },
        "job": {
            "standard": {
                "<given-alignment>" string[],
                ...
            }, ...
        },
        "description": string[],
         "quirk": string[],
         "goal": string[],
         "filterable": string[]
        
    },
    "creature":{
        "type": string[],
        "name": {
          "<given-type>": string[],
          ...
        },
        "description": string[],
        "quirks": string[],
        "filterable": string[]

    },
    "item":{ -- NOTE, THIS AND CREATURES WILL BE CHANGED IN THE NEAR FUTURE --
        "type": string[],
        "material": string[],
        "name": {
            "<given-type>": string[]
            },
        "description": string[],
        "quirk": string[],
        "filterable": string[]
    },
    "location":{
        "type": string[],
        "name": {
            "town": { -- will be changed to structures as an array soon, but this is the correct format for now --
                "structure": string,
                ...
                 
            }, ...
        },
        "description" : {
            "<given-type>": string[],
            ...
           },
        "quirk": {
            "<given-type>": string[]
            },
            "filterable": string[]
    },
    "quest":{
        "filterable": []
        -- removed due to generation issues, will be reimplemented --
    }
}

Important syntax notes:

- (), [], %XX% (X being a digit) must all be escaped using \ if they are intended to show up normally.
- () indicates a property to generate -- example: (character.type) will give one of the strings found in theme[character][type]
- () MUST have the full path to a STRING ARRAY. -- example:(location.description) is invalid, but (location.description.<type>) is valid.
- () - * indicates a random choice at that position. For example, (location.description.*) will choose a random type to continue into for generating a string
- () - 'this' is a reserved word for receiving a property of a previously generated property. For example, if a location's description were to include its name, it could call (this.name) and it would be replaced with the name, if there is one, rather
- [] indicates a 'choice' block. They will be removed on generation.
- [] preceded by %XX% (X being a digit) will have a XX% chance of appearing.
- [] containing the '|' character functions as an XOR-- only one of the options will be generated. More than one can be used. -- example: [Example 1|Example 2|Example 3] will result in the string Example 1, Example 2, or Example 3.
- These can be combined together, i.e. %50%[(this.name) | (character.type)] will have a 50% chance of generating either the object's name or a character type
