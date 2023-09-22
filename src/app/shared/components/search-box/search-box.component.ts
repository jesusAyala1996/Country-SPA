import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  //Declaración de variable para el debouncer tipo subject
  private debouncer: Subject<string> = new Subject<string>();
  //Declaración de variable para el debouncer tipo suscription
  private debouncerSubscription?:Subscription;

  //Exporta el placeholder para que pueda ser usado en otros componentes
  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';
  //salida de datos para event emitter
  @Output()
  public onValue = new EventEmitter<string>();

  //salida de datos para event emitter debounce
  @Output()
  public onDebounce = new EventEmitter<string>();

  //metodo ngOnInit con debouncer de 300 milisegundos de espera para emitir el valor buscaddo en el search box
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer.
    pipe(
      debounceTime(300)
    ).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

//limpiar las susbscripciones
  ngOnDestroy(): void {
      this.debouncerSubscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }
  //debouncer.next siguiente emision para el observable
  onKeypress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
