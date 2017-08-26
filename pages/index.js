import { Link } from './routes'

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