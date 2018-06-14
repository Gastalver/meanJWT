export class Usuario {
  constructor(
    public _id: string,
    public nombre:string,
    public apellidos:string,
    public apodo:string,
    public email:string,
    public clave:string,
    public rol:string,
    public imagen:string,
    public recibirToken:string
  ){
  }
}
