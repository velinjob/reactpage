import axios from 'axios';

const ROOT_URL = location.host === 'localhost:8080' ? 'http://localhost:8080/server/ajax' : 'https://dev.reg-page.ru/server/ajax';

export default {
    // index page
    getPages (token, callback){
        axios.post(`${ROOT_URL}/index.php?get_pages&token=${token || ''}`)
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    },

    getEvents (token, callback){
        axios.post(`${ROOT_URL}/index.php?get_events&token=${token || ''}`)
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    },

    // schedule page

    getScheduleItems(token ,callback){
        axios.post(`${ROOT_URL}/schedule.php?get&token=${token}`)
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    },

    handleForm(token, item, callback){
        axios.post(`${ROOT_URL}/schedule.php?set&token=${token}&item=${item}`)
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    },    

    // test page
    getTestContent (callback){
        axios.post(`${ROOT_URL}/index.php?test_request`)
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    },


    auth (type, login, password, callback){
        axios.get(`${ROOT_URL}/index.php?auth&type=${type}&login=${login}&password=${password}`)
        .then((response) => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    },

    checkAuth (token, callback){
        axios.get(`${ROOT_URL}/index.php?check&token=${token}`)
        .then((response) => {
            callback(response);
        })
        .catch(err => {
            console.log('err', err)
        });
    }
};