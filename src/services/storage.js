export const Storage=(data)=>{
    localStorage.setItem('idtoken',data);
}

export const getstorage=()=>{
   return localStorage.getItem('idtoken');
}