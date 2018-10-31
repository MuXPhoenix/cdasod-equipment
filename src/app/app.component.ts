import {Component,OnInit} from '@angular/core';
import {Router} from "@angular/router";
// import {Http} from "@angular/http";
// import {GlobalService} from "./shared/global.service";
// import 'rxjs/add/operator/toPromise';
// import { NFC } from 'nfc-pcsc';
// import {Buffer} from 'buffer';
// const TAG_ISO_14443_3 = 'TAG_ISO_14443_3';
// const TAG_ISO_14443_4 = 'TAG_ISO_14443_4';
// const KEY_TYPE_A = 0x60;
// // const KEY_TYPE_B = 0x61;
@Component({
    selector: 'demo-app',
    // template:'<div id="main"><div id="content"><app-menu></app-menu><router-outlet></router-outlet></div></div>'
    templateUrl: require('./app.component.html'),
    // styleUrls: [require('./app.component.scss')]
})

export class AppComponent implements OnInit {
    //
    // i3otpList : Array<any> = [];
    // page : any;
    // prev : boolean = false;
    // next : boolean = false;
    //
    // c_id : string = '';
    // u_id : string = '';
    //
    // isShow : string = 'none';
    // activation : string = '';
    // keyword : string = '';
    constructor(
        private router:Router
    //     private http:Http,
    //     private globalService:GlobalService
    ){
    }
    ngOnInit() {
            console.log('app==============');
        // this.getI3otpList('1');
    }
    // /**
    //  * 获取设备列表
    //  * @param number
    //  */
    // getI3otpList(number:string) {
    //     let url = this.globalService.getDomain()+'/api/v1/getCustomerI3otpList?c_id='+this.c_id+'&page='+number;
    //     if(this.keyword.trim() != ''){
    //         url += '&keyword='+this.keyword.trim();
    //     }
    //     this.http.get(url)
    //         .map((res)=>res.json())
    //         .subscribe((data)=>{
    //             this.i3otpList = data;
    //         });
    // }
    //
    // editI3otpStatus(type:string){
    //     if(type == 'show'){
    //         this.isShow = "block";
    //     }else if(type == 'edit') {
    //         let post_url = this.globalService.getDomain() + '/api/v1/editCustomerI3otpStatus';
    //         this.http.post(post_url, {
    //             'c_id': this.c_id,
    //             'u_id': this.u_id,
    //             'i3otp_activation': this.activation,
    //             'keyword':this.keyword,
    //             'page':1
    //         }).subscribe((data) => {
    //             let info = JSON.parse(data['_body']);
    //             this.i3otpList = info;
    //             console.log(info);
    //         });
    //
    //     }
    // }
    // /**
    //  * 分页
    //  * @param page
    //  */
    // pagination(page : number) {
    //     this.page = page;
    //     this.getI3otpList(this.page);
    // }

    // message : Array<any> = [];
    // nfc_test(){
    //     const _nfc = new NFC();
    // _nfc.on('reader', reader => {
    //
    //         console.log(reader.name + ' reader attached, waiting for cards ...');
    //         this.message.push(reader.name + ' reader attached, waiting for cards ...');
    //         reader.on('card', async card => {
    //
    //                 console.log(card.uid);
    //             // standard nfc tags like Mifare
    //             if (card.type === TAG_ISO_14443_3) {
    //                 // result = [];
    //                 // result.push( card.uid);
    //                 // result.push( card.type);
    //                 // const uid = card.uid;
    //                 console.log(`card detected1`, {reader: reader.name, card});
    //                 // this.message.push (`card detected1`, {reader: reader.name, card});
    //                 // this.message.push ("\r\n");
    //
    //             }
    //             // Android HCE
    //             else if (card.type === TAG_ISO_14443_4) {
    //                 // process raw Buffer data
    //                 const data = card.data.toString('utf8');
    //                 console.log(`card detected2`, {reader: reader.name, card: {...card, data}});
    //             } else {
    //                 console.log(`card detected3`, {reader: reader.name, card});
    //             }
    //
    //             try {
    //                 const key = 'ffffffffffff';
    //                 const keyType = KEY_TYPE_A;
    //                 await Promise.all([
    //                     reader.authenticate(17, keyType, key),
    //                     reader.authenticate(18, keyType, key)
    //                 ]);
    //             } catch (err) {
    //                 console.log(`error when authenticating data`, {reader: reader.name, card, err});
    //                 return;
    //             }
    //             const data17 = await reader.read(17, 16, 16);
    //             console.log(`[data17] data converted:`, data17.toString());
    //             this.message.push (`[data17] data converted:`, data17.toString());
    //             const data18 = await reader.read(18, 16, 16);
    //             console.log(`[data18] data converted:`, data18.toString());
    //             this.message.push (`[data18] data converted:`, data18.toString());
    //
    //             try {
    //                 const data17 = Buffer.allocUnsafe(16);
    //                 data17.fill(0);
    //                 data17.write('u1001');
    //                 await reader.write(17, data17, 16);
    //
    //                 const data18 = Buffer.allocUnsafe(16);
    //                 data18.fill(0);
    //                 data18.write('c1001');
    //                 await reader.write(18, data18, 16);
    //                 console.log(`[18] data written`, { reader: reader.name, card });
    //                 this.message.push (`[18] data written`);
    //                 alert('写入成功');
    //             } catch (err) {
    //                 console.log(`error when writing data`, {reader: reader.name, err});
    //                 this.message.push (`error when writing data`);
    //             }
    //
    //             console.log(`message`, {message :this.message});
    //         });
    //
    //         reader.on('error', err => {
    //             console.log(`an error occurred`, {reader: reader.name, err});
    //             this.message.push (`an error occurred`);
    //         });
    //
    //         reader.on('end', () => {
    //             console.log(`device removed`, {reader: reader.name});
    //             this.message.push(`device removed`);
    //         });
    //
    //         // reader.on('card', card => {
    //         //     console.log(card.uid);
    //         // });
    //         //
    //         // reader.on('error', err => {
    //         //     console.error('reader error', err);
    //         // });
    //         //
    //         // reader.on('end', () => {
    //         //     console.log(reader.name + ' reader disconnected.');
    //         // });
    //     });
    //
    //     _nfc.on('error', err => {
    //         console.error(err);
    //         this.message.push(err);
    //     });
    // }
}