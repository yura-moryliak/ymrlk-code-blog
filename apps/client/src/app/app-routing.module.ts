import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      loadChildren: () => import('./repositories/feed/feed.module')
        .then((m) => m.FeedModule),
      data: { animation: 'FeedPage' }
    },
    {
      path: 'auth',
      loadChildren: () => import('./repositories/auth/auth.module')
        .then((m) => m.AuthModule),
      data: { animation: 'AuthPage' }
    },
    {
      path: 'user',
      loadChildren: () => import('./repositories/user/user.module')
        .then((m) => m.UserModule),
      data: { animation: 'UsersPage' }
    },
    {
      path: 'ui-test-examples',
      loadChildren: () => import('./ui-test-examples/ui-test-examples.module')
        .then((m) => m.UiTestExamplesModule),
      data: { animation: 'UITestExamplesPage' }
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
