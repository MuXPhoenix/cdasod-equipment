import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalService} from "../shared/global.service";
import {Router} from "@angular/router";
import {LocalStorage} from "../shared/localStorage.service";

@Component({
  selector: 'app-activate',
  templateUrl: require('./activate.component.html'),
  styleUrls: [require('./activate.component.css')]
})
export class ActivateComponent implements OnInit {

  i3otpList : Array<any> = [];
  page : any;
  prev : boolean = false;
  next : boolean = false;

  //用作全选和反选
  selects : Array<any> = [];
  check : boolean = false;

  c_id : string = '';
  u_id : string = '';

  isShow : string = 'none';
  activation : string = '';
  keyword : string = '';
  i3otp_id : string = '';
  constructor(
      private http:Http,
      private router : Router,
      private ls: LocalStorage,
      private globalService:GlobalService){
    this.c_id = this.ls.get('cid');
    this.u_id = this.ls.get('uid');
  }
  ngOnInit() {
    this.getI3otpList('1');
  }
  /**
   * 获取设备列表
   * @param number
   */
  getI3otpList(number:string) {
    let url = this.globalService.getDomain()+'/api/v1/getCustomerI3otpList?c_id='+this.c_id+'&page='+number;
    if(this.keyword.trim() != ''){
      url += '&keyword='+this.keyword.trim();
    }
    this.http.get(url)
        .map((res)=>res.json())
        .subscribe((data)=>{
          this.i3otpList = data;
          if (this.i3otpList && this.i3otpList['status'] == 200) {
            if (this.i3otpList['result']['current_page'] == this.i3otpList['result']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.i3otpList['result']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }
            this.selects = [];
            for (let entry of this.i3otpList['result']['data']) {
              this.selects[entry['i3otp_id']] = false;
            }
            this.check = false;
          }
        });
  }

  editI3otpStatus(type:string){
    if(type == 'show'){
      this.isShow = "block";
    }else if(type == 'edit') {
      let post_url = this.globalService.getDomain() + '/api/v1/editCustomerI3otpStatus';
      this.http.post(post_url, {
        'type':'activate',
        'c_id': this.c_id,
        'u_id': this.u_id,
        'i3otp_activation': this.activation,
        // 'keyword':this.keyword,
        'page':1
      }).subscribe((data) => {
        let info = JSON.parse(data['_body']);
        // this.i3otpList = info;
        console.log(info);
        alert(info['msg']);
        if(info['status'] == 200){
          this.router.navigate(['/setting/'+info['data']]);
        }
        // else{
        //   alert(info['msg']);
        // }
      });

    }
  }
  /**
   * 分页
   * @param page
   */
  pagination(page : number) {
    this.page = page;
    this.getI3otpList(this.page);
  }

  //全选，反全选
  changeCheckAll(e){
    let t = e.target;
    let c = t.checked;
    this.selects.forEach((val, idx, array) => {
      this.selects[idx] = c;
    });
    this.check = c;
  }

  //点击列表checkbox事件
  handle(e){
    let t = e.target;
    let v = t.value;
    let c = t.checked;
    this.selects[v] = c;
    let isAll = 0;
    for (let s of this.selects) {
      if(s == false) {
        isAll += 1;
      }
    }
    if(isAll >= 1){
      this.check = false;
    }else{
      this.check = true;
    }
  }

  //点击一行后获取该点击的id
  getId(i3otp_id){
    this.i3otp_id = i3otp_id;
  }

  //进入设置页
  goSettingPage(){
    this.router.navigate(['/setting/'+this.i3otp_id]);
  }

  //用户删除设备信息
  deleteI3otp(delete_type:string){
    let msg = '';
    let i3ot_id : string = '';
    if(delete_type == 'id'){
      i3ot_id = this.i3otp_id;
    } else if(delete_type == 'all') {
      let is_select = 0;
      this.selects.forEach((val, idx, array) => {
        if (val == true) {
          i3ot_id += idx + ',';
          is_select += 1;
        }
      });
      if (is_select < 1) {
        msg = '请确认已选中需要删除的信息！';
        alert(msg);
        return false;
      }
    }
    msg = '您确定要删除该条信息吗?';
    if(confirm(msg)) {
      let url = this.globalService.getDomain()+'/api/v1/editCustomerI3otpStatus?type=delete&delete_type='+delete_type+'&page=' + this.page+'&i3otp_id='+this.i3otp_id+'&c_id='+this.c_id;
      if(this.keyword.trim() != ''){
        url += '&keyword='+this.keyword.trim();
      }
      this.http.delete(url)
        .map((res) => res.json())
        .subscribe((data) => {
          this.i3otpList = data;
          alert(this.i3otpList['msg']);
          if (this.i3otpList && this.i3otpList['status'] == 200) {
            if (this.i3otpList['result']['current_page'] == this.i3otpList['result']['last_page']) {
              this.next = true;
            } else {
              this.next = false;
            }
            if (this.i3otpList['result']['current_page'] == 1) {
              this.prev = true;
            } else {
              this.prev = false;
            }
          }
        });
    }
  }

  //退出登录
  logout(){
    this.ls.removeAll();
    this.router.navigate(['/login']);
  }


}
