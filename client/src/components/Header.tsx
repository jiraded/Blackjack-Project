import { ThemeContext } from 'styled-components'
import { useContext } from 'react'
import {
  Link,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  Modal,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { CheckIcon, ViewOffIcon } from '@chakra-ui/icons'
import { withFormik, FormikProps, Form, Field, FieldProps } from 'formik'

const Header: React.FC = () => {
  const theme = useContext(ThemeContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const validateUsername = (value: string) => {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value !== 'player') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  function validatePassword(value: string) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value !== '123456') {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  interface FormValues {
    username: string
    password: string
  }

  const InnerForm = (props: FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting } = props
    return (
      <Form>
        <Field name='username' validate={validateUsername}>
          {({ field }: FieldProps) => (
            <FormControl isInvalid={!!errors.username && !!touched.username}>
              <FormLabel>username</FormLabel>
              <InputGroup size='sm'>
                <Input {...field} placeholder='username' />
                <InputRightElement children={<CheckIcon color='green.500' />} />
              </InputGroup>
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='password' validate={validatePassword}>
          {({ field }: FieldProps) => (
            <FormControl mt={2} isInvalid={!!errors.password && !!touched.password}>
              <FormLabel>password</FormLabel>
              <InputGroup size='sm'>
                <Input {...field} type='password' placeholder='password' />
                <InputRightElement children={<ViewOffIcon />} />
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button mt={6} loadingText='Submitting' isFullWidth isLoading={isSubmitting} colorScheme='teal' type='submit'>
          Submit
        </Button>
      </Form>
    )
  }

  const MyForm = withFormik<{}, FormValues>({
    mapPropsToValues: () => {
      return {
        username: 'player',
        password: '123456',
      }
    },

    // Add a custom validation function (this can be async too!)
    // validate: (values: FormValues) => {
    //   let errors: FormikErrors<FormValues> = {};
    //   if (!values.email) {
    //     errors.email = 'Required';
    //   } else if (!isValidEmail(values.email)) {
    //     errors.email = 'Invalid email address';
    //   }
    //   return errors;
    // },

    handleSubmit: (values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    },
  })(InnerForm)

  return (
    <div className='flex justify-between py-2 px-6'>
      <div className='flex space-x-4'>
        <svg viewBox='0 0 497 497' width='40' height='40'>
          <path
            d='m313.935 373.318c1.057 5.531-2.659 10.843-8.217 11.747l-229.496 37.327c-6.9 1.208-13.542-3.415-14.76-10.273l-61.268-344.908c-1.219-6.864 3.434-13.47 10.34-14.679l221.896-38.84c6.9-1.208 13.542 3.415 14.76 10.273z'
            fill={theme.colors.gray[800]}
          />
          <path d='m305.72 385.07-204.12 33.19 20.59-53.44 95.71-248.5 31.37-81.45 64.67 338.45c1.05 5.53-2.66 10.84-8.22 11.75z' fill={theme.colors.gray[900]} />
          <path
            d='m257.397 331.083c1.017 5.475-2.635 10.727-8.122 11.679l-142.53 24.737c-4.437.788-8.801-2.742-9.696-7.845l-44.98-256.319c-.894-5.094 1.999-9.905 6.428-10.692l142.487-25.309c4.437-.788 8.801 2.742 9.696 7.845l13.937 79.417z'
            fill={theme.colors.lightBlue[600]}
          />
          <path d='m249.27 342.76-127.08 22.06 95.71-248.5 6.72 38.28 32.78 176.48c1.01 5.48-2.64 10.73-8.13 11.68z' fill={theme.colors.lightBlue[700]} />
          <path
            d='m353.258 482.665-210.351-80.154c-6.551-2.496-9.851-9.864-7.334-16.374l126.439-326.97c2.513-6.498 9.919-9.775 16.458-7.284l210.351 80.154c6.551 2.496 9.851 9.864 7.334 16.374l-126.439 326.97c-2.513 6.498-9.919 9.776-16.458 7.284z'
            fill={theme.colors.gray[800]}
          />
          <path d='m290.64 56.52-135.37 350.7-12.36-4.71c-6.55-2.49-9.85-9.86-7.34-16.37l126.44-326.97c2.52-6.5 9.92-9.78 16.46-7.29z' fill={theme.colors.gray[800]} />
          <path
            d='m269.803 192.386c16.262-8.493 33.036-2.327 35.493-1.38 21.536 8.304 27.511 30.004 28.096 32.281 2.234-1.314 23.904-13.58 46.186-3.279 3.782 1.749 17.337 8.657 23.069 24.034 6.331 16.985-1.09 33.011-4.23 39.792-21.205 45.792-97.663 48.162-106.568 48.351-5.165-4.889-58.696-56.819-45.359-105.745 2.15-7.893 6.952-25.509 23.313-34.054z'
            fill={theme.colors.red[600]}
          />
          <path
            d='m318.24 329.82c-13.2 2-23.46 2.3-26.39 2.36-5.17-4.89-58.7-56.81-45.36-105.74 2.15-7.89 6.95-25.51 23.31-34.05 3.36-1.76 6.74-2.89 10.02-3.56-3.97 7.66-5.99 15.09-7.27 19.79-13.13 48.17 25.31 98.64 45.69 121.2z'
            fill={theme.colors.red[700]}
          />
        </svg>
        <div className='my-auto font-bold text-xl'>Lugwig's Casino</div>
      </div>
      <div className='flex space-x-4'>
        <Link margin='auto'>Register</Link>
        <Link margin='auto' onClick={onOpen}>
          Login
        </Link>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div className='text-center'>Login</div>
          </ModalHeader>
          <ModalBody>
            <MyForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Header
