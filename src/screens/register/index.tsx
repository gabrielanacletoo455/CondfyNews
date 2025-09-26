import Form from '@/components/Form';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useNavigationCustom from '@/hooks';
import AuthRegister from './services';
import { AuthLoginProps } from '../login/services';
import { FormField } from '@/components/Form/types';

const Register = () => {
  const navigation = useNavigationCustom();
  
  const { control, handleSubmit } = useForm<AuthLoginProps>();

  const { mutate: register, isPending } = useMutation({
    mutationFn: AuthRegister,
    onSuccess: () => {
      navigation.navigate('Index');
    },
    onError: (error: any) => {
      console.log('Erro ao realizar registro', error);
    },
  });

  const onSubmit = (data: AuthLoginProps) => {
    register(data);
  };

 
  const fields: FormField[] = [
    {
      name: 'email',
      label: 'Seu Email',
      placeholder: 'Digite seu email',
      type: 'email',
      keyboardType: 'email-address',
    },
    {
      name: 'password',
      label: 'Sua Senha',
      placeholder: 'Digite sua senha',
      type: 'password',
    },
  ];

  return (
    <Form
      title="Cadastro"
      fields={fields}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      submitText="Cadastrar"
      isPending={isPending}
      bottomText="Já tem uma conta?"
      bottomButtonText="Faça login aqui"
      onBottomButtonPress={() => navigation.navigate('Login')}
      yearText={`${new Date().getFullYear()} - CondfyNews`}
    />
  );
};

export default Register;