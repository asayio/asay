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
      <div>
        <div>
          <h1>
            Medbestemmelse. Simpelt.
            <span>Politik gjort tilgængeligt, forståeligt og attraktivt at deltage i. Så alle kan være med.</span>
          </h1>
          <Login icon="LogIn" iconClass="" type="login" />
          <Login icon="UserPlus" iconClass="" type="signUp" />
        </div>
        <div>
          {cards.map((card, index) => (
            <div key={index}>
              <h3>
                <FeatherIcon name={card.iconName} />
                {card.title}
              </h3>
              <p>{card.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default landingPage;
