// src/stores/cart.js
import { defineStore } from 'pinia';


export const usePerfil = defineStore('perfil', {
  state: () => ({
    perfil : null, 
    cargado : false

  }),
  
  actions: {

    cargarPerfil(usuario){
        this.cargado = true; 
        this.perfil = usuario;  
    },

    clearCargado(){
        this.cargado = false; 
    }

    
  },
});