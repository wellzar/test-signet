// import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';

export interface Film {
  id: string;
  name: string;
  genre1: string;
  genre2: string;
  year: number
}

@Component({
  selector: 'app-filtered',
  templateUrl: './filtered.component.html',
  styleUrls: ['./filtered.component.scss']
})
export class FilteredComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'genre1', 'genre2', 'year'];
  dataSource!: MatTableDataSource<Film>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  genre1!: any;
  genres1!: Array<any>;
  genre2!: any;
  genres2!: Array<any>;
  year!: any;
  years!: Array<any>;

  constructor(
    private ds: DataService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(undefined);
    this.updateData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateData() {
    this.ds.postFilter(this.genre1, this.genre2, this.year).pipe(take(1)).subscribe((res: any) => {
      const t = JSON.parse(res).res;
      if (!this.genres1) {
        this.genres1 = [undefined, ...new Set(t.map((row: any) => row.genre1))]
        this.genres2 = [undefined, ...new Set(t.map((row: any) => row.genre2))]
        this.years = [undefined, ...new Set(t.map((row: any) => row.year))]
      }

      this.dataSource.data = JSON.parse(res).res;
    })
  }

}
