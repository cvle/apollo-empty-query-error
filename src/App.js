import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

let id=0;

class App extends Component {
  contextTypes
  handleClick = () => {
    // Failing means that the query data becomes completely empty without any errors being logged.

    // Removing `name` from query will fail.
    const query = gql`
      query MyQuery {
        people {
          id
          name
        }
      }
    `;
    const {client} = this.context;
    const data = client.readQuery({query});

    // This fails
    data.people.push({__typename: 'Person', id: `custom-${id++}`});

    // This works
    // data.people.push({__typename: 'Person', id: `custom-${id++}`, name: 'Test'});

    client.writeQuery({query, data});
  }
  render() {
    const { data: { loading, people } } = this.props;
    if (!loading) {
      console.log(`Rendered people: ${people}`);
    }
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name}
                {person.createdAt}
              </li>
            ))}
          </ul>
        )}
        <button onClick={this.handleClick}>Click</button>
      </main>
    );
  }
}

App.contextTypes = {
  client: PropTypes.object,
};

export default graphql(
  gql`{
    people {
      id
      name
    }
  }`,
)(App)
