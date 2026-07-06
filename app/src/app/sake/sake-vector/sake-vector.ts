import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { VectorService } from '../../services/vector-service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SakeReview} from '../sake-review/sake-review';
import { VectorHistory } from './vector-history/vector-history';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Component({
  selector: 'sake-vector',
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    VectorHistory
  ],
  templateUrl: './sake-vector.html',
  styleUrl: './sake-vector.css',
})
export class SakeVector {
  protected isLoading = false
  protected text = ''
  protected tags: string[] = []
  protected analysis: any = null

  constructor(
    private vectorService: VectorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  checkSakeMatch = () => {
    this.isLoading = true
    axios.post(`${environment.apiBaseUrl}/ext_api/api/vector/match`, {
      text: this.text
    }).then(res => {
      this.isLoading = false
      this.analysis = res.data.summary
    });
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(SakeReview, {
      maxWidth: '95vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
