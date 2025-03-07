import { useEffect, useState } from "react";

export default function TypeWritter({ text, delay }) {
   const [texti, setTexti] = useState("");
   const [index, setIndex] = useState(0);

   useEffect (() => {
      if (index < text.length) {
         setTimeout(() => {
            setTexti((prev) => prev + text.charAt(index));
            setIndex((prev) => prev + 1);
         }, delay)
      }
   }, [index, delay, text])
}