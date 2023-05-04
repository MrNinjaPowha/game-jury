import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { TableUser } from '../../../server/database/tableInterfaces';

YupPassword(Yup);

const userSchema = Yup.object({
  username: Yup.string()
    .required()
    .min(8, 'username must be at least 8 characters.')
    .max(20, 'usernam must be less than 20 characters.')
    .test('Unique username', 'username already in use.', (value) => isUsernameAvailable(value)),
  password: Yup.string().password().required(),
  birthdate: Yup.date().required(),
});

export type User = Yup.InferType<typeof userSchema>;

async function isUsernameAvailable(name: string) {
  try {
    const res = await fetch(`/api/users/available/${name}`);
    const data: TableUser[] = await res.json();
    return data.length ? false : true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function validateUser(user: User) {
  try {
    const response = await userSchema.validate(user);

    return response;
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      return err.message;
    }

    return 'Unknown error occurred, please try again later.';
  }
}
