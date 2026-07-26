export interface RouteMode {

id:string;

name:string;

description:string;

weights:{
 safety:number;
 accessibility:number;
 fitness:number;
 traffic:number;
 distance:number;
};

}