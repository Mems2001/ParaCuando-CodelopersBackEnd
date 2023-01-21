import Role from '../database/model/roles'

export const createRoles = async () => {
   try {
    new Role({name: 'user'}).save()
    new Role({name: 'admin'}).save()
   } catch (error) {
    console.log(error)
   }
}