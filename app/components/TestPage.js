import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../styles/page.css';

class TestPage extends Component {
    componentDidMount() {
    	this.props.getTestContent();
    }

    render() {
        return (
        	<div className="container">
				
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                    <h1>Мини-конференция и тур в Израиле (9-13 февраля)</h1>
                    <hr></hr>
                
                
            
                
                             
                    <button type="button" className="btn btn-add" >     
                      
                            <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>  Зарегистрироваться
                            </button>
                
                            <button className="btn btn-send"><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></button>
                        
                                     
                             <p> <strong>Сроки проведения.</strong> Поездка состоится с 9 по 13 февраля 2018 года Тур начнётся рано утром 9
                февраля и завершится вечером 13 февраля, поэтому планируйте приехать в Израиль 8 февраля и
                уехать 14 февраля. Мини-конференция пройдёт в Нетании 10-11 февраля.</p> 
                
                    <p> <strong>КОЛИЧЕСТВО участников.</strong> МЗКСИМЗПЬНОЗ КОЛИЧЕСТВО УЧЗСТНИКОВ ПОЭЗДКИ — 17 человек. при наборе
                МЭКСИМдЛЬНОГО ЧИСПЭ УЧЭСТНИКОВ регистрация будет закрыта.</p>
                
                    <p><strong>Общая стоимость.</strong>  Общая стоимость поездки (тур и мини-конференция, не включая авиабилеты)
                составляет приблизительно 3520. если будет 15 участников и $580‚ если будет 10 участников“
                Соответственно, чем больше будет участников, тем меньше стоимость тура. Стоимость авиабилетов
                в Израиль (туда и обратно) составляет приблизительно 18000-20000 рублей.</p>
                
                    <p> Последний срок регистрации — <strong>28 января</strong>.</p>
                
                        <p> Более подробная информация находится в объявлении: которое можно скачать <a href="#" target="_self" rel="nofollow">по этой ссылке</a>.
                <br></br>Видеообзор предыдущей поездки можно посмотретьпо <a href="#" target="_blank" rel="nofollow">здесь</a> .</p>
                
                    <p> <strong>Пожалуйста, не приобретайте билеты без предварительной координации и без подтверждения
                        вашей регистрации.</strong></p> 
                
		    </div>
        )
    }
}

TestPage.propTypes = {
	getTestContent : PropTypes.func,
	testContent : PropTypes.array
};

export default TestPage;