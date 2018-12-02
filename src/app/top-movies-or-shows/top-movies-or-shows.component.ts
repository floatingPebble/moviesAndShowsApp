import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Media } from '../shared/media.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Context } from '../shared/context.model';

@Component({
  selector: 'app-top-movies-or-shows',
  templateUrl: './top-movies-or-shows.component.html',
  styleUrls: ['./top-movies-or-shows.component.css']
})
export class TopMoviesOrShowsComponent implements OnInit {
  moviesForm: FormGroup;
  media: Media[];
  searchTerm: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) {
    this.media = [];
  }

  ngOnInit() {
    this.getMedia(Context.Shows);
  }

  getMedia(context: Context, clear?: boolean) {
    this.searchTerm = clear ? '' : this.searchTerm;
    this.dataService.context = context;

    this.dataService.getTopMedia()
      .subscribe(
      (media: Media[]) => {
        this.media = media;
      });
  }

  searchMedia(term: string) {
    if (term.length > 2) {
      this.dataService.getSearchMedia(term)
        .subscribe(
        (media: Media[]) => {
          this.media = media;
        });
    } else {
      this.getMedia(this.dataService.context);
    }
  }
}