import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class ClimaService {

    
    constructor(public http : HttpClient) {
    }
    
    findbyName (name : String) : Observable<any> {
        return this.http.get(`${API_CONFIG.baseUrl}q=${name},BR&appid=${API_CONFIG.key}&units=metric&lang=pt_br`);
    }

    findbyCoordinates(latitude : number , longitude : number) : Observable<any> {
        return this.http.get(`${API_CONFIG.baseUrl}lat=${latitude}&lon=${longitude}&appid=${API_CONFIG.key}&units=metric&&lang=pt_br`);
    }
}