import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatTooltip,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})

export class Table {
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() columNamesRef!: string[];
  @Input() columNames!: string[];
  @Input() actions = [{
    id: '',
    name: '',
    icon: ''
  }];
  @Output() onAction = new EventEmitter<{ actionId: string; object: any }>();

  @ViewChild(MatPaginator) pagination!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }
}
