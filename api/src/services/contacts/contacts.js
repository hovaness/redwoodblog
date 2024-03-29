import { db } from 'src/lib/db'
import { validate } from '@redwoodjs/api'

export const contacts = () => {
  return db.contact.findMany()
}

export const contact = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact = ({ input }) => {
  validate(input.email, 'email', {email:true})
  return db.contact.create({
    data: input,
  })
}

