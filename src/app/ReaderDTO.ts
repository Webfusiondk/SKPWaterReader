export class ReaderUpdateDTO {
  readerNumber: string;
  reading: string;

  constructor(readerNumber: string, reading: string) {
    this.readerNumber = readerNumber;
    this.reading = reading;
  }
}
