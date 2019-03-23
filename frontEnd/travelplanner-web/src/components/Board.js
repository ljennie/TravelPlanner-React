import React from 'react';
import Dragula from 'dragula';
import '../styles/Board.css';
import Swimlane from './Swimlane';
import 'dragula/dist/dragula.css';


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        const spots = this.getSpots();
        this.state = {
            spots: {
                day1: spots.filter(spot => spot.day && spot.day === 1),
                day2: spots.filter(spot => spot.day && spot.day === 2),
                day3: spots.filter(spot => spot.day && spot.day === 3),
            }
        }
        this.swimlanes = {
            day1: React.createRef(),
            day2: React.createRef(),
            day3: React.createRef(),
        }
    }

    getSpots() {
        return [
            [1, 40.7829, -73.9654, "central park", "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", 1],
            [2, 40.7794, -73.9632, "The Metropolitan Museum of Art", "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", 1],
            [3, 40.7614, -73.9776, "MoMa", "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", 1],
            [4, 40.7587, -73.9787, "Rockefeller Center", "https://res.cloudinary.com/gray-malin/image/upload/c_scale,w_1000,q_80/gray-malin/products/Gray_Malin_x_Rockefeller_Center_Tree.jpg?updated=1541526604", 1],
            [5, 40.7425, -74.0061, "Chelsea Market", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", 2],
            [6, 40.7480, -74.0048, "The High Line", "https://www.tripsavvy.com/thmb/u__1MLKdHHdEnrHxYjEx0KwHpyw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/HighLine_WildflowerField_NYCCompany-MarleyWhite-5b104d08a474be003826e215.jpg", 2],
            [7, 40.7484, -73.9857, "Empire State Building", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg", 2],
            [8, 40.7308, -73.9973, "Washington Square Park", "https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", 2],
            [9, 40.8075, -73.9626, "Columbia University", "https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Campus%20Images/low-plaza.jpg?itok=DJ8f43Xe", 3],
            [10, 40.8296, -73.9262, "Yankee Stadium", "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", 3],
            [11, 40.7925, -73.9519, "Museum of the City of New York", "https://media-cdn.tripadvisor.com/media/photo-s/0f/ec/53/13/the-museum-of-the-city.jpg", 3],
        ].map(spotDetails => ({
            id: spotDetails[0],
            lat: spotDetails[1],
            lon: spotDetails[2],
            name: spotDetails[3],
            url: spotDetails[4],
            day: spotDetails[5],
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
        var drake = Dragula([container1,container2,container3]);
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
                </div>
            </div>
        );
    }

}