import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {GlobalService} from "../shared/global.service";
import {LocalStorage} from "../shared/localStorage.service";

@Component({
  selector: 'app-login',
  templateUrl: require('./login.component.html'),
  styleUrls: [require('./login.component.css')]
})
export class LoginComponent implements OnInit {
  // uid : number = 0;
  // cid : number = 0;
  constructor(private http:Http,
              private router: Router,
              private globalService:GlobalService,
              private ls: LocalStorage
  ) {
    window.scrollTo(0,0);
  }

  ngOnInit() {
    if(this.ls.get('cid')) {
      this.router.navigate(['/activate']);
    }
  }

  login(value){
    this.http.post(this.globalService.getDomain()+'/api/v1/login',{
      'cNumber':value['cNumber'],
      'uNumber':value['uNumber'],
      'password':value['password']
    }).subscribe((data)=>{
      let info = JSON.parse(data['_body']);
      if(info['status'] != 200){
        alert(info['msg']);
      }
      if(info['status'] == 200){
        this.ls.set('uid', info['result']['id']);
        this.ls.set('cid', info['result']['c_id']);
        // this.uid = info['result']['id'];
        // this.cid = info['result']['c_id'];
        this.router.navigate(['/activate']);
      }else if(info['status'] == 202){
        // this.cookieStoreService.removeAll();
        this.ls.removeAll();
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit(value:any,valid:boolean) {
    this.login(value);
  }

  goPage(){
    this.router.navigate(['/register']);
  }

}
