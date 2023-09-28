export class Tarefa{
    id: number;
    descricao: string;
    data: Date;
    status: EnumStatusTarefa;

    constructor(id: number, descricao: string, data: Date, status: EnumStatusTarefa)
    {
      this.id = id;
      this.descricao = descricao;
      this.data = data;
      this.status = status;
    }
}

export enum EnumStatusTarefa
{
    Pendente = 1,
    EmAndamento = 2,
    Concluida = 3
}

export const listaStatusTarefa: any[] = [
    {name: 'Pendente', value: EnumStatusTarefa.Pendente},
    {name: 'Em Andamento', value: EnumStatusTarefa.EmAndamento},
    {name: 'Concluida', value: EnumStatusTarefa.Concluida}    
];