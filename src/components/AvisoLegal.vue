<template>
    <div class="container my-3">
        <h1>Aviso Legal</h1>
        <section>
            <h2>1. Información General</h2>
            <p>En cumplimiento con lo establecido en la legislación vigente, se informa que el presente sitio web es propiedad de <strong>Import-Export Teis, S.L.</strong>, con domicilio en Avenida de Galicia, 36216 Vigo, España, y con CIF B-12345678.</p>
            <p>Puedes ponerte en contacto con nosotros a través de:</p>
            <ul>
                <li><strong>Teléfono:</strong> +34 986 111 111</li>
                <li><strong>Correo electrónico:</strong> <a>info@importexportteis.com</a></li>
            </ul>
        </section>

        <section>
            <h2>2. Condiciones de Uso</h2>
            <p>El acceso y uso de este sitio web implica la aceptación de los términos y condiciones establecidos en el presente Aviso Legal. Los usuarios se comprometen a utilizar el sitio web de forma adecuada y lícita.</p>
        </section>

        <section>
            <h2>3. Propiedad Intelectual e Industrial</h2>
            <p>Todos los contenidos de este sitio web, incluidos textos, imágenes, logotipos, diseños, software, y cualquier otro material, son propiedad de <strong>Import-Export Teis, S.L.</strong> o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización previa y por escrito de los titulares.</p>
        </section>

        <section>
            <h2>4. Protección de Datos Personales</h2>
            <p>De acuerdo con el Reglamento General de Protección de Datos (RGPD), le informamos de que los datos personales que nos facilite serán tratados por <strong>Import-Export Teis, S.L.</strong> con la finalidad de gestionar las consultas realizadas a través de este sitio web.</p>
            <p>Para más información, consulte nuestra <router-link to="/privacidad">Política de Privacidad</router-link>.</p>
        </section>

        <section>
            <h2>5. Exención de Responsabilidad</h2>
            <p><strong>Import-Export Teis, S.L.</strong> no será responsable de los daños y perjuicios que puedan derivarse del uso incorrecto de los contenidos del sitio web, ni de posibles errores técnicos o interrupciones en el servicio.</p>
        </section>

        <section>
            <h2>6. Legislación Aplicable y Jurisdicción</h2>
            <p>El presente Aviso Legal se rige por la legislación española. Para cualquier controversia que pueda surgir, ambas partes se someterán a los juzgados y tribunales de Vigo.</p>
        </section>
    </div>
</template>

<script>

    export default {
        name: "avisoLegal",
        components: {}
    }; 

</script>

<style scoped>
    div {
        font-size: 10px;
        text-align: justify;
    }
    h1 {
        font-size: 13px;
    }
    h2 {
        font-size: 11px;
    }
</style>