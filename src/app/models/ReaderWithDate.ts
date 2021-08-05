import {BetterReader} from '../BetterReader'
export class ReaderWithDate {
  reader: BetterReader;
  startDate: string;
  endDate: string;

  constructor(reader: BetterReader, startDate: string, endDate: string) {
    this.reader = reader;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
