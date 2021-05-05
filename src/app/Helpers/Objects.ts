//Where the various creations get their form

export interface Character {
  name: string;
  race: string;
  job: string;
  homeland: Location;
  description: string;
  quirks: string[];
  goal: string;
  objectType: string;
  alignment:string
  adjectiveType: string;
  jobType: string;
}

export interface Item {
  name: string;
  type: string;
  description: string;
  quirks:string[];
  material:string
  objectType: string;
}

export interface Creature {
  name: string;
  description: string;
  quirks: string[];
  objectType: string;
}

export interface Location {
  type: string;
  name: string;
  description: string;
  quirks:string[];
  objectType: string;
}

export interface Quest {
  name: string;
  type: string;
  description: string;
  location: Location;
  quirks:string[]
  objectType: string;
}