// const axios = require("axios");
// const client_id =
//   "272589905349-scqfilok0ucok40j6h6eo9pcsp7bhadd.apps.googleusercontent.com";
// const client_secret = "vpM3s6IXDLcmZtNpkOFbeQMg";
// const redirect_uri = "http://localhost:3000";

// async function getRefreshToken(code) {
//   try {
//     const response = await axios.post("https://oauth2.googleapis.com/token", {
//       code,
//       client_id,
//       client_secret,
//       redirect_uri,
//       grant_type: "authorization_code",
//     });
//     console.log("refresh");
//     console.log(response.data.refresh_token);
//     console.log(response.status);
//     console.log(response.statusText);
//     return Promise.resolve(response.data.refresh_token);
//   } catch (error) {
//     console.error(
//       error.response.status,
//       error.response.statusText,
//       error.response.data
//     );
//   }
// }
// async function getAccessToken(refresh_token) {
//   try {
//     const response = await axios.post("https://oauth2.googleapis.com/token", {
//       refresh_token,
//       client_id,
//       client_secret,
//       redirect_uri,
//       grant_type: "refresh_token",
//     });
//     console.log("acccess");
//     console.log(response.data.access_token);
//     console.log(response.status);
//     console.log(response.statusText);
//   } catch (error) {
//     console.error(
//       error.response.status,
//       error.response.statusText,
//       error.response.data
//     );
//   }
// }

// // getRefreshToken(
// //   "4/2QHZU2vQzGQ82GqjLkRutDbeo1DNGNNecWzXAHdskupN3aN1F65AQEetWgxEjHDo-Nx0n2_0A8d825lKA7ALLMM"
// // ).then((response: any) => {
// //   getAccessToken(response);
// // });

// // getRefreshToken(
// //   "4/2QH-PRDAP9mvTfH-IKo7K7wJd1RT0DOwbLOlBRcBPAcCK8c-nePDvUqDtTFSPtTBEhqqIG9tKmxAft2EeoXflNw"
// // );
// getAccessToken(
//   "1//06UBcPVmhaK0PCgYIARAAGAYSNwF-L9IrW4nBJnd6zOqWTh3jDgWHq3iCG5V_v5m-loT5yHpTJJJI3ni8WJg131MCSM3pZYOM-Vs"
// );
