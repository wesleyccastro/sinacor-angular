import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnumStatusTarefa, Tarefa, listaStatusTarefa } from './../../../models/Tarefa';
import { Component, Inject, Input } from '@angular/core';
import { TarefaService } from 'src/app/services/tarefa.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.css']
})
export class TarefaFormComponent {  

  public listaStatus = listaStatusTarefa;
  tarefa!: Tarefa;

  constructor(
    public dialogRef: MatDialogRef<TarefaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tarefaService: TarefaService,
    private snackBar: MatSnackBar
    ) { 
      if(data && data._tarefa)
        this.SelecionaTarefa(data._tarefa);
      else
        this.tarefa = new Tarefa(0,"",new Date(),EnumStatusTarefa.Pendente);      
  } 

  SelecionaTarefa(tarefa: Tarefa){        
    this.tarefa = new Tarefa(tarefa.id, tarefa.descricao, tarefa.data, tarefa.status)
    this.tarefa.descricao = tarefa.descricao;
  }

  Cancelar(){
    this.dialogRef.close();
  }

  Salvar(){    
    this.tarefa.status = parseInt(this.tarefa.status.toString());    
    this.tarefaService.post(this.tarefa).subscribe((data: any) => {      
      this.dialogRef.close(data);
      this.openSnackBar("Tarefa salva com sucesso!","OK");
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 3000});
  }

}
