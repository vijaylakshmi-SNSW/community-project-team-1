import React from "react";

export default function Home() {



    return (
        <div className="home-container" >

            <h1>Community Project</h1>
            <div className="page-content" style={{ padding: '10px', margin: '10px' }}>

                <p>Each year the NSW government provides funding through the NSW Generations Fund for projects in the local community.
                Submissions for projects are welcomed from members of local NSW communities.
                </p>
                <p>Each project submission will be reviewed for eligibility, then compete alongside other eligible projects for funding.
                </p>
                <p>If you would like to submit a project for consideration, click <a href='./project-registry-submit'>here</a>.</p>
                <p></p>
                <div className="eligible-projects-image" style={{ padding: '20px', textAlign: 'center' }}>
                    <img src="https://www.nsw.gov.au/sites/default/files/styles/content_x1/public/2020-02/My-Community-Project-Eligible-Projects-DataCard-Banner-v04.png?itok=TUeWyMMC" alt="Community Project"></img>
                </div>
                <p></p>

                <p>Here are a few projects that have been approved for funding:</p>
                <div className='row'>
                    <div className='column' style={{ border: '2px solid grey' }}>
                        <b>Camden Water Park</b>
                        <br />
                        <img src="https://www.camden.nsw.gov.au/assets/images/Major-Developments/Major-Council-Projects/Curry-Reserve-Water-Play-Park/CR-2.jpg" alt="waterpark camden" height='100px'></img>
                        <img src="https://www.conlonfinancialsolutions.com.au/wp-content/uploads/2017/02/approved-stamp-clipart-best-Wyi7ys-clipart.jpeg" alt="approved" height='100px'></img>
                        <p>Create a water play park for the children of the community and its surrounding suburbs.</p>
                    </div>
                    <div className='column' style={{ border: '2px solid grey' }}>
                        <b>Mapping the Inner-West–Australia’s capital of craft brewing</b>
                        <br />
                        <img src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/news/markets/brewing-up-a-storm-in-india-s-craft-beer-wilderness/10309889-3-eng-GB/Brewing-up-a-storm-in-India-s-craft-beer-wilderness_wrbm_large.jpg" alt='beer' height='100px'></img>
                        <img src="https://www.conlonfinancialsolutions.com.au/wp-content/uploads/2017/02/approved-stamp-clipart-best-Wyi7ys-clipart.jpeg" alt="approved" height='100px'></img>

                        <p>An illustrated map and guide that locates and celebrates the craft breweries in the Inner-West (illustration, large mural, brochure, website).</p>
                    </div>
                </div>
                <p> See other <a href='./view-all'>eligible projects</a> and place your vote.</p>
            </div>
        </div>
    );
}