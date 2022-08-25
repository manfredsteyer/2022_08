import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { startsWith, WebComponentWrapper, WebComponentWrapperOptions} from '@angular-architects/module-federation-tools';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'passenger-mf',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module', // >= Angular 13
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module',
      }).then((esm) => esm.PassengerModule),
  },
  // And this route too:
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      remoteEntry:
        'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element', 
    } as WebComponentWrapperOptions,
  },

  // And also this route:
  {
    matcher: startsWith('angular3'),
    component: WebComponentWrapper,
    data: {
      remoteEntry:
        'https://gray-river-0b8c23a10.azurestaticapps.net/remoteEntry.js',
      remoteName: 'angular3',
      exposedModule: './web-components',
      elementName: 'angular3-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
