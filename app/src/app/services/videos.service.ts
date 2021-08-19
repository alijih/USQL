import { GlobalConstants } from './../models/apiurl ';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/videos.model';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  oRes = '';
  formData: Video = new Video;
  direccion: string= GlobalConstants.apiurl ;
  readonly rootURL=this.direccion;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(this.rootURL + '/Videos/GetVideos')
  }
  listNR() {
    return this.http.get(this.rootURL + '/Videos/GetVideosNR')
  }
  PostVideos(formData: Video) {
    return this.http.post(this.rootURL + '/Videos/PostVideos', formData)
  }
  clearFormData() {
    this.formData = {
      url:"",
      hide:1,
      titulo:""

    };
  }
}
