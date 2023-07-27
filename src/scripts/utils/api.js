export class Api {
    options = null;
    constructor(options) {
      this._options = options;
    }

    _baseRequest(url, method, body = null) {
        return fetch(`${this._options.baseUrl}/${url}`, {
            method,
            headers: this._options.headers,
            body,
          }).then((res) => this._validateResult(res));
    }
  
    //* Проверка статуса запроса
    _validateResult(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(
          `Ошибка ${res.status} - ${res.statusText}`
        );
      }
    }

    _dataToBody(data) {
        return JSON.stringify(data)
    }
  
    //* Запрос данных пользователя
    getUserInfo() {
        return this._baseRequest('users/me', "GET");
    }
  
    //* Запрос изначальных карточек
    getInitialCards() {
        return this._baseRequest('cards', "GET");
    }

    addCard(cardData) {
        return this._baseRequest('cards', 'POST', this._dataToBody(cardData))
    }

    deleteCard(cardId) {
        return this._baseRequest(`cards/${cardId}`, 'DELETE')
    }

    editProfile(profileData) {
        return this._baseRequest(`users/me`, 'PATCH', this._dataToBody(profileData))
    }

    editAvatar(data) {
        return this._baseRequest(`users/me/avatar`, 'PATCH', this._dataToBody(data))
    }

    addLike(cardId) {
        return this._baseRequest(`cards/${cardId}/likes`, 'PUT')
    }

    deleteLike(cardId) {
        return this._baseRequest(`cards/${cardId}/likes`, 'DELETE')
    }
  }