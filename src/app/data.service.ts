import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gifs = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  getTrendingGifs(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=50`)
    .subscribe((respone : any)=>{
      this.gifs.next(respone.data);
    });
  }
  searchGifs(search : string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${environment.giphyApiKey}&q=${search}&limit=50`)
    .subscribe((respone : any)=>{
      this.gifs.next(respone.data);
    });
  }
  getGiffs(){
    return this.gifs.asObservable();
  }

  getInfoGifs(id : any){
    return this.http.get(`https://api.giphy.com/v1/gifs?api_key=${environment.giphyApiKey}&ids=${id}`);

  }

  uploadGifs(gifs : any){
    return this.http.post(`https://upload.giphy.com/v1/gifs?api_key=${environment.giphyApiKey}`,gifs);
  }
}
