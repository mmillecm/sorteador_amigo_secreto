import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Formulario } from './Formulario';

test('test if input is empty, new users cant be added to the list', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira o nome dos participantes')
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument()
    expect(button).toBeDisabled();

})

test('added new participants if input is filled', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira o nome dos participantes')
    const button = screen.getByRole('button');

    fireEvent.change(input, {
        target: {
            value: "Henrique Oliveira"
        }
    })

    fireEvent.click(button)

    expect(input).toHaveFocus()

    expect(input).toHaveValue("")
})

test('duplicates names cant be added on the list', () => {
    render(<RecoilRoot><Formulario /></RecoilRoot>)
    const input = screen.getByPlaceholderText('Insira o nome dos participantes')
    const button = screen.getByRole('button');

    fireEvent.change(input, {
        target: {
            value: "Henrique Oliveira"
        }
    })

    fireEvent.click(button)

    fireEvent.change(input, {
        target: {
            value: "Henrique Oliveira"
        }
    })

    fireEvent.click(button)

    const errorMessage = screen.getByRole('alert');

    expect(errorMessage.textContent).toBe("Nomes duplicados não são permitidos")
})