const fetchAndHandle = function({ uri, method, onSuccess, onError }) {
    fetch(uri, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Fiddler'
        }
    })
        .catch(err => {
            console.log('Api Error : ', err);
            onError(err);
        })

        .then(response => {
            if (response && response.ok) {
                return response.json();
            }

            throw new Error('api error');
        })

        .then(json => onSuccess(json))

        .catch(err => {
            console.log('Response deserialization error : ', err);
            onError(err);
        });
};

exports.fetchAndHandle = fetchAndHandle;