export class UserInfo {
    _nameField = null;
    _descriptionField = null;

    constructor(userInfoFields) {
        this._nameField = document.querySelector(userInfoFields.name);
        this._descriptionField = document.querySelector(userInfoFields.description);
    }

    getUserInfo() {
        return {
            name: this._nameField.textContent,
            description: this._descriptionField.textContent
        };
    }

    setUserInfo(userInfoValues) {
        if (userInfoValues) {
            this._nameField.textContent = userInfoValues.name;
            this._descriptionField.textContent = userInfoValues.description;   
        }
    }
}