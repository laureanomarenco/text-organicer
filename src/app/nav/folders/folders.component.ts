import { Component } from '@angular/core';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  faElilipsisVertical = faEllipsisVertical
  folders = [
    {
      "idFolder": 1,
      "titulo": "Primer Organizador",
      "public": false,
      "idUser": 1,
      "sharedWith": [
        {
          "id": 2
        }
      ]
    },
    {
      "idFolder": 2,
      "titulo": "Segundo Organizador",
      "public": false,
      "idUser": 1,
      "sharedWith": []
    }
    ]
  pages = [
    {
      "id": 1,
      "idFolder": 1,
      "titulo": "Editor de texto",
      "subtitulo": "Qué es un editor de texto, para que sirven, cómo funcionan y cómo podemos trabajas con sus distintos formatos.",
      "firma": "Laureano Marenco, febrero de 2023.",
      "contenido": "Editor de texto es un programa informático que permite crear y modificar archivos digitales compuestos únicamente por textos sin formato, conocidos comúnmente como archivos de texto o “texto plano”. El programa lee el archivo e interpreta los bytes leídos según el código de caracteres que usa el editor. Es comúnmente de 7- u 8-bits en ASCII o UTF-8, rara vez EBCDIC.\n\nPor ejemplo, un editor ASCII de 8 bits que lee el número binario 0110 0001 (decimal 97 o hexadecimal 61) en el archivo lo representará en la pantalla por la figura a, que el usuario reconoce como la letra \"a\" y ofrecerá al usuario las funciones necesarias para cambiar el número binario en el archivo.\n\nLos editores de texto son incluidos en el sistema operativo o en algún paquete de software instalado, y se usan cuando se deben crear o modificar archivos de texto como archivos de configuración, lenguaje de programación interpretado (scripts) o el código fuente de algún programa.\n\nEl archivo creado por un editor de texto incluye por convención en DOS y Microsoft Windows la extensión \".txt\", aunque pueda ser cambiada a cualquier otra con posterioridad. Tanto Unix como Linux dan al usuario total libertad en la denominación de sus archivos.\n\nAl trasladar archivos de texto de un sistema operativo a otro se debe considerar que existen al menos dos convenciones diferentes para señalar el término de una línea o lo que es lo mismo una nueva línea: Unix y Linux usan solo retorno de carro en cambio Microsoft Windows utiliza retorno de carro y [salto de línea].\n"
    },
    {
      "id": 2,
      "idFolder": 1,
      "titulo": "ASCI",
      "subtitulo": "Casi todos los sistemas informáticos actuales utilizan el código ASCII o una extensión compatible para representar textos y símbolos de teclado.",
      "firma": "Por Laureano Marenco en Febrero de 2022",
      "contenido": "Las computadoras únicamente entienden números. El código ASCII es un método de traducción de letras y símbolos a números como ‘a=97’ o ‘/=47’ .2​\n\nComo otros códigos de formato de representación de caracteres, el ASCII es un método para una correspondencia entre cadenas de bits y una serie de símbolos (alfanuméricos y otros), permitiendo de esta forma la comunicación entre dispositivos digitales así como su procesado y almacenamiento. El código de caracteres ASCII3​4​ —o una extensión compatible (ver más abajo)— se usa casi en todas las computadoras, especialmente con computadoras personales y estaciones de trabajo. El nombre más apropiado para este código de caracteres es \"US-ASCII\".5​\n\nASCII es, en sentido estricto, un código de siete bits, lo que significa que usa cadenas de bits representables con siete dígitos binarios (que van de 0 a 127 en base decimal) para representar información de caracteres. En el momento en el que se introdujo el código ASCII muchas computadoras trabajaban con grupos de ocho bits (bytes u octetos), como la unidad mínima de información; donde el octavo bit se usaba habitualmente como bit de paridad con funciones de control de errores en líneas de comunicación u otras funciones específicas del dispositivo. Las máquinas que no usaban la comprobación de paridad asignaban al octavo bit el valor cero en la mayoría de los casos, aunque otros sistemas como las computadoras Prime, que ejecutaban PRIMOS ponían el octavo bit del código ASCII a uno. El código ASCII define una relación entre caracteres específicos y secuencias de bits; además de reservar unos cuantos códigos de control para el procesador de textos, y no define ningún mecanismo para describir la estructura o la apariencia del texto en un documento; estos asuntos están especificados por otros lenguajes como los lenguajes de etiquetas."
    },
    {
      "id": 10,
      "idFolder": 1,
      "titulo": "Apache POI",
      "subtitulo": "Control de archivos Excel y Word desde Java con esta libreria",
      "firma": "Laureano Marenco, febrero de 2023.",
      "contenido": "En muchas ocasiones necesitamos que nuestros programas guarden los datos de forma persistente para poderlos recuperar cuando volvamos a arrancar el programa de nuevo. Existen varias opciones para dar solución a esto: utilizar una base de datos, guardar la configuración o información en archivos de texto plano… Sin embargo, en ocasiones, una base de datos es demasiado elaborada para los datos que debemos guardar, y un texto plano acaba siendo una auténtico desorden de información que no sabemos cómo encontrar. Para esto existe una solución a medio camino que permite mantener la información ordenada sin necesidad de construir una compleja base de datos: las hojas de cálculo o de Excel con ayuda de apache poi.\n\nEN ESTA API HAY 3 PAQUETES:\n\nUno de alto nivel para las hojas de cálculo en general (package: org.apache.poi.ss.usermodelpackage: org.apache.poi.ss.usermodel), que es la que la mayoría de la gente debe utilizar y la más simple.\nEl paquete para ficheros tipo xls (package: org.apache.poi.hssf.usermodelpackage: org.apache.poi.hssf.usermodel), que permite control de nivel más bajo.\nY el paquete para los nuevos formatos desde Excel 2007 OOXML, el xlsx (package: org.apache.poi.xssf.usermodelpackage: org.apache.poi.xssf.usermodel).\n\nAPACHE POI 3.6\n\nÉstos son un sistema de los APIs para manipular los varios formatos de archivo basados en los estándares abiertos de la oficina XML (OOXML) y el formato de documento compuesto 2 VIEJOS de Microsoft (OLE2)\n\nLos usuarios pueden leer y escribir los archivos de MS Excel, los archivos de MS Word y los archivos de Ms Powerpoint usar Java.\nApache POI es una solución de Java Excel (para Excel 97-2008) y proporciona un API completo para virar otros formatos hacia el lado de babor OOXML y OLE2.\nLos archivos OLE2 incluyen la mayoría de los archivos de Microsoft Office tales como XLS, doc., y PPT tan bien como formatos de archivo basados API de la serialización del MFC. El proyecto proporciona los APIs para el sistema de ficheros OLE2 (POIFS) y las características del documento OLE2 (HPSF).\n\nEl formato de OpenXML de la oficina es el formato de archivo basado los nuevos estándares de XML encontrado en Microsoft Office 2007 y 2008. Esto incluye XLSX, DOCX y PPTX. El proyecto \nproporciona un API bajo para apoyar a las convenciones de empaquetado abiertas que usan openxml4j.\nPara cada uso de MS Office existe un módulo componente que intente proporcionar una Java de alto nivel común api los formatos de documento de OLE2 y de OOXML. Esto se desarrolla más para los libros de trabajo de Excel (SS=HSSF+XSSF). El trabajo está progresando para los documentos de la palabra (HWPF+XWPF) y las presentaciones del PowerPoint (HSLF+XSLF).\n\nEl proyecto ha agregado recientemente la ayuda para la perspectiva (HSMF). Microsoft abrió las especificaciones en este formato en octubre de 2007. Hay también proyectos para Visio (HDGF) y el editor (HPBF).\nLas aplicaciones del comandante de Apache POI API incluyen usos de la extracción del texto tales como Web spider, constructores del índice, y sistemas de gestión del contenido.\n\n\n\n\n\n\n\n\n"
    },
    {
      "id": 11,
      "idFolder": 1,
      "titulo": "textOrgaNicer",
      "subtitulo": "Cómo funciona está web",
      "firma": "Laureano Marenco",
      "contenido": "Organiza tus textos,\ndocumenta tus actividades,\nllevalas a todos lados."
    }
    ]
}
