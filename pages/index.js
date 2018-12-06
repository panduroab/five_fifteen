import Link from 'next/link';

const Index = () => (<div>
  <p>
    <ul>
      <li>
        <Link>
          <a href="/users">
            Users
          </a>
        </Link>
      </li>
    </ul>
  </p>
</div>);
export default Index;
