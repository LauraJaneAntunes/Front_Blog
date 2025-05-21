//src\validations\authValidation.ts
import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Obrigatório'),
});

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Obrigatório'),
});

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),

  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Nova senha é obrigatória'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação da senha é obrigatória'),
});
