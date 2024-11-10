const transporter = require("../helpers/nodemailer.config");

const darBienvenidaUsuario = async (emailUsuario, nombreUsuario) => {
  await transporter.sendMail({
    from: `"Golden Code Gym" <${process.env.GMAIL_USER}>`,
    to: `${emailUsuario}`,
    subject: "Registro de usuario",
    html: ` 
    <div>
      <div>
        <img
          style="display: flex; justify-content: center"
          src="https://res.cloudinary.com/dyd8k74ic/image/upload/v1731204074/Bienvenido-imagen_jpqz48.png"
          alt="imagen-bienvenido"
        />
      </div>
      <div>
        <p>¡Nos alegra que formes parte de nuestra comunidad! Bienvenido/a ${nombreUsuario}</p>
      </div>
    </div>`,
  });
};

module.exports = {
  darBienvenidaUsuario,
};
