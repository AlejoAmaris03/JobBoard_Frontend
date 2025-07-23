import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})

export class SearchBar {
  @Input() placeholder!: string;
  @Output() onSearch = new EventEmitter<{ query: string }>();

  public onSearchEvent(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.onSearch.emit({ query: query });
  }
}
