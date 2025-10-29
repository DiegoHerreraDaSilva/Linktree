import type { InputHTMLAttributes } from "react";
// Importa um type que contém os atributos de um input

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
// interface que extende o tipo que tem os atributos do Input

export function Input(props: InputProps){ 
  // Então esse componente  aceita todos os atributos normais de um input
  return(
    <input 
    className="border-0 h-9 rounded-md outline-none px-2 mb-3 bg-amber-50"
    {...props} // espalha todas as propriedades recebidas para dentro do <input> real.
    />
  )
}

/*Resultado final

componente de input personalizado e reaproveitável, que:

já vem estilizado com Tailwind

aceita todas as props padrão de um input HTML

continua tipado com segurança (TypeScript garante) */