import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MsalService } from '@azure/msal-angular';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _msalService: MsalService, private _employeeService: EmployeeService, public _dialog: MatDialog) {

  }

  res!: any;
  employeeData: any = [];
  displayedColumns = ['name', 'email', 'phoneNumber', 'position', 'action'];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.load();
  }
  logout() {
    this._msalService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }

  create(employee: any) {
    this._employeeService.createEmployee(employee).subscribe(response => console.log(response));
  }
  read(id: any) {
    this._employeeService.getEmployee(id).subscribe(response => console.log(response));
  }
  update(id: any, employee: any) {
    this._employeeService.updateEmployee(id, employee).subscribe(response => console.log(response));
  }
  delete(id: any) {
    this._employeeService.deleteEmployee(id).subscribe(
      response => {

      }
    );
  }
  load() {
    this._employeeService.loadEmployees().subscribe(response => {
      this.res = response;
      let employees = this.res.body;
      for (let employee of employees) {
        this.employeeData.push(this.trimEmployee(employee));
      }
      console.log(this.employeeData);
      this.dataSource = new MatTableDataSource(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  trimEmployee(employee: any): Employee {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      position: employee.position
    }
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialog(row: Employee) {
    const dialog = this._dialog.open(DialogComponent, { data: row });
    dialog.afterClosed().subscribe(
      data => {
        if (data != undefined) {
          this.delete(data);
        }
      }
    );
  }
}
