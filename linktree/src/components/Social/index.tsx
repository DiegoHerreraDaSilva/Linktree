import { type ReactNode } from "react"; 
//ReactNode é uma tipagem que aceita renderizar tudo

interface SocialProps{
  url: string;
  children: ReactNode;
}

export function Social({ url, children }: SocialProps){
  return(
    <a 
    href={url}
    rel="noopener noreferrer" // Fala que é uma URL externa
    target="_blank" // Abre uma nova guia
    >
      {children}
    </a>
  )
}