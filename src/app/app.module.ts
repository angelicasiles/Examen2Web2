import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [AppComponent,HeaderComponent,FooterComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule,MatToolbarModule,MatIconModule,HttpClientModule,ToastrModule.forRoot({
    timeOut: 10000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
