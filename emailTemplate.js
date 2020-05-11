
module.exports.createTemplate = (obj) => {
    const {ad, body, linkResetPass, newAdEmail} = obj;

    const selectTemplate = () => {
        if(ad && body) {
            return `<tr>
            <td align="center" class="masthead">
            </td>
            </tr>
            <tr>
            <td class="content">
            
                <h2>Hola ${ad[0].name},</h2>
            
                <p><b>${body.name}</b> te ha mandado un mensaje a través de BuenAnuncio.com</p>
                </br>
                <p><b>Mensaje de ${body.name}:</b></p>
                <p>"${body.message}"</p>
                ${body.phone ? `<p><b>Teléfono</b> ${body.name}: ${body.phone}</p>`: ''}
                </br>
                <p>Este es el anuncio que le interesa a ${body.name}:</p>
                <table id="contentUserAd">
                    <tr>
                        <td align="center">
                            <p><b>${ad[0].title ? ad[0].title : `${ad[0].carmodel} ${ad[0].brand}`}</b></p>
                            <p>${ad[0].description}</p>
                        </td>
                    </tr>
                </table>
                </br>
                <table>
                    <tr>
                        <td align="center">
                            <p>Para contestar, hazlo respondiendo a este email</p>
                            <p>Si prefieres acceder a tus anuncios, pulsa el <a href="https://buenanuncio.com/mis-anuncios">aquí</a>.</p>
                        </td>
                    </tr>`
        }
        else if(linkResetPass) {
            return `<tr>
            <td align="center" class="masthead">
            </td>
            </tr>
            <tr>
            <td class="content">
            
                <h2>Hola,</h2>
                <p>Has solicitado cambiar tu contraseña.</p>
                <p>Para hacerlo, pulsa el siguiente enlace:</p>
                </br>
                <a href="${linkResetPass}"><h3>Cambiar contraseña</h3></a>
                </br>
                <table>
                <p><i>Si no has solicitado el cambio de contraseña, ignora este email.</i></p>`
        }
        else if (newAdEmail) {
            return `<tr>
            <td align="center" class="masthead">
            </td>
            </tr>
            <tr>
            <td class="content">
            
                <h2>Hola ${newAdEmail.name},</h2>
                <p>Enhorabuena, ¡tu anuncio se ha publicado!</p>
                <p>Recuerda que puedes renovarlo cada 24 horas para tener más visitas.</p>
                </br>
                <p>Este es tu anuncio:</p>
                </br>
                <table id="contentUserAd">
                    <tr>
                        <td align="center">
                            <p><b>${newAdEmail.title ? newAdEmail.title.toUpperCase() : `${newAdEmail.brand.toUpperCase()} - ${newAdEmail.carmodel.toUpperCase()}`} </b></p>
                            <p>${newAdEmail.description}</p>
                            <p>${newAdEmail.km ? `<span><b>${newAdEmail.km}km</b></span>` : ``}
                            ${newAdEmail.year ? `<span><b>Año: ${newAdEmail.year}</b></span>` : ``}
                            ${newAdEmail.fuel ? `<span><b>${newAdEmail.fuel}</b></span>` : ``}
                            ${newAdEmail.cv ? `<span><b>${newAdEmail.cv}cv</b></span>` : ``}
                            ${newAdEmail.engine ? `<span><b>${newAdEmail.engine}cc</b></span>` : ``}</p>
                            ${newAdEmail.price ? `<span><b>Precio: ${newAdEmail.price}€</b></span>` : ``}
                            ${newAdEmail.age ? `<span><b>Edad: ${newAdEmail.age} años</b></span>` : ``}
                            ${newAdEmail.phone ? `<span><b>Teléfono: ${newAdEmail.phone}</b></span>` : ``}
                            ${newAdEmail.vendorType ? `<span><b>${newAdEmail.vendorType}</b></span>` : ``}
                            <p><span>${newAdEmail.state}</span>${newAdEmail.city ? `<span> en ${newAdEmail.city}</span>` : ``}</p>
                        </td>
                    </tr>
                </table>
                </br>
                </br>
                <p>Para modificar tu anuncio pulsa <a href=""><b>aquí</b>.</a></p>
                <table>`
        } else {console.log('problem pass #passIssue')}
    }
    
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width"/>

    <!-- For development, pass document through inliner -->
    <style type="text/css">

    /* Your custom styles go here */
    * { margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif; line-height: 1.65; }

img { max-width: 100%; margin: 0 auto; display: block; }

body, .body-wrap { width: 100% !important; height: 100%; background: #f8f8f8; }

a { color: #f7b265; text-decoration: none; }

a:hover { text-decoration: underline; }

.text-center { text-align: center; }

.text-right { text-align: right; }

.text-left { text-align: left; }

.button { display: inline-block; color: white; background: #f7b265; border: solid #f7b265; border-width: 10px 20px 8px; font-weight: bold; border-radius: 4px; }

.button:hover { text-decoration: none; }

h1, h2, h3, h4, h5, h6 { margin-bottom: 20px; line-height: 1.25; }

h1 { font-size: 32px; }

h2 { font-size: 28px; }

h3 { font-size: 24px; }

h4 { font-size: 20px; }

h5 { font-size: 16px; }

p, ul, ol { font-size: 16px; font-weight: normal; margin-bottom: 20px; }

.container { display: block !important; clear: both !important; margin: 0 auto !important; max-width: 580px !important; }

.container table { width: 100% !important; border-collapse: collapse; }

.container .masthead { padding: 10%; background: #f7b265; color: white;background-image: url(https://buenanuncio.herokuapp.com/images/baLogo.png);background-repeat: no-repeat;background-size: 100%;}

.container .masthead h1 { margin: 0 auto !important; max-width: 90%; text-transform: uppercase; }

.container .content { background: white; padding: 30px 35px; }

.container .content.footer { background: none; }

.container .content.footer p { margin-bottom: 0; color: #888; text-align: center; font-size: 14px; }

.container .content.footer a { color: #888; text-decoration: none; font-weight: bold; }

.container .content.footer a:hover { text-decoration: underline; }

#contentUserAd {width: 85% !important;background-color: #f7b26578;margin:auto}


    </style>
</head>
<body>
<table class="body-wrap">
    <tr>
        <td class="container">

            <!-- Message start -->
            <table>
                ${selectTemplate()}
            </table>

                        <p>Recibe un saludo!</p>

                        <p><em>– Equipo BuenAnuncio.com</em></p>

                    </td>
                </tr>
            </table>

        </td>
    </tr>
    <tr>
        <td class="container">

            <!-- Message start -->
            <table>
                <tr>
                    <td class="content footer" align="center">
                    </td>
                </tr>
            </table>

        </td>
    </tr>
</table>
</body>
</html>`
}