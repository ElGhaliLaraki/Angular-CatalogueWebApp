import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  mode = 'list';
  currentCategorie;

  constructor(private catalogueService:CatalogueService) { }

  ngOnInit() {
    this.onGetAllCategories();
  }

  onGetAllCategories(){
    this.catalogueService.getAllCategories()
    .subscribe(data=>{
        this.categories=data;
    }, err => {
      console.log(err);
    })
  }

  onDeleteCat(cat){
    let c = confirm("Etes vous sure de supprimer ?");
    if(!c) return;
    this.catalogueService.deleteRessource(cat._links.self.href)
    .subscribe(data=>{
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
    })
  }

  onNewcat(){
    this.mode = 'new-cat';
  }
  
  onSaveCat(data){
    console.log(data);
    let url = this.catalogueService.host+"/categories";
    this.catalogueService.postRessource(url, data)
    .subscribe(data=>{
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
    })
  }

  onEditCat(cat){
    this.catalogueService.getRessource(cat._links.self.href)
    .subscribe(data=>{
        this.currentCategorie = data;
        this.mode = 'edit-cat';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
    })
  }

  onUpdateCat(data){
    console.log(data);
    let url = this.catalogueService.host+"/categories";
    this.catalogueService.putRessource(this.currentCategorie._links.self.href, data)
    .subscribe(data=>{
        this.mode = 'list';
        this.onGetAllCategories();
      }, err => {
        console.log(err);
    })
  }

}
