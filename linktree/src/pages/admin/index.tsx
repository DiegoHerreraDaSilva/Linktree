import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { useState, type FormEvent, useEffect } from "react";

import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebaseconnection";

import { 
  addDoc, // Adcicionar um documento dentro de uma coleção, gera um ID aleatório no FireStore
  collection, // Armazena o valor do nome da coleção do Banco de dados
  onSnapshot, // Monitoramento do banco de dados em tempo real
  query, // Fazer busca personalizada ou ordenar
  orderBy, // Ordenar de algum forma
  doc, // Acessar um item especifico do banco de dados
  deleteDoc 
} from "firebase/firestore";

interface LinkProps{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}


export function Admin(){

  const [nameInput, setNameInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [textColorInput, setTextColorInput] = useState("#f1f1f1")
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
  
  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, "links") // Variavel que armazena a collection "links"
    const queryRef = query(linksRef, orderBy("created", "asc"))

    const unsub = onSnapshot(queryRef, (snapshot) => { 
      let lista = [] as LinkProps[];
      // onSnapshot é um listener, sempre monitora o banco de dados, qualquer mudança chama ele
      snapshot.forEach((doc) =>{ // forEach -> percorre a lista
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
    
    })

    return() => { // Desmonta o onSnapshot, para não monitorar e consumir memoria
      unsub(); 
    }

  }, [])

  function handleRegister(e: FormEvent){
    e.preventDefault();

    if(nameInput === "" || urlInput === ""){
      alert("Preencha todos os campos")
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput, // Nome do link
      url: urlInput, // URL do link
      bg: backgroundColorInput, // Cor de fundo
      color: textColorInput, // Cor do texto
      created: new Date() // Quando foi criado
    })
    .then(() =>{
      setNameInput('')
      setUrlInput('')
      console.log('CADASTRADO COM SUCESSO')
    })
    .catch((_error) => {
      console.log("ERRO AO CADASTRAR NO BANCO")
    })
    
  }

  async function handleDeleteLink(id: string){
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header></Header>

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
        placeholder="Digite o nome do Link..."
        value={nameInput}
        onChange={ (e) => setNameInput(e.target.value) }
        ></Input>

        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
        type="url"
        placeholder="Digite a URL do Link..."
        value={urlInput}
        onChange={ (e) => setUrlInput(e.target.value) }
        ></Input>

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
            <input 
            type="color" // Type color do HTML, permite trocar a cor atraves de um input
            value={textColorInput}
            onChange={ (e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
            <input 
            type="color" // Type color do HTML, permite trocar a cor atraves de um input
            value={backgroundColorInput}
            onChange={ (e) => setBackgroundColorInput(e.target.value)}
            />
          </div>

        </section>

        {nameInput !== '' && (
        <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
          <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>
          <article 
          className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
          style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}
          >
          
            <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
          </article>
        </div>
        )}

        <button type="submit" className="mb-7 bg-blue-600 h-9 text-white font-medium gap-4 flex justify-center items-center cursor-pointer">
          Cadastrar
        </button>

      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus Links
      </h2>

      {links.map( (link) => (
        <article 
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{backgroundColor: link.bg, color: link.color}}       
        >
          <p>{link.name}</p>

          <div>
            <button 
            className="border border-dashed p-1 bg-black cursor-pointer"
            onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={18} color="#fff"></FiTrash>
            </button>
          </div>

        </article>
        ))}
      
    </div>
  )
}