import React from 'react';
import Dragula from 'dragula';
import '../styles/Board.css';
import Swimlane from './Swimlane';
import 'dragula/dist/dragula.css';

const jsonArray = [
    {
        "imageURL": "",
        "name": "start hotel",
        "placeID": "ChIJ07Qf5YpZwokR5Yp1cUXil2o",
        "lon": -74.0043807,
        "type": "start",
        "day": 0,
        "lat": 40.7206663,
        "intradayIndex": 0
    },
    {
        "name": "Madison Square Garden",
        "placeID": "ChIJhRwB-yFawokR5Phil-QQ3zM",
        "lon": -73.9934387,
        "day": 0,
        "lat": 40.7505045,
        "intradayIndex": 1,
        "type": "poi"
    },
    {
        "name": "Madame Tussauds New York",
        "placeID": "ChIJ8VOfr1RYwokRhil9_pcMKuc",
        "lon": -73.9888338,
        "day": 0,
        "lat": 40.7564269,
        "intradayIndex": 2,
        "type": "poi"
    },
    {
        "name": "Washington Square Arch",
        "placeID": "ChIJXa-d3ZBZwokRGcUkpZc_uC4",
        "lon": -73.9971027,
        "day": 0,
        "lat": 40.7312339,
        "intradayIndex": 3,
        "type": "poi"
    },
    {
        "imageURL": "",
        "name": "start hotel",
        "placeID": "ChIJy6IAivdYwokRRSxXtvXGJcU",
        "lon": -73.9812207,
        "type": "start",
        "day": 1,
        "lat": 40.7646895,
        "intradayIndex": 0
    },
    {
        "name": "Queens Museum",
        "placeID": "ChIJmWMJBtBfwokR5qK7waLcgAM",
        "lon": -73.8467079,
        "day": 1,
        "lat": 40.7457885,
        "intradayIndex": 1,
        "type": "poi"
    },
    {
        "name": "South Street Seaport Museum",
        "placeID": "ChIJ1wNgehRawokR3qHBnKI48y8",
        "lon": -74.0037097,
        "day": 1,
        "lat": 40.7065616,
        "intradayIndex": 2,
        "type": "poi"
    },
    {
        "name": "Lincoln Center for the Performing Arts",
        "placeID": "ChIJN6W-X_VYwokRTqwcBnTw1Uk",
        "lon": -73.9834889,
        "day": 1,
        "lat": 40.7724641,
        "intradayIndex": 3,
        "type": "poi"
    }
]



export default class Board extends React.Component {
    constructor(props) {
        super(props);
        const spots = this.getSpots();
        this.state = {
            spots: {
                day1: spots.filter(spot => spot.day && spot.day === 1),
                day2: spots.filter(spot => spot.day && spot.day === 2),
                day3: spots.filter(spot => spot.day && spot.day === 3),
                day4: spots.filter(spot => spot.day && spot.day === 4),
                day5: spots.filter(spot => spot.day && spot.day === 5),
                day6: spots.filter(spot => spot.day && spot.day === 6),
                day7: spots.filter(spot => spot.day && spot.day === 7),
                day8: spots.filter(spot => spot.day && spot.day === 8),
                day9: spots.filter(spot => spot.day && spot.day === 9),
                day10: spots.filter(spot => spot.day && spot.day === 10),
                day11: spots.filter(spot => spot.day && spot.day === 11),
                day12: spots.filter(spot => spot.day && spot.day === 12),
                day13: spots.filter(spot => spot.day && spot.day === 13),
                day14: spots.filter(spot => spot.day && spot.day === 14),
                day15: spots.filter(spot => spot.day && spot.day === 15),
            }
        }
        this.swimlanes = {
            day1: React.createRef(),
            day2: React.createRef(),
            day3: React.createRef(),
            day4: React.createRef(),
            day5: React.createRef(),
            day6: React.createRef(),
            day7: React.createRef(),
            day8: React.createRef(),
            day9: React.createRef(),
            day10: React.createRef(),
            day11: React.createRef(),
            day12: React.createRef(),
            day13: React.createRef(),
            day14: React.createRef(),
            day15: React.createRef(),
        }
    }

