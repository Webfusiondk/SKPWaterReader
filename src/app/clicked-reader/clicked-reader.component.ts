import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { BetterReader } from '../BetterReader';
import { ReaderUpdateDTO } from '../ReaderDTO';
import { ApiService } from '../services/api.service';
import { LocationObj } from '../Location'
@Component({
  selector: 'app-clicked-reader',
  templateUrl: './clicked-reader.component.html',
  styleUrls: ['./clicked-reader.component.css']
})
export class ClickedReaderComponent implements OnInit {
  public betterReader: BetterReader;
  public readerDTO: ReaderUpdateDTO;
  public locationSave: LocationObj;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.betterReader = history.state;
    this.locationSave = new LocationObj(this.betterReader.location);
    this.readerDTO = new ReaderUpdateDTO(this.betterReader.readerNumber, this.betterReader.reading);
  }

  sendData(readerValue: string) {
    if (readerValue != '') {
      let updateValue = '';
      for (var i = 0; i < readerValue.match(/[0-9]+/g).length; i++) {
        updateValue += readerValue.match(/[0-9]+/g)[i].toString();
      }
      if (confirm("Er du sikker på du vil gemme aflæsningen: " + updateValue + " " + this.betterReader.readerUnit)) {
        this.readerDTO.reading = updateValue;
        this.readerDTO.readerNumber = this.betterReader.readerNumber;
        this.apiService.updateReader(this.readerDTO).subscribe(() => this.redirectBack());
      }
    }
    else
      window.alert("Opdatering af aflæsning fejlede.\nÅrsag: Aflæsnings data feltet er tomt")
  }


  redirectBack() {
    this.router.navigateByUrl('/readers', { state: this.locationSave });
  }
}
