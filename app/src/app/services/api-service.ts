import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  callAllTechListVector = async () => {
    const [meta, vector] = await Promise.all([
      axios.get(`${environment.apiBaseUrl}/all_tech_list/api/dump/meta`),
      axios.get(`${environment.apiBaseUrl}/all_tech_list/api/dump/vector`)
    ]).catch((error) => {
      console.error('Error fetching data:', error);
      return [null, null];
    });
    return [meta, vector];
  }
}
