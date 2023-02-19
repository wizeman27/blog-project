import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroBannerComponent } from './blog/hero-banner/hero-banner.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogCategoryComponent } from './blog/blog-category/blog-category.component';
import { FeaturedCarouselComponent } from './blog/featured-carousel/featured-carousel.component';
import { BlogArticleComponent } from './blog/blog-article/blog-article.component';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroBannerComponent,
    BlogComponent,
    BlogListComponent,
    BlogCategoryComponent,
    FeaturedCarouselComponent,
    BlogArticleComponent,
    AuthComponent,
    UserProfileComponent,
    BlogEditComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
