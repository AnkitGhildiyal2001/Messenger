const axios = require('axios');

axios
  .post('https://anonympy.service-now.com/api/snc/alexis_pharmacy/update', {

  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data.result);
  })
  .catch(error => {
    console.error(error);
  });
