import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { listaStatusTarefa, Tarefa } from 'src/app/models/Tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { TarefaFormComponent } from '../tarefa-form/tarefa-form.component';

@Component({
  selector: 'app-tarefa-table',
  templateUrl: './tarefa-table.component.html',
  styleUrls: ['./tarefa-table.component.css']
})
export class TarefaTableComponent {
  @Input() tarefas: Tarefa[] = [];
  displayedColumns: string[] = ['Id', 'Descricao', 'Data', 'Status', 'Actions'];

  constructor(public dialog: MatDialog, 
    private tarefaService: TarefaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.tarefas.length == 0)
      this.getTarefas();
  }

  getTarefas(){
    this.tarefaService.get().subscribe((data: any) => {      
      this.tarefas = data;
    })
  }

  editar(_tarefa: Tarefa){
    const dialogRef = this.dialog.open(TarefaFormComponent, {
      data: {_tarefa},
    });

    dialogRef.afterClosed().subscribe(tarefa => {        
      if(tarefa){
        this.getTarefas();       
      }     
    });
  }

  getDescricaoStatus(_status: number): string{
    let status  = listaStatusTarefa.find(x => x.value == _status);
    if(status)
      return status.name;
    else
      return "";
  }



}
