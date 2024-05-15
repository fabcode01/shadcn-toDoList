import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";




export default function Home() {
  // lista
  const[lista, setLista] = useState([])


  // Form
  const[tarefa, setTarefa] = useState([])
  const[prazo, setPrazo] = useState()

  // State
  const[showAlert, setShowAlert] = useState('hidden')
  const[render, SetRender] = useState([])


  // addTarefa
  function addTarefa(tarefaForm, prazoForm){
    const date = new Date()
    setPrazo(), 
    setTarefa()

    // se prazo for undefined setar pro dia atual
    if(!prazoForm){
      prazoForm = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }

    const tarefa = {
      
      id: date.getSeconds(),
      tarefaForm,
      criado: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      status: 0,
      prazoForm
  }
    
    if(tarefaForm){
      setLista([...lista, tarefa])
      showAlertFunc()
    }

    console.log(lista)
  }



 
  // Concluida
 
    const setConcluida = (id) => {
      lista[id].status = 1
    };
    
    
  







  function showAlertFunc(){
    setShowAlert('flex')
    setTimeout(()=>{
      setShowAlert('hidden')
    },2000)
  }
  
  return (
    <>
      <h1 className="text-center m-5 font-bold">Minhas Tarefas</h1>

    <div className="p-5">
      <Table className='border max-w-[800px] m-auto'>
        <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Tarefa</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Criado</TableHead>
        <TableHead className="text-right">Prazo</TableHead>
      </TableRow>
        </TableHeader>
        
        <TableBody>
      
        {lista.map((item, index)=>(
          <TableRow onDoubleClick={()=> setConcluida(index)}  key={index}>
          <TableCell>{item.tarefaForm}</TableCell>

          <TableCell className={item.status == 0 ? '' : 'text-green-500'}>{item.status == 0 ? 'Pendente' : 'Concluida'}</TableCell>

          <TableCell>{item.criado}</TableCell>
          <TableCell className='text-end'>{item.prazoForm}</TableCell>
          </TableRow>
        ))}
      
      
      
        </TableBody>
        <TableCaption>Clique duas vezes na tarefa para marcá-la como concluída.</TableCaption>
      </Table>
    </div>

    <div className="flex justify-center">
    <Dialog>
      <DialogTrigger asChild>
      <Button>Adicionar Tarefa</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione uma tarefa</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tarefa" className="text-right">
              Tarefa
            </Label>
            <Input required id="tarefa" placeholder='Fazer um bolo' className="col-span-3" onChange={(e)=>setTarefa(e.target.value)}/>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prazo" className="text-right">
              Prazo
            </Label>
            <Input required id="prazo"
            type='date'  className="col-span-3" 
            onChange={(e)=>setPrazo(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>

          {tarefa && <DialogClose>
            <Button type="submit" onClick={()=>addTarefa(tarefa, prazo)}>

                Adicionar
            
            </Button>
          </DialogClose>}
          
        </DialogFooter>
      </DialogContent>
    </Dialog>


      </div>

      <div className={`${showAlert} justify-center mt-10`}>
        <Alert className='w-2/3'>
          <AlertTitle className='text-green-700'>Sucesso</AlertTitle>
          <AlertDescription>
            Tarefa Adicionada
          </AlertDescription>
        </Alert>
      </div>


    </>
  );
}
