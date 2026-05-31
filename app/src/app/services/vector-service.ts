import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class VectorService {
  checkMatchSakeProfile(text: string){
    axios.post(`${environment.apiBaseUrl}/ext_api/api/vector/match`, {
      text: text
    }).then(res => {
      console.log(res);
    })
  }

}
