"use server";

import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import styles from "./Navbar.module.css";

export default async function Navbar() {
   const supabase = await createClient();
   const { data, error } = await supabase.auth.getUser();
   console.log(data);
   let session;
   if (error || !data?.user) {
      session = true;
   }
   return (
      <nav className={styles.container}>
         <h1>
            <Link href="/" className={styles.navLinkLogo}>Advis</Link>
         </h1>
         <ul className={styles.nav}>
            <li>
               <Link href="/wiki" className={styles.navLink}>Wiki</Link>
            </li>
            {session
               ? (
                  <li>
                     <Link href="/login" className={styles.navLink}>
                        Iniciar sesion
                     </Link>
                  </li>
               ) : (
                  <li>
                     <Link href="/game" className={styles.navLink}>
                        Comienza a jugar
                     </Link>
                  </li>
               )
            }
         </ul>
      </nav>
   );
}
