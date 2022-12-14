import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante"

export const Formulario = () => {

    const [nome, setNome] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const adicionarNaLista = useAdicionarParticipante();

    const adicionarParticipante = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus();
    }
    return (
        <form onSubmit={adicionarParticipante}>
            <input
                ref={inputRef}
                value={nome}
                onChange={event => setNome(event.target.value)}
                type="text"
                placeholder="Insira o nome dos participantes"

            />
            <button disabled={!nome}>Adicionar </button>
        </form>
    )

}