import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Judge } from './judge/judge';
import { DatabaseService } from '../services/database-service';
import axios from 'axios';


@Component({
  selector: 'app-discussion',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    Judge
  ],
  templateUrl: './discussion.html',
  styleUrl: './discussion.css',
})
export class Discussion {
  protected prompt: string = "";
  protected persona: {agree: boolean, summary: string[]}[] = [];
  protected judge: {agree: boolean | null, summary: string | null} = {agree:null, summary:null}
  protected isLoading: boolean = false;
  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) {}

  submit = () => {
    this.isLoading = true;
    axios.post("https://kamata-portfolio.mydns.jp/extApi/aiSrc/discussion.php", {
        "prompt": this.prompt,
        "apiMode":true
    }).then((res: any) => {
        this.judge.agree = res.data.agree;
        this.judge.summary = res.data.summary;
        this.persona = res.data.persona;
    }).catch((er: any) => {
        console.log(er);
    }).finally(() => {
        this.isLoading = false;
    });
  }

  saveDiscussion = () => {
    if(this.judge.agree !== null){
      const data  = {
        prompt: this.prompt,
        persona: this.persona,
        judge: this.judge
      }
      this.isLoading = true;
      this.databaseService.saveDiscussion(data)
        .then(() => {
          this.snackBar.open('Discussion saved', 'close');
        })
        .catch((error) => {
          this.snackBar.open(error.message, 'close');
        }).finally(() => {
          this.isLoading = false;
        });
    }
  }
}
