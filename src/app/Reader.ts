export class Reader {
  readerName: string;
  placement: string;
  reading: string;
  readerUnit: string;
  date: string;
  readerNumber: string;
  location: string;
  constructor(readerName: string, placement: string, readerUnit: string, reading: string, date: string, readerNumber: string, location: string) {
    this.readerName = readerName;
    this.placement = placement;
    this.readerUnit = readerUnit;
    this.reading = reading;
    this.date = date;
    this.readerNumber = readerNumber;
    this.location = location;
  }
  getDate(): Date{
    return new Date(this.date);
  }
}
