"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding/Padding";
import { createClient } from "@/utils/supabase/client";
import styles from "./page.module.css";
import { commands } from "@/utils/commands/commands";
import usePlayer from "@/hooks/usePlayer";
import useBuyCommand from "@/hooks/useBuyCOmmnand";

export default function GamePage() {
   const router = useRouter();
   const inputRef = useRef(null);

   const {
      player,
      uuid,
      name,
      health,
      defense,
      money,
      level,
      exp,
      updateAttributes,
   } = usePlayer();
   const { executeBuy } = useBuyCommand();

   const [loading, setLoading] = useState(true);
   const [comand, setComand] = useState<string>("");
   const [validInitial, setValidInitial] = useState<boolean>(false);

   useEffect(() => {
      if (!validInitial) {
         const fetchData = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
               router.push("/login");
            } else {
               const { exist, error } = await player(data.user.email);
               if (exist) {
                  setValidInitial(true);
                  setLoading(false);
               } else {
                  console.log(error);
                  router.push("/game/initial");
               }
            }
         };
         fetchData();
      }
   }, [validInitial, router, player]);

   const handleCommand = useCallback(
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
      },
      [executeBuy],
   );

   const executeCommand = useCallback(
      (commandText) => {
         const result = handleCommand(commandText);
         updateAttributes(uuid);
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
         <div className={styles.loadingContainer}>
            <div className={styles.typewriter}>
               <p>Cargando...</p>
            </div>
         </div>
      );
   }

   return (
      <Padding>
         <div className={styles.organization}>
            <div className={styles.container}>
               <div className={styles.console}>
                  <input
                     type="text"
                     value={comand}
                     onChange={(event) => setComand(event.target.value)}
                     autoFocus
                     ref={inputRef}
                     className={styles.consoleinput}
                     spellCheck="false"
                     autoComplete="off"
                  />
               </div>
               <div className={styles.statsContainer}>
                  <h1>Estado del jugador</h1>
                  {validInitial && (
                     <p>
                        <span>Nombre:</span> <span>{name}</span>
                     </p>
                  )}
                  {validInitial && (
                     <p>
                        <span>Vida:</span> <span>{health}</span>
                     </p>
                  )}
                  {validInitial && (
                     <p>
                        <span>Defensa:</span> <span>{defense}</span>
                     </p>
                  )}
                  {validInitial && (
                     <p>
                        <span>Nivel:</span> <span>{level}</span>
                     </p>
                  )}
                  {validInitial && (
                     <p>
                        <span>Exp:</span> <span>{exp}</span>
                     </p>
                  )}
                  {validInitial && (
                     <p>
                        <span>Dinero:</span> <span>{money}</span>
                     </p>
                  )}
               </div>
            </div>
            <div className={styles.container}>
               <div className={styles.chatHistory}>
                  <h1>Historial de comandos:</h1>
                  <div>
                     <p>hola mundo</p>
                  </div>
               </div>
            </div>
         </div>
      </Padding>
   );
}
