import React, { Component } from "react";
import Login from "../../components/loginBtn";

class Curious extends Component {
  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto text-center">
          <h1>Ups! Der er problemer</h1>
          <p className="mx-auto">
            Vi kan ikke genkende dig. Måske er det fordi du har slået
            tredjepartscookies fra i din webbrowser? Slå dem til, og prøv at
            logge ind (igen).
          </p>
          <Login type="login" className="btn btn-white mt-4 mb-8" />
          <p className="mx-auto">
            Virker det stadig ikke?{" "}
            <a href="mailto:dinevenner@initiativet.dk" className="inline-link">
              Send os en mail
            </a>.
          </p>
        </div>
      </div>
    );
  }
}

export default Curious;
