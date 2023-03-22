# TextOrganicer

TextOrganicer es una aplicación web dedicada a servir como organizador personal de texto, permitiendo las funciones extra de compartir el acceso a la edición con otros usuarios de la aplicación o compartir un link público de tus carpetas.

En este repositorio podrás encontrar el frontend de la aplicación, construido con Angular 15.

La estructura general de componentes está dividida en:
- "landing", que contiene todo lo relativo al inicio de sesión y registro.
- "home", con todo lo relativo a las carpetas, páginas, y edición del usuario logeado.
- "public", como template para las carpetas públicas.

Respecto a las entidades que se manejan en la aplicación tenemos una carpeta para las respuestas del backend, que contienen los distintos mensajes de respuesta como status, message, y la data correspondiente a cada objeto solicitado. Y además tenemos los modelos que corresponden a los objetos:

- Folder
- Page
- Role
- User
- UserPrivate

En cuanto a los servicios hay una carpeta fetchs que contiene un servicio con los métodos CRUD relativos a cada endpoint del backend. Y además algunos servicios funcionales. El endopoint de acceso al backend está en la carpeta config para poder modificarlo facilmente.

También hay una carpeta utils para almacenar diversas utilidades como las constantes de roleTypes. Una carpeta validaciones que por ahora solo tiene la validación de que dos password son iguales. Y también hay una carpeta directivas que contiene la directiva de autoresize para los textarea.

