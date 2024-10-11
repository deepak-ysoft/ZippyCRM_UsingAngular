export class Customer {
  cId?: number;
  type: Types;
  pAN?: string;
  gST?: string;
  title?: Title;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
  gender?: Gender;
  dayOfBirth?: Date;
  phone?: string;
  phoneOther?: string;
  cell?: string;
  fax?: string;
  email?: string;
  email2?: string;
  website?: string;
  language?: Language;
  comments?: string;
  imagepath?: string;
  photo?: File;
  fullName?: string;

  constructor() {
    this.cId = undefined; // Default: undefined
    this.type = Types.Individual; // Default type
    this.pAN = '';
    this.gST = '';
    this.title = undefined; // Default: undefined
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.position = '';
    this.gender = undefined; // Default: undefined
    this.dayOfBirth = new Date(); // Default to today's date
    this.phone = '';
    this.phoneOther = '';
    this.cell = '';
    this.fax = '';
    this.email = '';
    this.email2 = '';
    this.website = '';
    this.language = undefined; // Default: undefined
    this.comments = '';
    this.imagepath = '';
    this.photo = undefined; // Default: undefined
    this.fullName = this.generateFullName();
  }

  private generateFullName(): string {
    debugger;
    return `${this.title ? Title[this.title] : ''} ${this.firstName || ''} ${
      this.middleName || ''
    } ${this.lastName || ''}`.trim();
  }
}

export enum Types {
  Individual = 1,
  Commercial = 2,
}

export enum Gender {
  Male = 1,
  Female = 2,
  Other = 3,
}

export enum Language {
  Hindi = 1,
  English = 2,
  Rajasthani = 3,
  Gujrati = 4,
  Tamil = 5,
}

export enum Title {
  Mr = 1,
  Miss = 2,
  Ms = 3,
  Mrs = 4,
}
