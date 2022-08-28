import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'imageUpload';
  formData: FormGroup
  file;
  fb;
  downloadURL: Observable<string>;
  filelist = []
  constructor( private storage: AngularFireStorage){

  }
  ngOnInit(): void {
    this.formData = new FormGroup({
      file: new FormControl()
    })
    this.getFileList();
  }

  onChange(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    
  }
  sendData() {
    var n = this.file.name;
    const filePath = `${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.file);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb);
        });
      })
    ).subscribe(url =>{
      if(url){
        console.log(url);
        
      }
    })
  
  }
  getFileList() {
    const fileRef = this.storage.ref('');
    let myurlsubscription = fileRef.listAll().subscribe((data) => {
        for (let i = 0; i < data.items.length; i++) {
          let name = data.items[i].name;
          let newref = this.storage.ref(data.items[i].name);
          let url = newref.getDownloadURL().subscribe((data) => {
            this.filelist.push({
              name: name,
              videolink: data
            });
          });
          console.log(this.filelist);
          
        }
      });

  }
}
