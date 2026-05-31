import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'recommend-history',
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  templateUrl: './recommend-history.html',
  styleUrl: './recommend-history.css',
})
export class RecommendHistory implements OnInit {
  protected history: {id: number, prompt: string, result: string, create_at: string, parse: any, question?: string}[] = [];
  ngOnInit() {
    axios.get(`${environment.apiBaseUrl}/ext_api/api/ai/recommend/list`)
    .then(res => {
      this.history = res.data.map((item: {id: number, prompt: string, result: string, create_at: string}) => {
        let parse = {};
        const match = item.prompt.match(/検討：\(([\s\S]*?)\)/)
        const value = match![1];
        const question = value ?? ''
        try {
          parse = JSON.parse(item.result);
        } catch (e) {
          console.error('Failed to parse result:', item.result);
        }
        return {
          ...item,
          parse,
          question
        }
      })
    })
  }
}
