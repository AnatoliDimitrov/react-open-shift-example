export async function jsonRequest(url, method, body, isAuthorized, skipResult) {
    let headers = {};

    if (method === undefined) {
        method = 'Get';
    }
    //headers['Referrer Policy'] = 'unsafe-url';

    //method = 'OPTIONS';

    if (['post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
        headers['Content-Type'] = 'application/json';
    }

    if (isAuthorized) {
        headers['Authorization'] = 'Basic Y3A0YmEtYWRtaW46UEBzc3cwcmQuMjAyMiE='
    }

    let options = {
        headers,
        method,
       // mode: 'cors'
    };

    //  body = {
    //     "grant_type":"password",
    //     "scope":"openid",
    //     "username":"baw-adm",
    //     "password":"T0v43P4r0l4t4"
    // };

    if (body !== undefined) {
        options.body = JSON.stringify(body);
    }

    // let response = await 
    fetch(url, options)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

   // return result;
}