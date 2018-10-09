import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../shared/global.service";
import {CRC,ToCRC16} from '../shared/crc';
import { Buffer } from 'buffer';
import {isObject} from "rxjs/internal/util/isObject";

const serialPort = require( "electron" ).remote.require( "serialport" );
@Component({
  selector: 'app-equipment-form',
  templateUrl: require('./equipment-form.component.html'),
  styleUrls: [require('./equipment-form.component.css')]
})
export class EquipmentFormComponent implements OnInit {

  //传感器
  equipment_name:string = '';
  buy_u_id:string = '';
  equipment_address:string = '';
  sensor_a:string = '';
  sensor_time_a : string = '';
  sensor_unit_a : string = '';
  sensor_formula_a : string = '';
  sensor_b:string = '';
  sensor_time_b : string = '';
  sensor_unit_b : string = '';
  sensor_formula_b : string = '';
  sensor_c:string = '';
  sensor_time_c : string = '';
  sensor_unit_c : string = '';
  sensor_formula_c : string = '';
  sensor_d:string = '';
  sensor_time_d : string = '';
  sensor_unit_d : string = '';
  sensor_formula_d : string = '';
  sensor_e:string = '';
  sensor_time_e : string = '';
  sensor_unit_e : string = '';
  sensor_formula_e : string = '';
  sensor_f:string = '';
  sensor_time_f : string = '';
  sensor_unit_f : string = '';
  sensor_formula_f : string = '';
  equipment_IP_address:string = '';

  send_times: number = 0;  //记录页面点击发送的次数
  select_IP_times: number = 0;  //记录页面点击发送查询本地ip的次数
  send_setting_tip : number = 0;

  serial_flag: string  = "close";
  serial_title: string  = '打开串口';

  // rec_setting: string = "gb2312";//获取接收编码
  send_setting: string = "hex";//获取发送编码

  comName : Array<any> = [];//串口列表
  com_num: string  = '';//获取串口号
  baudrate: number  = 9600;//获取波特率
  databits: number  = 8;//获取数据位
  stopbits: number  = 1;//获取停止位
  parity: string  = 'none';//获取校验位字节数
  //本地ip设置
  IP : string = '192.168.31.226';
  child_code : string = '255.255.255.0';//子掩码
  default_IP : string = '192.168.31.1';//默认网关
  dns : string = '1.0.0.0';//DNS
  sp;  //定义一个全局变量，接收创建的端口

  i3otp_id : number = 0;
  msg : string = '';

  i3otpInfo : Array<any> = [];

  //给方瑜发送setting请求后，装写方瑜给我返回的串口信息
  sensorList : Array<any> = [];
  constructor(
      private http:Http,
      private router : Router,
      private routInfo : ActivatedRoute,
      private globalService:GlobalService
  ) {

    let that = this;
    that.i3otp_id = this.routInfo.snapshot.params['id'];
    if(that.i3otp_id == 0){
      alert('信息错误，无法进入设置页。');
      that.router.navigate(['/activate']);
    }

    serialPort.list(function (err, ports) {
      ports.forEach(function(port,key) {
        if(key == 0)
          that.com_num = port.comName;
        that.comName[key] = port.comName;
        console.log(that.comName);
      });
    });

    setTimeout(function(){
      that.open_serial();
      that.send_setting_tips();
    },2000);

  }



  ngOnInit() {
    this.getI3otpInfo();
  }

