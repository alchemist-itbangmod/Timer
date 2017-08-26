import { Link } from './routes'
import { injectGlobal } from 'styled-components';

injectGlobal`
 body {
   margin: 0;
 }
`

export default () => (
  <div>
    <div>Welcome to Next.js!</div>
    <Link route='room'>
      <a>Room</a>
    </Link>
    <br/>
    <Link route='time'>
      <a>Time</a>
    </Link>
  </div>
)