import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(private http: HttpClient) { }

    getAllCustomers() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/customer`);
    }
    
    getCustomer(id: number) {
        return this.http.get(`${environment.apiUrl}/api/customer/${id}`); 
    }

    addCustomer(first_name: string, last_name: string, email: string, telefoon: number, username: string, password: string, street: string, housenumber: number, postal: string, city: string) {
        return this.http.post(`${environment.apiUrl}/api/register`, { first_name, last_name, email, telefoon, username, password, street, housenumber, postal, city });
    }

    updateCustomer(id: number) {
        return this.http.put(`${environment.apiUrl}/api/customer/${id}`, { });
    }

    uploadLicense(id: number, blob: string) {
        return this.http.put(`${environment.apiUrl}/api/customer/upload`, { id, blob });
    }

    // deze moet uiteindelijk in eigen booking.service.ts
    createBooking(carId: number, userId: number, beginDate, endDate, localStartTime, localEndTime, dropoffLocation, pricePh) {
        return this.http.post(`${environment.apiUrl}/api/booking`, {carId, userId, beginDate, endDate, localStartTime, localEndTime, dropoffLocation, pricePh});
    }

    deleteCustomer(id: number) {
        return this.http.delete(`${environment.apiUrl}/api/customer/${id}`);
    }

}
