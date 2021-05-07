import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class ClimaService {

    constructor(public http : HttpClient) {
    }
    

    findbyName(name : String) {
        this.http.get(`${API_CONFIG.baseUrl}q=${name}&appid=${API_CONFIG.key}&units=metric`);
    }
 
}