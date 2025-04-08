import { UserNameIcon, MessageIcon, LockIcon, GoogleIcon, FacebookIcon } from '../icons';

const BASE_FIELDS = {
  email: {
    id: 'email',
    type: 'email',
    placeholder: 'Your Email',
    icon: MessageIcon
  },
  password: {
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    icon: LockIcon
  }
};

const REGISTER_FIELDS = [
  {
    id: 'username',
    type: 'text',
    placeholder: 'Full Name',
    icon: UserNameIcon
  },
  BASE_FIELDS.email,
  BASE_FIELDS.password,
  {
    id: 'password_again',
    type: 'password',
    placeholder: 'Password Again',
    icon: LockIcon
  }
];

const LOGIN_FIELDS = [BASE_FIELDS.email, BASE_FIELDS.password];

const AUTH_PROVIDERS = [
  { provider: 'Google', Icon: GoogleIcon },
  { provider: 'Facebook', Icon: FacebookIcon, iconColor: '#33A0FF' }
];

export { REGISTER_FIELDS, LOGIN_FIELDS, AUTH_PROVIDERS };
