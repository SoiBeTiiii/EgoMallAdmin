interface ICoeCG  extends IBaseEntity{
   order?:number,
   description?:string,
   coecgpi?:[ICoeCGPI],
   coeclOs?:[ICoeCLO]
}