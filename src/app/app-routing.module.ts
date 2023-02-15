import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { BlogArticleComponent } from './blog/blog-article/blog-article.component';
import { BlogCategoryComponent } from './blog/blog-category/blog-category.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  {
    path: 'articles',
    component: BlogComponent,
    children: [
      { path: 'new', component: BlogEditComponent },
      { path: ':category', component: BlogCategoryComponent },
      { path: ':category/:title', component: BlogArticleComponent },
      { path: ':category/:title/edit', component: BlogEditComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [{ path: 'profile', component: UserProfileComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
