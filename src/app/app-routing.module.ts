import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { PendingChangesGuard } from './blog-edit/pending-changes.guard';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  // { path: '', redirectTo: '/blogs', pathMatch: 'full' },

  { path: 'new', component: BlogEditComponent, canDeactivate: [PendingChangesGuard] },

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
  { path: ':address/edit', component: BlogEditComponent, canDeactivate: [PendingChangesGuard] },
  { path: ':address/edit-draft', component: BlogEditComponent, canDeactivate: [PendingChangesGuard] },
  {
    path: ':address',
    component: BlogArticleComponent,
  },
  { path: '', component: BlogComponent },
  { path: '**', redirectTo: '' }, // Keep this in last place!
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
