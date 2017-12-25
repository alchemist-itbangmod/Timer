import styled from 'styled-components'

// input

// button

const Nav = styled.nav`
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
`

const Layout = styled.div`
  font-size: 60px;
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Time = styled.div`
  color: #fff;
  text-align: center;
  font-size: 1.5em;
  font-family: 'segment', 'digital';
`

export { Layout, Time, Nav }
