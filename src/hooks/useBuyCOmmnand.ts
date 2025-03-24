// src/hooks/useBuyCommand.ts
import useBuy from "./useBuy";

const useBuyCommand = () => {
   const { buy } = useBuy();

   const executeBuy = async (object_id: number) => {
      if (!isNaN(object_id)) {
         const { success, message, error } = await buy(object_id);
         if (success) {
            return message;
         } else {
            return error;
         }
      } else {
         return "Error: El objeto debe ser un valor numérico";
      }
   };

   return { executeBuy };
};

export default useBuyCommand;   