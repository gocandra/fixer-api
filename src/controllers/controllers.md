lenguage:

composicion: La composicion es la aplicacion suseciva de funciones con la particularidad de que el resultado de la segunda se devuelve a la primera. ej: f(g(x)) => primero se ejecuta f, pero para ejecutar f se necesita g(x) entonces se resuelve g(x) y se pasa el resultado a f.

casos de uso: Los casos de uso son una serie de acciones que puede tomar un usuario dentro de un sistema. Estas acciones estan delimitadas por las reglas de negocio (ej: si el saldo es 0 no puede comprar). El usuario se refiere al cliente que utiliza el sistema (pacientes, proovedores, corporaciones, otros microservicios).

Que es un controller?
Un controller tiene que entender sobre requests y saber que casos de uso componer.
No tiene que ejecutar logica de negocios, No tiene que leer la base de datos, No tiene que validar datos.
Solo tiene que recibir un req, ejecutar el caso de uso, y manejar la respuesta.

Cuantos casos de uso en un controller?
SOLO UNO. Dentro de los servicios apuntamos a codigo DRY (Don't Repeat Yourself). Buscamos reutilizar y descomponer al maximo. eso significa que si tenemos funciones que vamos a reutilizar, las tenemos que importar al caso de uso, es decir toda la logica tiene que estar en el caso de uso.

