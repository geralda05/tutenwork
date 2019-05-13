import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import WOW from 'wow.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  message: string = '';
  user: string = '';
  pass: string = '';
  loading: string = '';
  constructor(
    private router: Router
  ) { }
  onSubmit() { 
    var self = this;
    self.message = '';
    self.loading = '1';
    localStorage.removeItem('acceso_token_tuten');
    axios({
      method:'put',
      url:'https://dev.tuten.cl/TutenREST/rest/user/testapis%40tuten.cl',
      headers:{
        "password": self.pass,
        "app": "APP_BCK",
      }
    }).then(
      function (response){
        self.message = '';
        console.log(response.data.sessionTokenBck)
        localStorage.setItem('acceso_token_tuten', response.data.sessionTokenBck);
        self.router.navigate(['/app-dashboard']);
        self.loading = '';
    }).catch(error =>{
      self.loading = '';
      self.message = error.response.data;
     // if(error.response.data.errors.status === 401){
       // self.message = "Usuario o contraseña incorrecta."
    //  }else{
      //  self.message = "Error "+error.response.data.errors.status+": "+error.response.data.errors.message;
   //   }
    });
  }


  ngOnInit() {
    new WOW().init();
  }

}
