import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { Product } from '../Product';
import { WebService } from '../web.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private web: WebService) { 
    this.product_list = [];
  }

  @Output() productEmitter = new EventEmitter<Product>();

  product_list:Product[];


  load_product_list():void{
    this.web.getProducts().subscribe(
      res => this.product_list = res
      , res => {
        console.log(res)
        alert(res.error.msg);
      })
  }

  deleteProduct(product: Product){
    if(window.confirm("Você realmente deseja deletar esse produto?")){
     
      this.web.deleteProduct(product).subscribe( 
        res => {
          if(res.ok){
            window.alert("Produto deletado com sucesso");
            this.load_product_list();
          }
        }
      , res => {
        console.log(res);
        alert(res.error.msg);
        }

      );
    }

  }

  sendProduct(product: Product){
    let productCopy = {title: product.title, price: product.price, description: product.description, _id: product._id, createdAt: product.createdAt, updatedAt: product.updatedAt, __v: product.__v};
    this.productEmitter.emit(productCopy);
  }

  ngOnInit(): void {
    this.load_product_list();
  }

  eventHandler():void{
    this.load_product_list();
  }

}
