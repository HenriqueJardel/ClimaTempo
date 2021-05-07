import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class ClimaService {

    // http para consulta ao endpoit get da API
    constructor(public http : HttpClient) {
    }
    

    //Realiza uma busca por nome, retorna um json contendo todo o conteudo
    //Ainda sendo implementado
    findbyName (name : String) : Observable<any> {
        return this.http.get(`${API_CONFIG.baseUrl}q=${name}&appid=${API_CONFIG.key}&units=metric`);
    }
}