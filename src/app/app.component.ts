import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataFormComponent } from './data-form/data-form.component';
import { RestApiService } from './service/rest-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'destination', 'numOfTravelers', 'budgetPerPerson', 'action'];
  
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialogue: MatDialog, private _travelservice: RestApiService) { }

  ngOnInit(): void {
    this.getFormList();
  }

  openDialog() {
    const dialogRef= this._dialogue.open(DataFormComponent,{
      maxWidth:'70vh',
      maxHeight: '80vh',
      height: '100%',
      width: '100%',
    })
    dialogRef.afterClosed().subscribe({next:(val)=>{
      if(val){
        this.getFormList()
      }
    }})
  }

  getFormList() {
    this._travelservice.getTravelDetails().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error(err)
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number) {
    this._travelservice.deleteDetails(id).subscribe(
      {
        next: (res) => {
          alert("Traveler delete successfully");
          this.getFormList()
        },
        error: console.log,
      }
    )
  }

  edit(data:any){
    const dialogRef=this._dialogue.open(DataFormComponent,{
      data
    });
    dialogRef.afterClosed().subscribe({next:(val)=>{
      if(val){
        this.getFormList()
      }
    }})
  }
}