    getSpots() {
        return jsonArray.map(spotDetails => ({
            placeID: spotDetails.placeID,
            lat: spotDetails.lat,
            lon: spotDetails.lon,
            name: spotDetails.name,
            url: spotDetails.imageURL,
            day: spotDetails.day + 1,
            intradayIndex: spotDetails.intradayIndex,
            type: spotDetails.type,
        }));
    }

    renderSwimlane(name, spots, ref) {
        return (
            <Swimlane name={name} spots={spots} dragulaRef={ref} />
        );
    }

    componentDidMount() {
        var container1 = this.swimlanes.day1.current;
        var container2 = this.swimlanes.day2.current;
        var container3 = this.swimlanes.day3.current;
        var container4 = this.swimlanes.day4.current;
        var container5 = this.swimlanes.day5.current;
        var container6 = this.swimlanes.day6.current;
        var container7 = this.swimlanes.day7.current;
        var container8 = this.swimlanes.day8.current;
        var container9 = this.swimlanes.day9.current;
        var container10 = this.swimlanes.day10.current;
        var container11 = this.swimlanes.day11.current;
        var container12 = this.swimlanes.day12.current;
        var container13 = this.swimlanes.day13.current;
        var container14 = this.swimlanes.day14.current;
        var container15 = this.swimlanes.day15.current;
        var drake_spots = Dragula([
            container1, container2, container3,
            container4, container5, container6,
            container7, container8, container9,
            container10, container11, container12,
            container13, container14, container15,
        ]);

    }

    render() {
        return (
            <div className="Board">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 1', this.state.spots.day1, this.swimlanes.day1)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 2', this.state.spots.day2, this.swimlanes.day2)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 3', this.state.spots.day3, this.swimlanes.day3)}
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 4', this.state.spots.day4, this.swimlanes.day4)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 5', this.state.spots.day5, this.swimlanes.day5)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 6', this.state.spots.day6, this.swimlanes.day6)}
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 7', this.state.spots.day7, this.swimlanes.day7)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 8', this.state.spots.day8, this.swimlanes.day8)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 9', this.state.spots.day9, this.swimlanes.day9)}
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 10', this.state.spots.day10, this.swimlanes.day10)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 11', this.state.spots.day11, this.swimlanes.day11)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 12', this.state.spots.day12, this.swimlanes.day12)}
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 13', this.state.spots.day13, this.swimlanes.day13)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 14', this.state.spots.day14, this.swimlanes.day14)}
                        </div>
                        <div className="col-md-4">
                            {this.renderSwimlane('Day 15', this.state.spots.day15, this.swimlanes.day15)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}



//[1, 40.7829, -73.9654, "central park", "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", 1, 0],
//[2, 40.7794, -73.9632, "The Metropolitan Museum of Art", "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", 1, 2],
//[3, 40.7614, -73.9776, "MoMa", "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", 1],
//[4, 40.7587, -73.9787, "Rockefeller Center", "https://res.cloudinary.com/gray-malin/image/upload/c_scale,w_1000,q_80/gray-malin/products/Gray_Malin_x_Rockefeller_Center_Tree.jpg?updated=1541526604", 1],
//[5, 40.7425, -74.0061, "Chelsea Market", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", 2],
//[6, 40.7480, -74.0048, "The High Line", "https://www.tripsavvy.com/thmb/u__1MLKdHHdEnrHxYjEx0KwHpyw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/HighLine_WildflowerField_NYCCompany-MarleyWhite-5b104d08a474be003826e215.jpg", 2],
//[7, 40.7484, -73.9857, "Empire State Building", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg", 2],
//[8, 40.7308, -73.9973, "Washington Square Park", "https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", 2],
//[9, 40.8075, -73.9626, "Columbia University", "https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Campus%20Images/low-plaza.jpg?itok=DJ8f43Xe", 3],
//[10, 40.8296, -73.9262, "Yankee Stadium", "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", 3],
//[11, 40.7925, -73.9519, "Museum of the City of New York", "https://media-cdn.tripadvisor.com/media/photo-s/0f/ec/53/13/the-museum-of-the-city.jpg", 3],