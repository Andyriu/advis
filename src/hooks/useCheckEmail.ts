import { useState } from "react";

interface ICheckEmailResponse {
   exist: boolean;
   data?: object;
   error?:string
}

const useCheckEmail = () => {
   const checkEmail = async (email: string): Promise<ICheckEmailResponse> => {
      const response = await fetch("/api/chekEmail", {
         method: "POST",
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ email }),
      });
      const { exists, player, error} = await response.json();
      if (error) {
         return {exist: exists, error: error}
      } else {
         return {exist: exists, data: player}
      }
      
   };
   return { checkEmail };
};

export default useCheckEmail;
