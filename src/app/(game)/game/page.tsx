'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Padding from "@/components/Padding"
import { createClient } from "@/utils/supabase/client"
import styles from './page.module.css';

export default function GamePage() {
   const router = useRouter()

   const [email, setEmail] = useState("")
   const [uuid, setUuid] = useState("")
   const [name, setName] = useState("")
   const [life, setLife] = useState(0)
   const [defense, setDefense] = useState(0)
   const [loading, setLoading] = useState(true)


   useEffect (() => {
      const fetchData = async () => {
         const supabase = createClient()
         const { data, error } = await supabase.auth.getUser()
         if (error || !data?.user) {
            router.push("/login")
         } else {
            setEmail(data.user.email)
         }
      }
      fetchData()
   }, [router])

   useEffect (() => {
      if(email){
         const fetchData = async (email) =>{
            const response = await fetch("/api/checkUser", {
               method: "POST",
               body: JSON.stringify({ email }),
               headers: {
                  "content-type": "application/json"
               }
            })
            const {exists, user} = await response.json()
            console.log(exists, user)
            if (exists) {
               setUuid(user.id)
            }
         } 
         fetchData(email)
      }
   }, [email])

   useEffect (() => {
      if (uuid) {
         const fetchData = async (uuid) => {
            const response = await fetch("/api/checkPlayer", {
               method: "POST",
               body: JSON.stringify({ uuid }),
               headers: {
                  "content-type": "application/json"
               }
            })
            const {exists, player} = await response.json()
            console.log(exists, player)
            if (exists) {
               setName(player.name)
               setLife(player.life)
               setDefense(player.defense)
            } else {
               router.push("/game/initial")
            }
            setLoading(false)
         }
         fetchData(uuid)
      }
   }, [uuid, router])

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen" >
            <div className = {styles.typewriter}>
               <p className="text-2xl ">Cargando...</p>
            </div>
         </div>
      );
   }


   return (
      <Padding>
         <div className="flex justify-evenly">
            <div >
               <div className="p-7 bg-unique-500 rounded-xl w-96">
                  {
                     email && <p className="bg-unique-100">Hello {email}</p>
                  } 
               </div>
               <div className="p-7 bg-unique-500 rounded-xl">
                  <h1 className="bg-unique-100">como esta distribuido esto?</h1>
                  {
                     uuid && <p className="bg-unique-100">id:{uuid}</p>
                  }
                  {
                     uuid && <p className="bg-unique-100">vida:{life}</p>
                  }
                  {
                     uuid && <p className="bg-unique-100">defensa:{defense}</p>
                  }
                  {
                     uuid && <p className="bg-unique-100">nombre:{name}</p>
                  }
               </div>
            </div>         
            <div>
               <p className="bg-unique-100">historial de chat?</p>
            </div>
         </div>
      </Padding>
   )
}