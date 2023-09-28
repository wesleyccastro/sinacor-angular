import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar } from '@angular/material/snack-bar';
import { TarefaFormComponent } from './tarefa-form/tarefa-form.component';
import { Tarefa } from 'src/app/models/Tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent {
  
  tarefas: Tarefa[] = [];  
  exibeInserir: boolean = false;  
  constructor(public dialog: MatDialog, 
              private tarefaService: TarefaService,
              private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.ListarTarefas();
    }

    ListarTarefas(){
      this.tarefaService.get().subscribe((data: any) => {      
        this.tarefas = data;
      })
    }

    InsereTarefa(){
      this.exibeInserir = true;            
      const dialogRef = this.dialog.open(TarefaFormComponent, {
        data: {},
      });

      dialogRef.afterClosed().subscribe(tarefa => {        
        if(tarefa){
          this.tarefas.push(tarefa);          
          this.ListarTarefas();
        }
        this.exibeInserir = false;
      });
      
    }
    
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action);
    }
}
