import { environment } from '../../environments/environment';

export class Media {
  public id: number;
  public title: string;
  public poster: string;
  public overview: string;

  constructor(resMedia?: any) {
    this.id = resMedia ? resMedia.id : 0;
    this.title = resMedia ? (resMedia.title || resMedia.name) : '';
    this.overview = resMedia ? resMedia.overview : '';

    let image = resMedia ? (resMedia.backdrop_path || resMedia.poster_path) : '';
    if (image) {
      this.poster = environment.imagePath + image;
    } else {
      this.poster = '/assets/images/default_bg.jpg';
    }
  }
}