  /**
   * 获取当前设备信息
   */
  getI3otpInfo(){
    let url = this.globalService.getDomain()+'/api/v1/getI3otpInfo?type=setting&i3otp_id='+this.i3otp_id;
    this.http.get(url)
        .map((res)=>res.json())
        .subscribe((data)=>{
          this.i3otpInfo = data;
          this.equipment_name= data['result']['equipment_name'];
          this.buy_u_id = data['result']['buy_u_id'];
          this.equipment_address = data['result']['equipment_address'];

          this.equipment_IP_address = data['result']['equipment_IP_address'];

          if(data['result']['sensor_info'].length > 1) {
            this.sensor_a = data['result']['sensor_infos']['sensor_a'];
            this.sensor_time_a = data['result']['sensor_infos']['sensor_time_a'];
            this.sensor_unit_a = data['result']['sensor_infos']['sensor_unit_a'];
            this.sensor_formula_a = data['result']['sensor_infos']['sensor_formula_a'];
            this.sensor_b = data['result']['sensor_infos']['sensor_b'];
            this.sensor_time_b = data['result']['sensor_infos']['sensor_time_b'];
            this.sensor_unit_b = data['result']['sensor_infos']['sensor_unit_b'];
            this.sensor_formula_b = data['result']['sensor_infos']['sensor_formula_b'];
            this.sensor_c = data['result']['sensor_infos']['sensor_c'];
            this.sensor_time_c = data['result']['sensor_infos']['sensor_time_c'];
            this.sensor_unit_c = data['result']['sensor_infos']['sensor_unit_c'];
            this.sensor_formula_c = data['result']['sensor_infos']['sensor_formula_c'];
            this.sensor_d = data['result']['sensor_infos']['sensor_d'];
            this.sensor_time_d = data['result']['sensor_infos']['sensor_time_d'];
            this.sensor_unit_d = data['result']['sensor_infos']['sensor_unit_d'];
            this.sensor_formula_d = data['result']['sensor_infos']['sensor_formula_d'];
            this.sensor_e = data['result']['sensor_infos']['sensor_e'];
            this.sensor_time_e = data['result']['sensor_infos']['sensor_time_e'];
            this.sensor_unit_e = data['result']['sensor_infos']['sensor_unit_e'];
            this.sensor_formula_e = data['result']['sensor_infos']['sensor_formula_e'];
            this.sensor_f = data['result']['sensor_infos']['sensor_f'];
            this.sensor_time_f = data['result']['sensor_infos']['sensor_time_f'];
            this.sensor_unit_f = data['result']['sensor_infos']['sensor_unit_f'];
            this.sensor_formula_f = data['result']['sensor_infos']['sensor_formula_f'];
          }
        });
  }

  /**
   * 提交设置
   */
  submit_setting(){
    let post_url = this.globalService.getDomain() + '/api/v1/editCustomerI3otpStatus';
    let sensor = {
      'sensor_a':this.sensor_a,
      'sensor_time_a':this.sensor_time_a,
      'sensor_unit_a':this.sensor_unit_a,
      'sensor_formula_a':this.sensor_formula_a,
      'sensor_b':this.sensor_b,
      'sensor_time_b':this.sensor_time_b,
      'sensor_unit_b':this.sensor_unit_b,
      'sensor_formula_b':this.sensor_formula_b,
      'sensor_c':this.sensor_c,
      'sensor_time_c':this.sensor_time_c,
      'sensor_unit_c':this.sensor_unit_c,
      'sensor_formula_c':this.sensor_formula_c,
      'sensor_d':this.sensor_d,
      'sensor_time_d':this.sensor_time_d,
      'sensor_unit_d':this.sensor_unit_d,
      'sensor_formula_d':this.sensor_formula_d,
      'sensor_e':this.sensor_e,
      'sensor_time_e':this.sensor_time_e,
      'sensor_unit_e':this.sensor_unit_e,
      'sensor_formula_e':this.sensor_formula_e,
      'sensor_f':this.sensor_f,
      'sensor_time_f':this.sensor_time_f,
      'sensor_unit_f':this.sensor_unit_f,
      'sensor_formula_f':this.sensor_formula_f
    };
    this.http.post(post_url, {
      'type': 'setting',
      'i3otp_id': this.i3otp_id,
      'equipment_name': this.equipment_name,
      'buy_u_id': this.buy_u_id,
      'equipment_address':this.equipment_address,
      'sensor_info':JSON.stringify(sensor)
    }).subscribe((data) => {
      let info = JSON.parse(data['_body']);
      console.log(info);
      alert(info['msg']);
      // if(info['status'] == 200){
      //   this.router.navigate(['/activate']);
      // }
    });
  }


