import { getstorage } from "./storage";


export const Authentication=()=>{
    return getstorage()!=null?true:false;
}