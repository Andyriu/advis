"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding";
import { createClient } from "@/utils/supabase/client";
import styles from "./page.module.css";
import { commands } from "@/utils/commands/commands";
import usePlayer from "@/hooks/usePlayer";
import useBuyCommand from "@/hooks/useBuyCOmmnand";
import { log } from "console";

export default function GamePage() {
   const router = useRouter();
   const inputRef = useRef(null);

   const {player, uuid, name, health, defense, money, level, exp, updateAttributes} = usePlayer();
   const { executeBuy } = useBuyCommand();

   const [loading, setLoading] = useState(true);
   const [comand, setComand] = useState<string>("");
   const [validInitial, setValidInitial] = useState<boolean>(false)

   useEffect(() => {
      if (!validInitial) {
         const fetchData = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
               router.push("/login");
            } else {
               const {exist, error} = await player(data.user.email)
               if (exist) {
                  setValidInitial(true)
                  setLoading(false)
               } else {
                  console.log(error)
                  router.push('/game/initial')
               }
            }
         };
         fetchData();
      }
   }, [validInitial, router, player]);


   const handleCommand = useCallback (
      (commandText) => {
         const [command, ...args] = commandText.split(" ");
         const action = commands[command];
   
         if (action) {
            if (command === "buy") {
               return action(args[0], executeBuy);
            } else {
               return action(...args);
            }
         } else {
            return `Comando no reconocido: ${command}`;
         }
      }, [executeBuy]
   )

   const executeCommand = useCallback(
      (commandText) => {
         const result = handleCommand(commandText);
         updateAttributes(uuid)
         console.log(result);
         setComand("");
      },
      [handleCommand, updateAttributes, uuid],
   );

   useEffect(() => {
      const inputElement = inputRef.current;
      const handleBur = () => {
         inputElement.focus();
      };
      if (inputElement) {
         inputElement.focus();
         inputElement.addEventListener("blur", handleBur);
      }
      return () => {
         if (inputElement) {
            inputElement.removeEventListener("blur", handleBur);
         }
      };
   }, []);

   useEffect(() => {
      const handleClick = (event) => {
         if (inputRef.current && !inputRef.current.contains(event.target)) {
            inputRef.current.focus();
         }
      };

      document.addEventListener("click", handleClick);

      return () => {
         document.removeEventListener("click", handleClick);
      };
   }, []);


   useEffect(() => {
      const key = (event) => {
         if (event.key === "Enter") {
            executeCommand(comand);
         }
      };
      document.addEventListener("keydown", key);
      return () => {
         document.removeEventListener("keydown", key);
      };
   }, [comand, executeCommand]);

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen">
            <div className={styles.typewriter}>
               <p className="text-2xl ">Cargando...</p>
            </div>
         </div>
      );
   }

   return (
      <Padding>
         <div className="flex justify-evenly">
            <div>
               <div className={"p-7 rounded-xl w-96 ${styles.console}"}>
                  <div className="text-unique-100 font-mono text-xl">
                     <div className="flex items-center">
                        <p>{comand}</p>
                        <span className={styles.cursor}></span>
                     </div>
                  </div>
                  <input
                     type="text"
                     value={comand}
                     onChange={(event) => setComand(event.target.value)}
                     autoFocus
                     className="opacity-0 absolute"
                     ref={inputRef}
                  />
               </div>
               <div className="p-7 bg-unique-500 rounded-xl">
                  <h1 className="bg-unique-100">como esta distribuido esto?</h1>
                  {validInitial && <p className="bg-unique-100">nombre:{name}</p>}
                  {validInitial && <p className="bg-unique-100">id:{uuid}</p>}
                  {validInitial && <p className="bg-unique-100">vida:{health}</p>}
                  {validInitial && <p className="bg-unique-100">defensa:{defense}</p>}
                  {validInitial && <p className="bg-unique-100">Nivel:{level}</p>}
                  {validInitial && <p className="bg-unique-100">Exp:{exp}</p>}
                  {validInitial && <p className="bg-unique-100">Dinero:{money}</p>}
               </div>
            </div>
            <div>
               <p className="bg-unique-100">historial de chat?</p>
            </div>
         </div>
      </Padding>
   );
}
