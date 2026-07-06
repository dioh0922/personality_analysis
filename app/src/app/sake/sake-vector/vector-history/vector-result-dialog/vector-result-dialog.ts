import { Component, Inject } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vector-result-dialog',
  standalone: true,
  imports: [
    DatePipe,
    JsonPipe,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './vector-result-dialog.html',
  styleUrl: './vector-result-dialog.css',
})
export class VectorResultDialog {
  protected resultEntries: any[] | null = null;
  protected resultObject: any = null;
  protected isJson = false;
  protected isArray = false;
  protected analysis: any = null

  constructor(
    private dialogRef: MatDialogRef<VectorResultDialog>,
    @Inject(MAT_DIALOG_DATA) protected data: { result: string; prompt: string; created_at: string },
  ) {
    this.tryParse();
  }

  private tryParse() {
    try {
      const parsed = JSON.parse(this.data.result);
      this.isJson = true;
      if (Array.isArray(parsed)) {
        this.isArray = true;
        this.resultEntries = parsed;
      } else {
        this.isArray = false;
        this.resultObject = parsed;
        this.analysis = parsed;
      }
    } catch {
      this.isJson = false;
      this.resultObject = this.data.result;
    }
  }

  close() {
    this.dialogRef.close();
  }
}
