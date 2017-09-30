import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon'
import * as Icon from 'react-feather'

class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      categoryPreferences: []
    }
    this.updatePreference = this.updatePreference.bind(this);
  }

  async componentDidMount() {
    const getCategoryPreferences = await fetch('/api/preferences/categories', {
      method: 'GET',
      headers: {
        authtoken: window.sessionStorage.authToken
      }
    });
    const categoryPreferences = await getCategoryPreferences.json();
    categoryPreferences.sort(function(a, b) {
      return a.title.localeCompare(b.title)
    })
    this.setState({categoryPreferences});
  }

  updatePreference (category, index) {
    console.log(!this.state.categoryPreferences[index].preference);
    const newPreference = Object.assign({}, this.state.categoryPreferences[index])
    newPreference.preference = !this.state.categoryPreferences[index].preference
    this.setState({
        categoryPreferences: Object.assign([], this.state.categoryPreferences, newPreference)
      }
    )
  }

  render () {
    console.log(this.state.categoryPreferences);
    return(
      <div>
        {this.state.categoryPreferences.map((category, index) =>
          <div key={category.id} onClick={() => this.updatePreference(category, index)}>
            {category.preference ? <Icon.CheckCircle/> : <Icon.Circle/>}
            <h3><FeatherIcon name={category.feathericon}/> {category.title}</h3>
            <p>{category.description}</p>
          </div>
        )}
      </div>
    );
  }
}

