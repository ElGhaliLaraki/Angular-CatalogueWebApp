import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products;

  constructor(private catalogueService:CatalogueService, private router:Router, private route:ActivatedRoute) {
      router.events.subscribe(event=>{
          if(event instanceof NavigationEnd){
            let url = atob(route.snapshot.params.urlProds);
            this.getProducts(url);
          }
      }, err => {
        console.log(err);
      })      
   }

  ngOnInit() {
  }

  getProducts(url){
    this.catalogueService.getRessource(url).subscribe(data=>{
        this.products=data;
    }, err => {
      console.log(err);
    })
  }

}
