import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      loadChildren: () => import('./repositories/feed/feed.module').then((m) => m.FeedModule)
    },
    {
      path: 'auth',
      loadChildren: () => import('./repositories/auth/auth.module').then((m) => m.AuthModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./repositories/user/user.module').then((m) => m.UserModule)
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full'
    }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
