import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { CommonModule, DatePipe } from '@angular/common'; 
@Component({
  selector: 'app-view-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule], 
  providers: [DatePipe],
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  customerId: string | null = null;
  orders$: Observable<any[]>; 
  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];

  dataSource = new MatTableDataSource<any>(); 
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router 
  ) {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.orders$ = this.orderService.getOrdersByCustomerId(this.customerId!);
  }

  ngOnInit(): void {
    
    this.orders$.subscribe(orders => {
      this.dataSource.data = orders;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; 
      }
    });
  }

  onCloseClick(): void {
    this.router.navigate(['/clients']);
  }
}
