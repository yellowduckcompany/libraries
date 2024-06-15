// ooda.js

class Channel {
    constructor(app, user = null) {
        this.api = '';
        this.app = app;
        this.user = user;
    }
    async whoami() {
        return fetch('https://api.ipify.org?format=json')
            .then(resp => resp.json())
            .then(data => {
                return data.ip;
            });
    }
    async send(e){
        if (!this.user) {
            this.user = await this.whoami();
        }

        if (e && this.user) {
            fetch(this.api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "app": this.app,
                    "user": this.user,
                    "id": e.id,
                    "payload": e
                })
            });
        }
    }
}

export { Channel };
