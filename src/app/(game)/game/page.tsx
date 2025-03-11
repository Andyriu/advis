"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Padding from "@/components/Padding";
import { createClient } from "@/utils/supabase/client";
import styles from "./page.module.css";
import { commands } from "@/utils/commands/commands";

export default function GamePage() {
   const router = useRouter();
   const inputRef = useRef(null);

   const [email, setEmail] = useState("");
   const [uuid, setUuid] = useState("");
   const [name, setName] = useState("");
   const [life, setLife] = useState(0);
   const [defense, setDefense] = useState(0);
   const [loading, setLoading] = useState(true);
   const [comand, setComand] = useState("");

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
         return action(...args, setLife, setDefense);
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
      const fetchData = async () => {
         const supabase = createClient();
         const { data, error } = await supabase.auth.getUser();
         if (error || !data?.user) {
            router.push("/login");
         } else {
            setEmail(data.user.email);
         }
      };
      fetchData();
   }, [router]);

   useEffect(() => {
      if (email) {
         const fetchData = async (email) => {
            const response = await fetch("/api/checkUser", {
               method: "POST",
               body: JSON.stringify({ email }),
               headers: {
                  "content-type": "application/json",
               },
            });
            const { exists, user } = await response.json();
            console.log(exists, user);
            if (exists) {
               setUuid(user.id);
            }
         };
         fetchData(email);
      }
   }, [email]);

   useEffect(() => {
      if (uuid) {
         const fetchData = async (uuid) => {
            const response = await fetch("/api/checkPlayer", {
               method: "POST",
               body: JSON.stringify({ uuid }),
               headers: {
                  "content-type": "application/json",
               },
            });
            const { exists, player } = await response.json();
            console.log(exists, player);
            if (exists) {
               setName(player.name);
               setLife(player.life);
               setDefense(player.defense);
               setLoading(false);
            } else {
               router.push("/game/initial");
            }
         };
         fetchData(uuid);
      }
   }, [uuid, router]);

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
                  {uuid && <p className="bg-unique-100">id:{uuid}</p>}
                  {uuid && <p className="bg-unique-100">vida:{life}</p>}
                  {uuid && <p className="bg-unique-100">defensa:{defense}</p>}
                  {uuid && <p className="bg-unique-100">nombre:{name}</p>}
               </div>
            </div>
            <div>
               <p className="bg-unique-100">historial de chat?</p>
            </div>
         </div>
      </Padding>
   );
}
