import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatabaseService } from '../services/database-service';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-recommend',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './recommend.html',
  styleUrl: './recommend.css',
})
export class Recommend {
  protected prompt: string = "";
  protected isLoading: boolean = false;
  protected selectedIndex: number = 0;
  protected result: {summary: string, agree: boolean} = {summary: "", agree: false};
  protected profile: any = {};

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) {}

  submit = async () => {
    this.isLoading = true;
    await this.loadProfile();

    axios.post(`${environment.apiBaseUrl}/extApi/aiSrc/recommend.php`, {
        "prompt": this.prompt,
        "profile": JSON.stringify(this.profile),
        "apiMode": true
    }).then((res: any) => {
        this.result = res.data;
    }).catch((er: any) => {
      this.snackBar.open(er.message, 'close');
    }).finally(() => {
        this.isLoading = false;
    });
  }

  private loadProfile = (): Promise<void> => {
    if(this.selectedIndex === 0) {
      return this.databaseService.loadSake().then((data: any) => {
        this.profile = data;
      });
    } else if(this.selectedIndex === 1) {
      return this.databaseService.loadBeer().then((data: any) => {
        const {ranking, taste_characteristics, tendency_graph, waveform, ...parsedData} = data;
        this.profile = parsedData;
      });
    } else {
      return Promise.all([
        this.databaseService.loadSake(),
        this.databaseService.loadBeer()
      ]).then(([sakeData, beerData]) => {
        const { ranking, taste_characteristics, tendency_graph, waveform, ...parsedBeerData } = beerData;
        this.profile = { sake: sakeData, beer: parsedBeerData };
      });
    }
  }
}
