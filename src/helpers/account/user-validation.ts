import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { TableUser } from '../../../server/database/tableInterfaces';

YupPassword(Yup);

const userSchema = Yup.object({
  username: Yup.string()
    .required()
    .min(8, 'username must be at least 8 characters.')
    .max(20, 'username must be less than 20 characters.')
    .matches(/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/, 'username not valid')
    .notOneOf(['Guest'], '"Guest" is reserved for anyone logged out')
    .test('Unique username', 'username already in use.', (value) => isUsernameAvailable(value)),
  password: Yup.string().password().required(),
  birthdate: Yup.date().required(),
});

export type User = Yup.InferType<typeof userSchema>;

async function isUsernameAvailable(name: string) {
  try {
    const res = await fetch(`/api/users/available/${name}`);
    const { available } = await res.json();

    if (typeof available !== 'boolean') return false;

    return available;
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
