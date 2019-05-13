import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import WOW from 'wow.js';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css']
})

export class AppDashboardComponent implements OnInit {

  resultados = [];
  simular = [{"bookingId":"1","firstName":"Gerald","LastName":"Alarcon","bookingTime":"2019-01-21","streetAddress":"Av Valera Trujillo","bookingPrice":"$500"}];
  loading: string = '';
  statuserror: string = '';
  newPost: string = '';
  newName: string = '';
  newLname: string = '';
  newTime: string = '';
  newPrice: string = '';
  newAddress: string = '';
  success: string = '';

  constructor(
      private router: Router
  ) { }

    sendPost(){
      var self = this;
      let newPostID = (self.resultados.length + 1);
      this.resultados.push({"bookingId":newPostID.toString(), "firstName":self.newName, "LastName":self.newLname, "bookingTime":self.newTime, "streetAddress":self.newAddress, "bookingPrice":self.newPrice});
    //  $('#newPostModal').modal('hide');
      this.success = '';
      this.newName = '';
      this.newLname = '';
      this.newAddress = '';
      this.newPrice = '';
      this.newTime = '';
    }

    getLogout(){
        localStorage.removeItem('acceso_token_tuten');
        this.router.navigate(['/inicio']);
    }

  ngOnInit() {
    new WOW().init();
    var self = this;
    if(localStorage.acceso_token_tuten){
      let userID = localStorage.getItem('acceso_token_tuten');
      let reallyToken = JSON.parse(JSON.stringify(userID));
      var self = this;
      this.loading = '1';
      this.statuserror = '';
      axios({
        method:'get',
        url:'https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true',
        headers:{
          "adminemail": "testapis@tuten.cl",
          "token":reallyToken,
          "APP":"APP_BCK"
        }
      }).then(
        function (response){
          self.loading = '';
          self.resultados = response.data;
      }).catch(
          function (error){
            self.statuserror = error;
      });
    }else{
      self.router.navigate(['/inicio']);
    }
  }

}
