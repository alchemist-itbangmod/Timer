import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Layout } from '../components/Core/global'

const StatusMsg = styled.span`
  color: red;
`

const Error = ({ statusCode }) => (
  <Layout>
    <section className='section'>
      <div className='container'>
        <div className='columns'>
          <div className='column has-text-centered'>
            <h3>
              Error, <StatusMsg>{statusCode}</StatusMsg>
            </h3>
            <Link href='/'>
              <a className='col-4 btn btn-primary btn-lg'>Back</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

Error.getInitialProps = ({ res, jsonPageRes }) => {
  const statusCode = res ? res.statusCode : jsonPageRes && jsonPageRes.status
  return { statusCode }
}

export default Error
