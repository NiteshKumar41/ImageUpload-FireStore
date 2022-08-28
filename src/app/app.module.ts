import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/compat/storage";
import { environment } from './environment';
import { AngularFireModule } from "@angular/fire/compat";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
