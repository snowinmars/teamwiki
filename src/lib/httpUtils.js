const ping = ({uri, method, onSuccess, onFailiture, onError}) => {
    return; // TODO

    fetch(uri, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Fiddler'
        }
    })
    .catch(err => {
        console.log('Ping Error : ', err);
        onError && onError(err);
    })
    .then(response => {
        if (response && response.ok) {
            onSuccess && onSuccess(response);
            return true;
        } else {
            onFailiture && onFailiture(response);
            return false;
        }
    })
}

const fetchAndHandle = ({ uri, method, onSuccess, onError }) => {
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
exports.ping = ping;