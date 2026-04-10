import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    CommonModule,
    FormsModule
  ],
  templateUrl: './recommend.html',
  styleUrl: './recommend.css',
})
export class Recommend {
  protected prompt: string = "";
  protected isLoading: boolean = false;
  protected result: string = "";
  constructor(
    private snackBar: MatSnackBar
  ) {}

  submit = () => {
    this.isLoading = true;
    axios.post("https://kamata-portfolio.mydns.jp/extApi/aiSrc/recommend.php", {
        "prompt": this.prompt,
        "apiMode":true
    }).then((res: any) => {
        this.result = res.data.result;
    }).catch((er: any) => {
      this.snackBar.open(er.message, 'close');
    }).finally(() => {
        this.isLoading = false;
    });
  }
}
