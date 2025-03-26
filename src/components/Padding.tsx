export default function Padding ({children,}: Readonly<{children: React.ReactNode;}>) {
   return (
      <div style={{ paddingLeft: '100px', paddingRight: '100px' }}>
         {children}
      </div>
   )
}