  bnt_change() {
    if( this.serial_flag == "close") {
      this.serial_flag = "open";
      this.serial_title = '串口已打开';
      this.open_serial();
    } else {
      this.serial_flag = "close";
      // this.post_serial_info();   //调用ajax推送
      this.serial_title = '打开串口';
      this.msg = '串口已关闭';
    }
  }



  //进入页面就给方瑜发送设置的串口请求
  send_setting_tips() {
    console.log('this.send_setting_tip');
    console.log(this.send_setting_tip);
    //监听meterReading事件 获取数据
    this.send_setting_tip++;
    //命令手动发送条件
    let data = 'setting';
    this.serial_read_write(data);
  }

  //本地ip设置
  post_info() {
    console.log('this.send_times');
    console.log(this.send_times);
    //监听meterReading事件 获取数据
    this.send_times++;
    //命令手动发送条件
    let data = [];
    data.push(13,0,136, 0, 0);
    let ip_ = this.IP.split('.');
    for(let c = 0; c<ip_.length;c++){
      data.push(parseInt(ip_[c]));
    }
    let childcode_ = this.child_code.split('.');
    for(let c = 0; c<childcode_.length;c++){
      data.push(parseInt(childcode_[c]));
    }
    let defaultIP_ = this.default_IP.split('.');
    for(let c = 0; c<defaultIP_.length;c++){
      data.push(parseInt(defaultIP_[c]));
    }
    let dns_ = this.dns.split('.');
    for(let c = 0; c<dns_.length;c++){
      data.push(parseInt(dns_[c]));
    }
    data.push(((5002)%256),Math.floor((5002)/256));//端口号
    data.push(2);//dhcp

    let dd = '';
    for(let i=0;i<data.length;i++){
      let a = data[i].toString(16);
      if(a.length == 1){
        a = '0'+a;
      }
      dd += a;
    }
    dd += ToCRC16(data).toUpperCase();
    if (dd.length >= 24 ) {//发送命令手动抄表
      this.serial_read_write(dd);
    }
  }


  //查询本地ip地址
  select_IP() {
    console.log('this.select_IP_times');
    console.log(this.select_IP_times);
    //监听meterReading事件 获取数据
    this.select_IP_times++;
    //命令手动发送条件
    let data = [];

    data.push('IP'+this.i3otp_id);

    let dd = '';
    for(let i=0;i<data.length;i++){
      let a = data[i].toString(16);
      if(a.length == 1){
        a = '0'+a;
      }
      dd += a;
    }
    dd += ToCRC16(data).toUpperCase();
    if (dd.length >= 2 ) {//发送命令手动抄表
      this.serial_read_write(dd);
    }
  }

