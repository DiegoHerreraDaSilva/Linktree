import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { useEffect, useState, type FormEvent } from "react";

import { db } from "../../services/firebaseconnection";

import { 
  setDoc, // Cria um item que escrevemos o nome
  doc, 
  getDoc // Buscar uma vez um unico documento
 } from "firebase/firestore";

export function Networks(){

  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [youtube, setYoutube] = useState("")

  useEffect(() =>{
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
      .then((snapshot) =>{
        if(snapshot.data() !== undefined){
          setLinkedin(snapshot.data()?.linkedin) 
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
          // ? - Garante que se tentarmos acessar e não existir, vai vir nula
          // Sem "?", crasharia
        }
      })
    }

    loadLinks();
  }, [])

  function handleRegister(e: FormEvent){
    e.preventDefault();

    setDoc(doc(db, "social", "link"), { 
      // setDoc, preciso falar qual a coleção e o nome do documento que vai criar
      // E não cria um doc novo, salva no mesmo document do firebase
      linkedin: linkedin,
      instagram: instagram,
      youtube: youtube
    })
    .then(() =>{
      console.log('Cadastrado com sucesso')
    })
    .catch((error) => {
      console.log("ERRO AO SALVAR" + error)
    })
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header></Header>

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
          <Input
          type="url"
          placeholder="Digite a URL do Instagram"
          value={instagram}
          onChange={ (e) => setInstagram(e.target.value)}
          ></Input>

        <label className="text-white font-medium mt-2 mb-2">Link do Linkedin</label>
          <Input
          type="url"
          placeholder="Digite a URL do Facebook"
          value={linkedin}
          onChange={ (e) => setLinkedin(e.target.value)}
          ></Input>

        <label className="text-white font-medium mt-2 mb-2">Link do YouTube</label>
          <Input
          type="url"
          placeholder="Digite a URL do YouTube"
          value={youtube}
          onChange={ (e) => setYoutube(e.target.value)}
          ></Input>

          <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 mt-7 font-medium cursor-pointer"
          >
            Salvar Links
          </button>

      </form>

    </div>
  )
}