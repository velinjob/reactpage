import axios from 'axios';

const ROOT_URL = location.host === 'localhost:8080' ? 'http://localhost:8080/server/ajax' : 'https://infinite-coast-35847.herokuapp.com';

//For testing
//const ROOT_URL = 'http://localhost:3000';

export default {

    getPages (callback){
        axios.post(`${ROOT_URL}/index.php?get_pages`)
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