import React from "react";
import './score-card.scss';
import fetchAPI from '../../common/api';


export default function ScoreCard(): JSX.Element {
    const [favorites, setFavorites] = React.useState([] as Array<number>);
    const [data, setData] = React.useState([] as Array<any>);
    React.useEffect(() => {
        fetchAPI().then(data => setData(data));
        const getArray = JSON.parse(localStorage.getItem('favorites') || '0');
        if (getArray !== 0) {
            setFavorites([...getArray])
        }
    }, []);
    // Add to favouites
    const addFav = (props: any) => {
        let array = favorites;
        let addArray = true;
        array.map((item: any, key: number) => {
            if (item === props.i) {
                array.splice(key, 1);
                addArray = false;
            }
            return addArray;
        });
        if (addArray) {
            array.push(props.i);
        }
        setFavorites([...array]);

        // Store favorite items in local storage 
        localStorage.setItem('favorites', JSON.stringify(favorites));

        let storage = localStorage.getItem('favItem' + (props.i) || '0')
        if (storage == null) {
            localStorage.setItem(('favItem' + (props.i)), JSON.stringify(props.res));
        }
        else {
            localStorage.removeItem('favItem' + (props.i));
        }
    }
    return (
        <div className='fixture__board'>
            {data.map((res, i) => {
                // converting string to date
                let matchDate = new Date(res?.fixture.date);
                const matchDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(matchDate);
                const matchMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(matchDate);
                const matchTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', hour12: false }).format(matchDate);
                const todayDate = matchDate === new Date();
                return (
                    <div className='scorecard' key={i}>
                        <div className='scorecard__header'>
                            <div>
                                {todayDate ?
                                    <div className={`scorecard__header__status scorecard__header__status${todayDate ? '--today' : '--live'}`}><span>{todayDate ? 'TODAY' : 'LIVE'}</span></div> : ''}
                            </div>
                            <div className='scorecard__header__league'>
                                <img src={res.league.logo} alt='league_logo' />
                                {res.league.name}
                            </div>
                            {favorites.includes(i) ? (
                                <button onClick={() => addFav({ res, i })} className={`scorecard__header__fav scorecard__header__fav--active`}><i className='fas fa-star' /></button>
                            ) : (
                                <button onClick={() => addFav({ res, i })} className={`scorecard__header__fav scorecard__header__fav--inactive`}><i className='far fa-star' /></button>
                            )}
                        </div>
                        <div className='scorecard__body'>
                            <div className='scorecard__league scorecard__league__home'>
                                <div className='scorecard__league__flag'>
                                    <span><img src={res.teams.home.logo} alt='league_flag' /></span>
                                </div>
                                <p className='scorecard__league__name'>{res.teams.home.name}</p>
                            </div>
                            <div className='scorecard__league__score'>
                                <div className='scorecard__league__score__date'>{`${matchDay} ${matchMonth} at`} <b>{matchTime}</b></div>
                                {res.goals.home || res.goals.away ?
                                    <div className='scorecard__league__score__goal'>
                                        <span className='scorecard__league__score__goal--home'>{res.goals.home}</span>
                                        <i>:</i>
                                        <span className='scorecard__league__score__goal--away'>{res.goals.away}</span>
                                    </div> : ''
                                }
                                {res.fixture.status.elapsed ? <span className='scorecard__league__score__elapsed'>{`${res.fixture.status.elapsed}'`}</span> : ''}
                                {res.fixture.referee ? <div className='scorecard__league__score__refree'><span>Refree: </span>{res.fixture.referee}</div> : ''}
                            </div>
                            <div className='scorecard__league scorecard__league__away'>

                                <div className='scorecard__league__flag'>
                                    <span><img src={res.teams.away.logo} alt='league_flag' /></span>
                                </div>
                                <p className='scorecard__league__name'>{res.teams.away.name}</p>
                            </div>
                        </div>
                        <div className='scorecard__footer'>
                            {res.fixture.venue.name ? <div className='scorecard__venue'>  <i className="fas fa-map-marked-alt"></i>
                                <span>{res.fixture.venue.name}</span></div> : ''}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
