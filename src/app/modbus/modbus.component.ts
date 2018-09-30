import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CRC,ToCRC16} from '../shared/crc';

const serialPort = require( "electron" ).remote.require( "serialport" );
@Component({
  selector: 'app-modbus',
  templateUrl: require('./modbus.component.html'),
  styleUrls: [require('./modbus.component.css')]
})
export class ModbusComponent implements OnInit {

  send_setting: string = "hex";//获取发送编码
  send_times: number = 0;


  comName : Array<any> = [];//串口列表
  com_num: string  = '';//获取串口号
  baudrate: number  = 9600;//获取波特率
  databits: number  = 8;//获取数据位
  stopbits: number  = 1;//获取停止位
  parity: string  = 'none';//获取校验位字节数
  sp;  //定义一个全局变量，接收创建的端口

  modbusList : Array<any> = [];

  msg : Array<any> = [];
  constructor(private router:Router) {
    let that = this;
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
      that.post_info();
    },2000);
  }


  //向串口发送时间
  post_info() {
    //监听meterReading事件 获取数据
    this.send_times++;
    let times = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(times);
    let dd = '{"time":"'+times+'"}';
    this.serial_read_write(times);
  }

  /*********************************串口数据发送和接收***********************************************/
  serial_read_write(write_data)  {  //串口操作
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
            this.serial_write(write_data);
          }
        }
      } else {  //sp没有数据，则直接打开串口
        this.open_serial();
        this.open_wr(write_data);
      }

  }
  //打开串口
  open_serial() {
    //.SerialPort
    this.sp = new serialPort(this.com_num, {
      baudRate: this.baudrate,  //波特率设置
      dataBits: this.databits,  //数据位
      parity: this.parity,  //校验位
      stopBits: this.stopbits //停止位
      //  parser: SerialPort.parsers.readline("\n")  //这句可能调用方法不对，加上这句就会出现接收数据编码不正常
    });
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
    that.sp.on('data', function (info) {
      // that.message += '\r\n' + info;
      // that.message += '\r\n接收数据字节长度：' + info.length;
      // return info;
      console.log("info:-----");
      console.log(info+'');
      // console.log(isNaN(info['type']));
      // if(isNaN(info['type'])){
      // }
      // that.modbusList = JSON.parse(info+'');
      // that.modbusList = info+'';
      that.msg = info;
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


  ngOnInit() {
  }

}
