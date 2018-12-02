import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Context } from '../shared/context.model';
import { Media } from '../shared/media.model'

@Component({
  selector: 'app-movie-or-show-details',
  templateUrl: './movie-or-show-details.component.html',
  styleUrls: ['./movie-or-show-details.component.css']
})
export class MovieOrShowDetailsComponent implements OnInit {
  media: Media;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.media = new Media();
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.dataService.context = this.route.snapshot.params.context;
    this.dataService.getMediaDetail(id)
      .subscribe(
      (media: any) => {
        this.media = media;
      }
      );
  }
}


