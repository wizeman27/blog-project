import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { PendingChangesGuard } from './blog-edit/pending-changes.guard';
import { BlogComponent } from './blog/blog.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  // { path: '', redirectTo: '/blogs', pathMatch: 'full' },

  {
    path: 'new',
    component: BlogEditComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'blogs',
    component: AllBlogsComponent
  },
  {
    path: 'blogs/featured',
    component: AllBlogsComponent
  },
  {
    path: 'blogs/:category',
    component: AllBlogsComponent
  },

  // {
  //   path: 'blogs',
  //   component: AllBlogsComponent, // need to create this to list all blogs only
  //   children: [
  //     { path: ':category', component: BlogCategoryComponent },
  //     // { path: ':category/:title', component: BlogArticleComponent },
  //     // { path: ':category/:title/edit', component: BlogEditComponent },
  //   ],
  // },
  {
    path: 'auth',
    component: AuthComponent,
    children: [{ path: 'profile', component: UserProfileComponent }],
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: ':address/edit',
    component: BlogEditComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: ':address/edit-draft',
    component: BlogEditComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: ':address',
    component: BlogArticleComponent,
  },
  { path: '', component: BlogComponent },
  { path: '**', redirectTo: '' }, // Keep this in last place!
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 30], // [x, y]
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
