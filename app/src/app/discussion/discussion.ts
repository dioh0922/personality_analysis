import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-discussion',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './discussion.html',
  styles: `
  .agree {
    color: #2e7d32;   /* 緑 */
  }

  .disagree {
    color: #c62828;   /* 赤 */
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
  .input-row {
    grid-column: 1 / -1;
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submit-btn mat-icon {
    margin: 0;
    line-height: 1;
  }

  mat-form-field {
    width: 100%;
  }
  .discussion-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  .textarea-wrapper {
    grid-column: 1 / -1;
  }

  .textarea {
    width: 100%;
  }

  .card {
    min-width: 0;
  }

  .multiline {
    white-space: pre-line;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(255, 255, 255, 0.7);
    z-index: 9999;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  `,
})
export class Discussion {
  protected prompt: string = "";
  protected persona: {agree: boolean, summary: string[]}[] = [];
  protected judge: {agree: boolean | null, summary: string | null} = {agree:null, summary:null}
  protected isLoading: boolean = false;

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
}
