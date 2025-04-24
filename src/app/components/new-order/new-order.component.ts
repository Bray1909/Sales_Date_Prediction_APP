import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { EmployeeService } from '../../service/employee.service';
import { ShipperService } from '../../service/shipper.service';
import { ProductService } from '../../service/product.service';
import { OrderService } from '../../service/order.service';



interface Employee {
  empid: number;
  fullName: string;
}

interface Shipper {
  shipperId: number;
  companyName: string;
}

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Para hacer peticiones HTTP
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class NewOrderComponent implements OnInit {

  order = {
    employee: null as number | null,
    shipper: null as number | null,
    shipName: '',
    shipAddress: '',
    shipCity: '',
    shipCountry: '',
    orderDate: '',
    requiredDate: '',
    shippedDate: '',
    freight: null
  };

  orderDetail = {
    productId: null as number | null,
    unitPrice: null as number | null,
    quantity: null as number | null,
    discount: null as number | null
  };

  employees: Employee[] = [];
  shippers: Shipper[] = [];
  products: Product[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private shipperService: ShipperService,
    private productService: ProductService,
    private orderService: OrderService,

  ) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadShippers();
    this.loadProducts();
  }
  
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: data => this.employees = data,
      error: err => console.error('Error fetching employees:', err)
    });
  }
  
  loadShippers(): void {
    this.shipperService.getShippers().subscribe({
      next: data => this.shippers = data,
      error: err => console.error('Error fetching shippers:', err)
    });
  }
  
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Error fetching products:', err)
    });
  }
  
  onCloseClick(): void {
    this.router.navigate(['/clients']);
  }

  onSaveClick(): void {
    const orderData = {
      employee: this.order.employee,
      shipper: this.order.shipper,
      shipName: this.order.shipName,
      shipAddress: this.order.shipAddress,
      shipCity: this.order.shipCity,
      shipCountry: this.order.shipCountry,
      orderDate: this.order.orderDate,
      requiredDate: this.order.requiredDate,
      shippedDate: this.order.shippedDate,
      freight: this.order.freight,
      orderDetails: [{
        productId: this.orderDetail.productId,
        unitPrice: this.orderDetail.unitPrice,
        quantity: this.orderDetail.quantity,
        discount: this.orderDetail.discount
      }]
    };

    this.orderService.saveOrder(orderData).subscribe({
      next: response => {
        console.log('Order saved successfully:', response);
        this.router.navigate(['/clients']);
      },
      error: error => {
        console.error('Error saving order:', error);
      }
    });
  }
}
