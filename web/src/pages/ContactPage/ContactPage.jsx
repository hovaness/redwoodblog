import { Link, routes } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Metadata, useMutation } from '@redwoodjs/web'
import {
  Form,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
  Label,
  FormError,
  useForm,
} from '@redwoodjs/forms'

const CREATE_CONTACT = gql`
  mutation CreateContactInput($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for submission')
      formMethods.reset()
    },
  })
  const formMethods = useForm()
  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }
  return (
    <>
      <Metadata title="Contact" description="Contact page" />
      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error"></FieldError>

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+@[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error"></FieldError>

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error"></FieldError>
        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
