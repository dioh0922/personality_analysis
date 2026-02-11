import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-rank-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './add-rank-dialog.html',
})
export class AddRankDialog {
  constructor(
    private dialogRef: MatDialogRef<AddRankDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
