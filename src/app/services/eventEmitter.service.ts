import { Injectable, EventEmitter } from "@angular/core";


@Injectable()
export class eventEmitter {

    emitEvent = new EventEmitter<String>();

    emit(nome : String) {
        this.emitEvent.emit(nome);
    }
}