import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UccSnackbarComponent } from './shared/components/ucc-snackbar/ucc-snackbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UccSnackbarComponent],
  template: `
  <router-outlet />
  <ucc-snackbar/>
`,
})
export class AppComponent {
  title = 'Ultimate Champion Creator';
}
