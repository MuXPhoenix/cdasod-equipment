import { Injectable} from '@angular/core';

const serialPort = require( "electron" ).remote.require( "serialport" );
@Injectable()
export class SerialportService {
  baudrate: number  = 9600;//获取波特率
  databits: number  = 8;//获取数据位
  stopbits: number  = 1;//获取停止位
  parity: string  = 'none';//获取校验位字节数

  send_setting: string = "hex";//获取发送编码
  sp;  //定义一个全局变量，接收创建的端口

  // serial_flag: string  = "close";
  // serial_title: string  = '打开串口';

  com_num: string  = '';//获取串口号
  constructor(){
    console.log('serialport service');
  }


  //打开串口
  open_serial(com_num) {
    // console.log('open_serial:----');
    // console.log(this.serial_flag);
    // if(this.serial_flag == 'close') {
    //   this.serial_flag = 'open';
    //   this.serial_title = '串口已打开';

    // console.log('closeSerialport');
    // console.log(this.sp);
    console.log('open_serial:==================');
    if(!(this.sp && this.sp.isOpen)) {
    //   console.log('closeSerialport-----');
    //   // this.sp.close();
    //   this.sp = null;

        console.log('open_serial:===================');
        this.sp = new serialPort(com_num, {
          baudRate: this.baudrate,  //波特率设置
          dataBits: this.databits,  //数据位
          parity: this.parity,  //校验位
          stopBits: this.stopbits, //停止位
          // flowControl: false
        });
      }
    // }else {
    //   this.serial_flag = 'close';
    //   this.serial_title = '打开串口';
    // }
  }


  getSerialPort() {
    return serialPort;
  }

  getSP() {
    return this.sp;
  }


  setComNum(value:string){
    this.com_num = value;
  }
  getComNum() : string{
    return this.com_num;
  }

  // setSerialFlag(value:string){
  //   this.serial_flag = value;
  // }
  // getSerialFlag() : string{
  //   return this.serial_flag;
  // }

  // setSerialTitle(value:string){
  //   this.serial_title = value;
  // }
  // getSerialTitle() : string{
  //   return this.serial_title;
  // }

  setBaudrate(baudrate:number){
    this.baudrate = baudrate;
  }
  getBaudrate() : number{
    return this.baudrate;
  }

  setDatabits(databits:number){
    this.databits = databits;
  }
  getDatabits() : number{
    return this.databits;
  }

  setStopbits(stopbits:number){
    this.stopbits = stopbits;
  }
  getStopbits() : number{
    return this.stopbits;
  }

  setParity(parity:string){
    this.parity = parity;
  }
  getParity() : string{
    return this.parity;
  }


  /****************************写串口************************************************/
  serial_write(write_data) {
    let buf_once ;
    if(write_data == 'setting' || write_data.indexOf("IP") >= 0 || write_data.indexOf("time") >= 0 ){
      buf_once = write_data;
    }else{
      buf_once = new Buffer(write_data, this.send_setting);
    }
    console.log('write_data :----' + buf_once);
    this.sp.write(buf_once, function (err, results) {
      if (err) {
        console.log('err ' + err);
      } else {
        // console.log('发送数据:' + buf_once.toLocaleUpperCase());
        console.log('发送数据字节长度： ' + results);  //发出去的数据字节长度
      }
    });
  }


//是不是json
  isJsonFormat( str ) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  //转换日期格式
  get_now_date(format) {
    let date = new Date();
    let o = {
      'M+' : date.getMonth() + 1, //month
      'd+' : date.getDate(), //day
      'H+' : date.getHours(), //hour+8小时
      'm+' : date.getMinutes(), //minute
      's+' : date.getSeconds(), //second
      'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
      'S' : date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp('(' + k + ')').test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return format;

  }
}
