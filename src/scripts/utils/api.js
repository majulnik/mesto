export class API {
    _options = null;

    constructor(options) {
        this._options = options;
    }

    getCards() {
        return this._baseRequest('cards', 'GET');
    }

    addCard(cardData) {
        return this._baseRequest('cards', 'POST', this._dataToBody(cardData));
    }

    editUser(userData) {
        return this._baseRequest('users/me', 'PATCH', this._dataToBody(userData));
    }

    getUserInfo() {
        return this._baseRequest('users/me', 'GET');
    }

    _baseRequest(url, method, body = null) {
        return fetch (`${this._options.baseUrl}/${url}`, {method, body, headers: this._options.headers})
        .then(res => this._validateResult(res))
    }

    editAvatar(avatarData) {
        return this._baseRequest('users/me/avatar', 'PATCH', this._dataToBody(avatarData));
    }

    deleteCard(cardId) {
        return this._baseRequest(`cards/${cardId}`, 'DELETE');
    }

    addLike(cardId) {
        return this._baseRequest(`cards/${cardId}/likes`, 'PUT');
    }

    deleteLike(cardId) {
        return this._baseRequest(`cards/${cardId}/likes`, 'DELETE');
    }

    _validateResult(res) {
        if (res.ok) {return res.json()}
            else {
                return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
            }
        }
        
        _dataToBody(data) {
            return JSON.stringify(data);
        }
}


