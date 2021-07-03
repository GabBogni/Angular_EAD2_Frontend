import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebService } from '../web.service';
import { Product } from '../Product';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {
  
  product: Product;

  constructor(private web: WebService) { 
   this.product =  {title: "", description: "", price: 0, _id: "", createdAt: "", updatedAt: "", __v: ""}
  }

  @Output() reloadSignalEmitter = new EventEmitter();


  ngOnInit(): void {
  }

  registerProduct():void{
    this.web.registerProduct(this.product).subscribe(
      res => {
        if(res.ok){
          alert("Produto Cadastrado!");
          this.resetForm();
          this.sendReloadSignal();
        }
      }
      , res => {
        console.log(res)
        alert(res.error.msg);
      }
      );
  }

  updateProduct():void{ 
    this.web.updateProduct(this.product).subscribe(
      res => {
        if(res.ok){
          alert("Produto Atualizado!");
          this.resetForm();
          this.sendReloadSignal();
        }
      }
      , res => {
        console.log(res)
        alert(res.error.msg);
      }
      );
  }

  eventHandler(product: Product):void{
      this.product = product;
  }

  resetForm():void{
    this.product = {title: "", description: "", price: 0, _id: "", createdAt: "", updatedAt: "", __v: ""}
  }

  sendReloadSignal(){
    this.reloadSignalEmitter.emit();
  }


}
