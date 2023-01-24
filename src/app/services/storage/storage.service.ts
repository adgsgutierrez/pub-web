import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public _sessionStorage = sessionStorage;

  constructor() {}

  save(key: string, value: any): void {
    let valueSave: string;
    if (typeof value == 'object') {
      valueSave = JSON.stringify(value);
    } else {
      valueSave = value;
    }
    this._sessionStorage.setItem(key, valueSave);
  }
  /**
   * Funcion para guardar valores en el storage de la aplicacion
   * @param key : llave con la cual se leera el valor
   * @returns string con el valor encontrado
   */
  get(key: string): string {
    return this._sessionStorage.getItem(key) || '';
  }
  /**
   * Funcion para borrar los valores en el storage de la aplicacion
   * @param key : llave con la cual se borrara el valor si no se envia key, se limpiara el storage
   */
  clear(key?: string): void {
    if (key) {
      this._sessionStorage.removeItem(key);
      return;
    }
    this._sessionStorage.clear();
  }
}
