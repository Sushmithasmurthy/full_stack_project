import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../css/soccer.css';
import 'bootstrap-css-only/css/bootstrap.css';
import $ from 'jquery';


/*
https://www.football-data.org/code_samples
*/


class Soccer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
componentDidMount() {
        var url = "http://api.football-data.org/v1/competitions/"; //"http://api.football-data.org/v1/teams/808/players";
        fetch(url,{
            headers: {
               'X-Auth-Token': '936e3e0bcae44037a6b1c1f6a6e8aa46',
              },
              method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }).then(res => res.json()).then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.teams
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
       <div>
       <p>...</p>
       </div>
      );
    }
  }
}

export default Soccer;

/*

http://api.football-data.org/v1/competitions/

Array[]

[0]=  {
"_links": {
"self": {
"href": "http://api.football-data.org/v1/competitions/446"
},
"teams": {
"href": "http://api.football-data.org/v1/competitions/446/teams"
},
"fixtures": {
"href": "http://api.football-data.org/v1/competitions/446/fixtures"
},
"leagueTable": {
"href": "http://api.football-data.org/v1/competitions/446/leagueTable"
}
},
"id": 446,
"caption": "Championship 2017/18",
"league": "ELC",
"year": "2017",
"currentMatchday": 35,
"numberOfMatchdays": 46,
"numberOfTeams": 24,
"numberOfGames": 552,
"lastUpdated": "2018-03-12T08:00:02Z"
},
*/