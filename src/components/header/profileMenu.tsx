import Image from 'next/image';
import Dropdown from '../dropdown';
import { JwtPayload } from 'jsonwebtoken';
import { UserTokenObject } from '@/pages/api/users/authenticate';

export default function ProfileMenu(props: { user: JwtPayload & UserTokenObject }) {
  function logOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <Dropdown>
      <Dropdown.Button>
        <Image src={props.user.profileImage} alt="profile" width={100} height={100} />
      </Dropdown.Button>
      <Dropdown.Menu>
        <Dropdown.Link href={'/account'}>My Profile</Dropdown.Link>
        <Dropdown.Option onClick={logOut}>Log out</Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
