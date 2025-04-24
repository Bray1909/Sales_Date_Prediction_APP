import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class OrderService {

  private apiUrl = 'https://localhost:7035/api/Order/customer/';
  private saveUrl = 'https://localhost:7035/api/Order/add';

  constructor(private http: HttpClient) {}

  getOrdersByCustomerId(customerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${customerId}`);
  }

  saveOrder(order: any): Observable<any> {
    const discount = order.orderDetails[0].discount;
    const validDiscount = (discount != null && discount >= 0 && discount <= 1)
                          ? parseFloat(discount.toFixed(3)) 
                          : 0;

    const orderPayload = {
      empId: order.employee,
      shipperId: order.shipper,
      shipName: order.shipName,
      shipAddress: order.shipAddress,
      shipCity: order.shipCity,
      orderDate: order.orderDate,
      requiredDate: order.requiredDate,
      shippedDate: order.shippedDate,
      freight: order.freight,
      shipCountry: order.shipCountry,
      orderDetails: [
        {
          productId: order.orderDetails[0].productId,
          unitPrice: parseFloat(order.orderDetails[0].unitPrice?.toFixed(2) || '0'),
          quantity: order.orderDetails[0].quantity,
          discount: validDiscount,
        }
      ]
    };

    return this.http.post(this.saveUrl, orderPayload);
  }

}
