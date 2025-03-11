export const commands = {
   help: () => {
      return "comandos disponibles: help, setlife, setdefense"
   },

   setlife: (value, setLife) => {
      if (!isNaN(value)) {
         setLife(Number (value))
         return 'vida establecida a ${value}'
      } else {
         return "eror: El valor de vida debe ser un numero"
      }
   }
}