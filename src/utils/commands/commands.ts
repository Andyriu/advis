export const commands = {
   help: () => {
      return "comandos disponibles: help, setlife, setdefense"
   },

   setlife: (value: string, setHealth: (value: number) => void) => {
      if (!isNaN(Number(value))) {
         setHealth(Number (value))
         return `vida establecida a ${value}`
      } else {
         return "eror: El valor de vida debe ser un numero"
      }
   },

   buy: async (value: string, executeBuy: (object_id: number) => Promise<string>) => {
      if (!isNaN(Number(value))) {
         return await executeBuy(Number(value));
      } else {
         return "Error: El objeto debe ser un valor numérico";
      }
   }
}