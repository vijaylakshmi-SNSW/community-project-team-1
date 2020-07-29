import React from "react";

export default function Home() {



    return (
        <div className="home-container" >
            <div className="generation-fund-image" style={{ margin: 'center' }}>
                <img src="https://images.squarespace-cdn.com/content/v1/5cb7367811f7845c98914b0c/1563339583705-0U6MD2I8ORCBTELZOHIQ/ke17ZwdGBToddI8pDm48kK1AqiaHV392C2jbmBFHILcUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc8cWEfJifD5izkQIyQbo5BapZR1Rl1PqinRmnXXUb4OWCylY3WwPA9oq4hmJL_3iA/Vote+banner+thin.png" alt="Homepage community banner" height='250px'></img>
            </div>
            <br />
            <div className="page-content" style={{ padding: '10px', margin: '10px' }}>
                <h1>Community Project</h1>
                <p>Each year the NSW government provides funding through the NSW Generations Fund for projects in the local community.
                Submissions for projects are welcomed from members of local NSW communities.
                </p>
                <p>Each project submission will be reviewed for eligibility, then compete alongside other eligible projects for funding.
                </p>
                <p>If you would like to submit a project for consideration, click <a href='./submit'>here</a>.</p>
                <p></p>
                <div className="eligible-projects-image">
                    <img src="https://www.nsw.gov.au/sites/default/files/styles/content_x1/public/2020-02/My-Community-Project-Eligible-Projects-DataCard-Banner-v04.png?itok=TUeWyMMC" alt="Community Project"></img>
                </div>
                <p></p>

                <p>Here are a few projects that have been submitted:</p>
                <div class='row'>
                    <div class='column'>column 1</div>
                    <div class='column'>column 2</div>
                    <div class='column'>column 3</div>
                </div>
                <p> Review the other <a href='./view-all'>eligible projects</a> and place your vote.</p>
            </div>
        </div>
    );
}