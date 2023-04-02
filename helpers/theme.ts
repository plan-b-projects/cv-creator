import styled from 'styled-components'

export const colors = {
    light: '#fff',
    dark: '#000',
    transparent: 'rgb(42,47,56, 0.5)',
    purple: '#c795f6', 
    blue: '#84ccfa',
    green: '#71d67b',
    yellow: '#f7dd65',
    red: '#ed7f61',
}

export const mediaScreen = {
    small: '600px',
}

export const H1 = styled.h1`
    color: ${colors.light};
    font-weight: 700;
    font-size: 40px;
    margin: 20px;
    margin-bottom: 40px;
    text-align: center;

    @media (max-width: 450px) {
        font-size: 26px;
        margin: 10px;
        margin-bottom: 20px;
    }
`
export const H2 = styled.h2`
    color: ${colors.light};
    font-weight: 700;
    font-size: 32px;
    margin: 20px;
    text-align: center;

    @media (max-width: 450px) {
        font-size: 20px;
        margin: 10px;
    }
`

export const Text = styled.p`
    color: ${colors.light};
    font-weight: 400;
    font-size: 16px;
`