import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MovieOrShowDetailsComponent } from './movie-or-show-details/movie-or-show-details.component';
import { DataService } from './shared/data.service';
import { TopMoviesOrShowsComponent } from './top-movies-or-shows/top-movies-or-shows.component';


const appRoutes: Routes = [
  {path: '', component: TopMoviesOrShowsComponent},
  {path:'details/:context/:id', component: MovieOrShowDetailsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    TopMoviesOrShowsComponent,
    MovieOrShowDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    [RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})]
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
