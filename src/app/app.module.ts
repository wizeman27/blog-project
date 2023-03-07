import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TuiEditorModule, TuiEditorSocketModule } from '@taiga-ui/addon-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroBannerComponent } from './blog/hero-banner/hero-banner.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { FeaturedCarouselComponent } from './blog/featured-carousel/featured-carousel.component';
import {
  BlogArticleComponent,
  DeleteDialog,
  EditDialog,
} from './blog-article/blog-article.component';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import {
  BlogEditComponent,
  DiscardDialog,
} from './blog-edit/blog-edit.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroBannerComponent,
    BlogComponent,
    BlogListComponent,
    FeaturedCarouselComponent,
    BlogArticleComponent,
    AuthComponent,
    UserProfileComponent,
    BlogEditComponent,
    AboutUsComponent,
    DiscardDialog,
    DeleteDialog,
    EditDialog,
    ScrollToTopComponent,
    AllBlogsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    TuiRootModule,
    TuiAlertModule,
    TuiEditorModule,
    TuiEditorSocketModule
  ],
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DiscardDialog, DeleteDialog, EditDialog],
})
export class AppModule {}
