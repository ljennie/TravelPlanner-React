import React from 'react';
import '../styles/Board.css';
import Swimlane from './Swimlane';
import 'dragula/dist/dragula.css';

export default class DayList extends React.Component {

    render() {
        const Daycards = ((dayspots, colrefs, rowrefs) => {

            let board = new Array();
            let colnum = 3;
            let rownum = Math.ceil((dayspots.length) / colnum);
            for (var i = 1; i <= rownum; i++) {
                let row = new Array();
                for (var j = 1; j <= colnum; j++) {
                    let daynum = (i - 1) * colnum + j;
                    if (daynum > dayspots.length) break;
                    row.push(
                        <div className="col-md-4" id={dayspots[daynum - 1][0].day} >
                            <Swimlane name={'Day ' + dayspots[daynum - 1][0].day} spots={dayspots[daynum - 1]} dragulaRef={colrefs[daynum - 1]} />
                        </div>
                    );
                }
                let rowid = (i - 1) * colnum + 1;
                board.push(
                    <div className="row" ref={rowrefs[i]} id={rowid}>
                        {row}
                    </div>
                );
            }
            return board;
        })(this.props.dayspot, this.props.colrefs, this.props.rowrefs);

        return (
            <div className="Board">
                <div className="container-fluid">
                    {Daycards}
                </div>
            </div>
        );
    }

}