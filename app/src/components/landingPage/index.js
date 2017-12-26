import React, { Component } from 'react';
import { Heart, Target, Users, UserCheck, CheckSquare, Feather, Zap, PieChart } from 'react-feather';
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
    const cards1 = [
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
        subtitle: 'Datavisualisering giver indsigt i skjulte nueancer i den offentlige debat.'
      }
    ];
    const cards2 = [
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
      <div className="near-black lh-copy mw8 center ph3">
        <div className="pt4 pb5 pv5-l">
          <h1 className="fw5 f3 f2-l">Medbestemmelse. Simpelt.</h1>
          <h2 className="f4 normal gray">
            Politik gjort tilgængeligt, forståeligt og attraktivt at deltage i. Så alle kan være med.
          </h2>{' '}
        </div>
        <div className="mw8 center tc w-100 flex-auto">
          <Login
            icon="LogIn"
            iconClass="mr2"
            type="login"
            className="pointer db dib-ns min-w12 white bg-dark-blue hover-bg-blue mv2 mr0 mr3-ns pv2 ph4 ba b--black-10 br1 shadow-6"
          />
          <Login
            icon="UserPlus"
            iconClass="mr2"
            type="signUp"
            className="pointer db dib-ns min-w12 white bg-dark-blue hover-bg-blue mv2 pv2 ph4 ba b--black-10 br1 shadow-6"
          />
        </div>
        <div>
          <div className="cf pv4-l row">
            {cards1.map((card, index) => (
              <div className="fl w-100 w-50-ns w-25-l pv2 pv4-l ph2 h5-m h5-l">
                <div className="pl3-l">
                  <FeatherIcon name={card.iconName} />
                </div>
                <h3 className="mv1">{card.title}</h3>
                <p className="gray mt1">{card.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="cf row lh-prose">
            {cards2.map((card, index) => (
              <div className="fl w-100 w-50-ns w-25-l pv2 pv4-l ph2 h5-m h5-l">
                <div className="pl3-l">
                  <FeatherIcon name={card.iconName} />
                </div>
                <h3 className="mv1">{card.title}</h3>
                <p className="gray mt1">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default landingPage;
