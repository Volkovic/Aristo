# Día 23 - Entornos virtuales

## Configurar un entorno virtual

Al comenzar un proyecto es recomendable usar un entorno virtual. Un entorno virtual nos permite crear un directorio aislado y autocontenido que posee su propia instalación independiente de Python y su propia carpeta de librerías, separado totalmente del Python global del sistema, evitando conflictos de dependencias entre proyectos. 

Instalar librerías directamente en el sistema operativo (globalmente) es considerado una práctica catastrófica debido al **'Dependency Hell'** (Infierno de dependencias). Si un proyecto nuevo actualiza una librería global que un proyecto viejo (o el propio Sistema Operativo) usaba, romperás irremediablemente el código viejo.

Históricamente se dependía de la librería externa `virtualenv`, pero hoy en día Python 3 incluye de forma oficial en su Librería Estándar el módulo nativo **`venv`**. Ambos cumplen la misma función, aunque `venv` ya viene preinstalado. Si ejecutas pip freeze en la terminal verás todos los paquetes instalados en la máquina. Con un entorno virtual solo tendrás acceso a los paquetes instalados en ese entorno específico. Abre tu terminal e instala virtualenv (si prefieres usar la herramienta clásica):

```sh
pip install virtualenv
```

Dentro de la carpeta 30DaysOfPython crea un directorio llamado flask_project.

Una vez instalado virtualenv (o usando el módulo nativo), entra en la carpeta del proyecto y crea el entorno virtual. Otra gran ventaja de los entornos virtuales es que te permiten usar diferentes versiones de Python simultáneamente; puedes inyectar una versión de intérprete base específica al crear el entorno para lograr retro-compatibilidad.

Para Mac/Linux:
```sh
virtualenv venv
```

Para Windows (usando el módulo nativo estándar):
```sh
python -m venv venv
```

A mí me gusta nombrar el entorno como venv, pero puedes elegir otro nombre. Usa ls (o dir en Windows) para comprobar que venv se creó:

```sh
ls
# venv/
```

Activa el entorno virtual desde la carpeta del proyecto. Este es un paso indispensable para "encender" el entorno; bajo el capó, el script de activación modifica temporalmente la variable PATH de tu terminal para que, al ejecutar `python` o `pip`, el sistema ignore la instalación global y utilice el archivo ejecutable `python.exe` situado dentro del entorno.

Para Mac/Linux (en la terminal Bash):
```sh
source venv/bin/activate
```

En Windows la activación puede variar según PowerShell o Git Bash.

Para Windows PowerShell:
```sh
.\venv\Scripts\Activate.ps1
```
*Nota: Si Windows tira un error rojo gigante al intentar activar el entorno indicando que "La ejecución de scripts está deshabilitada en este sistema" (ExecutionPolicy), debes solucionarlo abriendo PowerShell como Administrador y ejecutando `Set-ExecutionPolicy Unrestricted` (o `RemoteSigned`) para permitir correr el script Activate.ps1 localmente.*

Para Windows Git Bash:
```sh
venv\Scripts\. activate
```

Tras ejecutar el comando de activación, el prompt mostrará visualmente el nombre del entorno entre paréntesis al inicio de tu línea de comandos. Ejemplo:

```sh
(venv) user@host:~/Desktop/30DaysOfPython/flask_project$
```

Ahora, si ejecutas pip freeze no verás los paquetes globales; solo los del entorno. Instalemos Flask para este proyecto:

```sh
pip install Flask
```

Con el entorno activado, los archivos físicos de las librerías que instales se guardarán profundamente dentro de la propia carpeta aislada de tu `venv`, específicamente en el directorio `site-packages` (ej. `venv/Lib/site-packages/`). Todo lo que tu script pida importar, Python lo buscará exclusivamente allí.

Después, comprobemos los paquetes instalados:

```sh
pip freeze
# ejemplo de salida:
# Click==7.0
# Flask==1.1.1
# itsdangerous==1.1.0
# Jinja2==2.10.3
# MarkupSafe==1.1.1
# Werkzeug==0.16.0
```

Cuando termines de trabajar y quieras salir (apagar) el entorno virtual para volver al Python global del sistema, ejecuta el comando `deactivate`:

```sh
deactivate
```

Los módulos necesarios para trabajar con Flask ya están instalados en el entorno del proyecto. Es un pecado capital hacer un `git commit` y subir la pesada carpeta `venv/` a GitHub. Sus archivos binarios están compilados específicamente para tu sistema operativo y CPU, por lo que debes obligatoriamente ignorar la carpeta usando el archivo `.gitignore`.

Si no debes subir la carpeta del entorno a GitHub, ¿cómo sabe otro desarrollador qué librerías tiene que instalar cuando clona tu código limpio? Tú debes generar un archivo de texto usando `pip freeze > requirements.txt` desde tu entorno, y subir ESE archivo al repositorio. El otro programador creará su propio entorno vacío y ejecutará `pip install -r requirements.txt`.

Por esta razón, los entornos virtuales son 100% prescindibles (desechables). Si eliminas (borras al tacho de basura) la carpeta de tu entorno virtual `venv/`, no ocurre nada catastrófico en tu código. Simplemente pierdes las librerías descargadas y puedes regenerar la carpeta en 10 segundos recreando el entorno y ejecutando la instalación desde tu `requirements.txt`.

Además, cuando vinculas tu Entorno Virtual (venv) como Intérprete en un IDE como VS Code o PyCharm, obtienes el gran beneficio de que el autocompletado inteligente (IntelliSense) y el linter analizarán exactamente las librerías que tienes instaladas localmente en ese entorno, y no se confundirán marcando errores falsos.

## Herramientas avanzadas del ecosistema

Aunque `venv` y `pip` son el estándar, existen otras herramientas modernas en el ecosistema de Python para gestionar entornos y dependencias:

- **Conda**: Una herramienta muy popular (proveniente de Anaconda) orientada a la Ciencia de Datos. No solo crea entornos virtuales independientes, sino que gestiona paquetes y dependencias pesadas en C++ que `pip` sufriría para compilar.
- **Pipenv y Poetry**: Tienen una gran ventaja sobre la combinación estándar `venv + requirements.txt`. Gestionan de forma automática e integrada tanto la creación del entorno virtual como la resolución estricta del árbol de dependencias mediante *Lockfiles*, previniendo desastres de dependencias encadenadas en proyectos grandes.
- **pipx**: Si necesitas usar herramientas CLI avanzadas (como `aws-cli` o el formateador `black`) pero no quieres ensuciar tu sistema, `pipx` crea un entorno virtual transparente y silencioso solo para ese comando.