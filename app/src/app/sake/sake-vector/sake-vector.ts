import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VectorService } from '../../services/vector-service';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'sake-vector',
  imports: [FormsModule, MatProgressSpinnerModule],
  templateUrl: './sake-vector.html',
  styleUrl: './sake-vector.css',
})
export class SakeVector {
  protected isLoading = false
  protected text = ''
  protected analysis: any = null
  constructor(private vectorService: VectorService) {}

  checkSakeMatch(){
    this.isLoading = true
    axios.post(`${environment.apiBaseUrl}/ext_api/api/vector/match`, {
      text: this.text
    }).then(res => {
      this.isLoading = false
      console.log(res.data)
      this.analysis = res.data.summary
    })
  }
}