  //打开串口
  open_serial() {
    //.SerialPort
    this.serial_flag = 'open';
    this.serial_title = '串口已打开';
    this.sp = new serialPort(this.com_num, {
      baudRate: this.baudrate,  //波特率设置
      dataBits: this.databits,  //数据位
      parity: this.parity,  //校验位
      stopBits: this.stopbits //停止位
      //  parser: SerialPort.parsers.readline("\n")  //这句可能调用方法不对，加上这句就会出现接收数据编码不正常
    });
    this.msg += '\r\n串口已经打开';
  }
  /*********************************串口数据发送和接收***********************************************/
  serial_read_write(write_data)  {  //串口操作
    console.log(this.serial_flag);
    if (this.serial_flag != 'close') {
      //sp是用来记录创建的serialPort的
      if ((typeof this.sp) != 'undefined') {
        if (this.sp.path != this.com_num){  //sp有数据，且sp记录打开的串口号和即将创建的串口号不同

          this.open_serial();  //打开端口
          this.open_wr(write_data); //新创建的端口必须要先打开端口（sp.on('open',callback)）才能进行数据读写
        } else {   //这种情况就是打开串口之后一直进行发送操作
          console.log(this.send_times);
          if (this.send_times == 1) {//第一次进行发送，此时打开读写同时打开监听
            this.write_read(write_data); //端口已经创建，直接读写就可以，因为上一次创建端口时已经打开了端口，若此时继续打开端口，sp.on（'open',callback）内部的代码不会执行
          } else {
            if (this.select_IP_times == 1) {//第一次进行发送，此时打开读写同时打开监听
              this.write_read(write_data); //端口已经创建，直接读写就可以，因为上一次创建端口时已经打开了端口，若此时继续打开端口，sp.on（'open',callback）内部的代码不会执行
            } else {
              if (this.send_setting_tip == 1) {//第一次进行发送，此时打开读写同时打开监听
                this.write_read(write_data); //端口已经创建，直接读写就可以，因为上一次创建端口时已经打开了端口，若此时继续打开端口，sp.on（'open',callback）内部的代码不会执行
              } else {
                //已经打开读监听了，如果继续打开，发送多次之后会出现“(node) warning: possible EventEmitter memory leak detected. 11 data listeners added. Use emitter.setMaxListeners() to increase limit.”的警告
                //所以此时不需要再次打开监听，只需要进行数据发送就可以了。
                this.serial_write(write_data);
              }
            }
          }
        }
      } else {  //sp没有数据，则直接打开串口
        this.open_serial();
        this.open_wr(write_data);
      }
    }
  }

  /************************************打开串口并读写数据*********************************/
  open_wr(write_data) {
    this.sp.on("open", function (err) {
      if (err) {
        console.log(err + "打开串口出错，请重试");
      } else {
        console.log('串口已经打开2');
        this.serial_read();
        this.serial_write(write_data);
      }
    });
  }

  /*****************************************读写数据***************************************/
  write_read(write_data) {
    this.serial_read();
    this.serial_write(write_data);
  }

  /****************************读串口************************************************/
  serial_read() {
    let that = this;
    let ret = '';
    that.sp.on('data', function (info) {
      ret += info+'';
      if(info == 'success IP'){
        that.getI3otpInfo();
      }else if(info == 'fail IP'){
        console.log('获取IP失败');
      }else{

        setTimeout(function(){
          let infos = JSON.parse(ret);
          console.log("3000-了----");
          console.log(infos);
          console.log(isObject(infos));
          if(isObject(infos) && infos['type'] == 'setting'){
            that.sensorList = infos['tag'];

            console.log("sensorList::----");
            console.log(that.sensorList);
          }
        },3000);
      }
    });
  }

  /****************************写串口************************************************/
  serial_write(write_data) {
    let buf_once = new Buffer(write_data, this.send_setting);

    let that = this;
    that.sp.write(buf_once, function (err, results) {
      if (err) {
        // console.log('err ' + err);
        return err;
      } else {
        // that.message += '\r\n发送数据：' + write_data.toLocaleUpperCase();
        // that.message += '\r\n发送数据字节长度： ' + results;
        // console.log('发送数据:' + write_data.toLocaleUpperCase());
        // console.log('发送数据字节长度： ' + results);  //发出去的数据字节长度
        return write_data.toLocaleUpperCase();
      }
    });
  }


  /**
   * 本地设置
   */
  submit_IP_setting(){
    // let url = this.globalService.getDomain()+'/api/v1/getIp';
    // this.http.get(url)
    //     .map((res)=>res.json())
    //     .subscribe((data)=> {
    //     console.log(data);
    //     });
    console.log(this.serial_flag);
    if (this.serial_flag == "close") {
      this.msg += "\r\n请先打开串口";
    } else {
      this.post_info();//调用ajax推送
    }
  }

  //给sensorList加入tag变量
  decodeList(){
    let list =  this.sensorList;
    list.forEach((val, idx, array) => {
      this.sensorList[idx]['tag'] = '';
    });
    console.log(this.sensorList);
  }


}