// import { Users,  Zap, Briefcase, Flag, TrendingUp, Bell, Shield, Compass, Heart, Book, Music, Minimize2, Globe, LifeBuoy, FilePlus, Home, Droplet, Award, Command, Percent, Sun, Anchor, Circle, CheckCircle} from 'react-feather';
//
// class Preferences extends Component {
//   constructor() {
//     super();
//     this.state = {
//       work: false,    energy:false,   business:false,   finance:false, eu:false,
//       defense:false,  districts:false,parliament:false, citizenship:false,
//       culture:false,  equality:false, environment:false,religion:false,
//       justice:false,  tax:false,      social:false,     health:false, infratructure:false,
//       education:false,foreign:false,  integration:false,school:false
//     };
//   }
//
//   async componentDidMount() {
//     // const proposal = this.props.proposalInfo;
//     // const getProposalPresentation = await fetch('/api/ftScraper/', {
//     //   method: 'GET',
//     //   headers: {
//     //     period: proposal.Periode.kode,
//     //     type: proposal.Sagstype.type,
//     //     id: proposal.nummerprefix + proposal.nummernumerisk,
//     //   }
//     // });
//     // const proposalPresentation = await getProposalPresentation.json();
//     // const presentationStartIndex = proposalPresentation[1]
//     // this.setState({proposalPresentation: presentationStartIndex});
//   }
//
//   render() {
//
//     return (
//       <div>
//         <div onClick={()=>this.setState({work: !this.state.work})}>
//           {this.state.work ? <CheckCircle/> : <Circle/>}
//           <h3><Users/> Beskæftigelse</h3>
//           <p>Arbejdsmarkedspolitik og ydelser til personer uden for arbejdsmarkedet.</p>
//         </div>
//         <div onClick={()=>this.setState({energy: !this.state.energy})}>
//           {this.state.energy ? <CheckCircle/> : <Circle/>}
//           <h3><Zap/> Energi, forsyning & klima</h3>
//           <p>Udvinding, produktion, forsyning og forbrug af energi og dets indflydelse på klimaet.</p>
//         </div>
//         <div onClick={()=>this.setState({business: !this.state.business})}>
//           {this.state.business ? <CheckCircle/> : <Circle/>}
//           <h3><TrendingUp/> Erhverv, vækst & eksport</h3>
//           <p>Alt fra handel og håndværk til valutalovgivning og patenter.</p>
//         </div>
//         <div onClick={()=>this.setState({eu: !this.state.eu})}>
//           {this.state.eu ? <CheckCircle/> : <Circle/>}
//           <h3><Flag/> EU</h3>
//           <p>EU (Den Europæiske Union) og i nogen grad WTO (Verdenshandelsorganisationen).</p>
//         </div>
//         <div onClick={()=>this.setState({finance: !this.state.finance})}>
//           {this.state.finance ? <CheckCircle/> : <Circle/>}
//           <h3><Briefcase/> Finanserne</h3>
//           <p>Finanslovsforslag, bevillinger, statslån, og generel økonomisk politik.</p>
//         </div>
//         <div onClick={()=>this.setState({defense: !this.state.defense})}>
//           {this.state.defense ? <CheckCircle/> : <Circle/>}
//           <h3><Shield/> Forsvaret</h3>
//           <p>Forsvarets organisering og deltagelse i internationale militære missioner.</p>
//         </div>
//         <div onClick={()=>this.setState({districts: !this.state.districts})}>
//           {this.state.districts ? <CheckCircle/> : <Circle/>}
//           <h3><Compass/> Landdistrikter</h3>
//           <p>C</p>
//         </div>
//         <div onClick={()=>this.setState({parliament: !this.state.parliament})}>
//           {this.state.parliament ? <CheckCircle/> : <Circle/>}
//           <h3><Command/> Folketinget</h3>
//           <p>Grundloven, ministeransvar samt Folketingets forretningsorden, budget og administration.</p>
//         </div>
//         <div onClick={()=>this.setState({citizenship: !this.state.citizenship})}>
//           {this.state.citizenship ? <CheckCircle/> : <Circle/>}
//           <h3><Award/> Indfødsret</h3>
//           <p>Statsborgerskab i Danmark, samt regler for at opnå eller miste sit statsborgerskab.</p>
//         </div>
//         <div onClick={()=>this.setState({culture: !this.state.culture})}>
//           {this.state.culture ? <CheckCircle/> : <Circle/>}
//           <h3><Music/> Kultur</h3>
//           <p>Biblioteker, museer, kunst og folkeoplysning.</p>
//         </div>
//         <div onClick={()=>this.setState({equality: !this.state.equality})}>
//           {this.state.equality ? <CheckCircle/> : <Circle/>}
//           <h3><Minimize2/> Ligestilling</h3>
//           <p>Ligestillingsforhold, herunder nationalt og internationalt ligestillingsarbejde.</p>
//         </div>
//         <div onClick={()=>this.setState({environment: !this.state.environment})}>
//           {this.state.environment ? <CheckCircle/> : <Circle/>}
//           <h3><Sun/> Miljø & fødevarer</h3>
//           <p>Miljøbeskyttelse, genteknologi, fødevarer og kostvaner.</p>
//         </div>
//         <div onClick={()=>this.setState({religion: !this.state.religion})}>
//           {this.state.religion ? <CheckCircle/> : <Circle/>}
//           <h3><Bell/> Religion</h3>
//           <p>Folkekirken, andre trossamfund og begravelsesvæsenet.</p>
//         </div>
//         <div onClick={()=>this.setState({justice: !this.state.justice})}>
//           {this.state.justice ? <CheckCircle/> : <Circle/>}
//           <h3><Book/> Retssystemet</h3>
//           <p>Rets- og politivæsen, f.eks. straffelovgivning, retsplejeloven, formueret, tinglysning m.v.</p>
//         </div>
//         <div onClick={()=>this.setState({tax: !this.state.tax})}>
//           {this.state.tax ? <CheckCircle/> : <Circle/>}
//           <h3><Percent/> Skat</h3>
//           <p>Skattepolitiske og afgiftspolitiske spørgsmål herunder told.</p>
//         </div>
//         <div onClick={()=>this.setState({social: !this.state.social})}>
//           {this.state.social ? <CheckCircle/> : <Circle/>}
//           <h3><Heart/> Social-, indenrigs- & børnepolitik</h3>
//           <p>Sociale forhold som hjælp og støtte til personer med nedsat funktionsevne og til udsatte børn, unge og voksne samt familieret. Kommunal udligning, kommuners og regioners opgaver, valglovgivning og digitalisering af den offentlige sektor.</p>
//         </div>
//         <div onClick={()=>this.setState({health: !this.state.health})}>
//           {this.state.health ? <CheckCircle/> : <Circle/>}
//           <h3><Droplet/> Sundhed & ældre</h3>
//           <p>Sundheds- og ældrepolitiske spørgsmål, herunder sygdomme og forbyggelse.</p>
//         </div>
//         <div onClick={()=>this.setState({infrastructure: !this.state.infrastructure})}>
//           {this.state.infrastructure ? <CheckCircle/> : <Circle/>}
//           <h3><Anchor/> Transport, bygninger & boliger</h3>
//           <p>Al infrastruktur til transport på land, til søs og i luften, samt postvæsen, byggeri og boliger. </p>
//         </div>
//         <div onClick={()=>this.setState({education: !this.state.education})}>
//           {this.state.education ? <CheckCircle/> : <Circle/>}
//           <h3><FilePlus/> Uddannelse & forskning</h3>
//           <p>Videregående uddannelser, forskning og uddannelsesstøtte.</p>
//         </div>
//         <div onClick={()=>this.setState({foreign: !this.state.foreign})}>
//           {this.state.foreign ? <CheckCircle/> : <Circle/>}
//           <h3><Globe/> Udenrigspolitik</h3>
//           <p>Holdning til og involvering i begivenheder i verden, herunder udenrigs-, sikkerheds, og udviklingspolitik.</p>
//         </div>
//         <div onClick={()=>this.setState({integration: !this.state.integration})}>
//           {this.state.integration ? <CheckCircle/> : <Circle/>}
//           <h3><LifeBuoy/> Udlændinge & integration</h3>
//           <p>Asyl- og flygtningepolitik, udlændinge og integration.</p>
//         </div>
//         <div onClick={()=>this.setState({school: !this.state.school})}>
//           {this.state.school ? <CheckCircle/> : <Circle/>}
//           <h3><Home/> Undervisning</h3>
//           <p>Unges uddannelse og vilkår på grundskoler og ungdomsuddannelser.</p>
//         </div>
//       </div>
//     );
//   }
// }

export default Preferences;
