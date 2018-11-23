import { Component, OnInit } from '@angular/core';
import {LocalStorage} from "../shared/localStorage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: require('./menu.component.html'),
    styleUrls: [require('./menu.component.css')]
})
export class MenuComponent implements OnInit {

    constructor(
        private ls: LocalStorage,
        private router : Router,) { }

    ngOnInit() {
    }

    //退出登录
    logout(){
        this.ls.removeAll();
        this.router.navigate(['/login']);
    }

}