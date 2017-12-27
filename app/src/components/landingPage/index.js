import React, { Component } from 'react';
import Login from '../loginBtn';
import FeatherIcon from '../featherIcon';

class landingPage extends Component {
  componentDidMount() {
    window.localStorage.authToken &&
      this.props.history.replace({
        pathname: './proposals'
      });
  }
  render() {
    const cards = [
      {
        iconName: 'Feather',
        title: 'Tag initiativet',
        subtitle: 'Sætter din mærkesag på agendaen og skaber konkrete politiske forslag.'
      },
      {
        iconName: 'Heart',
        title: 'Gå på opdagelse',
        subtitle: 'Hjælp til at finde de forslag, der er vigtige for dig - og med at finde nye interesser.'
      },
      {
        iconName: 'CheckSquare',
        title: 'Sig din mening',
        subtitle: 'Simple afstemninger giver hver borger en lige stemme i alle beslutninger.'
      },
      {
        iconName: 'PieChart',
        title: 'Se nuancerne',
        subtitle: 'Datavisualisering giver indsigt i skjulte nuancer i den offentlige debat.'
      },
      {
        iconName: 'Zap',
        title: 'Politisk handling',
        subtitle: 'Initiativets politiske organisation lytter, spørger og handler med dig i førersædet.'
      },
      {
        iconName: 'Target',
        title: 'Skræddersyet til dig',
        subtitle: 'Et personligt feed holder dig opdateret med viden, argumenter og deadlines.'
      },
      {
        iconName: 'Users',
        title: 'Skabt i samarbejde',
        subtitle: 'Indsamler og deler holdninger, viden og argumenter fra andre borgere.'
      },
      {
        iconName: 'UserCheck',
        title: 'Modereret i fællesskab',
        subtitle: 'Reducerer bias, skjulte agendaer og finansielle interesser.'
      }
    ];
    return (
      <div className="mw8 center">
        <div className="tc pt4-ns pb3 pb4-ns">
          <h1 className="f3">
            Medbestemmelse. Simpelt.
            <span className="db lh-copy f5 f4-ns fw4 black-70 mt3 mb4">
              Politik gjort tilgængeligt, forståeligt og attraktivt at deltage i. Så alle kan være med.
            </span>
          </h1>
          <Login
            icon="LogIn"
            iconClass="mr2"
            type="login"
            className="pointer db dib-ns min-w12 white bg-dark-blue hover-bg-blue mv2 mh2-ns pv2 ph4 ba b--black-10 br1 shadow-6"
          />
          <Login
            icon="UserPlus"
            iconClass="mr2"
            type="signUp"
            className="pointer db dib-ns min-w12 white bg-dark-blue hover-bg-blue mv2 mh2-ns pv2 ph4 ba b--black-10 br1 shadow-6"
          />
        </div>
        <div className="flex flex-wrap tc tl-ns pb3 nl2 nr2">
          {cards.map((card, index) => (
            <div key={index} className="w-100 w-50-ns w-25-l pv2 pv4-ns ph2">
              <h3 className="mv2">
                <FeatherIcon className="mr2" name={card.iconName} />
                {card.title}
              </h3>
              <p className="lh-copy black-70 mv0">{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default landingPage;
