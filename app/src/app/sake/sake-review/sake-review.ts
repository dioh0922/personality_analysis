import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { ReviewList } from './review-list/review-list';

import axios from 'axios';
import * as taste from '../../../resources/taste.json';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sake-review',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    ReviewList
  ],
  templateUrl: './sake-review.html',
  styleUrl: './sake-review.css',
})
export class SakeReview implements AfterViewInit {
  protected name = ''
  protected score = 0
  protected review = ''
  protected isLoading = false
  protected sentimentArray: any[] = []
  protected sentiment = ''
  protected reason = ''
  protected tagArray: any[] = []
  protected tags = new FormControl<string[]>([])
  protected reviewList: any[] = []
  constructor(
    private dialogRef: MatDialogRef<SakeReview>,
  ){
  }

  ngAfterViewInit(){
    this.loadViewData()
  }

  loadViewData(){
    this.isLoading = true
    axios.get(`${environment.apiBaseUrl}/ext_api/api/vector/review`)
    .then(res => {
      const records = res.data
      records.map((item: any) => {
        const tag = JSON.parse(item.tags)
        this.tagArray = [
          ...this.tagArray,
          ...tag
        ]
        this.sentimentArray.push(item.sentiment)
        return item
      })

      this.reviewList = records
      this.tagArray = [...new Set(this.tagArray)].map(item => ({
        value: item,
        label: taste[item as keyof typeof taste]
      }))
      this.sentimentArray = [...new Set(this.sentimentArray)]
    }).finally(() => {
      this.isLoading = false
    })
  }

  cancel(){
    this.dialogRef.close()
  }

  submit(){
    this.isLoading = true;
    axios.post(`${environment.apiBaseUrl}/ext_api/api/vector/review`, {
      name:this.name,
      score:this.score,
      sentiment:this.sentiment,
      tags: this.tags.value ?? [],
      reason_summary:this.reason,
      review:this.review
    }).then(res => {
      this.dialogRef.close();
    }).catch(error => {
      console.error('Error submitting review:', error);
    }).finally(() => {
      this.isLoading = false
    })
  }

  delete(e: any){
    this.isLoading = true
    axios.delete(`${environment.apiBaseUrl}/ext_api/api/vector/review/${e}`)
    .then(res => {
      this.loadViewData()
    }).catch(error => {
      console.error('Error submitting review:', error);
    }).finally(() => {
      this.isLoading = false
    })
  }
}
