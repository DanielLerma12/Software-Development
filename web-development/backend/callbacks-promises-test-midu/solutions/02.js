const obtenerDatosPromise = async () => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "datos importantes" });
    }, 2000);
  });
};

console.log(await obtenerDatosPromise()); // await or

obtenerDatosPromise().then((info) => console.log(info)); // promise.then
