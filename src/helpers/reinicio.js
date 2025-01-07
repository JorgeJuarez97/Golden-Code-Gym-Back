const cron = require("node-cron");
const ClasesModel = require("../models/clases.schema");

const resetClases = async () => {
  try {
    const result = await ClasesModel.updateMany(
      {},
      { usuariosReservados: [], cuposPorDia: 10 }
    );
    return {
      msg: "Reservas limpiadas y cupos reiniciados.",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "Error al reiniciar las clases:",
      statusCode: 500,
    };
  }
};

cron.schedule("0 0 * * 0", resetClases, {
  scheduled: true,
  timezone: "America/Argentina/Buenos_Aires",
});
