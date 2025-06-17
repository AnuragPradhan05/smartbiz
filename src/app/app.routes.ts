// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { Login } from './auth/login/login';
import { Admin } from './dashboards/admin/admin';
import { Employee } from './dashboards/employee/employee';
import { CustomerList } from './customers/customer-list/customer-list';
import { AddCustomer } from './customers/add-customer/add-customer';
import { AddProduct } from './products/add-product/add-product';
import { ReportSummary } from './reports/report-summary/report-summary';
import { TransactionList } from './transactions/transaction-list/transaction-list';
import { ProductList } from './products/product-list/product-list';
import { EditCustomer } from './customers/edit-customer/edit-customer';
import { EditProduct } from './products/edit-product/edit-product';
import { AddTransaction } from './transactions/add-transaction/add-transaction';
import { Home } from './home/home';


export const appRoutes: Routes = [
    { path: '',component:Home},
    { path: 'login', component: Login },
    { path: 'admin-dashboard', component: Admin, canActivate: [authGuard] },
    { path: 'employee-dashboard', component: Employee, canActivate: [authGuard] },
    { path: 'customers', component: CustomerList, canActivate: [authGuard] },
    { path: 'add-customer', component: AddCustomer, canActivate: [authGuard] },
    { path: 'add-product', component: AddProduct, canActivate: [authGuard] },
    { path: 'transactions', component: TransactionList, canActivate: [authGuard] },
    { path: 'reports', component: ReportSummary, canActivate: [authGuard] },
    { path: 'products', component: ProductList, canActivate: [authGuard] },
    { path: 'edit-customer/:id', component: EditCustomer, canActivate: [authGuard] },
    { path: 'edit-product/:id', component: EditProduct, canActivate: [authGuard] },
    { path: 'add-transaction', component: AddTransaction, canActivate: [authGuard] }


];