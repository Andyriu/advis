"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding";
import { createClient } from "@/utils/supabase/client";
import styles from "./page.module.css";
import { commands } from "@/utils/commands/commands";
import useCheckPlayer from "@/hooks/useCheckPlayer";
import useCheckAttributes from "@/hooks/useChechAttributes";

export default function GamePage() {
   const router = useRouter();
   const inputRef = useRef(null);

   const [email, setEmail] = useState<string>("");
   const [uuid, setUuid] = useState<string>("");
   const [name, setName] = useState<string>("");
   const [health, sethealth] = useState<number>(0);
   const [defense, setDefense] = useState<number>(0);
   const [money, setMoney] = useState<number>(0);
   const [level, setLevel] = useState<number>(0);
   const [exp, setExp] = useState<number>(0);
   const [loading, setLoading] = useState(true);
   const [comand, setComand] = useState<string>("");
   const [existPlayer, setExistPlayer] = useState <boolean>(false)
   const {checkPlayer} = useCheckPlayer();
   const {checkAttributes} = useCheckAttributes();

   useEffect(() => {
      const fetchData = async () => {
         const supabase = createClient();
         const { data, error } = await supabase.auth.getUser();
         if (error || !data?.user) {
            router.push("/login");
         } else {
            setEmail(data.user.email);
            setExistPlayer(true)
         }
      };
      fetchData();
   }, [router, existPlayer]);

   useEffect(() => {
      if (email) {
         const fetchData = async (email: string) => {
            const {valid, data, error} = await checkPlayer(email)
            if (!valid) {
               console.log(error)
               router.push('/game')
            } else {
               if (data.name){
                  setUuid(data.id)
                  setName(data.name)
               } else {
                  router.push('/game/initial')
               }
            }
         }
         fetchData(email)
      };
   }, [email, checkPlayer, router]);

   useEffect (() => {
      if (name) {
         const fetchData = async (uuid: string) => {
            const {valid, data, error} = await checkAttributes(uuid)
            if (!valid) {
               console.log(error)
               router.push('/game')
            } else {
               setLevel(data.level)
               sethealth(data.health)
               setDefense(data.defense)
               setMoney(data.money)
               setExp(data.exp)
               setLoading(false)
            }
         }
         fetchData(uuid)
      }
   },[name, uuid, checkAttributes, router])

   const executeCommand = useCallback(
      (commandText) => {
         const result = handleCommand(commandText);
         console.log(result);
         setComand("");
      },
      [],
   );

   const handleCommand = (commandText) => {
      const [command, ...args] = commandText.split(" ");
      const action = commands[command];

      if (action) {
         return action(...args);
      } else {
         return `Comando no reconocido: ${command}`;
      }
   };

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
                  {name && <p className="bg-unique-100">nombre:{name}</p>}
                  {name && <p className="bg-unique-100">id:{uuid}</p>}
                  {name && <p className="bg-unique-100">vida:{health}</p>}
                  {name && <p className="bg-unique-100">defensa:{defense}</p>}
                  {name && <p className="bg-unique-100">Nivel:{level}</p>}
                  {name && <p className="bg-unique-100">Exp:{exp}</p>}
                  {name && <p className="bg-unique-100">Dinero:{money}</p>}
               </div>
            </div>
            <div>
               <p className="bg-unique-100">historial de chat?</p>
            </div>
         </div>
      </Padding>
   );
}
