import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import {Router} from "@angular/router";
// import {CRC,ToCRC16} from '../shared/crc';
import {SerialportService} from "../shared/serialport.service";

// const serialPort = require( "electron" ).remote.require( "serialport" );
@Component({
  selector: 'app-modbus',
  templateUrl: require('./modbus.component.html'),
  styleUrls: [require('./modbus.component.css')]
})
export class ModbusComponent implements OnInit {

  // send_setting: string = "hex";//获取发送编码
  send_times: number = 0;

  comName : Array<any> = [];//串口列表
  com_num: string  = '';//获取串口号

  // sp;  //定义一个全局变量，接收创建的端口
  modbusList : Array<any> = [];

  msg : Array<any> = [];
  constructor(private router:Router,
  private serialportService:SerialportService,
              public changeDetectorRef:ChangeDetectorRef   //页面变量值被修改了却不刷新加入这个
  ) {

    console.log('ModbusComponent constructor');
  }

  ngOnInit() {
console.log('ModbusComponent ngOnInit');
    let that = this;
    that.com_num = that.serialportService.getComNum();
    if(that.com_num == '') {
      this.serialportService.getSerialPort().list(function (err, ports) {
        ports.forEach(function(port,key) {
          if(key == 0) {
            that.com_num = port.comName;
            that.serialportService.setComNum(port.comName);
          }
          // that.comName[key] = port.comName;
          // console.log(that.comName);
        });
      });
    }

    console.log('modbus  that.com_num');
    console.log(that.com_num);

    setTimeout(function(){
      that.open_serial();
      that.post_info();
    },2000);
  }

  //向串口发送时间
  post_info() {
    //监听meterReading事件 获取数据
    this.send_times++;
    let times = this.serialportService.get_now_date('yyyy-MM-dd HH:mm:ss');
    let dd = '{"time":"'+times+'"}';
    this.serial_read_write(dd);
  }


  /*********************************串口数据发送和接收***********************************************/
  serial_read_write(write_data)  {  //串口操作
    //sp是用来记录创建的serialPort的
    if ((typeof this.serialportService.sp) != 'undefined') {
      if (this.serialportService.sp.path != this.com_num){  //sp有数据，且sp记录打开的串口号和即将创建的串口号不同
        this.open_serial();  //打开端口
        this.open_wr(write_data); //新创建的端口必须要先打开端口（sp.on('open',callback)）才能进行数据读写
      } else {   //这种情况就是打开串口之后一直进行发送操作
        if (this.send_times == 1) {//第一次进行发送，此时打开读写同时打开监听
          this.write_read(write_data); //端口已经创建，直接读写就可以，因为上一次创建端口时已经打开了端口，若此时继续打开端口，sp.on（'open',callback）内部的代码不会执行
        } else {
          this.serialportService.serial_write(write_data);
        }
      }
    } else {  //sp没有数据，则直接打开串口
      this.open_serial();
      this.open_wr(write_data);
    }
  }
  //打开串口
  open_serial() {
    this.serialportService.open_serial(this.com_num);
    // this.serialportService.sp = new serialPort(this.com_num, {
    //   baudRate: this.serialportService.getBaudrate(),  //波特率设置
    //   dataBits: this.serialportService.getDatabits(),  //数据位
    //   parity: this.serialportService.getParity(),  //校验位
    //   stopBits: this.serialportService.getStopbits() //停止位
    // });
  }
  /************************************打开串口并读写数据*********************************/
  open_wr(write_data) {
    let that = this;
    that.serialportService.sp.on("open", function (err) {
      if (err) {
        console.log(err + "打开串口出错，请重试");
      } else {
        console.log('串口已经打开2');
        that.serial_read();
        that.serialportService.serial_write(write_data);
      }
    });
  }
  /*****************************************读写数据***************************************/
  write_read(write_data) {
    this.serial_read();
    this.serialportService.serial_write(write_data);
  }

  /****************************读串口************************************************/
  serial_read() {
    let that = this;
    let count = 0;
    let ret = '';
    that.serialportService.sp.on('data', function (info) {
      ret += info+'';
      // console.log(info+'');
      count = 0;
      setTimeout(function(){
        if(count == 0) {
          count++;
          console.log('3000毫秒了');
          ret=ret.replace(/\s+/g,"");    //去掉空格
          ret=ret.replace(/[\r\n]/g,"");//去掉回车换行
          // if (that.serialportService.isJsonFormat(ret)) {
          var b = '[';
          if (ret.indexOf("}{") > 0) {
            let infos_ = ret.split('}{');
            if(infos_.length >= 1){
              infos_.forEach((val, idx) => {
                if(idx == 0){
                  b+=val;
                }else {
                  b+= '},{' + val;
                }
              });
            }
          }
          b += ']';

          console.log(b);
          let modbusLists = JSON.parse(b);
          ret = '';
          that.modbusList = [];
          modbusLists.forEach((val, idx) => {
            if (val['A']) {
              val['A'].forEach((vala, idxa) => {
                that.modbusList.push(vala);
              });
            } else if (val['B']) {
              val['B'].forEach((valb, idxb) => {
                that.modbusList.push(valb);
              });
            } else if (val['C']) {
              val['C'].forEach((valc, idxc) => {
                that.modbusList.push(valc);
              });
            } else if (val['D']) {
              val['D'].forEach((vald, idxd) => {
                that.modbusList.push(vald);
              });
            } else if (val['E']) {
              val['E'].forEach((vale, idxe) => {
                that.modbusList.push(vale);
              });
            } else if (val['F']) {
              val['F'].forEach((valf, idxf) => {
                that.modbusList.push(valf);
              });
            }
          });

          //在更改数据后不刷新的地方添加这两句话
          that.changeDetectorRef.markForCheck();
          that.changeDetectorRef.detectChanges();
          // }
        }
      },3000);
    });
  }




}
