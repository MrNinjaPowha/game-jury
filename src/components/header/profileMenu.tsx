import Image from 'next/image';
import Dropdown from '../dropdown';
import { JwtPayload } from 'jsonwebtoken';
import { UserTokenObject } from '@/pages/api/users/authenticate';

export default function ProfileMenu(props: { user: JwtPayload & UserTokenObject }) {
  function logOut() {
    localStorage.removeItem('token');
    window.location.assign('/');
  }

  return (
    <Dropdown>
      <Dropdown.Button>
        {props.user.profileImage ? (
          <Image
            className="h-12 w-12 border border-gray-400 dark:border-gray-300"
            src={props.user.profileImage}
            alt="profile"
            width={100}
            height={100}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 bg-red-700 text-3xl text-gray-200 dark:border-gray-300">
            {props.user.username[0].toUpperCase()}
          </div>
        )}
      </Dropdown.Button>
      <Dropdown.Menu>
        <Dropdown.Link href={'/account'}>My Profile</Dropdown.Link>
        <Dropdown.Option onClick={logOut}>Log out</Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
