import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { NewOrderComponent } from './components/new-order/new-order.component';


export const routes: Routes = [
    { path: '', component: ClientsComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'view-orders/:id', component: ViewOrdersComponent }, 
    { path: 'new-order', component: NewOrderComponent }, 
    { path: '**', redirectTo: '' }
];
