import React, { Component } from 'react';
import FooterItem from '../footerItem';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="max-w-xl mx-auto text-center pt-8 pb-4">
          <FooterItem
            linkAddress="https://initiativet.dk"
            linkTarget="_initiativet"
            linkText="Giv en vælgererklæring"
          />
          <FooterItem linkAddress="https://initiativet.dk/sponsor" linkTarget="_sponsor" linkText="Bliv sponsor" />
          <FooterItem
            linkAddress="https://join.slack.com/t/initiativetdk/shared_invite/enQtMjkxNzMyNTIwNDY5LWYzY2UzN2E3NjQwN2FhYTdiM2NjMDk3ODZhYjUwNjNiZTYxNzM3NTc5MDdlNmRlOGY0MGZlN2U5NDM1ZWZjYjc"
            linkTarget="_slack"
            linkText="Skriv med os på Slack"
          />
          <FooterItem linkAddress="https://github.com/asayio/asay" linkTarget="_github" linkText="Find os på Github" />
        </div>
      </footer>
    );
  }
}

export default Footer;
