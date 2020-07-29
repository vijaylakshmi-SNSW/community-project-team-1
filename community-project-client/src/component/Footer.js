import React from "react";

export default function Footer() {



    return (
            <footer className='footer'>
                <div className='empty-container'>
                    <div className='footer-container' padding='40px'>
                        <b>CONTACT</b>
                        <ul className='footer-list'>
                            <li><a href="tel:137788" style={{ "color": "white", textDecoration: 'none' }}>Phone 13 77 88</a></li>
                            <li><a href="https://www.service.nsw.gov.au/service-centre" data-drupal-link-system-path="node/100439" style={{ "color": "white", textDecoration: 'none' }}>Find a Service NSW location</a></li>
                            <li><a href="https://www.service.nsw.gov.au/nswgovdirectory" data-drupal-link-system-path="node/533" style={{ "color": "white", textDecoration: 'none' }}>Find a NSW Government agency</a></li>

                            <li><a href="https://www.service.nsw.gov.au/" style={{ color: "white", textDecoration: 'none' }}>service.nsw.gov.au</a></li>

                            <a href="https://www.facebook.com/pages/Service-NSW/543365579058368" className="social-nav--facebook" style={{ "color": "white", textDecoration: 'none' }}>Facebook  |</a>

                            <a href="https://twitter.com/ServiceNSW" className="social-nav--twitter" style={{ "color": "white", textDecoration: 'none' }}> Twitter |</a>

                            <a href="https://au.linkedin.com/company/servicensw" className="social-nav--linkedin" style={{ "color": "white", textDecoration: 'none' }}> Linkedin  |</a>

                            <a href="http://instagram.com/servicensw?ref=badge" className="social-nav--instagram" style={{ "color": "white", textDecoration: 'none' }}> Instagram  |</a>

                            <a href="https://www.youtube.com/channel/UCpFpdQqKphbZ5xiLV0nuwdQ" className="social-nav--youtube" style={{ "color": "white", textDecoration: 'none' }}> Youtube</a>
                        </ul>
                    </div>
                </div>
            </footer>
    );
}