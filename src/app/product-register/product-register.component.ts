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
        console.log(res)
        if(res.ok){
          alert("Produto Cadastrado!");
          this.resetForm();
          this.sendReloadSignal();
        }
        else{
          alert("Erro ao Cadastrar!");
        }
      }
      );
  }

  updateProduct():void{ 
    this.web.updateProduct(this.product).subscribe(
      res => {
        console.log(res)
        if(res.ok){
          alert("Produto Atualizado!");
          this.resetForm();
          this.sendReloadSignal();
        }
        else{
          alert("Erro ao Atualizar!");
        }
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
