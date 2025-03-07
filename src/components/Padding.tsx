export default function Padding ({children,}: Readonly<{children: React.ReactNode;}>) {
   return (
      <div className="px-24">
         {children}
      </div>
   )
}