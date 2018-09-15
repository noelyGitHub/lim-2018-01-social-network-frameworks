import firebase from 'firebase'
const saveDataEmail = (user, name, password, photoURL) => {
  console.log(user)
  firebase.database().ref('Usuarios/' + user.user.uid).set({
    email: user.user.email,
    name: name,
    password: password,
    photoURL: photoURL
  })
}
const saveDataRedirec = (user) => {
  var usuario = {
    email: user.email,
    name: user.displayName,
    photoURL: user.photoURL
  }
  firebase.database().ref('Usuarios/' + user.uid).set(usuario)
}
const validateFormateEmail = (data) => {
  if (data.indexOf('@') >= 5) {
    if (Number.isNaN(parseInt(data.charAt(0))) === true) {
      if (data.length - data.lastIndexOf('.') <= 5) {
        return true
      } else { return 'dominio inexistente' }
    } else { return 'Formato correo invalido' }
  } else { return 'email diminuto o invalido' }
}
const mesaggeFirebase = (message) => {
  switch (message) {
    case 'Password should be at least 6 characters':
      return 'Ingrese contraseña con 6 caracteres minimo'
    case 'The email address is badly formatted.':
      return 'Ingrese un correo valido'
    case 'The email address is already in use by another account.':
      return 'Este correo ya esta registrado'
    case 'The password is invalid or the user does not have a password.':
      return 'Password Incorrecto'
    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
      return 'El usuario no existe'
  }
}
export default { saveDataEmail, saveDataRedirec, validateFormateEmail, mesaggeFirebase }
