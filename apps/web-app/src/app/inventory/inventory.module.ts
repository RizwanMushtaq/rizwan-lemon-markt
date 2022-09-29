import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { MaterialModule } from '../material.module';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    InventoryComponent,
    InventoryHomeComponent,
    StockEntryComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule, A11yModule],
})
export class InventoryModule {}
