import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})

export class SearchBoxComponent {
  //Exporta el placeholder para que pueda ser usado en otros componentes
  @Input()
  public placeholder: string = '';
//salida de datos para event emitter
  @Output()
  public onValue = new EventEmitter<string>();

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }
}
