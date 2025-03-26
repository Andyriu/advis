import styles from "./Padding.module.css"

export default function Padding ({children,}: Readonly<{children: React.ReactNode;}>) {
   return (
      <div className={styles.padding}>
         {children}
      </div>
   )
}